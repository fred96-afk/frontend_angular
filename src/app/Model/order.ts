export interface OrderItem {
    product_id: number;
    quantity: number;
}

export interface Order {
    items: OrderItem[];
}
