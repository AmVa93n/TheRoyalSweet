import { useNavigate } from "react-router-dom";
import { useStore } from '../store';
import ProductCard from './ProductCard';

function ShopPreview() {
  const { language, products } = useStore();
  const navigate = useNavigate();
  const preview = products.sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <section className="mx-auto py-10" id='shop'>
      <h2 className="text-3xl text-center italic font-montserrat mb-8 text-[#643843]">
        {language === 'en' ? 'Our Desserts' : 'Os Nossos Doces'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mb-10 flex-wrap">
        {preview.map((product) => (
            <ProductCard product={product} key={product._id} />
        ))}
      </div>

      <button
        onClick={() => navigate("/shop")}
        className="block mx-auto w-44 text-center bg-transparent text-[#643843] font-bold py-2 px-4 rounded-full border border-[#643843] hover:bg-[#643843] hover:text-white transition"
      >
        {language === 'en' ? 'See more...' : 'Ver Mais...'}
      </button>
    </section>
  );
}

export default ShopPreview;