import * as cartServices from "../services/cartServices.js";
import * as cartSchema from "../validation/cartSchema.js";
import {fetchProductById} from "../services/products.js";

export async function viewCart(ctx) {
    ctx.body = await cartServices.buildCartView(ctx.state.user.jit);
}

export async function addToCart(ctx) {
    const userId = ctx.state.user.jit;
    const { productId, quantity } = ctx.request.body;
    
    const { id: qty } = await cartSchema.checkId.validate({ id: quantity });
    const { id: pid } = await cartSchema.checkId.validate({ id: productId });
    const product = await fetchProductById(pid);
    if (!product) ctx.throw(404, "Product not found");
    const cart = await cartServices.getOrCreateCart(userId);
    const existing = await cartServices.existingItem(cart.id,pid);
    const newQuantity = (existing ? existing.quantity : 0) + qty;
    if (newQuantity > product.stock) {
        ctx.throw(400, `Only ${product.stock} in stock`);
    } 
    if(existing){
        existing.quantity = newQuantity;
        await cartServices.updateCart(existing);
    }else{
        await cartServices.addToCart(newQuantity,cart.id,pid)
    }
    ctx.status = 201;
    ctx.body = await cartServices.buildCartView(userId);
}

export async function updateQuantity(ctx) {
    const userId = ctx.state.user.jit;
    const {itemid,quantity} = ctx.request.body;
    const {id} = await cartSchema.checkId.validate({id:itemid});
    const {id:qty} = await cartSchema.checkId.validate({id:quantity});
    
    const item = await cartServices.getItemid(id,userId);
    if(!item) ctx.throw(404,"Cart not found");
    if(qty > item.Product.stock){
        ctx.throw(400, `Only ${product.stock} in stock`);

    }
    item.quantity= qty;
    await cartServices.updateCart(item);
    ctx.status = 200;
    ctx.body = await cartServices.buildCartView(ctx.state.user.jit);
}

export async function removeCart(ctx) {
    const userId = ctx.state.user.jit;
    const {id} = await cartSchema.checkId.validate({id:ctx.params.cartId});
    const item = await cartServices.getItemid(id,userId);
    if(!item) ctx.throw(404,"Cart not found");
    await cartServices.removeItem(item.id);
    ctx.status=204;
}