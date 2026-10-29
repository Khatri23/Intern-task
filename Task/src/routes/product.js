import koarouter from "@koa/router";
import koajwt from "koa-jwt";
import multer from "@koa/multer";


import roleGuard from "../middleware/roleguard.js";
import  * as productController from "../controller/product.js";

const router = new koarouter({prefix:"/api/products"});
const auth = koajwt({secret:process.env.JWT_SECRET, algorithms:["HS256"]});
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req,file,cb) => cb(null,Date.now()+"-"+file.originalname),
});
const upload = multer({
    storage: storage,
    limits: {fileSize:5*1024*1024}
})

router.get("/all",productController.displayProductList);

router.get("/:id", productController.getProductById);

router.post("/",auth,roleGuard,upload.single("image"),productController.createProduct);

router.put("/:id",auth,roleGuard,upload.single("image"),productController.updateProduct);

router.delete("/:id",auth,roleGuard,productController.deleteProduct);

router.get("/",productController.queryProduct);

export default router;