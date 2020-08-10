import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProviser/fakes/FakeHashProvider';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

import AppError from '../../../shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

// src/modules/users/services/AuthenticateUserService.spec.ts

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.executer({
      name: 'johnDoe',
      email: 'johnDoe@gmail.com',
      password: '123',
    });

    const authentication = await authenticateUser.exacute({
      email: user.email,
      password: user.password,
    });

    expect(authentication).toHaveProperty('token');
    expect(authentication.user).toEqual(user);
  });

  it('should not be able to authenticate with non exiting user', async () => {
    await expect(
      authenticateUser.exacute({
        email: 'johnDoe@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password ', async () => {
    const user = await createUser.executer({
      name: 'johnDoe',
      email: 'johnDoe@gmail.com',
      password: '123',
    });

    await expect(
      authenticateUser.exacute({
        email: user.email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
