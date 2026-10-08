import { AppDataSource } from "../data-source.js";
import bcrypt from "bcryptjs";

import Users from "../Entity/Users.js";

const userRepository = AppDataSource.getRepository(Users);

export async function insert_user(name,email,password) {
    const user_entry =userRepository.create({
        name: name,
        email: email,
        password_hash: password,
        role: "customer"
    });
    await userRepository.save(user_entry);
}

export async function view_allusers() {
    const entry = await userRepository.find();
    return entry;
}
//returns user
// if email and password matched
export async function login(email) {
    const user = await userRepository.findOne({
        where:{
            email: email
        }
    });
    return user;
}

export async function update_user(key,name,email,password) {
    let user = await userRepository.findOne({
        where:{
            email: key
        }
    }); // seek for the user 
    user.name = name || user.name;
    user.email = email || user.email;
    user.password_hash = password || user.password_hash;
    await userRepository.update({
        email: key
    },user);
    return {name: user.name, email: user.email}; // return the name and email from the database to update JWT token
}