import { callAPI } from "../lib/callAPI";
import { ItemHistory } from "../types";

export const ItemHistoryService = {
  async update(data: ItemHistory) {
    return await callAPI({
      path: "/itemHistory",
      method: "PUT",
      requestData: data,
    });
  },

  async delete(id: number) {
    return await callAPI({
      path: `/itemHistory/${id}`,
      method: "DELETE",
    });
  },
};
