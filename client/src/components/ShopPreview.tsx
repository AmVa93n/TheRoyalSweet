import { useNavigate } from "react-router-dom";
import { useStore } from '../store';
import ProductCard from './ProductCard';
import { useEffect, useState } from "react";
import type { Product } from "../types";

function ShopPreview() {
  const { language, products } = useStore();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<Product[]>([]);
  
  useEffect(() => {
    // Randomly select 4 products for the preview on initial render
    const preview = products.sort(() => 0.5 - Math.random()).slice(0, 4);
    setPreview(preview);
  }, [products]);

  return (
    <section className="mx-auto py-10" id='products'>
      <h2 className="text-3xl text-center italic font-montserrat mb-8 text-[#593b3e]">
        {language === 'en' ? 'Our Desserts' : 'Os Nossos Doces'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mb-10 flex-wrap">
        {preview.map((product) => (
            <ProductCard product={product} key={product._id} />
        ))}
      </div>

      <button
        onClick={() => navigate("/shop")}
        className="block mx-auto w-44 text-center bg-transparent text-[#593b3e] font-bold py-2 px-4 rounded-full border border-[#593b3e] hover:bg-[#593b3e] hover:text-white transition hover:cursor-pointer"
      >
        {language === 'en' ? 'See more...' : 'Ver Mais...'}
      </button>
    </section>
  );
}

export default ShopPreview;