"use client"

import ShopPreview from '../ShopPreview';
import Testimonials from '../Testimonials';
import AboutMe from '../AboutMe'
import AboutUs from '../AboutUs';
import Contacts from '../Contacts'
import HowToOrder from '../HowToOrder';
import { Product, Testimonial } from '../../types';

function HomePage({ products, testimonials }: { products: Product[], testimonials: Testimonial[] }) {
  return (
    <div className="flex flex-col pt-12 scroll-smooth">
      <ShopPreview products={products} />
      <Testimonials testimonials={testimonials} />
      <AboutUs />
      <AboutMe />
      <HowToOrder />
      <Contacts />
    </div>
  );
}

export default HomePage;
