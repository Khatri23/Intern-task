import { EntitySchema } from "typeorm";

export const CartItem = new EntitySchema({
    name: "CartItem",
    tableName: "cart_item",
    columns: {
        id: { type: "int", primary: true, generated: true },
        quantity: { type: "int", default: 1 },
    },
    relations: {
        Cart: {
            type: "many-to-one",
            target: "Cart",
            nullable: false,
            onDelete: "CASCADE",
            inverseSide: "items",
        },
        Product: {
            type: "many-to-one",
            target: "Products",
            nullable: false,
            onDelete: "CASCADE",
        },
    },
    // the same product can only appear once per cart
    uniques: [{ name: "UQ_cart_item_cart_product", columns: ["Cart", "Product"] }],
    checks: [{ expression: `"quantity" > 0` }],
});