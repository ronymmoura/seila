export interface Category {
  id?: string;
  name?: string;
  icon?: string;
}

export interface MonthGroceries {
  id?: string;
  month?: Date;
  total?: number;

  itemHistory?: ItemHistory[];
}

export interface ItemHistory {
  id?: string;
  value?: number;
  quantity?: number;
  brand?: string;

  item?: Item;

  monthGroceriesId?: string;
  itemId?: string;
}

export interface Item {
  id?: string;
  name?: string;
  categoryId?: string;
  monthGroceriesId?: string;

  itemHistory?: ItemHistory[];
}
