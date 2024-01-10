import { Model } from "mongoose"
import { User, UserModel } from "../model/user-model"

export const fakeUserModel = {
    find: jest.fn().mockImplementationOnce(() => fakeUsersArray),
    findOne: jest.fn().mockImplementationOnce(() => fakeUser),
    create: jest.fn().mockImplementationOnce(() => fakeUser),
    findByIdAndUpdate: jest.fn().mockImplementationOnce(() => fakeUser)
} as unknown as Model<User>

export const fakeUsersArray = [
    {id: '1', name: 'Lucas', email: 'lucas@arnia.com', password: 'admin', reservations: [], deletedAt: null},
    {id: '2', name: 'Victor', email: 'victor@arnia.com', password: 'admin2',reservations: [], deletedAt: null},
    {id: '3', name: 'Alberto', email: 'alberto@arnia.com', password: 'admin3',reservations: [], deletedAt: null}
]

export const fakeUser = fakeUsersArray[0]