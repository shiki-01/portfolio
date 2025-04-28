import { writable, type Writable } from "svelte/store";

const pageNumber: Writable<number> = writable(1);

export { pageNumber };
