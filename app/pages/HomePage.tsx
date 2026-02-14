"use client"

import ShopPreview from '../components/ShopPreview';
import Testimonials from '../components/Testimonials';
import AboutMe from '../components/AboutMe'
import Contacts from '../components/Contacts'
import HowToOrder from '../components/HowToOrder';
import { Product } from '../types';

function HomePage({ products }: { products: Product[] }) {
  return (
    <div className="flex flex-col pt-12 scroll-smooth">
      <ShopPreview products={products} />
      <Testimonials />
      <AboutMe />
      <HowToOrder />
      <Contacts />
    </div>
  );
}

export default HomePage;
