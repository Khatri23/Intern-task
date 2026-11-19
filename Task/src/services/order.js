import { AppDataSource } from "../data-source.js";
import { Order } from "../entity/Orders.js";

const orderrepo = AppDataSource.getRepository(Order);

export async function checkout(userId) {
    const order = await AppDataSource.transaction(async (manager) => {
        // 1. find the user's cart, then lock its row so the same user
        //    can't run two checkouts at the same time (double order)
        const found = await manager.findOne("Cart", { where: { User: { id: userId } } });
        if (!found) return null;
        const cart = await manager.findOne("Cart",{
            where: { id: found.id },
            lock: { mode: "pessimistic_write" },
        });
        const cartItems = await manager.find("CartItem", {
            where: { Cart: { id: cart.id } },
            relations: { Product: true },
        });
        if (cartItems.length === 0) return null;
        cartItems.sort((a, b) => a.Product.id - b.Product.id);
        const lines = [];
        for (const item of cartItems) {
            const result = await manager
                .createQueryBuilder()
                .update("Products")
                .set({ stock: () => "stock - :qty" })
                .where("id = :id AND stock >= :qty", { id: item.Product.id, qty: item.quantity })
                .returning(["name", "price"]) // name/price exactly as they were at purchase
                .execute();
            if (result.raw.length === 0) {
                const err = new Error(`Not enough stock for "${item.Product.name}"`);
                err.status = 409;
                throw err;
            }
            const { name, price } = result.raw[0];
            lines.push({
                productId: item.Product.id,
                productName: name,
                unitPrice: price,
                quantity: item.quantity,
            });
        }
        const totalCents = lines.reduce(
            (sum, l) => sum + Math.round(Number(l.unitPrice) * 100) * l.quantity,
            0
        );
        const created = await manager.save(
            Order,
            manager.create(Order, {
                User: { id: userId },
                totalAmount: (totalCents / 100).toFixed(2),
                items: lines.map((l) => ({
                    Product: { id: l.productId },
                    productName: l.productName,
                    unitPrice: l.unitPrice,
                    quantity: l.quantity,
                })),
            })
        );
        await manager.remove("CartItem", cartItems);
        return created;
    });
    if (!order) return null;
    const full = await orderrepo.findOne({
        where: { id: order.id },
        relations: { items: { Product: true } },
    });
    return full;
}

export async function getOrder(id, userId) {
    const order = await orderrepo.findOne({
        where: { id, User: { id: userId } },
        relations: { items: { Product: true } },
    });
    return order;
}

export async function listOrder(userId,page,limit)
{
    return await orderrepo.findAndCount({
        where: { User: { id: userId } },
        relations: { items: { Product: true } },
        order: { createdAt: "DESC", id: "DESC" },
        take: limit,
        skip: (page - 1) * limit,
    });

}
export async function adminList(page,limit) {
    return await orderrepo.findAndCount({
        relations:{items:{Product:true}},
        take:limit,
        skip: (page-1)* limit
    });
}

export async function changeStatus(id,status) {
    const order =  await orderrepo.findOne({
        where:{
            id
        },
        relations:{items:{Product:true}}
    });
    if(!order) return null;
    order.status= status;
    await orderrepo.save(order);
    return order;
}