// src/lib/services/microcms.ts
import { createClient, type MicroCMSQueries } from "microcms-js-sdk";
import blogsDetail from "$lib/assets/mocks/blogs-detail.json";
import blogsList from "$lib/assets/mocks/blogs-list.json";
import type { EndPoints } from "$lib/types/microcms";

const MICROCMS_SERVICE_DOMAIN = import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN;
const MICROCMS_API_KEY = import.meta.env.VITE_MICROCMS_API_KEY;

export const microcms = createClient({
  serviceDomain: MICROCMS_SERVICE_DOMAIN,
  apiKey: MICROCMS_API_KEY,
});

export async function getContentList<T extends keyof EndPoints["gets"]>(
  key: T,
  queries: MicroCMSQueries = {},
): Promise<EndPoints["gets"][T]> {
  if (import.meta.env.MODE === "development") {
    console.log(import.meta.env.VITE_MICROCMS_API_KEY);
    switch (key) {
      case "blogs":
        return blogsList as never;
      default:
        throw new Error("Invalid key");
    }
  }

  return microcms.get({
    endpoint: key,
    queries,
  });
}

export async function getContentDetail<T extends keyof EndPoints["get"]>(
  key: T,
  id: string,
  queries: MicroCMSQueries = {},
): Promise<EndPoints["get"][T]> {
  if (import.meta.env.MODE === "development") {
    switch (key) {
      case "blogs":
        return blogsDetail as never;
      default:
        throw new Error("Invalid key");
    }
  }
  return microcms.getListDetail<EndPoints["get"][T]>({
    endpoint: key,
    contentId: id,
    queries,
  });
}