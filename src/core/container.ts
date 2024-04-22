import { Container } from 'inversify';

import { CreateUserUseCase, DeleteUserUseCase, GetAllUsersUseCase, GetUserUseCase, ICreateUserUseCase, IDeleteUserUseCase, IGetAllUsersUseCase, IGetUserUseCase, IUpdateUserUseCase, UpdateUserUseCase } from '@src/modules/user/use-cases';

import {
  ITransactionRepository,
  IUserRepository,
  TransactionRepository,
  UserRepository,
} from '@core/db/repositories';
import Types from '@core/types';

import {
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

// Controllers
container
  .bind(UserController)
  .toSelf();

export { container };