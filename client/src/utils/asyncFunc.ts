async function myAsyncFunc(){
    return new Promise((resolve, ) => {
        setTimeout(() => {
            resolve({status:200, data:[], success:true});
        }, 3000);
    });
}

export {myAsyncFunc}