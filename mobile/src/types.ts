export interface Category {
  id?: string;
  name?: string;
  icon?: string;
}

export interface MonthGroceries {
  id?: string;
  month?: Date;
}

export interface ItemHistory {
  id?: string;
  value?: number;
  quantity?: number;
  brand?: string;

  monthGroceriesId?: string;
  itemId?: string;
}

export interface Item {
  id?: string;
  name?: string;
  categoryId?: string;
  monthGroceriesId?: string;

  ItemHistory?: ItemHistory[];
}
