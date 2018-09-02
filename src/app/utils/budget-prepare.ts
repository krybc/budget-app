export class BudgetPrepare {
  categoryList: any[];
  transactionList: any[];

  constructor(
    categoryList?: any[],
    transactionList?: any[]
  ) {
    this.categoryList = categoryList;
    this.transactionList = transactionList;
  }

  run(): any {
    const budget = [];
    const budgetSummary = {
      name: 'Summary',
      income: 0.00,
      expense: 0.00
    };

    this.categoryList.forEach((group) => {
      group.income = 0;
      group.expense = 0;
      budget.push(group);

      group.categories.forEach((category) => {
        category.income = 0;
        category.expense = 0;

        this.transactionList.filter(transaction => transaction.category._id.toString() === category._id.toString()).forEach((transaction) => {
          if (transaction.income > 0) {
            category.income += transaction.income;
            group.income += transaction.income;
          }

          if (transaction.expense > 0) {
            category.expense += transaction.expense;
            group.expense += transaction.expense;
          }
        });

        budget.push(category);
      });

      budgetSummary.income += group.income;
      budgetSummary.expense += group.expense;
    });

    budget.push(budgetSummary);

    return {budget};
  }
}
