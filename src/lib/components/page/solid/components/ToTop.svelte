<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import logoSymbolSmall from '$lib/components/page/solid/img/logoSymbol_small.svg';
    import { get } from 'svelte/store';
    import { lenis as lenisStore } from '$lib';

    type Variant = 'circle' | 'pill' | 'pill-lines';

    let { variant = 'pill', scrollTargetId = 'scroll-container', showAfter = 200 } =
        $props<{ variant?: Variant; scrollTargetId?: string; showAfter?: number }>();

    let buttonEl: HTMLButtonElement | null = null;
    let contentEl: HTMLDivElement | null = null;
    let logoEl: HTMLImageElement | null = null;
    let scrollTarget: Window | HTMLElement | null = null;
    let isShown = false;

    let isHovered = $state(false);
    let isAutoScrolling = $state(false);
    let lockExpandedUntilScrollEnd = $state(false);
    const isExpanded = $derived(isHovered || lockExpandedUntilScrollEnd);

    let scrollTween: gsap.core.Tween | null = null;
    let hoverTween: gsap.core.Tween | null = null;
    let logoHoverTween: gsap.core.Tween | null = null;

    const resolveScrollTarget = () => {
        if (typeof window === 'undefined') return null;
        const el = scrollTargetId ? document.getElementById(scrollTargetId) : null;
        return el ?? window;
    };

    const getScrollTop = (target: Window | HTMLElement) =>
        target === window ? window.scrollY : (target as HTMLElement).scrollTop;

    const setScrollTop = (target: Window | HTMLElement, value: number) => {
        if (target === window) {
            window.scrollTo({ top: value, left: 0 });
        } else {
            (target as HTMLElement).scrollTop = value;
        }
    };

    const showButton = () => {
        if (!buttonEl) return;
        buttonEl.style.pointerEvents = 'auto';
        gsap.to(buttonEl, { autoAlpha: 1, duration: 0.15, ease: 'power1.out' });
    };

    const hideButton = () => {
        if (!buttonEl) return;
        gsap.to(buttonEl, {
            autoAlpha: 0,
            duration: 0.15,
            ease: 'power1.out',
            onComplete: () => {
                if (buttonEl) buttonEl.style.pointerEvents = 'none';
            }
        });
    };

    const resetContent = () => {
        if (!contentEl) return;
        gsap.to(contentEl, { y: 0, duration: 0.12, ease: 'power2.out' });
    };

    const animateContentUp = () => {
        if (!contentEl) return;
        gsap.to(contentEl, { y: -50, duration: 0.12, ease: 'power2.out' });
    };

    const cancelScrollTween = () => {
        scrollTween?.kill();
        scrollTween = null;
        isAutoScrolling = false;
        lockExpandedUntilScrollEnd = false;
        resetContent();
    };

    const handleMouseEnter = () => {
        if (!buttonEl) return;
        isHovered = true;
        if (isAutoScrolling) lockExpandedUntilScrollEnd = true;
        const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        if (prefersReducedMotion) return;
        hoverTween?.kill();
        hoverTween = gsap.to(buttonEl, {
            keyframes: [
                { rotationZ: 4 },
                { rotationZ: -4 },
                { rotationZ: 3 },
                { rotationZ: -3 },
                { rotationZ: 0 }
            ],
            duration: 0.35,
            ease: 'sine.inOut',
            transformOrigin: '50% 50%'
        });

        if (!logoEl) return;
        logoHoverTween?.kill();
        logoHoverTween = gsap.to(logoEl, {
            keyframes: [
                { rotationZ: -8 },
                { rotationZ: 8 },
                { rotationZ: -6 },
                { rotationZ: 6 },
                { rotationZ: 0 }
            ],
            duration: 0.5,
            ease: 'sine.inOut',
            transformOrigin: '50% 50%'
        });
    };

    const handleMouseLeave = () => {
        if (!buttonEl) return;
        isHovered = false;
        hoverTween?.kill();
        hoverTween = null;
        gsap.to(buttonEl, { rotationZ: 0, duration: 0.1, ease: 'power1.out' });

        if (!logoEl) return;
        logoHoverTween?.kill();
        logoHoverTween = null;
        gsap.to(logoEl, { x: 0, rotationZ: 0, duration: 0.12, ease: 'power1.out' });
    };

    const handleClick = () => {
        if (typeof window === 'undefined') return;
        const target = scrollTarget ?? resolveScrollTarget();
        if (!target) return;

        const start = getScrollTop(target);
        if (start <= 0) return;

        cancelScrollTween();
        animateContentUp();

        isAutoScrolling = true;
        if (buttonEl?.matches?.(':hover')) lockExpandedUntilScrollEnd = true;

        const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

        const lenis = get(lenisStore);
        if (lenis && target !== window) {
            const cancelByUser = () => {
                isAutoScrolling = false;
                lockExpandedUntilScrollEnd = false;
                resetContent();
            };
            const cancelTarget: EventTarget = target;
            cancelTarget.addEventListener('wheel', cancelByUser, { passive: true } as AddEventListenerOptions);
            cancelTarget.addEventListener('touchstart', cancelByUser, { passive: true } as AddEventListenerOptions);
            cancelTarget.addEventListener('pointerdown', cancelByUser, { passive: true } as AddEventListenerOptions);
            window.addEventListener('keydown', cancelByUser);

            const cleanup = () => {
                cancelTarget.removeEventListener('wheel', cancelByUser as EventListener);
                cancelTarget.removeEventListener('touchstart', cancelByUser as EventListener);
                cancelTarget.removeEventListener('pointerdown', cancelByUser as EventListener);
                window.removeEventListener('keydown', cancelByUser as EventListener);

                isAutoScrolling = false;
                lockExpandedUntilScrollEnd = false;
                resetContent();
            };

            lenis.scrollTo(0, { immediate: !!prefersReducedMotion });

            const startedAt = window.performance.now();
            const maxMs = prefersReducedMotion ? 100 : 2500;
            const checkDone = () => {
                if (!isAutoScrolling) {
                    cleanup();
                    return;
                }
                const current = getScrollTop(target as HTMLElement);
                if (current <= 1 || window.performance.now() - startedAt > maxMs) {
                    cleanup();
                    return;
                }
                window.requestAnimationFrame(checkDone);
            };
            window.requestAnimationFrame(checkDone);
            return;
        }

        const duration = prefersReducedMotion ? 0 : 0.7;

        const state = { value: start };

        const cancelByUser = () => cancelScrollTween();
        const cancelTarget: EventTarget = target === window ? window : target;
        cancelTarget.addEventListener('wheel', cancelByUser, { passive: true } as AddEventListenerOptions);
        cancelTarget.addEventListener('touchstart', cancelByUser, { passive: true } as AddEventListenerOptions);
        cancelTarget.addEventListener('pointerdown', cancelByUser, { passive: true } as AddEventListenerOptions);
        window.addEventListener('keydown', cancelByUser);

        const cleanup = () => {
            cancelTarget.removeEventListener('wheel', cancelByUser as EventListener);
            cancelTarget.removeEventListener('touchstart', cancelByUser as EventListener);
            cancelTarget.removeEventListener('pointerdown', cancelByUser as EventListener);
            window.removeEventListener('keydown', cancelByUser as EventListener);

            isAutoScrolling = false;
            lockExpandedUntilScrollEnd = false;
            resetContent();
        };

        scrollTween = gsap.to(state, {
            value: 0,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
                setScrollTop(target, state.value);
            },
            onComplete: () => {
                scrollTween = null;
                cleanup();
            },
            onInterrupt: () => {
                scrollTween = null;
                cleanup();
            }
        });
    };

    onMount(() => {
        if (typeof window === 'undefined') return;
        scrollTarget = resolveScrollTarget();
        if (!scrollTarget || !buttonEl) return;

        gsap.set(buttonEl, { autoAlpha: 0 });
        buttonEl.style.pointerEvents = 'none';
        if (contentEl) gsap.set(contentEl, { y: 0 });

        const handleScroll = () => {
            const scrollTop = getScrollTop(scrollTarget!);
            const nextShown = scrollTop > showAfter;
            if (nextShown === isShown) return;
            isShown = nextShown;
            if (isShown) showButton();
            else hideButton();
        };

        const scrollEventTarget: EventTarget = scrollTarget === window ? window : scrollTarget;
        scrollEventTarget.addEventListener('scroll', handleScroll, { passive: true } as AddEventListenerOptions);
        handleScroll();

        return () => {
            scrollEventTarget.removeEventListener('scroll', handleScroll as EventListener);
            cancelScrollTween();
        };
    });
