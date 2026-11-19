import { AppDataSource } from "../data-source.js";
import { Cart } from "../Entity/Cart.js";
import { CartItem } from "../Entity/CartItem.js";
const cartRepo = AppDataSource.getRepository(Cart);
const cartItemRepo = AppDataSource.getRepository(CartItem);

export async function getOrCreateCart(userId) {
    let cart = await cartRepo.findOne({ where: { User: { id: userId } } });
    if (!cart) {
        cart = await cartRepo.save(cartRepo.create({ User: { id: userId } }));
    }
    return cart;
}

export async function buildCartView(userId) {
    const cart = await getOrCreateCart(userId);
    const items = await cartItemRepo.find({
        where: { Cart: { id: cart.id } },
        relations: { Product: true },
        order: { id: "ASC" },
    });

    const lines = items.map((item) => {
        const price = Number(item.Product.price);
        return {
            id: item.id,
            quantity: item.quantity,
            product: {
                id: item.Product.id,
                name: item.Product.name,
                price,
                image: item.Product.imageURL,
                stock: item.Product.stock,
            },
            subtotal: Number((price * item.quantity).toFixed(2)),
        };
    });

    return {
        id: cart.id,
        items: lines,
        totalItems: lines.reduce((sum, l) => sum + l.quantity, 0),
        total: Number(lines.reduce((sum, l) => sum + l.subtotal, 0).toFixed(2)),
    };
}

export async function existingItem(cartId,productId) {
    const existing = await cartItemRepo.findOne({
        where: { Cart: { id: cartId }, Product: { id: productId } },
    });
    return existing;
}

export async function addToCart(quantity,cartId,productId) {
    const item = cartItemRepo.create({
        quantity,
        Cart: {id: cartId},
        Product: {id: productId}
    });
    await cartItemRepo.save(item);
}

export async function updateCart(item){
    await cartItemRepo.update({id:item.id},item);
}
export async function getItemid(id,userId){
    return await cartItemRepo.findOne({where:{id
        , Cart:{User:{id: userId}}
    },relations:{Product: true}});
}
export async function removeItem(id){
    await cartItemRepo.delete(id);
}

