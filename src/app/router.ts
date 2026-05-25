export function getRouterBasename(baseUrl: string) {
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");

  return normalizedBaseUrl || undefined;
}

export const routerBasename = getRouterBasename(import.meta.env.BASE_URL);
