import { AppDataSource } from "../data-source.js";
import Products from "../Entity/Products.js";
import { ILike } from "typeorm";

const productrepo = AppDataSource.getRepository(Products);

export async function fetchAllProducts() {
    const data = await productrepo.find({
        relations:{
            Category: true
        }
    });
    return data;
}

export async function fetchProductById(id) {
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

export async function createProduct(name,description,price,stock,imageURL,category) {
    const product = productrepo.create({
        name,description,price,stock,imageURL,
        Category: {
            id: category
        }
    });
    await productrepo.save(product);
}

export async function updateProduct(product) {
    await productrepo.update({
        id:product.id
    },product);
}

export async function deleteProduct(id) {
    await productrepo.delete({id});
}

export async function searchProduct( search, category, minPrice, maxPrice, sort , limit, offset) {
    const qb = productrepo
        .createQueryBuilder("product")
        .leftJoinAndSelect("product.Category", "category");
 
    if (category) {
        qb.andWhere("category.name = :category", { category });
    }
    if (search) {
        qb.andWhere("product.name ILIKE :search", { search: `%${search}%` });
    }
    if (!isNaN(minPrice)) {
        qb.andWhere("product.price >= :minPrice", { minPrice });
    }
    if (!isNaN(maxPrice)) {
        qb.andWhere("product.price <= :maxPrice", { maxPrice });
    }
 
    const products = await qb
        .orderBy("product.id", sort)
        .take(limit)
        .skip(offset) 
        .getMany()
    return products;
}


export async function total_entry(name, category) {
    return await productrepo.count({
        where: {
            ...(category ? { Category: { name: category } } : {}),
            ...(name ? { name: ILike(`%${name}%`) } : {}),
        },
    });
}
