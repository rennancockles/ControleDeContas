import { GetUserById } from '@/data/usecases'
import { GetUserByIdRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: GetUserById
  getUserByIdRepositorySpy: GetUserByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const getUserByIdRepositorySpy = new GetUserByIdRepositorySpy()
  const sut = new GetUserById(getUserByIdRepositorySpy)

  return {
    sut,
    getUserByIdRepositorySpy
  }
}

let id: string

describe('GetUserById Usecase', () => {
  beforeEach(() => {
    id = faker.random.uuid()
  })

  it('Should call GetUserByIdRepository with correct id', async () => {
    const { sut, getUserByIdRepositorySpy } = makeSut()

    await sut.execute(id)

    expect(getUserByIdRepositorySpy.id).toBe(id)
  })

  it('Should throw if GetUserByIdRepository throws', async () => {
    const { sut, getUserByIdRepositorySpy } = makeSut()
    jest.spyOn(getUserByIdRepositorySpy, 'getById').mockImplementationOnce(throwError)

    const promise = sut.execute(id)

    await expect(promise).rejects.toThrow()
  })

  it('Should return null if GetUserByIdRepository returns null', async () => {
    const { sut, getUserByIdRepositorySpy } = makeSut()
    getUserByIdRepositorySpy.result = null

    const user = await sut.execute(id)

    expect(user).toBeNull()
  })

  it('Should return an user on success', async () => {
    const { sut, getUserByIdRepositorySpy } = makeSut()

    const user = await sut.execute(id)

    expect(user).toEqual(getUserByIdRepositorySpy.result)
  })
})
