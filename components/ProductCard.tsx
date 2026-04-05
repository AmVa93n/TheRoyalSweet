import type { Product } from "../types";
import { useStore } from "@/store";
import Link from "next/link"
import Image from "next/image";

type ProductCardProps = {
    product: Product;
    width?: number;
};

function ProductCard({ product, width = 340 }: ProductCardProps) {
    const { language } = useStore();

    return (
        <Link
            href={`/product/${product._id}`}
            className={`bg-pink-50 rounded-xl shadow-lg cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-[#593b3e50] group mx-auto`}
            style={{ width }}
        >
            <div className="w-full h-auto overflow-hidden relative">
                <Image
                    src={product.images[0]}
                    alt={product.name[language]}
                    width={width}
                    height={width}
                    className="transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="p-4">
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