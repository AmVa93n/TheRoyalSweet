import { Order } from "@/types";

export default function OrderDetails({ order, language }: { order: Order; language: 'en' | 'pt' }) {
  const { name, email, phone, createdAt, deliveryDate } = order;

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