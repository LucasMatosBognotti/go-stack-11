import { hash, compare } from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generateHah(payload: string): Promise<string> {
    const hashed = await hash(payload, 10);

    return hashed;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const passwordMatched = await compare(payload, hashed);

    return passwordMatched;
  }
}

export default BCryptHashProvider;
