import { getRepository, Repository } from 'typeorm';

import { CreateUserDTO } from '@src/modules/user/dtos';

import { UserEntity } from '@core/db/entities';

import { RoleType } from '@shared/enumerators';
import { logInfo } from '@shared/logging/console';

export async function seedsDatabase (): Promise<void> {
  const userSeedData: CreateUserDTO = {
    name: 'Sheldon Cooper',
    email: 'sheldon-cooper@bozeman-montana.com',
    password: 'L0rd1SBoz3',
    document: '87629120036',
    phone: '',
    role: RoleType.ADMINISTRATOR,
  };

  const userRepository: Repository<UserEntity> = getRepository(UserEntity);

  const exists = await userRepository.findOne({
    where: {
      email: userSeedData.email,
    },
  });

  if (!exists) {
    await userRepository.save(userSeedData);
  }

  logInfo('💽 Database seeds created successfully!');
}