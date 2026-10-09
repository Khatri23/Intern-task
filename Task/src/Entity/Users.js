import { EntitySchema } from "typeorm";

export default new EntitySchema({
    name: "Users",
    tableName: "users",
    columns: {
        id: {
            type: "varchar",
            length: 255,
            primary: true
        },
        name: {
            type:"varchar",
            length: 255
        },
        email: {
            type:"varchar",
            length: 255,
            unique: true
        },
        password : {
            select: false,
            type:"varchar",
            length: 255
        },
        role: {
            type:"varchar",
            length: 255
        }
        
    }
});