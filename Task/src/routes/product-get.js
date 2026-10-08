import koarouter from "@koa/router";
import  {display_product_list,
    get_product_by_id
} from "../controller/product.js";

const router = new koarouter({prefix:"/api/products"});
router.get("/",display_product_list);

router.get("/:id", get_product_by_id);

export default router;