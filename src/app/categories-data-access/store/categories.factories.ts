import {Category} from './categories.models';

const createTree = (categories: Category[]) => {
  return categories
    .map(it => ({...it}))
    .filter(it => it.parentId === null)
    .map(it => {
      it.children = categories.filter(cat => cat.parentId === it.id);
      return it;
    });
};

export const categoriesFactories = {
  createTree,
};
