import { appConfig } from "@/lib/config";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<TResponse>(path: string, init: RequestInit = {}): Promise<TResponse> {
  if (!appConfig.apiUrl) {
    throw new ApiError("No API base URL configured. Set EXPO_PUBLIC_API_URL to enable requests.");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), appConfig.requestTimeoutMs);

  try {
    const response = await fetch(`${appConfig.apiUrl}${path}`, {
      ...init,
      signal: controller.signal,
      headers: { "Content-Type": "application/json", ...init.headers },
    });

    if (!response.ok) {
      throw new ApiError(`Request failed with ${response.status}`, response.status);
    }

    return (await response.json()) as TResponse;
  } finally {
    clearTimeout(timeout);
  }
}

export const api = {
  get: <TResponse>(path: string) => request<TResponse>(path),
  post: <TResponse, TBody extends object>(path: string, body: TBody) =>
    request<TResponse>(path, { method: "POST", body: JSON.stringify(body) }),
};
