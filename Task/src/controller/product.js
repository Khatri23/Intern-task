import { fetch_all_products, fetch_product_by_id } from "../services/products.js";
export async function display_product_list(ctx) {
    const data = await fetch_all_products();
    ctx.status = 200;
    ctx.body = data;
}

export async function get_product_by_id(ctx) {
    const data = await fetch_product_by_id(ctx.params.id);
    if(!data) {
        ctx.throw(404,"Product not found");
    } else {
        ctx.status = 200;
        ctx.body = data;
    }
}