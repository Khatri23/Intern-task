import { AppDataSource } from "../data-source.js";
import Users from "../Entity/Users.js";

const userRepository = AppDataSource.getRepository(Users);

export async function insert_user(name,email,password,id) {
    const user_entry =userRepository.create({
        id,name,email,password,
        role:"customer"
    });
    await userRepository.save(user_entry);
}

export async function find_by_id(id) {
    const user = userRepository.findOne({
        where:{
            id: id
        }
    })
    return user;
}

//returns user
// if email and password matched
export async function find_by_email(email) {
    const user = await userRepository.findOne({
        where:{
            email: email
        },
        select:{
            password: true,
            email: true,
            id: true,
            name: true
        }
    });
    return user;
}

export async function update_user(key,name,email) {
    let user = await userRepository.findOne({
        where:{
            id: key
        }
    }); // seek for the user 
    user.name = name || user.name;
    user.email = email || user.email;
    await userRepository.update({
        id: key
    },user);
    return user; 
}