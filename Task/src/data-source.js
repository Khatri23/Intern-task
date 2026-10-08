import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [path.join(__dirname, "entity", "*.js")],
    synchronize: true,
    logging : false
});

// AppDataSource.initialize()
// .then(()=>console.log("Connected to the database"))
// .catch((error)=>console.log(error));

//insert into category

// AppDataSource.initialize()
// .then(async ()=>{
//     console.log("Connection successful");
//     let category_obj = [
//         {id: 1, name:"Electronics"}, {id: 2, name: "glocery"} ,{id: 3,name: "clothes"} , {id: 4,name: "stationary"}
//     ];
//      const categoryrepo = AppDataSource.getRepository(Categories);
//     for(let x of category_obj) {
//         await categoryrepo.save(x);
//     }
//     let obj = await categoryrepo.find();
//     console.log(obj);
//     console.log("Data saved successfully");
// })
// .catch((error)=> console.log(error));

//insert into products
// import {readFile} from "fs/promises";
// AppDataSource.initialize()
// .then(async()=>{
//     console.log("Connected Success");
//     const data = await readFile("./dummy_data.json","utf-8");
//     const product_json = JSON.parse(data);
//     const productrepo = AppDataSource.getRepository(Products);
//     for(let obj of product_json){
//         const entry = productrepo.create({
//             name: obj.name,
//             description: obj.description,
//             price: obj.price,
//             stock : obj.stock,
//             imageURL : obj.imageURL,
//             Category: {
//                 id: obj.Category
//             }
//         });
//         await productrepo.save(entry);
//     }
//     console.log("Data saved");
//     const print =  await productrepo.find({
//         relations:{
//             Category:true
//         }
//     });
//     console.log(print);
// });
