// import bcrypt from "bcrypt";
// const saltRounds = 10
// export async function hashPassword(password: string) {
//     try {
//         const salt = await bcrypt.genSalt(saltRounds);
//         const hash = await bcrypt.hash(password, salt);
//         return hash; 
//     } catch (e) {
//         throw e;  
//     }
// }
// export async function validUser(password:string, hash: string) {
//     return await bcrypt.compare(password, hash);
// }
