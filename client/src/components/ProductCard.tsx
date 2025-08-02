import type { Product } from "../types";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";

type ProductCardProps = {
    product: Product;
};

function ProductCard({ product }: ProductCardProps) {
    const navigate = useNavigate();
    const { language } = useStore();
    const imagePlaceholder = "https://deintortenbild.de/cdn/shop/files/tortenbaender-2-stueck-a-26-x-10-cm-online-designer-910.webp?v=1737648157&width=1000"

    function handleCardClick() {
        navigate(`/product/${product._id}`);
    }

    return (
        <div
            onClick={handleCardClick}
            className="w-[340px] bg-pink-50 rounded-xl shadow-lg cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-[#593b3e50] group mx-auto"
        >
            <div className="w-full h-[250px] overflow-hidden relative">
                <img
                    src={product.images[0] || imagePlaceholder}
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
        </div>
    );
}

export default ProductCard;