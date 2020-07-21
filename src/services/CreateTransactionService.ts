import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transactioData: Omit<Transaction, 'id'>): Transaction {
    if (transactioData.type !== 'income' && transactioData.type !== 'outcome') {
      throw new Error('This is not a valid type!');
    } else if (transactioData.type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (transactioData.value > balance.total) {
        throw new Error('This is not a valid value!');
      }
    }

    const transaction = this.transactionsRepository.create(transactioData);
    return transaction;
  }
}

export default CreateTransactionService;
