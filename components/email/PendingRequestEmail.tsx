import { Order } from '../../types';
import OrderDetails from './OrderDetails';
import OrderSummary from './OrderSummary';

export default function PendingRequestEmail({ order }: { order: Order }) {
  const { language, name } = order;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', padding: '16px', fontSize: '16px' }}>
      {language === 'en' ? 
        <>
          <p>{`Thank you for your request, ${name}!`}</p>
          <p>All orders are subject to confirmation according to availability. Your request will be reviewed <b>within 24 hours</b> and you will receive a confirmation email.</p>
          <p>In that email, you will find all the payment details and our full address for the pickup. Once you receive it, please complete your payment as soon as possible, so that we can begin working on your request.</p>
          <p>If, for any reason, we are unable to fulfill your request, we will get in touch via WhatsApp or email to find a solution.</p>
        </>
        : 
        <>
          <p>{`Muito obrigado pelo seu pedido, ${name}!`}</p>
          <p>Todas as encomendas são pendentes de confirmação, consoante disponibilidade. O seu pedido será revisto <b>dentro de 24 horas</b> e receberá um email de confirmação.</p>
          <p>Nesse email encontrará os detalhes de pagamento. Após receber o email, por favor, efectue o pagamento assim que possível, para podermos começar a trabalhar no seu pedido de imediato.</p>
          <p>Se, por algum motivo, não conseguirmos satisfazer o seu pedido, entraremos em contacto por WhatsApp ou email para encontrar uma solução.</p>
        </>
      }

      <OrderDetails language={language} order={order} />
      <OrderSummary language={language} order={order} />

      <p>
        {language === 'en' ? 'See you soon,' : 'Até já,'}
        <br />
        Gonçalo Xavier
      </p>
    </div>
  )
}