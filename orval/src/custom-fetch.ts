const getBody = <T>(response: Response | Request): Promise<T> => {
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return response.json();
  }

  if (
    contentType &&
    !contentType.startsWith("text/") &&
    !contentType.includes("json") &&
    !contentType.includes("xml")
  ) {
    return response.blob() as Promise<T>;
  }

  return response.text() as Promise<T>;
};

const getUrl = (contextUrl: string): string => {
  const baseUrl = "http://localhost:3000";
  return new URL(contextUrl, baseUrl).toString();
};

export const customFetch = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const response = await fetch(getUrl(url), {
    ...options,
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  const data = await getBody<T>(response);
  return { status: response.status, data, headers: response.headers } as T;
};
