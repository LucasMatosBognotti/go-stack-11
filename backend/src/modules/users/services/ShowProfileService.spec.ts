import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

import AppError from '../../../shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

// src/modules/users/services/ShowProfileService.spec.ts

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'johnDoe',
      email: 'johnDoe@gmail.com',
      password: '123',
    });

    const showProfile = await showProfileService.execute(user.id);

    expect(showProfile.name).toBe('johnDoe');
    expect(showProfile.email).toBe('johnDoe@gmail.com');
  });

  it('should not be able show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute('non-existing'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
