import { container } from 'tsyringe';

import IHashProvider from './HashProviser/models/IHashProvider';
import BCryptHashProvider from './HashProviser/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
