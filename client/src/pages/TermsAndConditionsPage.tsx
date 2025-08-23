import { useStore } from '../store';

function TermsAndConditionsPage() {
    const { language } = useStore();

    const text = {
        en: [
            {
                title: '1. Company Information',
                content: 'The Royal Sweet online store is operated by Gonçalo Xavier as a sole proprietor, registered in Portugal under CAE 10712 – Manufacture of cakes and pastry products. Additional information can be provided upon request via the contact form.'
            },
            {
                title: '2. Products',
                content: 'All products are handmade to order, following good hygiene and food safety practices. Images displayed are for illustrative purposes; the final product may show slight variations.'
            },
            {
                title: '3. Orders and Payment',
                content: 'Orders may be placed through the online form, email, direct contact via social media, or by phone. Orders placed by phone must be confirmed in writing (email, message, or other digital format) to ensure registration and validation. Order confirmation is subject to availability and is only considered valid after payment.'
            },
            {
                title: '4. Deliveries',
                content: 'Deliveries are made in person at a mutually agreed location. At this time, we do not offer home delivery service.'
            },
            {
                title: '5. Cancellations and Refunds',
                content: 'As products are customized and perishable, returns are not accepted. Cancellations made up to 72 hours before delivery are eligible for a full refund. Cancellations within 72 hours are non-refundable.'
            },
            {
                title: '6. Liability',
                content: 'The Royal Sweet is not responsible for any damage to products after delivery, especially if transported by the customer. In the event of a proven error on our part, a fair and appropriate solution will be provided.'
            },
            {
                title: '7. Governing Law',
                content: 'These terms are governed by Portuguese law. In case of dispute, the consumer may refer to the Consumer Conflict Arbitration Center in their region.'
            },
            {
                title: '8. Complaints',
                content: 'In compliance with Portuguese legislation, The Royal Sweet provides access to the Electronic Complaints Book. You may submit a complaint through the official platform: www.livroreclamacoes.pt'
            }
        ],
        pt: [
            {
                title: '1. Informações da Empresa',
                content: 'A loja online The Royal Sweet é gerida por Gonçalo Xavier, em nome individual, registado em Portugal com o CAE 10712 – Fabricação de bolos e produtos de pastelaria. Dados adicionais podem ser fornecidos mediante pedido através do formulário de contacto.'
            },
            {
                title: '2. Produtos',
                content: 'Todos os produtos são feitos artesanalmente por encomenda, seguindo boas práticas de higiene e segurança alimentar. As imagens apresentadas são ilustrativas; o produto final pode apresentar ligeiras variações.'
            },
            {
                title: '3. Encomendas e Pagamento',
                content: 'As encomendas podem ser feitas através do formulário online, email, contacto direto via redes sociais ou por telefone. Encomendas feitas por telefone devem ser confirmadas por escrito (email, mensagem ou outro meio digital) para garantir o registo e validação. A confirmação da encomenda está sujeita à disponibilidade de agenda e só é considerada válida após pagamento.'
            },
            {
                title: '4. Entregas',
                content: 'As entregas são realizadas presencialmente num local a combinar. De momento, não possuimos serviço de entrega ao domicílio.'
            },
            {
                title: '5. Cancelamentos e Reembolsos',
                content: 'Dado que os produtos são personalizados e perecíveis, não se aceitam devoluções. Cancelamentos até 72 horas antes da entrega têm direito a reembolso total. Cancelamentos com menos de 72 horas não são reembolsáveis.'
            },
            {
                title: '6. Responsabilidade',
                content: 'The Royal Sweet não se responsabiliza por danos nos produtos após a entrega, especialmente se forem transportados pelo cliente. Em caso de erro comprovado da nossa parte, será apresentada uma solução justa e adequada.'
            },
            {
                title: '7. Legislação Aplicável',
                content: 'Estes termos são regidos pela legislação portuguesa. Em caso de litígio, o consumidor pode recorrer ao Centro de Arbitragem de Conflitos de Consumo da sua região.'
            },
            {
                title: '8. Reclamações',
                content: 'Em conformidade com a legislação portuguesa, a The Royal Sweet disponibiliza o acesso ao Livro de Reclamações Eletrónico. Pode submeter uma reclamação através da plataforma oficial: www.livroreclamacoes.pt.'
            }
        ]
    }

    return (
        <main className="mx-auto max-w-6xl px-4 pt-28 pb-16">
            <header className="mb-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        {language === "pt" ? "Termos e Condições" : "Terms and Conditions"}
                    </h1>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px,1fr]">
                <section className="space-y-4">
                    {text[language].map((term) => (
                        <article
                            key={term.title}
                            className="group scroll-mt-28 rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm ring-1 ring-black/5 transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900/60"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {term.title}
                                </h3>
                            </div>
                            <p className="mt-2 text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
                                {term.content}
                            </p>
                        </article>
                        ))}
                </section>
            </div>
        </main>
    );
}

export default TermsAndConditionsPage;