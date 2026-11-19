import * as orderInterface from "../services/order.js"

function formatOrder(order) {
    return {
        id: order.id,
        status: order.status,
        totalAmount: Number(order.totalAmount),
        createdAt: order.createdAt,
        items: (order.items || []).map((i) => ({
            id: i.id,
            productId: i.Product ? i.Product.id : null,
            productName: i.productName,
            unitPrice: Number(i.unitPrice),
            quantity: i.quantity,
            subtotal: Number((Number(i.unitPrice) * i.quantity).toFixed(2)),
        })),
    };
}

export async function checkout(ctx) {
    const userId = ctx.state.user.jit;
    const full = await orderInterface.checkout(userId);
    if (!full) ctx.throw(400, "Not found");
    ctx.status = 201;
    ctx.body = formatOrder(full);
}
export async function listOrders(ctx) {
    const userId = ctx.state.user.jit;
    const limit = 10;
    const page = Math.max(1, parseInt(ctx.query.page, 10) || 1);
    const [orders, total] = await orderInterface.listOrder(userId,page,limit)
    ctx.body = {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        orders: orders.map(formatOrder),
    };
}
export async function getOrder(ctx) {
    const id = Number(ctx.params.id);
    if (!Number.isInteger(id)) ctx.throw(400, "Invalid order id");
    const order = await orderInterface.getOrder(id,ctx.state.user.jit);
    if (!order) ctx.throw(404, "Order not found");
    ctx.body = formatOrder(order);
}
export async function adminListOrders(ctx) {
    const limit = 10;
    const page = Math.max(1, parseInt(ctx.query.page, 10) || 1);
    const [orders,total] = await orderInterface.adminList(page,limit);
    ctx.body = {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        orders: orders.map(formatOrder),
    };
}

import { OrderStatus } from "../entity/Orders.js";
export async function changeStatus(ctx) {
    const id = Number(ctx.params.id);
    const {status} = ctx.request.body;
    if(!Number.isInteger(status) || status < 1 || status > 5) ctx.throw(400, "Invalid order id");

    const status_array=[OrderStatus.PENDING,OrderStatus.PAID,OrderStatus.SHIPPED,OrderStatus.DELIVERED,OrderStatus.CANCELLED];
    const order = await orderInterface.changeStatus(id,status_array[status-1]);
    if(!order) ctx.throw(400,"order not found");
    ctx.body = {
        message:"Status changed successfull",
        data: order
    }
}