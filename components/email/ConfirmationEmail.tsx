import { Order } from '../../types';
import OrderDetails from './OrderDetails';
import ShippingDetails from './ShippingDetails';
import OrderSummary from './OrderSummary';

export default function ConfirmationEmail({ order }: { order: Order }) {
  const { language, name } = order;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', padding: '16px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
        {language === 'en' ? `Thank you for your order, ${name}!` : `Obrigado pelo seu pedido, ${name}!`}
      </h1>
      <p style={{ fontSize: '16px', marginBottom: '16px' }}>
        {language === 'en'
          ? 'Your order has been confirmed and is being processed.'
          : 'Seu pedido foi confirmado e está sendo processado.'}
      </p>
      <p style={{ fontSize: '16px', marginBottom: '16px' }}>
        {language === 'en'
          ? 'We will notify you once your order is ready for pickup or delivery.'
          : 'Nós o notificaremos assim que seu pedido estiver pronto para retirada ou entrega.'}
      </p>

      <OrderDetails language={language} order={order} />
      <ShippingDetails language={language} order={order} />
      <OrderSummary language={language} order={order} />

      <p style={{ fontSize: '16px', marginBottom: '16px' }}>
        {language === 'en' ? 'Best regards,' : 'Atenciosamente,'}
        <br />
        {language === 'en' ? 'The Royal Sweet Team' : 'Equipe The Royal Sweet'}
      </p>
    </div>
  )
}