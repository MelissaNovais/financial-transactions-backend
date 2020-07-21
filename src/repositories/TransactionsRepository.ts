import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income: number = this.transactions.reduce(
      (acc, current: Transaction) => {
        if (current.type === 'income') {
          return acc + current.value;
        }
        return acc;
      },
      0,
    );

    const outcome: number = this.transactions.reduce(
      (acc, current: Transaction) => {
        if (current.type === 'outcome') {
          return acc + current.value;
        }
        return acc;
      },
      0,
    );

    const balance: Balance = { income, outcome, total: income - outcome };
    return balance;
  }

  public create(transactionData: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction(transactionData);
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
