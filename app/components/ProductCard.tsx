import type { Product } from "../types";
import { useStore } from "../store";
import Link from "next/link"
import Image from 'next/image';

type ProductCardProps = {
    product: Product;
};

function ProductCard({ product }: ProductCardProps) {
    const { language } = useStore();

    return (
        <Link
            href={`/product/${product._id}`}
            className="w-[340px] bg-pink-50 rounded-xl shadow-lg cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-[#593b3e50] group mx-auto"
        >
            <div className="w-full h-[250px] overflow-hidden relative">
                <Image
                    src={product.images[0]}
                    alt={product.name[language]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="p-5">
                <h3 className="text-xl text-[#593b3e] mb-2 truncate">
                    {product.name[language]}
                </h3>
                <p className="text-sm text-gray-700 line-clamp-2 font-light leading-relaxed">
                    {product.description[language]}
                </p>
            </div>
        </Link>
    );
}

export default ProductCard;