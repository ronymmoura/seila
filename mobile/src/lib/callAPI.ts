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
  try {
    // const token = localStorage.getItem("token");

    const response = await axios({
      baseURL: "https://seila-ronymmoura.vercel.app/api",
      // baseURL: "http://192.168.15.2:3000/api",
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
  } catch (e) {
    console.log(e.response ? e.response.data : e);
    throw e;
  }
}
