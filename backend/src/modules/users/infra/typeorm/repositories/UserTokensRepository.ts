import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '../../../repositories/IUserTokensRepository';

import UserToken from '../entities/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepositoty: Repository<UserToken>;

  constructor() {
    this.ormRepositoty = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepositoty.create({
      user_id,
    });

    await this.ormRepositoty.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepositoty.findOne({
      where: { token },
    });

    return userToken;
  }
}

export default UserTokensRepository;
