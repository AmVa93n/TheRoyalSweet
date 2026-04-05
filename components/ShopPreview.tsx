import { useStore } from '@/store';
import ProductCard from './ProductCard';
import type { Product } from "../types";
import Link from "next/link"
import { useEffect, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';

const CARD_WIDTH = 320;
const GAP = 32; // gap-8 = 2rem = 32px

function ShopPreview({ products }: { products: Product[] }) {
  const { language } = useStore();
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const visibleCards = isMobile ? 1 : 4;
  const margin = isMobile ? 0 : 32; // gap-8 = 2rem = 32px

  // duplicate to avoid edge issues
  const extended = [...products, ...products];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000); // change speed here

    return () => clearInterval(interval);
  }, []);

  // reset when reaching midpoint (loop illusion)
  useEffect(() => {
    if (index >= products.length) {
      // small delay so user doesn't see jump
      const timeout = setTimeout(() => {
        setIsTransitioning(false); // disable transition for instant jump
        setIndex(0);
      }, 500); // must match transition duration

      return () => clearTimeout(timeout);
    }
  }, [index, products.length]);

  // re-enable transition after jump
  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50); // next frame

      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  const translateX = index * (CARD_WIDTH + GAP);

  return (
    <section className="mx-auto py-10 scroll-mt-16 w-full" id='products'>
      <h2 className="text-3xl text-center italic font-montserrat text-[#593b3e]">
        {language === 'en' ? 'Our Desserts' : 'Os Nossos Doces'}
      </h2>

      <div
        className="overflow-hidden relative py-8 mx-auto"
        style={{
          width: `${(visibleCards * CARD_WIDTH + (visibleCards - 1) * GAP) + (margin * 2)}px`,
        }}
      >
        {/* Track */}
        <div
          className={`flex gap-8 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''} w-max ${!isMobile ? 'mx-8' : ''}`}
          style={{
            transform: `translateX(-${translateX}px)`,
          }}
        >
          {extended.map((product, i) => (
            <ProductCard
              key={`${product._id}-${i}`}
              product={product}
              width={CARD_WIDTH}
            />
          ))}
        </div>

        {/* Fade edges */}
        {!isMobile && (
          <>
            <div className="pointer-events-none absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-[#e6dcd5] to-transparent z-10" />
            <div className="pointer-events-none absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-[#e6dcd5] to-transparent z-10" />
          </>
        )}
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