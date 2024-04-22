import { Container } from 'inversify';

import { CreatePayableUseCase, GetAllPayablesUseCase, GetPayableUseCase, ICreatePayableUseCase, IGetAllPayablesUseCase, IGetPayableUseCase } from '@src/modules/payable/use-cases';
import { CreateTransactionUseCase, GetAllTransactionsUseCase, GetTransactionUseCase, ICreateTransactionUseCase, IGetAllTransactionsUseCase, IGetTransactionUseCase } from '@src/modules/transaction/use-cases';
import { CreateUserUseCase, DeleteUserUseCase, GetAllUsersUseCase, GetUserUseCase, ICreateUserUseCase, IDeleteUserUseCase, IGetAllUsersUseCase, IGetUserUseCase, IUpdateUserUseCase, UpdateUserUseCase } from '@src/modules/user/use-cases';

import {
  IPayableRepository,
  ITransactionRepository,
  IUserRepository,
  PayableRepository,
  TransactionRepository,
  UserRepository,
} from '@core/db/repositories';
import Types from '@core/types';

import {
  PayableController,
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
container
  .bind<IPayableRepository>(Types.PayableRepository)
  .to(PayableRepository);

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

// Transaction UseCases
container
  .bind<ICreateTransactionUseCase>(Types.CreateTransactionUseCase)
  .to(CreateTransactionUseCase);
container
  .bind<IGetTransactionUseCase>(Types.GetTransactionUseCase)
  .to(GetTransactionUseCase);
container
  .bind<IGetAllTransactionsUseCase>(Types.GetAllTransactionsUseCase)
  .to(GetAllTransactionsUseCase);

// Payable UseCases
container
  .bind<ICreatePayableUseCase>(Types.CreatePayableUseCase)
  .to(CreatePayableUseCase);
container
  .bind<IGetPayableUseCase>(Types.GetPayableUseCase)
  .to(GetPayableUseCase);
container
  .bind<IGetAllPayablesUseCase>(Types.GetAllPayablesUseCase)
  .to(GetAllPayablesUseCase);

// Controllers
container
  .bind(UserController)
  .toSelf();

container
  .bind(TransactionController)
  .toSelf();

container
  .bind(PayableController)
  .toSelf();

export { container };