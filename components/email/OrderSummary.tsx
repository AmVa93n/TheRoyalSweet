import { CartItem, Order } from "@/types";

export default function OrderSummary({ order, language }: { order: Order; language: 'en' | 'pt' }) {
  const { pickup, items } = order;
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