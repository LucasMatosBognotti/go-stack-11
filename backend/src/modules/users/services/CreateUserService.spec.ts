import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProviser/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

import AppError from '../../../shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

// src/modules/users/services/CreateUserService.spec.ts

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create  a new user', async () => {
    const user = await createUser.executer({
      name: 'johnDoe',
      email: 'johnDoe@gmail.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user a new user with the existing email', async () => {
    await createUser.executer({
      name: 'johnDoe',
      email: 'johnDoe@gmail.com',
      password: '123',
    });

    await expect(
      createUser.executer({
        name: 'johnDoe',
        email: 'johnDoe@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
