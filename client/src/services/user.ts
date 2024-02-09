import apiInstance1 from "./axiosInstance";

interface APIResponse extends CommonAPIResponseData {
    data?: LoginUserResponseData | NewUserResponseData | null;
}
interface CommonAPIResponseData{
    message: string;
    success: boolean;
}
interface NewUserResponseData {
    authToken: string;
    newUser: ResponseUserInfo;
}

interface LoginUserResponseData {
    authToken: string;
    user: ResponseUserInfo
}

interface ResponseUserInfo {
    _id: string;
    name: string;
    email: string;
}

interface FinalReturnData extends CommonReturnData{
    responseData: APIResponse
}

interface CommonReturnData{
    isSuccess:boolean;
}


function getUserDetails(): ResponseUserInfo | null | undefined {
    const userInfoString: string | null | undefined = localStorage.getItem("userInfo");  
    let userDetails : ResponseUserInfo | null | undefined ;  
    if (userDetails !== null) {
        userDetails = JSON.parse(userInfoString as string);
    }else{
        userDetails = undefined;
    }
    return userDetails
}

function checkUserAuthStatus(): boolean {
    const authToken = localStorage.getItem("authToken");
    const isLogedIn = localStorage.getItem("isLogedIn");
    const userInfo = localStorage.getItem("userInfo");
    let returnValue: boolean = true;
    if (isLogedIn === null || isLogedIn !== "true") {
       return returnValue = false;
    }

    if (authToken === null) {
        return returnValue = false;
    }

    if (authToken !== null && authToken.length < 40) {
        return returnValue = false;
    }

    if (userInfo === null) {
        return returnValue = false;
    }

    return returnValue;
}

async function signInUser(email: string, password: string) {
    // here I have used .then()  because fetch/ await does not supported in older browsers
    return apiInstance1.post("/user/login", { email, password })
        .then((response) => {
            const { data } = response;
            const responseData: APIResponse = data;
            const finalData : FinalReturnData = { isSuccess: true, responseData : responseData };
            return finalData
        })
        .catch((error) => {
            const { response } = error;
            const { data } = response;
            const responseData: APIResponse = data;
            const finalData : FinalReturnData = { isSuccess: false, responseData : responseData };
            return finalData
        })
}


async function signUpUser(email: string, name: string, password: string) {
    return apiInstance1.post("/user/createUser", { email, name, password })
        .then((response) => {
            const { data } = response;
            const responseData: APIResponse = data
            const finalData : FinalReturnData = { isSuccess: true, responseData : responseData };
            return finalData
        })
        .catch((error) => {            
            const { response } = error;
            const { data } = response;
            const responseData: APIResponse = data;
            const finalData : FinalReturnData = { isSuccess: false, responseData : responseData };
            return finalData
        });
}

export { checkUserAuthStatus, signInUser, signUpUser, getUserDetails };
export type {CommonAPIResponseData, CommonReturnData, APIResponse, ResponseUserInfo, FinalReturnData, NewUserResponseData, LoginUserResponseData };
