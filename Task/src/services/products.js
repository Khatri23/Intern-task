import { AppDataSource } from "../data-source.js";
import Products from "../Entity/Products.js";

export async function fetchAllProducts() {
    const productrepo = AppDataSource.getRepository(Products);
        const data = await productrepo.find({
            relations:{
                Category: true
            }
        });
    return data;
}

export async function fetchProductById(id) {
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