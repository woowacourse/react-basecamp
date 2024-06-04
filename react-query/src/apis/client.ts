export const apiClient = {
  async post<T>(URL: string, data: object) {
    const requestInit = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
    return (await apiClient.__fetch<T>(URL, requestInit)).json();
  },
  async get<T>(URL: string) {
    return (await apiClient.__fetch<T>(URL)).json();
  },
  async delete<T>(URL: string) {
    const requestInit: RequestInit = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    return await apiClient.__fetch(URL, requestInit);
  },

  async __fetch<T>(URL: string, requestInit: RequestInit = { method: "GET" }): Promise<Response> {
    try {
      await fetch(URL, requestInit);
    } catch (error) {
      console.log("에러발생", URL, requestInit.method);
      if (error instanceof Error) {
        console.log("에러메시지:", error.message);
      }
    }
    const response = await fetch(URL, requestInit);
    if (!response.ok) {
      throw new Error("200~299이외의 응답이 발생했습니다.");
    }

    return response;
  },
};
