"use client";

import { useStore } from '@/store';
import type { Product, ProductCategory } from '@/types';
import ProductCard from '../ProductCard';
import { CakeIcon, CheeseIcon, ChartPieSliceIcon, CookieIcon, KnifeIcon } from '@phosphor-icons/react';
import Link from 'next/link';
import Image from 'next/image';
import CustomCakeImage from '@/assets/customcake.webp';
import useMediaQuery from '@/hooks/useMediaQuery';
import { productCategories } from '@/utils';

const categoryIcons = {
    cake: <CakeIcon size={24} />,
    pie: <ChartPieSliceIcon size={24} />,
    cheesecake: <CheeseIcon size={24} />,
    dessert: <KnifeIcon size={24} />,
    brigadeiro: <CookieIcon size={24} />,
};

function ShopPage({ products }: { products: Product[] }) {
    const categories = Object.keys(productCategories) as ProductCategory[];
    const { language } = useStore();
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className="pt-24 lg:px-24 w-full">
        {/* Top Navigation */}
        <nav className="flex justify-center gap-2 lg:gap-8 lg:my-6 max-w-4xl mx-auto overflow-auto flex-wrap">
            {categories.map((c) => (
            <button
                key={c}
                onClick={() => window.scrollTo({ top: (document.getElementById(c)?.offsetTop || 0) - 80, behavior: 'smooth' })}
                className="flex items-center gap-2 text-brownDark border border-brownLighter text-lg font-medium transition-colors cursor-pointer hover:bg-brownLighter px-4 py-2 rounded-full duration-300"
            >
                {!isMobile && categoryIcons[c]}
                {productCategories[c].name[language]}
            </button>
            ))}
        </nav>

        {/* Fixed Sidebar Navigation */}
        <aside className="fixed top-1/2 left-4 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 space-y-2 z-50 border border-gray-200 dark:border-gray-700 hidden sm:block">
            {categories.map((c) => (
                <button
                    key={c}
                    onClick={() => window.scrollTo({ top: (document.getElementById(c)?.offsetTop || 0) - 80, behavior: 'smooth' })}
                    className="block text-sm text-gray-700 dark:text-gray-300 hover:text-brownDark transition-colors cursor-pointer"
                >
                    {productCategories[c].name[language]}
                </button>
            ))}
        </aside>

        {/* Category Sections */}
        {categories.map((c) => (
            <section key={c} id={c} className="my-20">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <h2 className="text-3xl text-center font-montserrat italic text-brownPrimary">{productCategories[c].name[language]}</h2>
                </div>
                <div className="flex flex-wrap justify-center gap-6 w-full">
                    {products.filter((product) => product.category === c).map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>
        ))}

        {/* Custom Cake */}
        <section className="my-20">
            <div className="flex items-center justify-center gap-2 mb-6">
                <h2 className="text-3xl text-center font-montserrat italic text-brownPrimary">{language === 'pt' ? 'Bolo Personalizado' : 'Custom Cake'}</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6 w-full">
                <Link
                    href="/custom-cake"
                    className="w-[340px] bg-white rounded-xl shadow-lg cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-brownLighter/50 group mx-auto"
                >
                    <div className="w-full h-auto overflow-hidden relative">
                        <Image
                            src={CustomCakeImage}
                            alt={'Custom Cake'}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="p-5">
                        <h3 className="text-xl text-brownDark mb-2 truncate">
                            {language === 'pt' ? 'Crie seu Bolo' : 'Create Your Cake'}
                        </h3>
                        <p className="text-sm text-gray-700 line-clamp-2 font-light leading-relaxed">
                            {language === 'pt' ? 'Personalize seu bolo com massa, recheio e cobertura de sua escolha.' : 'Customize your cake with dough, filling, and frosting of your choice.'}
                        </p>
                    </div>
                </Link>
            </div>
        </section>

        {/* Scroll to Top Button */}
        <div className="flex justify-center my-8">
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="block mx-auto w-44 text-center bg-transparent text-brownDark font-bold py-2 px-4 rounded-full border border-brownLighter hover:bg-brownLighter hover:text-white transition hover:cursor-pointer"
            >
                {language === 'en' ? 'Back to Top' : 'Voltar ao Topo'}
            </button>
        </div>
    </div>
    );
}

export default ShopPage;