import { AppDataSource } from "../data-source.js";
import Categories from "../Entity/Categories.js";

const categoryrepo = AppDataSource.getRepository(Categories);

export async function fetchAllCategories() {
    const data = await categoryrepo.find();
    return data;
}

export async function addCategories(name) {
    const data =categoryrepo.create({name});
    await categoryrepo.save(data);
}

export async function deleteCategory(id) {
    await categoryrepo.delete({id});
}

export async function updateCategory(id,name) {
    const data = await categoryrepo.findOne({where:{id}});
    if(!data) return null;
    data.name = name;
    await categoryrepo.save(data);
    return data;
}