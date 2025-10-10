import { OrderItemProps } from "@/providers/order";

export function calculeTotalOrder(orders:OrderItemProps[]) { 
    return orders.reduce((total, item) => { // calcula o total do pedido
        const itemTotal = (parseFloat(item.product.price) * item.amount); // multiplica o preço do produto pela quantidade
        return total + itemTotal;
    }, 0);



}