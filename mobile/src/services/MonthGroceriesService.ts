import { callAPI } from "../lib/callAPI";
import { MonthGroceries } from "../types";

export const MonthGroceriesService = {
  async list() {
    return await callAPI<MonthGroceries[]>({
      path: "/monthGroceries",
      method: "GET",
    });
  },

  async getLast() {
    return await callAPI<MonthGroceries>({
      path: "/monthGroceries/last",
      method: "GET",
    });
  },

  async create(data: MonthGroceries) {
    return await callAPI({
      path: "/monthGroceries",
      method: "POST",
      requestData: data,
    });
  },

  async delete(id: number) {
    return await callAPI({
      path: `/monthGroceries/${id}`,
      method: "DELETE",
    });
  },
};
