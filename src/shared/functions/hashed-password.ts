import * as bcrypt from 'bcrypt';

export function generateHash(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}