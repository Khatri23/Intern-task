import koarouter from "@koa/router";
import upload from "../middleware/upload.js";

import auth from "../middleware/auth.js";
import roleGuard from "../middleware/roleguard.js";
import  * as productController from "../controller/product.js";

const router = new koarouter({prefix:"/api/products"});

router.get("/all",productController.displayProductList);

router.get("/:id", productController.getProductById);

router.post("/",auth,roleGuard,upload.single("image"),productController.createProduct);

router.put("/:id",auth,roleGuard,upload.single("image"),productController.updateProduct);

router.delete("/:id",auth,roleGuard,productController.deleteProduct);

router.get("/",productController.queryProduct);

export default router;