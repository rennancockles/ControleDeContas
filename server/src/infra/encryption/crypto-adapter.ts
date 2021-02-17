import { IEncrypter, IDecrypter } from '@/data/protocols'

import crypto from 'crypto'

export class CryptoAdapter implements IEncrypter, IDecrypter {
  constructor (
    private readonly algorithm: string,
    private readonly key: string,
    private readonly iv: string
  ) {}

  async encrypt (plaintext: string): Promise<string> {
    if (!plaintext) return ''

    const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.key, 'hex'), Buffer.from(this.iv, 'hex'))
    let encrypted = cipher.update(plaintext)
    encrypted = Buffer.concat([encrypted, cipher.final()])

    return encrypted.toString('hex')
  }

  async decrypt (ciphertext: string): Promise<string> {
    if (!ciphertext) return ''

    const encryptedText = Buffer.from(ciphertext, 'hex')
    const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.key, 'hex'), Buffer.from(this.iv, 'hex'))
    let decrypted = decipher.update(encryptedText)
    decrypted = Buffer.concat([decrypted, decipher.final()])

    return decrypted.toString()
  }
}
