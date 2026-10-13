import koarouter from "@koa/router";
import koajwt from "koa-jwt";

import * as userctx from "../controller/users.js";
const router = new koarouter({prefix:"/api"});
const auth = koajwt({secret:process.env.JWT_SECRET, algorithms:["HS256"]});

router.post("/auth/register",userctx.userRegistration);

router.post("/auth/login",userctx.userLogin);

router.get("/users/me",auth,userctx.getUser);

router.put("/users/me",auth,userctx.updateUser);

export default router;