import { useStore } from '../store';
import { MagnifyingGlassIcon, ShoppingCartIcon, CreditCardIcon, MapPinIcon, ForkKnifeIcon, ChatCenteredDotsIcon } from '@phosphor-icons/react';
import Link from "next/link"

function HowToOrder() {
    const { language } = useStore()

    const text = [
        {
            en: '1. Choose the cakes you like the most.',
            pt: '1. Escolha os bolos que mais lhe agradam.', 
            icon: MagnifyingGlassIcon
        },
        {
            en: '2. Make your order online at least 48 hours in advance.',
            pt: '2. Faça a sua encomenda online com, pelo menos, 48 horas de antecedência.', 
            icon: ShoppingCartIcon
        },
        {
            en: '3. Make the payment via MB Way or multibanco transfer.',
            pt: '3. Efectue o pagamento por MB way ou transferência multibanco.', 
            icon: CreditCardIcon
        },
        {
            en: '4. Collect your order at our address in the Areeiro area, Lisbon, or choose delivery via Ubereats.',
            pt: '4. Recolha a sua encomenda na nossa morada na zona do Areeiro, em Lisboa, ou opte por entrega por Ubereats.', 
            icon: MapPinIcon
        },
        {
            en: '5. The best part: enjoy your cakes.',
            pt: '5. A melhor parte: disfrute dos seus bolos.', 
            icon: ForkKnifeIcon
        },
        {
            en: '6. Share your feedback with us. Your opinion matters to us!',
            pt: '6. Partilhe o seu feedback connosco. A sua opinião é importante para nós!', 
            icon: ChatCenteredDotsIcon
        },
    ]

    return (
        <section className="bg-[#593b3e25]" id='how-to-order'>
            <div className="max-w-6xl mx-auto px-4 py-10">
                <h2 className="text-3xl text-center font-montserrat italic text-[#593b3e]">
                    {language === 'en' ? 'How to Order' : 'Como Encomendar'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-12 w-4/5 mx-auto my-8">
                    {text.map((step, index) => (
                    <div key={index} className="flex flex-col items-center w-full gap-2">
                        <step.icon size={80} className="text-[#593b3e]" />
                        <p className="text-medium mt-2 text-[#593b3e] text-center">
                        {step[language]}
                        </p>
                    </div>
                    ))}
                </div>
                <Link
                    href={"/shop"}
                    className="block mx-auto w-44 text-center bg-transparent text-[#593b3e] font-bold py-2 px-4 rounded-full border border-[#593b3e] hover:bg-[#593b3e] hover:text-white transition hover:cursor-pointer"
                >
                    {language === 'en' ? 'See all desserts' : 'Ver todos os doces'}
                </Link>
            </div>
        </section>
    )
}

export default HowToOrder