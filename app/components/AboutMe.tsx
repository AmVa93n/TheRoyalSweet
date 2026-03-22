import { useStore } from '../store';
import AboutMeImage from '../assets/aboutme.jpg';
import Image from 'next/image';

function AboutMe() {
    const { language } = useStore();

    const text = [
      {
        en: <p>My first contact with this craft came while I was still in secondary school, when my curiosity led me to try a few family recipes. <b>Since then, I’ve never left the kitchen.</b></p>,
        pt: <p>O meu primeiro contacto com esta arte foi quando ainda frequentava o ensino secundário, em que a minha curiosidade levou-me a experimentar algumas receitas de família. <b>Desde então, ninguém me tira da cozinha.</b></p>
      },
      {
        en: <p>My desserts soon became a success at dinners and gatherings, and at the request of many, I began selling cakes and desserts to friends, acquaintances, and family. Later, I completed my professional training in the field at the ACPP (Portuguese Association of Professional Cooks).</p>,
        pt: <p>Os meus doces passaram a fazer sucesso em jantares e convívios, e a pedido de muitos, comecei a vender bolos e sobremesas aos meus amigos, conhecidos e familiares. Mais tarde, completei a minha formação profissional na área na ACPP (Associação de Cozinheiros Profissionais de Portugal).</p>
      },
      {
        en: <p>In 2026, I finally decided to invest in my business. This online shop was born from that decision — the first step toward sharing my cakes with a wider audience.</p>,
        pt: <p>Em 2026, decidi finalmente investir no meu negócio. Assim surgiu esta loja online, o primeiro passo para partilhar os meus bolos com o público geral.</p>
      },
      {
        en: <p className='font-bold'>Join me in discovering a world of irresistible sweets!</p>,
        pt: <p className='font-bold'>Venham comigo descobrir um mundo de doces irresistíveis!</p>
      },
    ]

    return (
        <section className="max-w-6xl mx-auto px-4 py-10 scroll-mt-16" id='aboutme'>
            <div className="flex flex-col md:flex-row gap-10 items-center">
                {/* Image Section */}
                <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                  <Image
                    src={AboutMeImage}
                    alt="About Me"
                    className="w-full max-w-[400px] rounded-lg shadow-md"
                  />
                </div>

                {/* Text Section */}
                <div className="w-full md:w-2/3">
                  <h2 className="text-3xl mb-6 font-montserrat italic text-[#593b3e]">
                    Gonçalo Xavier
                  </h2>

                  <div className="space-y-4 text-[#593b3e] font-montserrat italic leading-relaxed">
                    {text.map((line) => line[language])}
                  </div>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;