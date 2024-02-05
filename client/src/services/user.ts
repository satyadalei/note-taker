import apiInstance1 from "./axiosInstance";

function checkUserAuthStatus(): boolean {
    const authToken = localStorage.getItem("authToken");
    const isLogedIn = localStorage.getItem("isLogedIn");
    const userInfo = localStorage.getItem("userInfo");
    let returnValue: boolean = true;
    if (isLogedIn === null || isLogedIn !== "true") {
        returnValue = false;
    }

    if (authToken === null) {
        returnValue = false;
    }

    if (authToken !== null && authToken.length < 40) {
        returnValue = false;
    }

    if (userInfo === null) {
        returnValue = false;
    }
    
    return returnValue;
}

async function signInUser(email: string, password: string) {
    // here I have used .then()  because fetch/ await does not supported in older browsers
    return apiInstance1.post("/user/login", { email, password })
        .then((response) => {
            const { data } = response;
            return { isSuccess: true, data: data.data };
        })
        .catch((error) => {
            const { response } = error;
            const { data } = response;
            return { isSuccess: false, data };
        })
}



async function signUpUser(email: string, name : string ,password: string){
    return apiInstance1.post("/user/createUser", { email, name, password})
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

export { checkUserAuthStatus, signInUser, signUpUser}