import yup from "yup";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

import * as user_interface from "../services/users.js";

export async function user_registration(ctx) {
    const userSchema = yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
    });
    const result = await userSchema.validate(ctx.request.body,{abortEarly: false});
    const { name, email, password} = result;
    const password_hash = await bcrypt.hash(password,10);
    await user_interface.insert_user(name, email, password_hash);
    ctx.status = 201;
    ctx.body = "Registered successfully";
}

export async function view_all_users(ctx) {
    ctx.body = await user_interface.view_allusers();
}

export async function user_login(ctx) {
    const userSchema = yup.object({
        email: yup.string().required().email(),
        password: yup.string().required()
    });
    const result = await userSchema.validate(ctx.request.body,{abortEarly: false});
    const {email,password} = result;

    const user = await user_interface.login(email);
    if (!user || !bcrypt.compareSync(password,user.password_hash)){
        ctx.throw(401,"Email or password is wrong");
    }
    const token = jwt.sign({name: user.name,email: user.email,},process.env.JWT_SECRET,{algorithm:"HS256",expiresIn:6000});
    ctx.body = {token};
}

export async function get_user(ctx) {
    const {name,email} = ctx.state.user;
    ctx.body ={name,email};
}

export async function update_user(ctx) {
    const userSchema = yup.object({
        name: yup.string().min(1).optional(),
        email: yup.string().email().optional(),
        password: yup.string().min(1).optional()
    });
    const {email:key_email} = ctx.state.user;
    const result = await userSchema.validate(ctx.request.body,{abortEarly: false});
    let {name,email,password} = result;
    if(name == undefined && email == undefined && password == undefined){
        ctx.throw(400,"invalid request");
    }
    if(password != undefined){
        password = await bcrypt.hash(password,10);
    }
    const newUser = await user_interface.update_user(key_email,name,email,password);
    const token = jwt.sign({name:newUser.name,email:newUser.email},process.env.JWT_SECRET,{algorithm:"HS256",expiresIn:6000});
    ctx.body = {message:"Updated Successfully",token: token}
}