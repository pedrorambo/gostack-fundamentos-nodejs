import Transaction from '../models/Transaction';

export interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    let income = 0;
    let outcome = 0;

    const getValuesReducer = (
      accumulator: number,
      { type, value }: Transaction,
    ): number => {
      if (type === 'income') {
        income += value;
        return accumulator + value;
      }
      if (type === 'outcome') {
        outcome += value;
        return accumulator - value;
      }
      return accumulator;
    };

    const total = this.transactions.reduce(getValuesReducer, 0);

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
