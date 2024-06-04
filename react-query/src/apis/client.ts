export const apiClient = {
  async post<T>(URL: string, data: object) {
    const requestInit = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
    return await apiClient.__fetch<T>(URL, requestInit);
  },
  async get<T>(URL: string) {
    return await apiClient.__fetch<T>(URL);
  },
  async delete<T>(URL: string) {
    const requestInit = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    return await apiClient.__fetch<T>(URL, requestInit);
  },

  async __fetch<T>(URL: string, requestInit: RequestInit = { method: "GET" }): Promise<T> {
    const response = await fetch(URL, requestInit);
    if (!response.ok) {
      throw new Error("200~299이외의 응답이 발생했습니다.");
    }

    return response.json();
  },
};
