import { fakeUser, fakeUserModel, fakeUsersArray } from "../__mock__/fake-user-model";
import { User } from "../model/user-model";
import { UserRepository } from "./user-repository";

const userRepository = new UserRepository(fakeUserModel)

describe('UserRepository', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('getAll', () => {
        it('Should return a array of users', async () => {
            const users = await userRepository.getAll()
            expect(users).toEqual(fakeUsersArray)
        })

        it('Should call the find method from the user model', async () => {
            await userRepository.getAll()
            expect(fakeUserModel.find).toHaveBeenCalled()
        })
    })

    describe('getByEmail', () => {
        it('Should return a user with the same email passed as argument', async () => {
            const user = await userRepository.getByEmail(fakeUser.email)
            expect(user).toEqual(fakeUser)
        })
    })

    describe('getById', () => {
        it("should be able to return an user by id", async () => {
            const userId = "659df16bd27dcb1d2c5cd87f"
            jest.spyOn(fakeUserModel, "findOne").mockResolvedValueOnce(fakeUser)
            const result = await userRepository.getById(userId) as User
            expect(result.name).toEqual("Lucas")
        })

        it("should not be able to return an user by id with an invalid id", async () => {
            const invalidUserId = "1234"
            const resultCallbackWithError = () => userRepository.getById(invalidUserId)
            expect(resultCallbackWithError).rejects.toThrow("Id 1234 is not valid.")
        })

        it("should not be able to return an user by id if user not found", async () => {
            const userId = "659df16bd27dcb1d2c5cd87f"
            jest.spyOn(fakeUserModel, "findOne").mockResolvedValueOnce(null)
            const resultCallbackWithError = () => userRepository.getById(userId)
            expect(resultCallbackWithError).rejects.toThrow("User not found")
        })
    })
})