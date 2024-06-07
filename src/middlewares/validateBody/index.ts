import { Request, Response } from "express";

export const validateBody =
  (schema: any) => async (req: Request, res: Response, next: any) => {
    const validatorResult = schema.validate(req.body, {
        allowUnknown: true,
    });
    if (validatorResult.error) {
      return res
        .status(400)
        .send({ message: validatorResult.error.details[0].message });
    }
    next();
  };