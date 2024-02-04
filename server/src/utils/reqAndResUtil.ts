import { Request, Response } from 'express';

// interface ResponseBody{
//   success : Boolean;
//   message: string;
//   data?: any;
// }
class ResponseJson {
    req: Request;
    res: Response;
    httpStatusCode: number = 200; // Renamed from statusCode to avoid conflict
    success: boolean = true;
    message: string;
    data: any = {};

    constructor(req: Request, res: Response, httpStatusCode?: number, success?: boolean, message?: string, data?: any) {
        this.req = req;
        this.res = res;
        this.httpStatusCode = httpStatusCode ?? this.httpStatusCode;
        this.success = success ?? this.success;
        this.message = message ?? 'ok';
        this.data = data ?? null;
    }

    successResponse(message : String,data?: any): Response {
        return this.res.status(this.httpStatusCode).json({
            success: this.success,
            message: message,
            data: data || this.data
        });
    }
    customResponse(success: boolean,httpStatusCode:number,message:string, data?:any): Response{
        return this.res.status(httpStatusCode).json({
            success,
            message,
            data : data || this.data
        });
    }
    unAuthorizedResponse(){
        return this.res.status(401).json({
            success: false,
            message: "Unauthorized access. # Please login again."
        });
    }
    internalServerErrorResponse(err?: any): Response {
        this.httpStatusCode = 500;
        this.success = false;
        this.message = "There might be some problem in our side. # Internal server error";
        this.data = null;
        
        return this.res.status(this.httpStatusCode).json({
            success: this.success,
            message: this.message
        });
    }
    logError(err: any, method?: string | null, apiPath?: string | null ): void{
        console.log("\n---- Error -----");
        console.log("Method :", method);
        console.log("API Path :", apiPath);
        console.log("\n Error details", err);
    }
}


export {ResponseJson} ;