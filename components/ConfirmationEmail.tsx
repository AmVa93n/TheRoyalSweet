import { Order, CartItem } from '../types';

export default function ConfirmationEmail({ order }: { order: Order }) {
  const { language, name, pickup, items, email, phone, createdAt, deliveryDate, shipping } = order;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', padding: '16px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
        {language === 'en' ? `Thank you for your order, ${name}!` : `Obrigado pelo seu pedido, ${name}!`}
      </h1>
      <p style={{ fontSize: '16px', marginBottom: '16px' }}>
        {language === 'en'
          ? 'Your order has been received and is being processed.'
          : 'Seu pedido foi recebido e está sendo processado.'}
      </p>
      <p style={{ fontSize: '16px', marginBottom: '16px' }}>
        {language === 'en'
          ? 'We will notify you once your order is ready for pickup or delivery.'
          : 'Nós o notificaremos assim que seu pedido estiver pronto para retirada ou entrega.'}
      </p>

      <OrderDetails language={language} name={name} email={email} phone={phone} createdAt={createdAt} deliveryDate={deliveryDate} />
      <ShippingDetails language={language} pickup={pickup} shipping={shipping} />
      <OrderSummary language={language} pickup={pickup} items={items} />

      <p style={{ fontSize: '16px', marginBottom: '16px' }}>
        {language === 'en' ? 'Best regards,' : 'Atenciosamente,'}
        <br />
        {language === 'en' ? 'The Royal Sweet Team' : 'Equipe The Royal Sweet'}
      </p>
    </div>
  )
}

function OrderDetails({
  language,
  name,
  email,
  phone,
  createdAt,
  deliveryDate,
}: {
  language: 'en' | 'pt';
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  deliveryDate?: string;
}) {
  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        padding: '24px',
        fontFamily: 'Arial, sans-serif',
        lineHeight: 1.5,
      }}
    >
      <h2
        style={{
          fontSize: '20px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '16px',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: '8px',
        }}
      >
        {language === 'en' ? 'Order Details' : 'Detalhes do Pedido'}
      </h2>

      <p style={{ color: '#6b7280', marginBottom: '8px' }}>
        <strong style={{ fontWeight: 500, color: '#111827' }}>
          {language === 'en' ? 'Name' : 'Nome'}:
        </strong>{' '}
        {name}
      </p>
      <p style={{ color: '#6b7280', marginBottom: '8px' }}>
        <strong style={{ fontWeight: 500, color: '#111827' }}>
          {language === 'en' ? 'Email' : 'Email'}:
        </strong>{' '}
        {email}
      </p>
      <p style={{ color: '#6b7280', marginBottom: '8px' }}>
        <strong style={{ fontWeight: 500, color: '#111827' }}>
          {language === 'en' ? 'Phone' : 'Telefone'}:
        </strong>{' '}
        {phone}
      </p>
      <p style={{ color: '#6b7280', marginBottom: '8px' }}>
        <strong style={{ fontWeight: 500, color: '#111827' }}>
          {language === 'en' ? 'Created' : 'Criado'}:
        </strong>{' '}
        {createdAt.split('T')[0]}
      </p>
      {deliveryDate && (
        <p style={{ color: '#6b7280', marginBottom: '8px' }}>
          <strong style={{ fontWeight: 500, color: '#111827' }}>
            {language === 'en' ? 'Delivery Date' : 'Data de Entrega'}:
          </strong>{' '}
          {deliveryDate.split('T')[0]}
        </p>
      )}
    </div>
  );
}

function ShippingDetails({
  language,
  pickup,
  shipping,
}: {
  language: 'en' | 'pt';
  pickup: boolean;
  shipping: { city: string; address: string; zip: string };
}) {
  if (pickup) {
    return (
      <div
        style={{
          display: 'inline-block',
          backgroundColor: '#dbeafe', // lighter blue
          color: '#1e3a8a',
          borderRadius: '8px',
          padding: '10px 16px',
          fontWeight: 600,
          margin: '16px 0',
          fontSize: '14px',
        }}
      >
        {language === 'en' ? 'Pickup' : 'Retirada'}
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '16px auto',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        backgroundColor: '#f9fafb',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        lineHeight: 1.5,
      }}
    >
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#111827',
          marginBottom: '12px',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: '6px',
        }}
      >
        {language === 'en' ? 'Shipping Details' : 'Detalhes de Envio'}
      </h3>
      <div style={{ color: '#6b7280', lineHeight: '1.6', fontSize: '14px' }}>
        <p>
          📍 {language === 'en' ? 'City' : 'Cidade'}: {shipping.city}
        </p>
        <p>
          🏠 {language === 'en' ? 'Address' : 'Endereço'}: {shipping.address}
        </p>
        <p>
          📮 {language === 'en' ? 'ZIP' : 'CEP'}: {shipping.zip}
        </p>
      </div>
    </div>
  );
}

