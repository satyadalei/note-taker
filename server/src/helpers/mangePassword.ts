import bcrypt from "bcrypt";
const saltRounds = 10;

// hashes password 
function encryptPasswords(password : string): string{
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password,salt);

    return hashedPassword;
}

// decrypt password
function comparePasswords(password:string, hashedPassword:string):boolean {
    return bcrypt.compareSync(password, hashedPassword );
}


export {encryptPasswords, comparePasswords}