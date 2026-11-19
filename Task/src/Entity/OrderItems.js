import { EntitySchema } from "typeorm";

export default new EntitySchema({
    name: "OrderItem",
    tableName: "order_item",
    columns:{
        id:{type:"int", primary: true, generated: true},
        quantity: {type: "int"},
        unitPrice: { type: "decimal", precision: 12, scale: 2 },
        productName: { type: "varchar" }
    },
    relations:{
        Order: {
            type: "many-to-one",
            target: "Orders",
            nullable: false,
            onDelete: "CASCADE",
            inverseSide: "items"
        },
        Product:{
            type: "many-to-one",
            target: "Products",
            nullable: true,
            onDelete: "SET NULL"
        }
    }
});