import { fetchAllProducts, fetchProductById } from "../services/products.js";
export async function displayProductList(ctx) {
    const data = await fetchAllProducts();
    ctx.status = 200;
    ctx.body = data;
}

export async function getProductById(ctx) {
    const data = await fetchProductById(ctx.params.id);
    if(!data) {
        ctx.throw(404,"Product not found");
    } else {
        ctx.status = 200;
        ctx.body = data;
    }
}