</script>

<button
	type="button"
    class="fixed z:999 bottom:80px right:80px z:999 w:80px h:80px r:40px overflow:hidden bg:#153F63 b:2px|solid|#fff cursor:pointer pointer-events:auto flex"
    bind:this={buttonEl}
	data-variant={variant}
    data-expanded={isExpanded}
    onclick={handleClick}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
	aria-label="Back to top"
>
    <div bind:this={contentEl} class="content w:100% h:100% flex rel">
        <span class="abs bottom:calc(24px+60px) left:50% translateX(-50%)" aria-hidden="true">
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10L12 2L22 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </span>

        <span class="abs w:60px bottom:8px left:50% translateX(-50%)" aria-hidden="true">
            <img bind:this={logoEl} src={logoSymbolSmall} class="w:100%" alt="logo symbol" />
        </span>

        <span class="lines abs bottom:-24.5px left:50% translateX(-50%) w:20px flex flex:row jc:space-between" aria-hidden="true">
            <span></span><span></span><span></span>
        </span>
    </div>
</button>

<style>
    button {
        transition: all 100ms ease-in-out;
    }

    button[data-expanded='true'] {
        height: 130px;
    }

    .content {
        transition: transform 120ms ease;
    }

    .lines span {
        width: 2px;
        height: 24px;
        border-radius: 2px;
        display: flex;
        background-color: #fff;
    }

    .lines span:not(:nth-child(2)) {
        transform: translateY(5px);
    }
</style>
