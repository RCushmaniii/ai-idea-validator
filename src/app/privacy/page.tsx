'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function PrivacyPage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: January 2025',
      intro: 'Your privacy is important to us. This Privacy Policy explains how AI Idea Validator collects, uses, and protects your information when you use our Service.',
      sections: [
        {
          heading: '1. Information We Collect',
          text: 'We collect information you voluntarily provide when using the AI Idea Validator assessment, including your responses to questions about your startup idea. We may also collect basic usage data such as pages visited, time spent on the site, and general interaction patterns.',
        },
        {
          heading: '2. How We Use Your Information',
          text: 'Your assessment responses are used solely to generate your defensibility analysis. We may use aggregated, anonymized data to improve our assessment methodology and user experience. We do not sell, rent, or share your personal information or startup ideas with third parties.',
        },
        {
          heading: '3. Data Storage',
          text: 'Assessment data is processed in your browser and is not permanently stored on our servers unless you explicitly choose to save or export your results. Any data temporarily processed is handled securely and deleted after your session ends.',
        },
        {
          heading: '4. Cookies and Tracking',
          text: 'We may use essential cookies to maintain your session and preferences (such as language and theme settings). We do not use tracking cookies for advertising purposes. You can control cookie settings through your browser preferences.',
        },
        {
          heading: '5. Third-Party Services',
          text: 'Our Service may include links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party services you access.',
        },
        {
          heading: '6. Data Security',
          text: 'We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.',
        },
        {
          heading: '7. Your Rights',
          text: 'You have the right to access, correct, or delete any personal information we may have about you. Since we minimize data collection, most information exists only in your browser session. Contact us if you have concerns about your data.',
        },
        {
          heading: '8. Children\'s Privacy',
          text: 'Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.',
        },
        {
          heading: '9. Changes to This Policy',
          text: 'We may update this Privacy Policy from time to time. We will notify users of any material changes by posting the new policy on this page with an updated revision date.',
        },
        {
          heading: '10. Contact Us',
          text: 'If you have any questions or concerns about this Privacy Policy or our data practices, please contact us through the information provided on our website.',
        },
      ],
    },
    es: {
      title: 'Politica de Privacidad',
      lastUpdated: 'Ultima actualizacion: Enero 2025',
      intro: 'Su privacidad es importante para nosotros. Esta Politica de Privacidad explica como AI Idea Validator recopila, utiliza y protege su informacion cuando utiliza nuestro Servicio.',
      sections: [
        {
          heading: '1. Informacion que Recopilamos',
          text: 'Recopilamos la informacion que usted proporciona voluntariamente al usar la evaluacion AI Idea Validator, incluyendo sus respuestas a preguntas sobre su idea de startup. Tambien podemos recopilar datos basicos de uso como paginas visitadas, tiempo en el sitio y patrones generales de interaccion.',
        },
        {
          heading: '2. Como Usamos su Informacion',
          text: 'Sus respuestas de evaluacion se utilizan unicamente para generar su analisis de defensibilidad. Podemos usar datos agregados y anonimizados para mejorar nuestra metodologia de evaluacion y experiencia de usuario. No vendemos, alquilamos ni compartimos su informacion personal o ideas de startup con terceros.',
        },
        {
          heading: '3. Almacenamiento de Datos',
          text: 'Los datos de evaluacion se procesan en su navegador y no se almacenan permanentemente en nuestros servidores a menos que elija explicitamente guardar o exportar sus resultados. Cualquier dato procesado temporalmente se maneja de forma segura y se elimina despues de que termine su sesion.',
        },
        {
          heading: '4. Cookies y Seguimiento',
          text: 'Podemos usar cookies esenciales para mantener su sesion y preferencias (como configuraciones de idioma y tema). No utilizamos cookies de seguimiento con fines publicitarios. Puede controlar la configuracion de cookies a traves de las preferencias de su navegador.',
        },
        {
          heading: '5. Servicios de Terceros',
          text: 'Nuestro Servicio puede incluir enlaces a sitios web o servicios de terceros. No somos responsables de las practicas de privacidad de estos sitios externos. Le recomendamos revisar las politicas de privacidad de cualquier servicio de terceros al que acceda.',
        },
        {
          heading: '6. Seguridad de Datos',
          text: 'Implementamos medidas tecnicas y organizativas apropiadas para proteger su informacion contra acceso no autorizado, alteracion, divulgacion o destruccion. Sin embargo, ningun metodo de transmision por internet es 100% seguro.',
        },
        {
          heading: '7. Sus Derechos',
          text: 'Tiene derecho a acceder, corregir o eliminar cualquier informacion personal que podamos tener sobre usted. Dado que minimizamos la recopilacion de datos, la mayor parte de la informacion existe solo en la sesion de su navegador. Contactenos si tiene inquietudes sobre sus datos.',
        },
        {
          heading: '8. Privacidad de Menores',
          text: 'Nuestro Servicio no esta destinado a menores de 13 anos. No recopilamos intencionalmente informacion personal de ninos. Si cree que hemos recopilado inadvertidamente dicha informacion, contactenos inmediatamente.',
        },
        {
          heading: '9. Cambios a esta Politica',
          text: 'Podemos actualizar esta Politica de Privacidad de vez en cuando. Notificaremos a los usuarios sobre cualquier cambio material publicando la nueva politica en esta pagina con una fecha de revision actualizada.',
        },
        {
          heading: '10. Contactenos',
          text: 'Si tiene alguna pregunta o inquietud sobre esta Politica de Privacidad o nuestras practicas de datos, por favor contactenos a traves de la informacion proporcionada en nuestro sitio web.',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <div className="bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          {t.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {t.lastUpdated}
        </p>
        <p className="mt-6 text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {t.intro}
        </p>

        <div className="mt-12 space-y-8">
          {t.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {section.heading}
              </h2>
              <p className="mt-3 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {section.text}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
