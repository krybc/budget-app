import {Category} from './categories.models';
import {CategoryApiModel} from '@api';

const createTree = (categories: Category[]) => {
  return categories
    .map(it => ({...it}))
    .filter(it => it.parent === null)
    .map(it => {
      it.children = categories.filter(cat => cat.parent && cat.parent.id === it.id);
      return it;
    });
};

const getCategoryFromTree = (categories: Category[], id: number) => {
  let found: Category = null;
  for (const item of categories) {
    if (item.id === id) {
      found = item;
      break;
    }

    if (item.children && item.children.length > 0) {
      const foundInChildren = getCategoryFromTree(item.children, id);
      if (foundInChildren) {
        found = foundInChildren;
      }
    }
  }

  return found;
};

const createFromApiResponse = (category: CategoryApiModel, categories?: Category[]): Category => ({
  id: category.id,
  name: category.name,
  parent: category.parentId ? categories.find(it => it.id === category.id) : null,
  type: category.type,
  sequence: category.sequence
});

const createFromApiListResponse = (categories: CategoryApiModel[]): Category[] => {
  const result = [];

  for (const category of categories) {
    result.push({
      id: category.id,
      name: category.name,
      parent: category.parentId,
      type: category.type,
      sequence: category.sequence
    });
  }

  // set parent
  result.forEach(item => {
    item.parent = item.parent ? result.find(it => it.id === item.parent) : null;
  });

  return result;
};

const createToApiRequest = (category: Category): CategoryApiModel => {
  return {
    ...category,
    parentId: category.parent.id,
  };
};

export const CategoriesFactories = {
  createTree,
  getCategoryFromTree,
  createFromApiListResponse,
  createFromApiResponse,
  createToApiRequest,
};
