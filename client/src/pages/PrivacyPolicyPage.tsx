import { useStore } from '../store';

function TermsAndConditionsPage() {
    const { language } = useStore();

    const text = {
        en: [
            {
                title: '1. Data Collection',
                content: 'The Royal Sweet only collects data strictly necessary to process orders and communicate with the client: name, contact, and email. This data is not shared with third parties.'
            },
            {
                title: '2. Purpose',
                content: 'The data will be used solely for the provision of services and for sending updates or relevant promotions, if authorized.'
            },
            {
                title: '3. Data Retention',
                content: 'Data will be stored for the legally required period for tax and administrative purposes. Clients may request deletion of their data at any time.'
            },
            {
                title: '4. Cookies',
                content: 'The website may use cookies for functional purposes and to improve user experience. No sensitive data is collected or shared with third parties.'
            },
            {
                title: '5. User Rights',
                content: 'Users have the right to access, correct, or delete their personal data by contacting theroyalsweetcakeshop@gmail.com.'
            },
            {
                title: '6. Governing Law',
                content: 'These terms are governed by Portuguese law. In case of dispute, the consumer may refer to the Consumer Conflict Arbitration Center in their region.'
            }
        ],
        pt: [
            {
                title: '1. Recolha de Dados',
                content: 'The Royal Sweet apenas recolhe os dados estritamente necessários para processamento das encomendas e comunicação com o cliente: nome, contacto e email. Estes dados não são partilhados com terceiros.'
            },
            {
                title: '2. Finalidade',
                content: 'Os dados serão utilizados unicamente para prestação do serviço e envio de atualizações ou promoções relevantes, caso autorizado.'
            },
            {
                title: '3. Retenção de Dados',
                content: 'Os dados serão guardados durante o período legal exigido para efeitos fiscais e administrativos. O cliente pode solicitar a eliminação dos seus dados a qualquer momento.'
            },
            {
                title: '4. Cookies',
                content: 'O site pode utilizar cookies para fins funcionais e para melhorar a experiência do utilizador. Nenhum dado sensível é recolhido ou partilhado com terceiros.'
            },
            {
                title: '5. Direitos dos Utilizadores',
                content: 'Os utilizadores têm direito de acesso, correção ou eliminação dos seus dados pessoais, bastando para isso contactar através de theroyalsweetcakeshop@gmail.com'
            },
            {
                title: '6. Legislação Aplicável',
                content: 'Estes termos são regidos pela legislação portuguesa. Em caso de litígio, o consumidor pode recorrer ao Centro de Arbitragem de Conflitos de Consumo da sua região.'
            }
        ]
    }

    return (
        <main className="mx-auto max-w-6xl px-4 pt-28 pb-16">
            <header className="mb-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        {language === "pt" ? "Política de Privacidade" : "Privacy Policy"}
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