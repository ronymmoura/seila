import axios from "axios";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function callAPI<T>({
  path,
  method = "GET",
  requestData = null,
  multipartFormData = null,
}: {
  path: string;
  method?: HttpMethod;
  requestData?: any;
  multipartFormData?: boolean;
}) {
  // const token = localStorage.getItem("token");

  const response = await axios({
    baseURL: "https://seila-ronymmoura.vercel.app/api",
    method,
    url: path,
    headers: {
      // Authorization: token && `Bearer ${token}`,
      "Content-Type": multipartFormData
        ? "multipart/form-data"
        : "application/json",
    },
    [method === "GET" ? "params" : "data"]: requestData,
  });

  return response.data as T;
}
