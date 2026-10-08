import koarouter from "@koa/router";
import koajwt from "koa-jwt";

import * as userctx from "../controller/users.js";
const router = new koarouter({prefix:"/api"});
const auth = koajwt({secret:process.env.JWT_SECRET, algorithms:["HS256"]});

router.post("/auth/register",userctx.user_registration);

router.post("/auth/login",userctx.user_login);

router.get("/users/me",auth,userctx.get_user);

router.put("/users/me",auth,userctx.update_user);

router.get("/users/all",userctx.view_all_users);


export default router;