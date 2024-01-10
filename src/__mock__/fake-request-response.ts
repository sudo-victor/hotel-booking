import { Request, Response } from "express"

export const mockRequest = () => {
    const req = {} as Request
    req.body = jest.fn().mockReturnValue(req) as unknown as Request['body']
    req.params = jest.fn().mockReturnValue(req) as unknown as Request['params']
    req.query = jest.fn().mockReturnValue(req) as unknown as Request['query']
    req.headers = jest.fn().mockReturnValue(req) as unknown as Request['headers']
    return req
}

export const mockResponse = () => {
    const res = {} as Response
    res.status = jest.fn().mockReturnValue(res) as unknown as Response['status']
    res.json = jest.fn().mockReturnValue(res) as unknown as Response['json']
    return res
}

//mockReturnValue => mocka um retorno
//mockResolvedValue => mocka uma promessa resolvida
//mockRejectedValue => mocka uma promessa rejeitada
//mockImplementation => mocka a função por inteiro