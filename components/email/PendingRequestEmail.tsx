import { Order } from '../../types';
import OrderDetails from './OrderDetails';
import ShippingDetails from './ShippingDetails';
import OrderSummary from './OrderSummary';

export default function PendingRequestEmail({ order }: { order: Order }) {
  const { language, name } = order;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', padding: '16px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
        {language === 'en' ? `Thank you for your order, ${name}!` : `Obrigado pelo seu pedido, ${name}!`}
      </h1>
      <p style={{ fontSize: '16px', marginBottom: '16px' }}>
        {language === 'en'
          ? 'Your request has been received and is pending confirmation.'
          : 'Seu pedido foi recebido e está pendente de confirmação.'}
      </p>
      <p style={{ fontSize: '16px', marginBottom: '16px' }}>
        {language === 'en'
          ? 'We will notify you shortly whether your request has been confirmed.'
          : 'Nós o notificaremos em breve se seu pedido foi confirmado.'}
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