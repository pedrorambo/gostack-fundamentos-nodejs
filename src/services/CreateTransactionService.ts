import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransactionDTO): Transaction {
    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();
      if (total - value <= 0) {
        throw new Error(
          "You don't have enough balances to make this transaction",
        );
      }
    }

    const createdTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return createdTransaction;
  }
}

export default CreateTransactionService;
