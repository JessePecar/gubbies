import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

export class AuthUtil {
  private readonly algorithm = 'aes-256-cbc';

  private readonly iv = randomBytes(16);
  private readonly passKey = process.env.ENCRYPT_KEY ?? '';

  private async getEncryptionKey() {
    return (await promisify(scrypt)(this.passKey, 'salt', 32)) as Buffer;
  }

  async encryptPassword(password: string) {
    const key = await this.getEncryptionKey();
    const cipher = createCipheriv(this.algorithm, key, this.iv);
    let encrypted = cipher.update(password, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  // This is only here in case I need it, but will almost never be used
  async decryptPassword(encryptedPassword: string) {
    const key = await this.getEncryptionKey();

    const decipher = createDecipheriv(this.algorithm, key, this.iv);
    let decrypted = decipher.update(encryptedPassword, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
  }
}
