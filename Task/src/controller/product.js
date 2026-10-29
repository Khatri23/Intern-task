import * as productInterface from "../services/products.js";
export async function displayProductList(ctx) {
    const data = await productInterface.fetchAllProducts();
    ctx.status = 200;
    ctx.body = data;
}

export async function getProductById(ctx) {
    const data = await productInterface.fetchProductById(ctx.params.id);
    if(!data) {
        ctx.throw(404,"Product not found");
    } else {
        ctx.status = 200;
        ctx.body = data;
    }
}

export async function createProduct(ctx,next) {
    const {name,description,price,stock,category} = ctx.request.body;
    const imageURL = ctx.file ? `uploads/${ctx.file.filename}`: "null";
    await productInterface.createProduct(name,description,price,stock,imageURL,category);
    ctx.status =201;
    ctx.body = "Product successfully created";
    await next();
}

export async function updateProduct(ctx) {
    const id = ctx.params.id;
    const{price,stock,category} = ctx.request.body;
    console.log(category);
    const imageURL = ctx.file ? `uploads/${ctx.file.filename}`: "null";
    let product = await productInterface.fetchProductById(id);
    if(!product) {
        ctx.throw(404,"Not found");
    }
    if(ctx.file && product.imageURL!= "null") await fs.unlink(product.imageURL).catch(()=>{});
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.imageURL = imageURL || product.imageURL;
    product.Category = category || product.Category;
    await productInterface.updateProduct(product);
    ctx.status =200;
    ctx.body={
        message:"Product updated",
        data: product
    }
}

export async function deleteProduct(ctx) {
    const id = ctx.params.id;
    await productInterface.deleteProduct(id);
    ctx.status = 204;
    ctx.body = `product with id ${id} deleted successfully`;
}

export async function queryProduct(ctx) {
    const limit = 10;
    const search = ctx.query.search;
    const category = ctx.query.category;
    const sort = (ctx.query.sort === "asc") ? "ASC":"DESC";
    const minPrice = Number.parseFloat(ctx.query.minPrice,10);
    const maxPrice = Number.parseFloat(ctx.query.maxPrice,10);
    const total = await productInterface.total_entry(search,category);
    if(total ==0 || minPrice >= maxPrice) {
        ctx.throw(404,"Not found");
    }
    const totalPages = Math.ceil(total/limit);
    const page = Math.min(totalPages,Number.parseInt(ctx.query.page,10) || 1);
    const offset = (page-1)*limit;
    const product = await productInterface.searchProduct(search,category,minPrice,maxPrice,sort,limit,offset);
    ctx.body = {
        page: page,
        limit: limit,
        total:total,
        totalPages: totalPages,
        product:product
    }
}