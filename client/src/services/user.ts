import apiInstance1 from "./axiosInstance";
interface APIResponse {
    user: string;
    authToken: string;
    message: string;
    success: boolean;
    data?: LoginUserResponseData | NewUserResponseData | null;
}

interface NewUserResponseData {
    authToken: string;
    newUser: ResponseUserInfo
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


function getUserDetails(): ResponseUserInfo | string | null | undefined {
    let userDetails: string | ResponseUserInfo | null | undefined = localStorage.getItem("userInfo");    
    if (userDetails !== null) {
        userDetails = JSON.parse(userDetails);
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
            const responseData: APIResponse = data.data
            console.log("bla bla bla", responseData);
            return { isSuccess: true, responseData };
        })
        .catch((error) => {
            const { response } = error;
            const { data } = response;
            const responseData: APIResponse = data;
            return { isSuccess: false, responseData };
        })
}



async function signUpUser(email: string, name: string, password: string) {
    return apiInstance1.post("/user/createUser", { email, name, password })
        .then((response) => {
            const { data } = response;
            return { isSuccess: true, data: data.data };
        })
        .catch((error) => {
            const { response } = error;
            const { data } = response;
            return { isSuccess: false, data };
        });
}

export { checkUserAuthStatus, signInUser, signUpUser, getUserDetails };
export type { ResponseUserInfo };
