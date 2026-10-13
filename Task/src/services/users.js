import { AppDataSource } from "../data-source.js";
import Users from "../Entity/Users.js";

const userRepository = AppDataSource.getRepository(Users);

export async function insertUser(name,email,password,id,role) {
    const user_entry =userRepository.create({
        id,name,email,password,
        Role:{
            id:role
        }
    });
    await userRepository.save(user_entry);
}

export async function findById(id) {
    const user = userRepository.findOne({
        where:{
            id: id
        },
    })
    return user;
}
//returns user
// if email and password matched
export async function findByEmail(email) {
    const user = await userRepository.findOne({
        where:{
            email: email
        },
        select:{
            password: true,
            email: true,
            id: true,
            name: true
        },
        relations:{
            Role: true
        }
    });
    return user;
}

export async function updateUser(key,user) {
    await userRepository.update({
        id: key
    },user);
    return user; 
}