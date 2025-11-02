export interface products {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    offer_price?: number;
    image_filename?: string;
    image_url?: string;
}