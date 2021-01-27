import { IEncrypter, IDecrypter } from '@/data/protocols'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (
    private readonly secret: string,
    private readonly expirationTime: string
  ) {}

  async encrypt (plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret, { expiresIn: this.expirationTime })
  }

  async decrypt (ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any
  }
}
