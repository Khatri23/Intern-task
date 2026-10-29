import koarouter from "@koa/router";
import koajwt from "koa-jwt";

import * as categoryController from "../controller/category.js";
import roleGuard from "../middleware/roleguard.js";

const router = new koarouter({prefix:"/api/categories"});
const auth = koajwt({secret:process.env.JWT_SECRET, algorithms:["HS256"]});

router.get("/",categoryController.displayCategories);

router.post("/",auth,roleGuard,categoryController.addCategories);

router.put("/:id",auth,roleGuard,categoryController.updateCategory);

router.delete("/:id",auth,roleGuard,categoryController.removeCategory);

export default router;