import { useStore } from '../store';
import type { ProductCategory } from '../types';
import ProductCard from '../components/ProductCard';
import { CakeIcon, CheeseIcon, ChartPieSliceIcon, CookieIcon, KnifeIcon } from '@phosphor-icons/react';
import type { JSX } from 'react';

const categories: { cat: ProductCategory; en: string; pt: string, icon: JSX.Element }[] = [
    { cat: 'cake', en: 'Cakes', pt: 'Bolos', icon: <CakeIcon size={24} /> },
    { cat: 'pie', en: 'Pies', pt: 'Tartes', icon: < ChartPieSliceIcon size={24} /> },
    { cat: 'cheesecake', en: 'Cheesecakes', pt: 'Cheesecakes', icon: <CheeseIcon size={24} /> },
    { cat: 'dessert', en: 'Desserts', pt: 'Sobremesas', icon: <KnifeIcon size={24} /> },
    { cat: 'mini', en: 'Minis', pt: 'Individuais', icon: <CookieIcon size={24} /> },
];

function ShopPage() {
    const { language, products } = useStore();

    return (
        <div className="pt-24 lg:px-24 w-full">
        {/* Top Navigation */}
        <nav className="flex justify-around my-6 max-w-4xl mx-auto overflow-auto">
            {categories.map((category) => (
            <button
                key={category.cat}
                onClick={() => window.scrollTo({ top: (document.getElementById(category.cat)?.offsetTop || 0) - 80, behavior: 'smooth' })}
                className="flex items-center gap-2 text-[#593b3e] text-lg font-medium hover:text-white transition-colors cursor-pointer hover:bg-[#593b3e] px-4 py-2 rounded-full duration-300"
            >
                {category.icon}
                {category[language]}
            </button>
            ))}
        </nav>

        {/* Fixed Sidebar Navigation */}
        <aside className="fixed top-1/2 left-4 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 space-y-2 z-50 border border-gray-200 dark:border-gray-700 hidden sm:block">
            {categories.map((category) => (
                <button
                    key={category.cat}
                    onClick={() => window.scrollTo({ top: (document.getElementById(category.cat)?.offsetTop || 0) - 80, behavior: 'smooth' })}
                    className="block text-sm text-gray-700 dark:text-gray-300 hover:text-[#593b3e] transition-colors cursor-pointer"
                >
                    {category[language]}
                </button>
            ))}
        </aside>

        {/* Category Sections */}
        {categories.map((category) => (
            <section key={category.cat} id={category.cat} className="my-20">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <h2 className="text-3xl text-center font-montserrat italic text-[#593b3e]">{category[language]}</h2>
                </div>
                <div className="flex flex-wrap justify-center gap-6 w-full">
                    {products.filter((product) => product.category === category.cat).map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>
        ))}

        {/* Scroll to Top Button */}
        <div className="flex justify-center my-8">
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="block mx-auto w-44 text-center bg-transparent text-[#593b3e] font-bold py-2 px-4 rounded-full border border-[#593b3e] hover:bg-[#593b3e] hover:text-white transition hover:cursor-pointer"
            >
                {language === 'en' ? 'Back to Top' : 'Voltar ao Topo'}
            </button>
        </div>
    </div>
    );
}

export default ShopPage;