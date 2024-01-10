import { mockRequest, mockResponse } from "../../../__mock__/fake-request-response";
import { fakeUser, fakeUsersArray } from "../__mock__/fake-user-model";
import { fakeUserService } from "../__mock__/fake-user-service";
import { UserController } from "./user-controller";

const userController = new UserController(fakeUserService)
const req = mockRequest()
const res = mockResponse()

describe('UserController', () => {
    describe('getAll', () => {
        it('Should return an array of users', async () => {
            await userController.getAll(req, res)
            expect(res.json).toHaveBeenCalledWith(fakeUsersArray)
        })

        it('Should return a status 200', async () => {
            await userController.getAll(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
        })

        it('Should return a status 500', async () => {
            jest.spyOn(fakeUserService, 'getAll').mockImplementationOnce(()=> Promise.reject('Users not found.'))
            await userController.getAll(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })

    describe("getByEmail", () => {
        it("get by email - success", async () => {
            req.query = { email: "user@email.com" }
            jest.spyOn(fakeUserService, "getByEmail").mockResolvedValue(fakeUser as any)
            await userController.getByEmail(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
        })

        it("get by email - error", async () => {
            req.query = { email: "user@email.com" }
            jest.spyOn(fakeUserService, "getByEmail").mockRejectedValue(new Error("Deu ruim"))
            await userController.getByEmail(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })
})