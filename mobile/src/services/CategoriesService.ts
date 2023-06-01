import { callAPI } from "../lib/callAPI";
import { Category } from "../types";

export const CategoriesService = {
  async list() {
    return await callAPI<Category[]>({ path: "/categories", method: "GET" });
  },
};
