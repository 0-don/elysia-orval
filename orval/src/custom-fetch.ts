const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return c.json();
  }

  // Return blob for binary content (anything that's not text-based)
  if (
    contentType &&
    !contentType.startsWith("text/") &&
    !contentType.includes("json") &&
    !contentType.includes("xml")
  ) {
    return c.blob() as Promise<T>;
  }

  return c.text() as Promise<T>;
};

const getUrl = (contextUrl: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const url = new URL(baseUrl + contextUrl);
  const pathname = url.pathname;
  const search = url.search;

  const requestUrl = new URL(`${baseUrl}${pathname}${search}`);

  return requestUrl.toString();
};

const getHeaders = (headers?: HeadersInit): HeadersInit => {
  const normalizedHeaders: Record<string, string> = headers
    ? { ...(headers as Record<string, string>) }
    : {};

  // const token = getToken();

  // if (token && !normalizedHeaders["Authorization"]) {
  //   normalizedHeaders["Authorization"] = `Bearer ${token}`;
  // }

  return normalizedHeaders;
};

export const customFetch = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const requestUrl = getUrl(url);

  const requestHeaders = getHeaders(options.headers);

  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders,
    credentials: "include",
  };

  const response = await fetch(requestUrl, requestInit);
  if (!response.ok) {
    const errorText = await response.json();
    throw errorText;
  }
  const data = await getBody<T>(response);

  return { status: response.status, data, headers: response.headers } as T;
};
