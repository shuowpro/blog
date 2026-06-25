/// <reference types="astro/client" />

import type { AstroIntegration } from "@swup/astro";

declare global {
  interface PagefindResultData {
    url: string;
    excerpt: string;
    meta: {
      title: string;
    };
  }

  interface PagefindSearchResult {
    data: () => Promise<PagefindResultData>;
  }

  interface PagefindSearchResponse {
    results: PagefindSearchResult[];
  }

  interface Pagefind {
    init: () => void;
    options: (options: { excerptLength: number }) => Promise<void> | void;
    search: (keyword: string) => Promise<PagefindSearchResponse>;
  }

  interface Window {
    pagefind?: Pagefind;
    swup?: AstroIntegration;
  }
}
