import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {v4 as uuidv4} from "uuid";

import * as user_interface from "../services/users.js";
import * as userSchema from "../validation/userSchema.js";

export async function userRegistration(ctx) {
    const result = await userSchema.registrationValidate.validate(ctx.request.body,{abortEarly: false});
    const { name, email, password,role} = result;
    const password_hash = await bcrypt.hash(password,10);
    await user_interface.insertUser(name, email, password_hash,uuidv4(),(role>0 && role <=2)?role:2);
    ctx.status = 201;
    ctx.body = "Registered successfully";
}

export async function userLogin(ctx) {
    const result = await userSchema.loginValidate.validate(ctx.request.body,{abortEarly: false});
    const {email,password} = result;

    const user = await user_interface.findByEmail(email);
    if (!user || !bcrypt.compareSync(password,user.password)){
        ctx.throw(401,"Email or password is wrong");
    }
    const token = jwt.sign({jit:user.id,name:user.name,email:user.email,role: user.Role},process.env.JWT_SECRET,{algorithm:"HS256",expiresIn:6000});
    ctx.body = {
        message: "Login successfully",
        token
    };
}

export async function getUser(ctx) {
    const user =await user_interface.findById(ctx.state.user.jit);
    ctx.body ={
        message: "data fetched succesfully",
        data: user
    };
}

export async function updateUser(ctx) {
    const result = await userSchema.updateValidate.validate(ctx.request.body,{abortEarly: false});
    let {name,email} = result;
    if(name == undefined && email == undefined){
        ctx.throw(400,"invalid request");
    }
    let user = await user_interface.findById(ctx.state.user.jit); //seek user
    user.name = name || user.name;
    user.email = email || user.email;
    const newUser = await user_interface.updateUser(user.id,user);
    ctx.body = {message:"Updated Successfully",value: newUser}
}