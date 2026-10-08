import { EntitySchema } from "typeorm";

export default new EntitySchema({
    name: "Users",
    tableName: "users",
    columns: {
        name: {
            type:"varchar",
            length: 255
        },
        email: {
            type:"varchar",
            length: 255,
            primary: true,
        },
        password_hash : {
            type:"varchar",
            length: 255
        },
        role: {
            type:"varchar",
            length: 255
        }
    }
});