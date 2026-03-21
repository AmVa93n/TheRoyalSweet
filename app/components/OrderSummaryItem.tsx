import type { CartItem } from "../types";
import { useStore } from "../store";
import CustomCakeImage from '../assets/customcake.webp';

type Props = {
  item: CartItem;
}

export default function OrderSummaryItem({ item }: Props) {
  const { language } = useStore()

  return (
    <>
      <div className={`flex items-center ${item.product ? 'mb-3' : ''}`}>
        <img
          src={item.product?.images[0] || CustomCakeImage.src}
          alt={item.product?._id || 'Custom Cake'}
          className="w-10 h-10 object-cover mr-3"
        />
        <span className="flex-grow">{item.product?.name[language] || (language === 'en' ? 'Custom Cake' : 'Bolo Personalizado')} x {item.quantity}</span>
        <span>{(item.price * item.quantity).toFixed(2).replace('.', ',')} €</span>
      </div>

      {item.customCake && (
        <div className="flex flex-col items-start ml-13 text-xs text-gray-500 mb-3">
          <p><span className="font-semibold">{language === 'en' ? 'Dough' : 'Massa'}:</span> {item.customCake.dough.name[language]}</p> 
          <p><span className="font-semibold">{language === 'en' ? 'Filling' : 'Recheio'}:</span> {item.customCake.filling.name[language]}</p>
          <p><span className="font-semibold">{language === 'en' ? 'Frosting' : 'Cobertura'}:</span> {item.customCake.frosting.name[language]}</p>
          {item.customCake.topping && <p><span className="font-semibold">{language === 'en' ? 'Topping' : 'Decoração'}:</span> {item.customCake.topping.name[language]}</p>}
        </div>
      )}
    </>
  );
}