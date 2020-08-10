import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProviser/fakes/FakeHashProvider';

import UpdateProfileService from './UpdateProfileService';

import AppError from '../../../shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

// src/modules/users/services/UpdateProfileService.spec.ts

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  // deve poder

  it('should not be able to update user that does not exist', async () => {
    await expect(
      updateProfile.execute({
        user_id: '123',
        name: 'John Doe',
        email: 'test@test.com',
        old_password: '123456',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'johnDoe',
      email: 'johnDoe@gmail.com',
      password: '123',
    });

    const update = await updateProfile.execute({
      user_id: user.id,
      name: 'johnTre',
      email: 'johnTre@gmail.com',
    });

    expect(update.name).toBe('johnTre');
    expect(update.email).toBe('johnTre@gmail.com');
  });

  it('should not be able to update the user with the email that already exists', async () => {
    await fakeUsersRepository.create({
      name: 'johnDoe',
      email: 'johnDoe@gmail.com',
      password: '123',
    });

    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@gmail.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'johnDoe',
        email: 'johnDoe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'johnDoe',
      email: 'johnDoe@gmail.com',
      password: '123',
    });

    const update = await updateProfile.execute({
      user_id: user.id,
      name: 'johnTre',
      email: 'johnTre@gmail.com',
      old_password: '123',
      password: '123456',
    });

    expect(update.password).toBe('123456');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'johnDoe',
      email: 'johnDoe@gmail.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'johnTre',
        email: 'johnTre@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'johnDoe',
      email: 'johnDoe@gmail.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'johnTre',
        email: 'johnTre@gmail.com',
        old_password: 'wrong-old-password',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
