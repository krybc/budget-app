export type CategoryType = {
  Income: 0;
  Expense: 1;
};

export interface CategoryApiModel {
  id?: number;
  parentId: number;
  name: string;
  type: CategoryType;
  sequence: number;
}
