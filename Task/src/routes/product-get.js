import koarouter from "@koa/router";
import  {displayProductList,
    getProductById
} from "../controller/product.js";

const router = new koarouter({prefix:"/api/products"});
router.get("/",displayProductList);

router.get("/:id", getProductById);

export default router;