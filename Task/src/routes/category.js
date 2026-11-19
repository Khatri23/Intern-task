import koarouter from "@koa/router";
import auth from "../middleware/auth.js";

import * as categoryController from "../controller/category.js";
import roleGuard from "../middleware/roleguard.js";

const router = new koarouter({prefix:"/api/categories"});

router.get("/",categoryController.displayCategories);

router.post("/",auth,roleGuard,categoryController.addCategories);

router.put("/:id",auth,roleGuard,categoryController.updateCategory);

router.delete("/:id",auth,roleGuard,categoryController.removeCategory);

export default router;