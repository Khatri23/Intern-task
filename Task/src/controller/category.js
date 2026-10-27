import * as categoryInterface from "../services/category.js";

export async function displayCategories(ctx) {
    const data = await categoryInterface.fetchAllCategories();
    ctx.status = 200;
    ctx.body = data;
}

export async function addCategories(ctx) {
    const {name} = ctx.request.body;
    await categoryInterface.addCategories(name);
    ctx.status = 201;
    ctx.body = "Created successfully";
}
export async function removeCategory(ctx) {
    await categoryInterface.deleteCategory(ctx.params.id);
    ctx.status = 203;
    ctx.body = "Deleted";
}

export async function updateCategory(ctx){
    const id = ctx.params.id;
    const {name} = ctx.request.body;
    const data = await categoryInterface.updateCategory(id,name);
    if(!data){
        ctx.throw(404, "Category not found");
    } else {
        ctx.body = {
            message: "Updated successfully",
            data : data
        }
    }
}