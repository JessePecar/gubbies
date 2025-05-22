import { scrypt } from 'crypto';
import { promisify } from 'util';

import * as bcrypt from 'bcrypt';
export class AuthUtil {
  private readonly algorithm = 'aes-256-cbc';

  private readonly passKey = process.env.ENCRYPT_KEY ?? '';

  private async getEncryptionKey() {
    return (await promisify(scrypt)(this.passKey, 'salt', 32)) as Buffer;
  }

  async hashPassword(password: string) {
    var hash = await bcrypt.hash(password, this.passKey);
    return hash;
  }

  async isPasswordMatched(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
