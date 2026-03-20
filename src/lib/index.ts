import { writable, type Writable } from 'svelte/store';
import type Lenis from 'lenis';

const pageNumber: Writable<number> = writable(2);
const lenis: Writable<Lenis | null> = writable(null);

export { pageNumber, lenis };
