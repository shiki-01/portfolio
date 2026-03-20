<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import * as THREE from 'three';
	import html2canvas from 'html2canvas';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

	const DEFAULT_PARAMS = {
		noiseStrength: 0.065,
		chromaticAberration: 0.008,
		distortionStrength: 0.28,
		vignetteStrength: 0.52
	} as const;

	const DEBUG = {
		bypassPostFx: false
	} as const;

	const SITE_EMBED = {
		url: 'https://www.openstreetmap.org/export/embed.html',
		targetRootName: 'Cube.004',
		targetMeshName: 'Cube.004',
		preferredMaterialName: 'Material.004',
		panelWidth: 760,
		panelHeight: 760,
		surfaceOffset: 0.002,
		surfaceSegmentsX: 9,
		surfaceSegmentsY: 9,
		surfaceProbeDistance: 0.25
	} as const;

	type PanelDrawerContext = {
		width: number;
		height: number;
		siteUrl: string;
	};

	type PanelDrawer = (ctx: CanvasRenderingContext2D, info: PanelDrawerContext) => void;

	type PanelPointerDown = (
		point: { x: number; y: number },
		info: PanelDrawerContext
	) => boolean | void;

	let {
		children,
		modelSrc,
		noiseStrength = DEFAULT_PARAMS.noiseStrength,
		chromaticAberration = DEFAULT_PARAMS.chromaticAberration,
		distortionStrength = DEFAULT_PARAMS.distortionStrength,
		vignetteStrength = DEFAULT_PARAMS.vignetteStrength,
		exposure = 1.14,
		siteUrl = SITE_EMBED.url,
		interactive = true,
		panelDrawer,
		panelPointerDown
	}: {
		children?: Snippet;
		modelSrc: string;
		noiseStrength?: number;
		chromaticAberration?: number;
		distortionStrength?: number;
		vignetteStrength?: number;
		exposure?: number;
		siteUrl?: string;
		interactive?: boolean;
		panelDrawer?: PanelDrawer;
		panelPointerDown?: PanelPointerDown;
	} = $props();

	let canvasEl: HTMLCanvasElement | null = null;
	let containerEl: HTMLDivElement | null = null;
	let slotHostEl = $state<HTMLDivElement | null>(null);
	let debugText = $state('init');

	const normalizeName = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

	onMount(() => {
		if (!canvasEl || !containerEl) return;
		const renderCanvas = canvasEl;
		debugText = 'mount: renderer init';

		const renderer = new THREE.WebGLRenderer({
			canvas: renderCanvas,
			antialias: true,
			alpha: true
		});
		renderer.setClearColor(0x000000, 0);
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
		camera.position.set(0, 0.6, 4.2);
		const baseCameraPosition = camera.position.clone();
		const baseLookAt = new THREE.Vector3(0, 0, 0);
		const orbitBaseOffset = new THREE.Vector3();
		const orbitRotation = new THREE.Euler(0, 0, 0, 'YXZ');
		const orbitOffset = new THREE.Vector3();
		const lookTarget = new THREE.Vector3();
		let pointerTargetX = 0;
		let pointerTargetY = 0;
		let pointerSmoothX = 0;
		let pointerSmoothY = 0;

		const raycaster = new THREE.Raycaster();
		const ndc = new THREE.Vector2();
		const orbitYawStrength = 0.26;
		const orbitPitchStrength = 0.14;
		const cameraLateralX = 0.2;
		const cameraLateralY = 0.1;
		const lookLeadX = 0.05;
		const lookLeadY = 0.035;

		const ambient = new THREE.AmbientLight(0xffffff, 1.25);
		scene.add(ambient);

		const key = new THREE.DirectionalLight(0xffffff, 1.45);
		key.position.set(4, 6, 7);
		scene.add(key);

		const rim = new THREE.DirectionalLight(0x9ac7ff, 0.55);
		rim.position.set(-2, 2, -3);
		scene.add(rim);

		const modelRoot = new THREE.Group();
		scene.add(modelRoot);

		const loader = new GLTFLoader();
		let loadedModel: THREE.Object3D | null = null;
		let panelMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null = null;
		let panelTexture: THREE.CanvasTexture | null = null;
		let cleanupPanelInteraction: (() => void) | null = null;
		let cleanupSlotCapture: (() => void) | null = null;
		let triggerSlotCapture: (() => void) | null = null;

		loader.load(
			modelSrc,
			(gltf: GLTF) => {
				loadedModel = gltf.scene;
				modelRoot.add(loadedModel);
				debugText = 'model: loaded';

				const box = new THREE.Box3().setFromObject(loadedModel);
				const center = box.getCenter(new THREE.Vector3());

				loadedModel.position.sub(center);

				baseCameraPosition.set(1.5, 0.1, 0);
				orbitBaseOffset.copy(baseCameraPosition).sub(baseLookAt);
				camera.position.copy(baseCameraPosition);
				camera.lookAt(baseLookAt);

				const allMeshes: THREE.Mesh[] = [];
				loadedModel.traverse((obj) => {
					const mesh = obj as THREE.Mesh;
					if (mesh.isMesh) allMeshes.push(mesh);
				});

				const byMaterial = allMeshes.find((mesh) => {
					const material = mesh.material;
					if (Array.isArray(material)) {
						return material.some(
							(m) =>
								normalizeName(m?.name ?? '') === normalizeName(SITE_EMBED.preferredMaterialName)
						);
					}
					return (
						normalizeName(material?.name ?? '') === normalizeName(SITE_EMBED.preferredMaterialName)
					);
				});

				const byRootName = allMeshes.find(
					(mesh) => normalizeName(mesh.name) === normalizeName(SITE_EMBED.targetRootName)
				);

				const byMeshName = allMeshes.find(
					(mesh) => normalizeName(mesh.name) === normalizeName(SITE_EMBED.targetMeshName)
				);

				const byLooseRoot = allMeshes.find((mesh) =>
					normalizeName(mesh.name).includes(normalizeName(SITE_EMBED.targetRootName))
				);

				const targetMesh =
					byMeshName ?? byMaterial ?? byRootName ?? byLooseRoot ?? allMeshes[0] ?? null;
				if (!targetMesh) {
					debugText = 'mesh: target not found';
					console.warn('[ThreeModelViewer] target mesh not found');
					return;
				}
				debugText = `mesh: ${targetMesh.name}`;

				targetMesh.geometry.computeBoundingBox();
				const localBox = targetMesh.geometry.boundingBox;
				if (!localBox) {
					debugText = 'mesh: no bounding box';
					console.warn('[ThreeModelViewer] mesh has no bounding box');
					return;
				}

				const size = localBox.getSize(new THREE.Vector3());
				const centerLocal = localBox.getCenter(new THREE.Vector3());
				const anchor = new THREE.Object3D();
				const geometry = targetMesh.geometry as THREE.BufferGeometry;
				if (!geometry.getAttribute('normal')) {
					geometry.computeVertexNormals();
				}

				const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute | undefined;
				const normalAttr = geometry.getAttribute('normal') as THREE.BufferAttribute | undefined;

				const normalLocal = new THREE.Vector3(0, 0, 1);
				if (normalAttr && normalAttr.count > 0) {
					normalLocal.set(0, 0, 0);
					for (let i = 0; i < normalAttr.count; i++) {
						normalLocal.x += normalAttr.getX(i);
						normalLocal.y += normalAttr.getY(i);
						normalLocal.z += normalAttr.getZ(i);
					}
					normalLocal.normalize();
				}
				if (normalLocal.lengthSq() < 1e-6) {
					normalLocal.set(0, 0, 1);
				}

				const tangentA = new THREE.Vector3().crossVectors(normalLocal, new THREE.Vector3(0, 1, 0));
				if (tangentA.lengthSq() < 1e-6) {
					tangentA.set(1, 0, 0);
				}
				tangentA.normalize();
				const tangentB = new THREE.Vector3().crossVectors(normalLocal, tangentA).normalize();

				let minA = Infinity;
				let maxA = -Infinity;
				let minB = Infinity;
				let maxB = -Infinity;
				let maxN = -Infinity;
				if (posAttr) {
					const p = new THREE.Vector3();
					const d = new THREE.Vector3();
					for (let i = 0; i < posAttr.count; i++) {
						p.set(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
						d.copy(p).sub(centerLocal);
						const a = d.dot(tangentA);
						const b = d.dot(tangentB);
						const n = d.dot(normalLocal);
						if (a < minA) minA = a;
						if (a > maxA) maxA = a;
						if (b < minB) minB = b;
						if (b > maxB) maxB = b;
						if (n > maxN) maxN = n;
					}
				}

				let planeWidth = Number.isFinite(maxA - minA) ? maxA - minA : size.x;
				let planeHeight = Number.isFinite(maxB - minB) ? maxB - minB : size.y;
				if (planeWidth <= 0) planeWidth = size.x;
				if (planeHeight <= 0) planeHeight = size.y;

				targetMesh.updateMatrixWorld(true);
				const centerWorld = targetMesh.localToWorld(centerLocal.clone());
				const normalWorld = normalLocal
					.clone()
					.transformDirection(targetMesh.matrixWorld)
					.normalize();
				const toCamera = camera.position.clone().sub(centerWorld).normalize();
				if (normalWorld.dot(toCamera) < 0) normalLocal.multiplyScalar(-1);

				const surfacePush = Number.isFinite(maxN) ? maxN : 0;
				anchor.position.copy(centerLocal);
				anchor.quaternion.setFromUnitVectors(
					new THREE.Vector3(0, 0, 1),
					normalLocal.clone().normalize()
				);
				targetMesh.add(anchor);
				targetMesh.updateMatrixWorld(true);
				anchor.updateMatrixWorld(true);

				const panelCanvas = document.createElement('canvas');
				panelCanvas.width = SITE_EMBED.panelWidth;
				panelCanvas.height = SITE_EMBED.panelHeight;
				const ctx = panelCanvas.getContext('2d');
				if (!ctx) {
					debugText = 'panel: canvas context error';
					return;
				}

				const buttons = [
					{ label: 'Home', href: '/', x: 40, y: 170, w: 220, h: 76 },
					{ label: 'Works', href: '/works', x: 280, y: 170, w: 220, h: 76 },
					{ label: 'Blogs', href: '/blogs', x: 520, y: 170, w: 220, h: 76 }
				];

				const panelInfo: PanelDrawerContext = {
					width: panelCanvas.width,
					height: panelCanvas.height,
					siteUrl
				};

				const hasSlot = !!children && !!slotHostEl;
				let isSlotCapturePending = false;
				let isSlotCapturing = false;

				const drawPanelFromSlot = async () => {
					if (!slotHostEl || !panelTexture || isSlotCapturing) return;
					isSlotCapturing = true;
					try {
						const snapshot = await html2canvas(slotHostEl, {
							backgroundColor: null,
							logging: false,
							useCORS: true,
							scale: 1
						});

						ctx.clearRect(0, 0, panelCanvas.width, panelCanvas.height);
						ctx.fillStyle = '#101726';
						ctx.fillRect(0, 0, panelCanvas.width, panelCanvas.height);
						ctx.drawImage(snapshot, 0, 0, panelCanvas.width, panelCanvas.height);
						panelTexture.needsUpdate = true;
						debugText = `panel: slot captured ${snapshot.width}x${snapshot.height}`;
					} catch (error) {
						debugText = 'panel: slot capture failed';
						console.error('[ThreeModelViewer] slot capture failed:', error);
					} finally {
						isSlotCapturing = false;
					}
				};

				const scheduleSlotCapture = () => {
					if (!hasSlot || isSlotCapturePending) return;
					isSlotCapturePending = true;
					window.setTimeout(() => {
						isSlotCapturePending = false;
						void drawPanelFromSlot();
					}, 32);
				};
				triggerSlotCapture = scheduleSlotCapture;

				const drawPanel = () => {
					if (hasSlot) {
						scheduleSlotCapture();
						return;
					}

					if (panelDrawer) {
						panelDrawer(ctx, panelInfo);
						return;
					}

					ctx.fillStyle = '#121826';
					ctx.fillRect(0, 0, panelCanvas.width, panelCanvas.height);

					ctx.strokeStyle = '#89a6ff';
					ctx.lineWidth = 6;
					ctx.strokeRect(3, 3, panelCanvas.width - 6, panelCanvas.height - 6);

					ctx.fillStyle = '#f2f6ff';
					ctx.font = '700 58px sans-serif';
					ctx.fillText('3D Panel Active', 42, 96);

					ctx.font = '500 28px sans-serif';
					ctx.globalAlpha = 0.95;
					ctx.fillText(`source: ${siteUrl}`, 44, 136);
					ctx.globalAlpha = 1;

					for (const btn of buttons) {
						ctx.fillStyle = '#1f2a44';
						ctx.strokeStyle = '#89a6ff';
						ctx.lineWidth = 3;
						ctx.fillRect(btn.x, btn.y, btn.w, btn.h);
						ctx.strokeRect(btn.x, btn.y, btn.w, btn.h);
						ctx.fillStyle = '#ffffff';
						ctx.font = '600 34px sans-serif';
						ctx.fillText(btn.label, btn.x + 52, btn.y + 49);
					}

					ctx.fillStyle = 'rgba(255, 0, 0, 0.92)';
					ctx.fillRect(0, 0, 120, 72);
					ctx.fillStyle = '#ffffff';
					ctx.font = 'bold 26px sans-serif';
					ctx.fillText('OK', 34, 48);
				};

				drawPanel();
				panelTexture = new THREE.CanvasTexture(panelCanvas);
				panelTexture.colorSpace = THREE.SRGBColorSpace;
				panelTexture.needsUpdate = true;
				if (hasSlot) {
					scheduleSlotCapture();
					const currentSlotHost = slotHostEl;
					if (!currentSlotHost) {
						debugText = 'panel: slot host missing';
						return;
					}
					const observer = new MutationObserver(() => scheduleSlotCapture());
					observer.observe(currentSlotHost, {
						attributes: true,
						childList: true,
						subtree: true,
						characterData: true
					});
					cleanupSlotCapture = () => observer.disconnect();
				}

				const panelGeometry = new THREE.PlaneGeometry(
					planeWidth,
					planeHeight,
					SITE_EMBED.surfaceSegmentsX,
					SITE_EMBED.surfaceSegmentsY
				);

				const panelPos = panelGeometry.getAttribute('position') as THREE.BufferAttribute;
				const projRaycaster = new THREE.Raycaster();
				const normalWorldForProject = normalLocal
					.clone()
					.transformDirection(targetMesh.matrixWorld)
					.normalize();

				for (let i = 0; i < panelPos.count; i++) {
					const vx = panelPos.getX(i);
					const vy = panelPos.getY(i);
					const probeCenterLocal = centerLocal
						.clone()
						.addScaledVector(tangentA, vx)
						.addScaledVector(tangentB, vy);

					const probeDistance = SITE_EMBED.surfaceProbeDistance;
					const originFrontWorld = targetMesh.localToWorld(
						probeCenterLocal.clone().addScaledVector(normalLocal, probeDistance)
					);
					const originBackWorld = targetMesh.localToWorld(
						probeCenterLocal.clone().addScaledVector(normalLocal, -probeDistance)
					);

					projRaycaster.set(originFrontWorld, normalWorldForProject.clone().multiplyScalar(-1));
					let hit = projRaycaster.intersectObject(targetMesh, false)[0] ?? null;

					if (!hit) {
						projRaycaster.set(originBackWorld, normalWorldForProject.clone());
						hit = projRaycaster.intersectObject(targetMesh, false)[0] ?? null;
					}

					if (!hit) {
						panelPos.setZ(i, surfacePush + SITE_EMBED.surfaceOffset);
						continue;
					}

					const hitInAnchor = anchor.worldToLocal(hit.point.clone());
					panelPos.setZ(i, hitInAnchor.z + SITE_EMBED.surfaceOffset);
				}

				panelPos.needsUpdate = true;
				panelGeometry.computeVertexNormals();
				const panelMaterial = new THREE.MeshBasicMaterial({
					map: panelTexture,
					transparent: false,
					depthTest: false,
					depthWrite: false,
					side: THREE.DoubleSide,
					toneMapped: false
				});

				panelMesh = new THREE.Mesh(panelGeometry, panelMaterial);
				panelMesh.renderOrder = 999;

				const pickPanelPoint = (clientX: number, clientY: number) => {
					if (!panelMesh) return null;
					const rect = renderCanvas.getBoundingClientRect();
					ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
					ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
					raycaster.setFromCamera(ndc, camera);
					const hits = raycaster.intersectObject(panelMesh, false);
					if (!hits.length) return null;
					const uv = hits[0].uv;
					if (!uv) return null;
					const px = uv.x * panelCanvas.width;
					const py = (1 - uv.y) * panelCanvas.height;
					return { px, py };
				};

				const onPointerDown = (event: PointerEvent) => {
					if (!interactive || !panelMesh) return;
					const point = pickPanelPoint(event.clientX, event.clientY);
					if (!point) return;
					const { px, py } = point;

					if (hasSlot && slotHostEl) {
						const hostRect = slotHostEl.getBoundingClientRect();
						const clientX = hostRect.left + px;
						const clientY = hostRect.top + py;
						const interactiveEls = Array.from(
							slotHostEl.querySelectorAll<HTMLElement>(
								'a, button, input, textarea, select, [role="button"], [onclick], [data-clickable]'
							)
						);
						for (let i = interactiveEls.length - 1; i >= 0; i--) {
							const el = interactiveEls[i];
							if (el.hidden) continue;
							const style = window.getComputedStyle(el);
							if (style.display === 'none' || style.visibility === 'hidden') continue;
							const rect = el.getBoundingClientRect();
							const hit =
								clientX >= rect.left &&
								clientX <= rect.right &&
								clientY >= rect.top &&
								clientY <= rect.bottom;
							if (!hit) continue;

							const clickEvent = new MouseEvent('click', {
								bubbles: true,
								cancelable: true,
								view: window,
								clientX,
								clientY
							});
							el.dispatchEvent(clickEvent);
							triggerSlotCapture?.();
							return;
						}
					}

					if (panelPointerDown) {
						const handled = panelPointerDown({ x: px, y: py }, panelInfo);
						if (handled) return;
					}
					for (const btn of buttons) {
						const hit = px >= btn.x && px <= btn.x + btn.w && py >= btn.y && py <= btn.y + btn.h;
						if (hit) {
							window.location.assign(btn.href);
							break;
						}
					}
				};

				const onWheel = (event: WheelEvent) => {
					if (!interactive || !slotHostEl || !hasSlot) return;
					const point = pickPanelPoint(event.clientX, event.clientY);
					if (!point) return;

					event.preventDefault();
					slotHostEl.scrollTop += event.deltaY;
					slotHostEl.scrollLeft += event.deltaX;
					triggerSlotCapture?.();
				};

				const onPointerMove = (event: PointerEvent) => {
					const rect = renderCanvas.getBoundingClientRect();
					if (!rect.width || !rect.height) return;
					const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
					const ny = -((event.clientY - rect.top) / rect.height) * 2 + 1;
					pointerTargetX = THREE.MathUtils.clamp(nx, -1, 1);
					pointerTargetY = THREE.MathUtils.clamp(ny, -1, 1);
				};

				const onPointerLeave = () => {
					pointerTargetX = 0;
					pointerTargetY = 0;
				};

				renderCanvas.addEventListener('pointerdown', onPointerDown);
				renderCanvas.addEventListener('wheel', onWheel, { passive: false });
				renderCanvas.addEventListener('pointermove', onPointerMove);
				renderCanvas.addEventListener('pointerleave', onPointerLeave);

				debugText = `panel: canvas mounted ${panelCanvas.width}x${panelCanvas.height}`;
				console.log('[ThreeModelViewer] target mesh:', targetMesh.name);

				anchor.add(panelMesh);

				cleanupPanelInteraction = () => {
					renderCanvas.removeEventListener('pointerdown', onPointerDown);
					renderCanvas.removeEventListener('wheel', onWheel);
					renderCanvas.removeEventListener('pointermove', onPointerMove);
					renderCanvas.removeEventListener('pointerleave', onPointerLeave);
				};
			},
			undefined,
			(err) => {
				debugText = 'model: load error';
				console.error('[ThreeModelViewer] model load failed:', err);
			}
		);

		const composer = new EffectComposer(renderer);
		const renderPass = new RenderPass(scene, camera);
		composer.addPass(renderPass);

		const lensPass = new ShaderPass({
			uniforms: {
				tDiffuse: { value: null },
				uTime: { value: 0 },
				uNoiseStrength: { value: noiseStrength },
				uChromaticAberration: { value: chromaticAberration },
				uDistortionStrength: { value: distortionStrength },
				uVignetteStrength: { value: vignetteStrength },
				uExposure: { value: exposure }
			},
			vertexShader: /* glsl */ `
				varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}
			`,
			fragmentShader: /* glsl */ `
				uniform sampler2D tDiffuse;
				uniform float uTime;
				uniform float uNoiseStrength;
				uniform float uChromaticAberration;
				uniform float uDistortionStrength;
				uniform float uVignetteStrength;
				uniform float uExposure;
				varying vec2 vUv;

				float hash(vec2 p) {
					p = fract(p * vec2(123.34, 345.45));
					p += dot(p, p + 34.345);
					return fract(p.x * p.y);
				}

				void main() {
					vec2 uv = vUv;
					vec2 centered = uv * 2.0 - 1.0;
					float radius = length(centered);

					float fisheye = 1.0 +  uDistortionStrength * radius * radius;
					vec2 warped = centered * fisheye;
					vec2 warpedUv = warped * 0.5 + 0.5;

					vec2 dir = normalize(centered + vec2(1e-6));
					float caAmount = uChromaticAberration * (0.2 + radius * 1.2);
					vec2 caOffset = dir * caAmount;

					float r = texture2D(tDiffuse, warpedUv + caOffset).r;
					float g = texture2D(tDiffuse, warpedUv).g;
					float b = texture2D(tDiffuse, warpedUv - caOffset).b;
					vec3 color = vec3(r, g, b);

					float n = hash(uv * vec2(960.0, 540.0) + uTime * 17.0);
					color += (n - 0.5) * uNoiseStrength;

					float vignette = smoothstep(1.0, 0.08, radius);
					color *= mix(1.0, vignette, uVignetteStrength);
					color *= uExposure;

					gl_FragColor = vec4(color, 1.0);
				}
			`
		});
		composer.addPass(lensPass);

		const resize = () => {
			if (!containerEl) return;
			const width = containerEl.clientWidth;
			const height = containerEl.clientHeight;
			if (!width || !height) return;
			renderer.setSize(width, height, false);
			composer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		};

		const resizeObserver = new ResizeObserver(() => resize());
		resizeObserver.observe(containerEl);
		resize();

		const timer = new THREE.Timer();
		timer.update();
		let rafId = 0;
		const tick = () => {
			timer.update();
			const t = timer.getElapsed();
			lensPass.uniforms.uTime.value = t;
			pointerSmoothX += (pointerTargetX - pointerSmoothX) * 0.08;
			pointerSmoothY += (pointerTargetY - pointerSmoothY) * 0.08;

			orbitRotation.x = -pointerSmoothY * orbitPitchStrength;
			orbitRotation.y = -pointerSmoothX * orbitYawStrength;
			orbitOffset.copy(orbitBaseOffset).applyEuler(orbitRotation);

			camera.position.set(
				baseLookAt.x + orbitOffset.x + pointerSmoothX * cameraLateralX,
				baseLookAt.y + orbitOffset.y + pointerSmoothY * cameraLateralY,
				baseLookAt.z + orbitOffset.z
			);

			lookTarget.set(
				baseLookAt.x - pointerSmoothX * lookLeadX,
				baseLookAt.y - pointerSmoothY * lookLeadY,
				baseLookAt.z
			);
			camera.lookAt(lookTarget);
			if (DEBUG.bypassPostFx) {
				renderer.render(scene, camera);
			} else {
				composer.render();
			}
			rafId = requestAnimationFrame(tick);
		};
		rafId = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(rafId);
			resizeObserver.disconnect();
			composer.dispose();
			renderer.dispose();
			cleanupPanelInteraction?.();
			cleanupSlotCapture?.();
			triggerSlotCapture = null;
			panelMesh?.geometry.dispose();
			panelMesh?.material.dispose();
			panelTexture?.dispose();

			scene.traverse((obj: THREE.Object3D) => {
				const mesh = obj as THREE.Mesh;
				if (!mesh.isMesh) return;
				mesh.geometry?.dispose();
				const material = mesh.material;
				if (Array.isArray(material)) {
					for (const mat of material) mat.dispose();
				} else {
					material?.dispose();
				}
			});
		};
	});
</script>

<div bind:this={containerEl} class="three-viewer-shell">
	<canvas bind:this={canvasEl} class="three-viewer-canvas" aria-label="3D model"></canvas>
	<div class="three-viewer-debug">{debugText}</div>
</div>

{#if children}
	<div bind:this={slotHostEl} class="three-viewer-slot-host" aria-hidden="true">
		{@render children()}
	</div>
{/if}

<style>
	.three-viewer-shell {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 100dvh;
		overflow: hidden;
	}

	.three-viewer-canvas {
		position: absolute;
		inset: 0;
		z-index: 1;
		display: block;
		width: 100%;
		height: 100%;
	}

	.three-viewer-slot-host {
		position: fixed;
		left: -200vw;
		top: 0;
		width: 1200px;
		height: 760px;
		overflow: auto;
		pointer-events: none;
		background: #101726;
	}
</style>
