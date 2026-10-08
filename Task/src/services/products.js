import { AppDataSource } from "../data-source.js";
import Products from "../Entity/Products.js";

export async function fetch_all_products() {
    const productrepo = AppDataSource.getRepository(Products);
        const data = await productrepo.find({
            relations:{
                Category: true
            }
        });
    return data;
}

export async function fetch_product_by_id(id) {
    const productrepo = AppDataSource.getRepository(Products);
    const data = await productrepo.findOne({
        where:{
            id : id
        },
        relations:{
            Category: true
        }
    });
    return data;
}