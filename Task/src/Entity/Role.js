import { EntitySchema } from "typeorm";

export default new EntitySchema({
    name: "Role",
    tableName:"roles",
    columns:{
        id:{
            type: "int",
            primary: true,
            generated: true
        },
        role:{
            type:"varchar",
            length: 255,
        }
    },
    relations:{
        Users:{
            type: "one-to-may",
            target: "users"
        }
    }
});