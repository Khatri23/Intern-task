import koa from "koa";
import bodyparser from "@koa/bodyparser";

import Product_router from "./routes/product-get.js";
import users_router from "./routes/users.js"
import errorHandler from "./middleware/error.js";
import { AppDataSource } from "./data-source.js";

const app = new koa();
app.use(bodyparser({
    enableTypes:["json"],
    strict : true
}));
app.use(errorHandler);
app.use(Product_router.routes()).use(Product_router.allowedMethods());
app.use(users_router.routes()).use(users_router.allowedMethods());

AppDataSource.initialize()
    .then(() => {
        console.log("Connected to the database")
        app.listen(3000, () => console.log("Listening on port 3000"))
    })
    .catch((error) => console.log(error));


