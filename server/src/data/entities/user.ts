import { UserModel } from '@/domain/models'

export class User implements UserModel {
  id: string
  name: string
  lastname: string
  email: string
  password: string

  constructor (userModel: UserModel) {
    Object.assign(this, userModel)
  }

  get fullname (): string {
    let name: string = ''
    let lastname: string = ''

    if (this.name) {
      name = `${this.name.charAt(0).toUpperCase()}${this.name.toLowerCase().slice(1)}`
    }
    if (this.lastname) {
      lastname = `${this.lastname.charAt(0).toUpperCase()}${this.lastname.toLowerCase().slice(1)}`
    }

    return `${name} ${lastname}`
  }
}
