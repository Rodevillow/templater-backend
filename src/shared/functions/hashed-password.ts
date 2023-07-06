import {hash} from 'bcryptjs'


export function generateHash(password: string): Promise<string> {
  return hash(password, 10);
}
