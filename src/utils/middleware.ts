import { validationResult } from "express-validator";

export function handleInputErrors(req: any, res: any, next: any) {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    next();
  }
}