function OrderSummary({ language, pickup, items }: { language: 'en' | 'pt'; pickup: boolean; items: CartItem[] }) {
  const deliveryFee = pickup ? 0 : 5;
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#e6dcd5', padding: '16px', borderRadius: '8px', maxWidth: '600px', margin: '0 auto', border: '1px solid #e5e7eb' }}>
      
      <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
        {language === 'en' ? 'Order Summary' : 'Resumo do Pedido'} ({totalItems})
      </h2>

      <hr style={{ border: '1px solid #e5e7eb', margin: '16px 0' }} />

      {/* Items */}
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tbody>
          {items.map((item, i) => (
            <OrderSummaryItem key={i} item={item} language={language} />
          ))}
        </tbody>
      </table>

      <hr style={{ border: '1px solid #e5e7eb', margin: '16px 0' }} />

      {/* Summary */}
      <table width="100%">
        <tbody>
          <tr>
            <td>{language === 'en' ? 'Items' : 'Produtos'}</td>
            <td style={{ textAlign: 'right' }}>{totalAmount.toFixed(2).replace('.', ',')} €</td>
          </tr>
          <tr>
            <td>{language === 'en' ? 'Delivery' : 'Entrega'}</td>
            <td style={{ textAlign: 'right' }}>{deliveryFee.toFixed(2).replace('.', ',')} €</td>
          </tr>
        </tbody>
      </table>

      <hr style={{ border: '1px solid #e5e7eb', margin: '16px 0' }} />

      {/* Total */}
      <table width="100%">
        <tbody>
          <tr>
            <td style={{ fontSize: '18px', fontWeight: '700' }}>Total</td>
            <td style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '18px', fontWeight: '700' }}>
                {(totalAmount + deliveryFee).toFixed(2).replace('.', ',')} €
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                {language === 'en' ? 'Including 23% VAT' : 'Inclui 23% IVA'}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function OrderSummaryItem({ item, language }: { item: CartItem; language: 'en' | 'pt' }) {
  return (
    <tr>
      <td style={{ paddingBottom: '12px' }}>
        
        <table width="100%">
          <tbody>
            <tr>
              {/* Image */}
              <td width="50" valign="top">
                <img
                  src={item.product?.images[0] || 'https://yourdomain.com/assets/customcake.webp'}
                  alt=""
                  width="40"
                  height="40"
                  style={{ objectFit: 'cover', display: 'block' }}
                />
              </td>

              {/* Name */}
              <td valign="middle" style={{ fontSize: '14px' }}>
                {item.product?.name[language] ||
                  (language === 'en' ? 'Custom Cake' : 'Bolo Personalizado')} x {item.quantity}
              </td>

              {/* Price */}
              <td valign="middle" style={{ textAlign: 'right', fontSize: '14px' }}>
                {(item.price * item.quantity).toFixed(2).replace('.', ',')} €
              </td>
            </tr>

            {/* Custom Cake Details */}
            {item.customCake && (
              <tr>
                <td></td>
                <td colSpan={2} style={{ fontSize: '12px', color: '#6b7280', paddingTop: '4px' }}>
                  <div><strong>{language === 'en' ? 'Dough' : 'Massa'}:</strong> {item.customCake.dough.name[language]}</div>
                  <div><strong>{language === 'en' ? 'Filling' : 'Recheio'}:</strong> {item.customCake.filling.name[language]}</div>
                  <div><strong>{language === 'en' ? 'Frosting' : 'Cobertura'}:</strong> {item.customCake.frosting.name[language]}</div>
                  {item.customCake.topping && (
                    <div><strong>{language === 'en' ? 'Topping' : 'Decoração'}:</strong> {item.customCake.topping.name[language]}</div>
                  )}
                </td>
              </tr>
            )}

            {/* Note */}
            {item.note && (
              <tr>
                <td></td>
                <td colSpan={2} style={{ fontSize: '12px', color: '#6b7280', fontStyle: 'italic', paddingTop: '4px' }}>
                  "{item.note}"
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </td>
    </tr>
  );
}