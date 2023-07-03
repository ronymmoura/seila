import { callAPI } from "../lib/callAPI";
import { Item } from "../types";

export const ItemsService = {
  async list() {
    return await callAPI<Item[]>({ path: "/items", method: "GET" });
  },

  async create(data: Item) {
    return await callAPI({
      path: "/items",
      method: "POST",
      requestData: data,
    });
  },

  async delete(id: number) {
    return await callAPI({
      path: `/items/${id}`,
      method: "DELETE",
    });
  },
};
