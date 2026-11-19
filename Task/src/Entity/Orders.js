import { EntitySchema } from "typeorm";

export const OrderStatus = {
    PENDING: "pending",
    PAID: "paid",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
};

export const Order = new EntitySchema({
    name: "Orders",
    tableName: "orders",
    columns: {
        id: { type: "int", primary: true, generated: true },
        status: {
            type: "enum",
            enum: Object.values(OrderStatus),
            default: OrderStatus.PENDING,
        },
        totalAmount: { type: "decimal", precision: 12, scale: 2, default: 0 },
        createdAt: { type: "timestamp", createDate: true },
        updatedAt: { type: "timestamp", updateDate: true },
    },
    relations: {
        User: {
            type: "many-to-one",
            target: "Users",
            nullable: false,
            onDelete: "RESTRICT", 
        },
        items: {
            type: "one-to-many",
            target: "OrderItem",
            inverseSide: "Order",
            cascade: true,
        },
    },
});