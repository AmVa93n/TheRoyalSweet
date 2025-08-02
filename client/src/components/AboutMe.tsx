import { useStore } from '../store';

function AboutMe() {
    const { language } = useStore();

    const text = [
        {
            en: 'The “Royal Sweet” project began in 2022, as a blog where I share my recipes. However, my love for baking started many years ago, and through it, I gained experience and learned a lot.',
            pt: 'O  projecto “The Royal Sweet” iniciou-se em 2022, como um blog em que partilho as minhas receitas. No entanto, a minha paixão pela pastelaria já vem de há muitos anos, ao longo dos quais ganhei experiência e aprendi muito.'
        },
        {
            en: 'My first contact with this field was still in high school. During those years, my curiosity led me to try different family recipes, and since then, nobody can get me out of the kitchen.',
            pt: 'O meu primeiro contacto com esta arte foi quando ainda frequentava o ensino secundário, em que a minha curiosidade levou-me a experimentar algumas receitas de família. Desde então, ninguém me tirou da cozinha.'
        },
        {
            en: 'My sweets delighted in dinners and hangouts, and as it was highly requested, I started selling cakes and desserts to my friends, acquaintances, and family. Later on, I completed my education in this area with a vocational course at ACPP (Professional Cooks of Portugal Association).',
            pt: 'Os meus doces passaram a fazer sucesso em jantares e convívios, e a pedido de muitos, comecei a vender bolos e sobremesas aos meus amigos, conhecidos e familiares. Mais tarde, completei a minha formação profissional na área na ACPP (Associação Cozinheiros Profissionais de Portugal).'
        },
        {
            en: 'With the creation of the blog came a bigger audience, and I decided to finally invest in my craft and formalize this business. This is how this ship came to be, the first step in sharing my cakes with the general public.',
            pt: 'Com a criação do blog e a audiência maior que este me trouxe, decidi finalmente investir no meu negócio e formalizar esta iniciativa. Assim surgiu esta loja online, o primeiro passo para partilhar os meus bolos com o público geral.'
        },
        {
            en: 'My baking style is marked by a fusion of traditional and gourmet. I aim to adapt traditional recipes, bringing to them my own unique “twist”, but without losing the homemade love that the best sweets have. I love trying new flavor combinations and desserts that are typically not found in Portuguese pastry.',
            pt: 'A minha pastelaria marca-se pela aliança do tradicional ao gourmet. Procuro adaptar receitas tradicionais, trazendo-lhes o meu “twist” único, mas sempre sem perder aquele gostinho caseiro que os melhores doces têm. Adoro explorar combinações de sabores originais e sobremesas que não se encontram típicamente na pastelaria portuguesa.'
        },
        {
            en: 'Join me to discover a world of delicious treats!',
            pt: 'Venham comigo descobrir um mundo de doces irresistíveis!'
        },
    ]

    return (
        <section className="max-w-6xl mx-auto px-4 py-10" id='aboutme'>
            <div className="flex flex-col md:flex-row gap-10 items-center">
                {/* Image Section */}
                <div className="w-full md:w-1/3 flex justify-center md:justify-start">
                <img
                    src="./aboutme.jpg"
                    alt="About Me"
                    className="w-full max-w-[400px] rounded-lg shadow-md"
                />
                </div>

                {/* Text Section */}
                <div className="w-full md:w-2/3">
                <h2 className="text-3xl mb-6 font-montserrat italic text-[#593b3e]">
                    {language === 'en' ? 'About Me' : 'Sobre mim'}
                </h2>

                <div className="space-y-4 text-[#593b3e] font-montserrat italic leading-relaxed">
                    {text.map((line, index) => (
                        <p key={`line-${index}`}>{line[language]}</p>
                    ))}
                </div>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;