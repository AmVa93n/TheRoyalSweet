import { useStore } from '../store';
import ProductCard from './ProductCard';
import type { Product } from "../types";
import Link from "next/link"

function ShopPreview({ products }: { products: Product[] }) {
  const { language } = useStore();

  return (
    <section className="mx-auto py-10 scroll-mt-16" id='products'>
      <h2 className="text-3xl text-center italic font-montserrat mb-8 text-[#593b3e]">
        {language === 'en' ? 'Our Desserts' : 'Os Nossos Doces'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mb-10 flex-wrap">
        {products.map((product) => (
            <ProductCard product={product} key={product._id} />
        ))}
      </div>

      <Link
        href={"/shop"}
        className="block mx-auto w-44 text-center bg-transparent text-[#593b3e] font-bold py-2 px-4 rounded-full border border-[#593b3e] hover:bg-[#593b3e] hover:text-white transition hover:cursor-pointer"
      >
        {language === 'en' ? 'See more...' : 'Ver Mais...'}
      </Link>
    </section>
  );
}

export default ShopPreview;