import { EntitySchema } from "typeorm";

// One cart per user
export const Cart = new EntitySchema({
    name: "Cart",
    tableName: "cart",
    columns: {
        id: { type: "int", primary: true, generated: true },
        createdAt: { type: "timestamp", createDate: true },
        updatedAt: { type: "timestamp", updateDate: true },
    },
    relations: {
        User: {
            type: "one-to-one",
            target: "Users",
            joinColumn: { name: "user_id" },
            nullable: false,
            onDelete: "CASCADE",
        },
        items: {
            type: "one-to-many",
            target: "CartItem",
            inverseSide: "Cart",
        },
    },
});