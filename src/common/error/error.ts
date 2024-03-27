import { Request, Response } from "express";


export class CustomError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export function errorHandler(err: CustomError, req: Request, res: Response, nex: any) {
    if (!err.status) {
        err.status = 500;
    }

    res.status(err.status).json({ status: err.status, error: err.message });
}