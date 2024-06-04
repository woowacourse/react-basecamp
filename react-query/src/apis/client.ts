export const apiClient = {
  async __fetch<T>(URL: string, requestInit: RequestInit = { method: "GET" }): Promise<T> {
    const response = await fetch(URL, requestInit);
    if (!response.ok) {
      throw new Error("200~299이외의 응답이 발생했습니다.");
    }
    return response.json();
  },
};
