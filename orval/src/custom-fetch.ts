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

export const customFetch = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const requestUrl = "http://localhost:3000";
  
  const requestInit: RequestInit = {
    ...options,
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
