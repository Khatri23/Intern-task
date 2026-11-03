import * as categoryInterface from "../services/category.js";
import * as categorySchema from "../validation/categorySchema.js";

export async function displayCategories(ctx) {
    const data = await categoryInterface.fetchAllCategories();
    ctx.status = 200;
    ctx.body = data;
}

export async function addCategories(ctx) {
    const {name} = await categorySchema.categoryValidate(ctx.request.body, {abortEarly: false});    
    const category = await categoryInterface.addCategories(name);
    ctx.status = 201;
    ctx.body = {
        message: "Created successfully",
        data: category
    };
}
export async function removeCategory(ctx) {
    const {id} =await categorySchema.idValidate( ctx.params.id,{abortEarly:false});
    await categoryInterface.deleteCategory(id);
    ctx.status = 203;
    ctx.body = "Deleted";
}

export async function updateCategory(ctx){
    const {id} =await categorySchema.idValidate( ctx.params.id,{abortEarly:false});
    const {name} = await categorySchema.categoryValidate(ctx.request.body, {abortEarly: false});    
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