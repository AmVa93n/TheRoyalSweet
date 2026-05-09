import { Order } from "@/types";

export default function ShippingDetails({ order, language }: { order: Order; language: 'en' | 'pt' }) {
  const { pickup, shipping } = order;
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