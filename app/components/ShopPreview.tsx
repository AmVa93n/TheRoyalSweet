import { useStore } from '../store';
import ProductCard from './ProductCard';
import type { Product } from "../types";
import Link from "next/link"

function ShopPreview({ products }: { products: Product[] }) {
  const { language } = useStore();
  const extendedProducts = [...products, ...products]; // loop trick

  return (
    <section className="mx-auto py-10 scroll-mt-16 w-full" id='products'>
      <h2 className="text-3xl text-center italic font-montserrat text-[#593b3e]">
        {language === 'en' ? 'Our Desserts' : 'Os Nossos Doces'}
      </h2>

      {/* Conveyor belt */}
      <div className="overflow-hidden py-8 relative">
        <div className="flex gap-8 w-max animate-scroll">
          {extendedProducts.map((product, index) => (
            <ProductCard product={product} width={320} key={`${product._id}-${index}`} />
          ))}
        </div>
        <div className="pointer-events-none absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[#e6dcd5] to-transparent z-10" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#e6dcd5] to-transparent z-10" />
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