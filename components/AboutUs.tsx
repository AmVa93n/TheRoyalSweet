import { useStore } from '@/store';
import AboutUsImage from '../assets/aboutus.jpg';
import Image from 'next/image';

export default function AboutUs() {
    const { language } = useStore();

    const text = [
      {
        en: <p>Our pastry shop is defined by a strong focus on <b>flavour</b> and a wide <b>variety</b> of offerings. We provide an extensive selection of cakes, desserts, and cheesecakes to suit every taste.</p>,
        pt: <p>A nossa pastelaria marca-se por um foco no <b>sabor</b> e uma grande <b>variedade</b> na oferta. Disponibilizamos uma longa lista de bolos, sobremesas e cheesecakes para todos os gostos.</p>
      },
      {
        en: <p>We use only the highest-quality ingredients, creating products that combine traditional techniques with a gourmet touch. Our decoration style remains simple and elegant.</p>,
        pt: <p>Apenas utilizamos ingredientes da melhor qualidade, criando produtos que aliam o tradicional ao gourmet. A decoração mantém-se simples e elegante.</p>
      },
      {
        en: <p>We are passionate about exploring <b>original</b> flavour combinations and creating <b>unique</b> desserts that are not typically found in Portuguese pastry shops.</p>,
        pt: <p>Somos apaixonados por explorar combinações de sabores <b>originais</b> e criar sobremesas <b>únicas</b>, que não se encontram típicamente na pastelaria portuguesa.</p>
      },
      {
        en: <p>In addition, we aim to create a space of true <b>collaboration</b> and <b>creativity</b> with our customers. Do you have an idea for a dessert you would love to try? Or would you like to recreate a sweet you once had at a restaurant somewhere in another country?</p>,
        pt: <p>Para além disso, queremos criar um espaço de verdadeira <b>colaboração</b> e <b>criatividade</b> junto dos nossos clientes. Tem uma ideia para um doce que gostava de experimentar? Ou quer recriar uma sobremesa que experimentou há algum tempo num restaurante algures noutro país?</p>
      },
      {
        en: <p>Send us your request, and we will do our best to delight you with <b>the dessert of your dreams.</b></p>,
        pt: <p>Envie-nos o seu pedido e daremos o nosso melhor para o presentear com <b>a sobremesa dos seus sonhos!</b></p>
      },
    ]

    return (
        <section className="max-w-6xl mx-auto px-4 py-10 scroll-mt-16" id='aboutus'>
            <div className="flex flex-col md:flex-row gap-10 items-center">
                {/* Text Section */}
                <div className="w-full md:w-2/3">
                  <h2 className="text-3xl mb-6 font-montserrat italic text-[#593b3e]">
                    {language === 'en' ? 'About Us' : 'Sobre nós'}
                  </h2>

                  <div className="space-y-4 text-[#593b3e] font-montserrat italic leading-relaxed">
                    {text.map((line) => line[language])}
                  </div>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                  <Image
                    src={AboutUsImage}
                    alt="About Us"
                    className="w-full max-w-[400px] rounded-lg shadow-md"
                  />
                </div>
            </div>
        </section>
    );
}