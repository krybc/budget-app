import {TransactionApiModel} from '@api';
import {Account} from '@accounts-data-access';
import {Category} from '@categories-data-access';
import {Contractor} from '@contractors-data-access';

import {Transaction} from './transactions.models';

export const createFromApiListResponse = (transactions: TransactionApiModel[], accounts: Account[], categories: Category[], contractors: Contractor[]): Transaction[] => {
  return transactions.map(item => {
    return {
      ...item,
      account: accounts.find(it => it.id === item.accountId),
      category: categories.find(it => it.id === item.categoryId),
      contractor: contractors.find(it => it.id === item.contractorId),
    };
  });
};

export const createFromApiResponse = (transaction: TransactionApiModel, accounts: Account[], categories: Category[], contractors: Contractor[]): Transaction => {
  return {
    ...transaction,
    account: accounts.find(it => it.id === transaction.accountId),
    category: categories.find(it => it.id === transaction.categoryId),
    contractor: contractors.find(it => it.id === transaction.contractorId),
  };
};

export const createToApiRequest = (transaction: Transaction): TransactionApiModel => {
  return {
    ...transaction,
    accountId: transaction.account.id,
    categoryId: transaction.category.id,
    contractorId: transaction.contractor.id
  };
};

export const TransactionsFactories = {
  createFromApiListResponse,
  createFromApiResponse,
  createToApiRequest
};
