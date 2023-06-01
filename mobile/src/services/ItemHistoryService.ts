import { callAPI } from "../lib/callAPI";
import { ItemHistory } from "../types";

export const ItemHistoryService = {
  async create(data: ItemHistory) {
    return await callAPI({
      path: "/itemHistory",
      method: "POST",
      requestData: data,
    });
  },
};
