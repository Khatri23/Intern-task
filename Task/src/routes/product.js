import koarouter from "@koa/router";
import koajwt from "koa-jwt";
import roleGuard from "../middleware/roleguard.js";
import  * as productController from "../controller/product.js";

const router = new koarouter({prefix:"/api/products"});
const auth = koajwt({secret:process.env.JWT_SECRET, algorithms:["HS256"]});

router.get("/all",productController.displayProductList);

router.get("/:id", productController.getProductById);

router.post("/create",auth,roleGuard,productController.createProduct);

router.put("/:id",auth,roleGuard,productController.updateProduct);

router.delete("/:id",auth,roleGuard,productController.deleteProduct);

router.get("/",productController.queryProduct);

export default router;