import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeusersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

// src/modules/appointments/services/ListProvidersService.spec.ts

describe('ListProviders', () => {
  beforeEach(() => {
    fakeusersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeusersRepository);
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeusersRepository.create({
      name: 'johnDoe',
      email: 'johnDoe@gmail.com',
      password: '123',
    });

    const user2 = await fakeusersRepository.create({
      name: 'johnTre',
      email: 'johnTre@gmail.com',
      password: '123',
    });

    const loggedUser = await fakeusersRepository.create({
      name: 'johnQua',
      email: 'johnQua@gmail.com',
      password: '123',
    });

    const providers = await listProviders.execute(loggedUser.id);

    expect(providers).toEqual([user1, user2]);
  });
});
