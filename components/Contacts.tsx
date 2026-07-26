import { useStore } from '@/store';
import { WhatsappLogoIcon } from '@phosphor-icons/react';

function Contacts() {
  const { language } = useStore();

  const contactDetails = {
    en: {
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      emailValue: 'goncaloxavierdocaria@gmail.com',
      phoneValue: '+351 963783279',
      phoneTimes: 'Tuesday - Sunday; 9h - 19h',
      addressValue: 'Avenida Paris, 1000-228 Lisbon',
    },
    pt: {
      email: 'E-mail',
      phone: 'Telefone',
      address: 'Endereço',
      emailValue: 'goncaloxavierdocaria@gmail.com',
      phoneValue: '+351 963783279',
      phoneTimes: 'Terça - Domingo; 9h - 19h',
      addressValue: 'Avenida Paris, 1000-228 Lisboa',
    }
  };

  const text = contactDetails[language || 'pt'];

  function handleMailTo() {
    window.open(`mailto:${text.emailValue}`, '_blank');
  }

  function handleWhatsApp() {
    window.open(`https://wa.me/message/L7KMQJTLGANBO1`, '_blank');
  }

  return (
    <section className="bg-brownLighter" id='contacts'>
      <div className='max-w-6xl mx-auto px-4 py-10 text-center'>
        <h2 className="text-3xl font-montserrat italic mb-8 text-brownPrimary">
          {language === 'en' ? 'Contacts' : 'Contactos'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-brownDark">
          {/* Email */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{text.email}</h3>
            <button
              onClick={handleMailTo}
              className="text-brownDark hover:underline transition-all"
            >
              {text.emailValue}
            </button>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{text.phone}</h3>
            <p>{text.phoneValue}</p>
            {/* <p className="text-sm">{text.phoneTimes}</p> */}
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 mx-auto rounded-full px-3 py-1 bg-brownLight text-brownDark cursor-pointer"
            >
              <WhatsappLogoIcon size={24} />
              WhatsApp
            </button>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{text.address}</h3>
            <p>{text.addressValue}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacts;