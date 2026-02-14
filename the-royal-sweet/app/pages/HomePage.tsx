"use client"

import ShopPreview from '../components/ShopPreview';
import Testimonials from '../components/Testimonials';
import AboutMe from '../components/AboutMe'
import Contacts from '../components/Contacts'
import HowToOrder from '../components/HowToOrder';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '../types';

function HomePage({ products }: { products: Product[] }) {
  const searchParams = useSearchParams()
  const sectionId = searchParams.get("sectionId")

  useEffect(() => {
    if (sectionId) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          const scrollY = (document.getElementById(sectionId)?.offsetTop || 0) - 60;
          window.scrollTo({ top: scrollY, behavior: 'smooth' });
        }, 0);
      });
    }
  }, [sectionId]);

  return (
    <div className="flex flex-col pt-12">
      <ShopPreview products={products} />
      <Testimonials />
      <AboutMe />
      <HowToOrder />
      <Contacts />
    </div>
  );
}

export default HomePage;
