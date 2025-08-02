import { Carousel } from 'react-responsive-carousel';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const reviews = [
    {name: 'Francisca X.', text: 'Fiz a encomenda de uma Pavlova de Framboesa que estava absolutamente divinal. Simpatia no atendimento e sabor 5*'},
    {name: 'João A.', text: 'Já tinha ouvido boas recomendações e decidimos encomendar uma pavlova grande, com frutos vermelhos, para fazer a vez dos típicos bolos de batizado. E era divinal! Um saborzinho a leite condensado maravilhoso. Aquela montra dá vontade de trazer um de cada. Atendimento muito simpático. Vou fazer mais encomendas certamente.'},
    {name: 'Beatriz B.', text: 'Só conheci pelo meu bolo de aniversário e foi absolutamente perfeito! Bolo de chocolate com bolinhas de caramelo salgado. Recomendo e vou querer conhecer mais!'},
    {name: 'Ricardo L.', text: 'Encomendei uma delícia de chocolate grande e superou as expectativas... dos melhores bolos de chocolate que já comi. Sabor intenso e denso. Comprei também um de noz individual e também gostei muito. Recomendo e espero voltar em breve para poder experimentar todas as outras especialidades.'},
];

function Testimonials() {
  return (
    <section className="relative" id='testimonials'>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              aria-label={label}
              className="absolute top-1/2 left-2 lg:left-10 transform -translate-y-1/2 z-10 text-[#593b3e]"
            >
              <CaretLeftIcon size={40} />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              onClick={onClickHandler}
              aria-label={label}
              className="absolute top-1/2 right-2 lg:right-10 transform -translate-y-1/2 z-10 text-[#593b3e]"
            >
              <CaretRightIcon size={40} />
            </button>
          )
        }
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-start gap-4 py-12 px-12 lg:px-60 h-150 lg:h-100 bg-opacity-10 bg-[#593b3e25]"
          >
            <p className="italic mb-4 text-xl text-[#593b3e] text-center mx-auto">
              "{review.text}"
            </p>
            <p className="text-sm font-bold text-[#593b3e] mx-auto">
              {review.name}
            </p>
          </div>
        ))}
      </Carousel>
    </section>
  );
}

export default Testimonials;