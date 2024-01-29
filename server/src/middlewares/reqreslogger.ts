import { Request, Response, NextFunction } from "express";

const logReqRes = (req: Request, res: Response, next: NextFunction) => {
    let timeStamp = `${String(new Date().getHours()).padStart(2, "0")}:${String(
        new Date().getMinutes()
    ).padStart(2, "0")}:${String(new Date().getSeconds()).padStart(2, "0")}`;
    console.log(`${timeStamp}  ${req.method}:${req.path}  ${req.ip}`);
    next();
};

export { logReqRes };
