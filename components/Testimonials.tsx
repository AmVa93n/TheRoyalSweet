import { Carousel } from 'react-responsive-carousel';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Testimonial } from '../types';

function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {

  function formatName(name: string) {
    const [firstName, lastName] = name.split(' ');
    return `${firstName} ${lastName.charAt(0)}.`;
  }

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
              className="absolute top-1/2 left-2 lg:left-10 transform -translate-y-1/2 z-10 text-brownDark"
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
              className="absolute top-1/2 right-2 lg:right-10 transform -translate-y-1/2 z-10 text-brownDark"
            >
              <CaretRightIcon size={40} />
            </button>
          )
        }
      >
        {testimonials.filter(testimonial => testimonial.order).map(testimonial => (
          <div
            key={testimonial._id}
            className="flex flex-col justify-center items-start gap-4 py-12 px-12 lg:px-60 h-150 lg:h-100 bg-opacity-10 bg-brownLighter"
          >
            <p className="italic mb-4 text-xl text-brownDark text-center mx-auto">
              "{testimonial.text}"
            </p>
            <p className="text-sm font-bold text-brownDark mx-auto">
              {formatName(testimonial.order.name)}
            </p>
          </div>
        ))}
      </Carousel>
    </section>
  );
}

export default Testimonials;