import { Container } from 'inversify';

import { CreateTransactionUseCase, GetAllTransactionsUseCase, GetTransactionUseCase, ICreateTransactionUseCase, IGetAllTransactionsUseCase, IGetTransactionUseCase } from '@src/modules/transaction/use-cases';
import { CreateUserUseCase, DeleteUserUseCase, GetAllUsersUseCase, GetUserUseCase, ICreateUserUseCase, IDeleteUserUseCase, IGetAllUsersUseCase, IGetUserUseCase, IUpdateUserUseCase, UpdateUserUseCase } from '@src/modules/user/use-cases';

import {
  ITransactionRepository,
  IUserRepository,
  TransactionRepository,
  UserRepository,
} from '@core/db/repositories';
import Types from '@core/types';

import {
  TransactionController,
  UserController,
} from '@modules';

const container: Container = new Container();

// Repositories
container
  .bind<IUserRepository>(Types.UserRepository)
  .to(UserRepository);
container
  .bind<ITransactionRepository>(Types.TransactionRepository)
  .to(TransactionRepository);

// User UseCases
container
  .bind<ICreateUserUseCase>(Types.CreateUserUseCase)
  .to(CreateUserUseCase);
container
  .bind<IUpdateUserUseCase>(Types.UpdateUserUseCase)
  .to(UpdateUserUseCase);
container
  .bind<IGetUserUseCase>(Types.GetUserUseCase)
  .to(GetUserUseCase);
container
  .bind<IGetAllUsersUseCase>(Types.GetAllUsersUseCase)
  .to(GetAllUsersUseCase);
container
  .bind<IDeleteUserUseCase>(Types.DeleteUserUseCase)
  .to(DeleteUserUseCase);

// User UseCases
container
  .bind<ICreateTransactionUseCase>(Types.CreateTransactionUseCase)
  .to(CreateTransactionUseCase);
container
  .bind<IGetTransactionUseCase>(Types.GetTransactionUseCase)
  .to(GetTransactionUseCase);
container
  .bind<IGetAllTransactionsUseCase>(Types.GetAllTransactionsUseCase)
  .to(GetAllTransactionsUseCase);

// Controllers
container
  .bind(UserController)
  .toSelf();

container
  .bind(TransactionController)
  .toSelf();

export { container };