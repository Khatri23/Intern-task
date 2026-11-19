import {checkout, listOrders, getOrder,adminListOrders,changeStatus} from "../controller/order.js"
import router from "@koa/router";
import auth from "../middleware/auth.js";
import roleGuard from "../middleware/roleguard.js";
const koarouter = new router({prefix:"/api/orders"});

koarouter.post("/", auth, checkout);
koarouter.get("/", auth, listOrders);
koarouter.get("/find/:id", auth, getOrder);
koarouter.get("/admin",auth,roleGuard,adminListOrders);
koarouter.patch("/admin/:id",auth,roleGuard,changeStatus);
 
export default koarouter;