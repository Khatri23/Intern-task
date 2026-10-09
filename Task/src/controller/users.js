import yup from "yup";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {v4 as uuidv4} from "uuid";

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
    await user_interface.insert_user(name, email, password_hash,uuidv4());
    ctx.status = 201;
    ctx.body = "Registered successfully";
}

export async function user_login(ctx) {
    const userSchema = yup.object({
        email: yup.string().required().email(),
        password: yup.string().required()
    });
    const result = await userSchema.validate(ctx.request.body,{abortEarly: false});
    const {email,password} = result;

    const user = await user_interface.find_by_email(email);
    if (!user || !bcrypt.compareSync(password,user.password)){
        ctx.throw(401,"Email or password is wrong");
    }
    const token = jwt.sign({jit:user.id,name:user.name,email:user.email},process.env.JWT_SECRET,{algorithm:"HS256",expiresIn:6000});
    ctx.body = {
        message: "Login successfully",
        token
    };
}

export async function get_user(ctx) {
    const user =await user_interface.find_by_id(ctx.state.user.jit);
    ctx.body ={ name:user.name, email:user.email, jit:user.uuid};
}

export async function update_user(ctx) {
    const userSchema = yup.object({
        name: yup.string().min(1).optional(),
        email: yup.string().email().optional()
    });
    const result = await userSchema.validate(ctx.request.body,{abortEarly: false});
    let {name,email} = result;
    if(name == undefined && email == undefined){
        ctx.throw(400,"invalid request");
    }
    const newUser = await user_interface.update_user(ctx.state.user.jit,name,email);
    ctx.body = {message:"Updated Successfully",value: newUser}
}