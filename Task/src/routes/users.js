import koarouter from "@koa/router";
import auth from "../middleware/auth.js";

import * as userctx from "../controller/users.js";
const router = new koarouter({prefix:"/api"});

router.post("/auth/register",userctx.userRegistration);

router.post("/auth/login",userctx.userLogin);

router.get("/users/me",auth,userctx.getUser);

router.put("/users/me",auth,userctx.updateUser);

export default router;