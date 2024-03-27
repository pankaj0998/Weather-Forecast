import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validationMiddleware<T>(type: any): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction) => {
        const dtoObject = plainToInstance(type, req.body);
        validate(dtoObject).then(errors => {
            if (errors.length > 0) {
                const validationErrors = errors.map(error => Object.values(error.constraints)).flat();
                res.status(400).json({ errors: validationErrors });
            } else {
                next();
            }
        });
    };
}
