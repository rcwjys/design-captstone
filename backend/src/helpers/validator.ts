import { NextFunction, Request, Response } from "express";
import zod, { ZodSchema } from "zod";
import { BadRequestError } from "../core/ApiError";

export enum ValidationSource {
  BODY = "body",
  HEADER = "headers",
  QUERY = "query",
  PARAM = "params",
}

export const schemaValidator = async <T>(
  schema: ZodSchema,
  data: T
): Promise<T> => {
  return await schema.parseAsync(data);
};

export default (
    schema: ZodSchema,
    source: ValidationSource = ValidationSource.BODY
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = await schema.parseAsync(req[source]);
      if (!error) return next();
      next(new BadRequestError(error));
    } catch (error) {
      next(error);
    }
  };
