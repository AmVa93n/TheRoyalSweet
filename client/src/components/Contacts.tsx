import { useStore } from '../store';

function Contacts() {
  const { language } = useStore();

  const contactDetails = {
    en: {
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      emailValue: 'theroyalsweetcakeshop@gmail.com',
      phoneValue: '+351 963783279',
      phoneTimes: 'Tuesday - Sunday; 9h - 19h',
      addressValue: 'Avenida Paris, 1000-228 Lisbon',
    },
    pt: {
      email: 'E-mail',
      phone: 'Telefone',
      address: 'Endereço',
      emailValue: 'theroyalsweetcakeshop@gmail.com',
      phoneValue: '+351 963783279',
      phoneTimes: 'Terça - Domingo; 9h - 19h',
      addressValue: 'Avenida Paris, 1000-228 Lisboa',
    }
  };

  const text = contactDetails[language || 'pt'];

  function handleMailTo() {
    window.open(`mailto:${text.emailValue}`, '_blank');
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 text-center" id='contacts'>
      <h2 className="text-3xl font-montserrat italic mb-8 text-[#593b3e]">
        {language === 'en' ? 'Contacts' : 'Contactos'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[#593b3e]">
        {/* Email */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{text.email}</h3>
          <button
            onClick={handleMailTo}
            className="text-[#593b3e] hover:underline transition-all font-medium"
          >
            {text.emailValue}
          </button>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{text.phone}</h3>
          <p className="font-medium">{text.phoneValue}</p>
          <p className="text-sm">{text.phoneTimes}</p>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{text.address}</h3>
          <p className="font-medium">{text.addressValue}</p>
        </div>
      </div>
    </section>
  );
}

export default Contacts;