import Router from "@koa/router";
import auth from "../middleware/auth.js";
import {
    viewCart,
    addToCart,
    updateQuantity,
    removeCart
} from "../controller/cartController.js";

const router = new Router({prefix: "/api/carts"});

router.get("/", auth, viewCart);
router.post("/items",auth,addToCart);
router.patch("/items",auth,updateQuantity);
router.delete("/items/:cartId",auth,removeCart);
export default router;