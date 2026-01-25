'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function TermsPage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: January 2025',
      sections: [
        {
          heading: '1. Acceptance of Terms',
          text: 'By accessing and using AI Idea Validator ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.',
        },
        {
          heading: '2. Description of Service',
          text: 'AI Idea Validator is a free tool that helps founders assess the defensibility of their startup ideas. The Service provides a guided questionnaire and generates analysis based on your inputs. The assessments are for informational purposes only and should not be considered professional business, legal, or financial advice.',
        },
        {
          heading: '3. User Responsibilities',
          text: 'You are responsible for the accuracy of information you provide. You agree not to use the Service for any unlawful purpose or in any way that could damage, disable, or impair the Service. You must not attempt to gain unauthorized access to any part of the Service.',
        },
        {
          heading: '4. Intellectual Property',
          text: 'The Service, including its original content, features, and functionality, is owned by AI Idea Validator and is protected by international copyright, trademark, and other intellectual property laws. Your use of the Service does not grant you ownership of any content or materials you may access.',
        },
        {
          heading: '5. User Content',
          text: 'Any information you submit through the Service remains your property. By submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, process, and analyze that content solely for the purpose of providing the Service to you. We do not claim ownership of your startup ideas or business concepts.',
        },
        {
          heading: '6. Disclaimer of Warranties',
          text: 'The Service is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not guarantee that the Service will be uninterrupted, secure, or error-free. The assessments generated are based on general frameworks and may not account for all factors relevant to your specific situation.',
        },
        {
          heading: '7. Limitation of Liability',
          text: 'In no event shall AI Idea Validator, its operators, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. This includes any business decisions made based on the assessments provided.',
        },
        {
          heading: '8. Changes to Terms',
          text: 'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the Service. Your continued use of the Service after any changes constitutes acceptance of the new terms.',
        },
        {
          heading: '9. Governing Law',
          text: 'These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.',
        },
        {
          heading: '10. Contact',
          text: 'If you have any questions about these Terms of Service, please contact us through the information provided on our website.',
        },
      ],
    },
    es: {
      title: 'Terminos de Servicio',
      lastUpdated: 'Ultima actualizacion: Enero 2025',
      sections: [
        {
          heading: '1. Aceptacion de Terminos',
          text: 'Al acceder y utilizar AI Idea Validator ("el Servicio"), usted acepta estar sujeto a estos Terminos de Servicio. Si no esta de acuerdo con estos terminos, por favor no utilice el Servicio.',
        },
        {
          heading: '2. Descripcion del Servicio',
          text: 'AI Idea Validator es una herramienta gratuita que ayuda a los fundadores a evaluar la defensibilidad de sus ideas de startup. El Servicio proporciona un cuestionario guiado y genera analisis basados en sus respuestas. Las evaluaciones son solo para fines informativos y no deben considerarse como asesoramiento profesional de negocios, legal o financiero.',
        },
        {
          heading: '3. Responsabilidades del Usuario',
          text: 'Usted es responsable de la exactitud de la informacion que proporciona. Acepta no utilizar el Servicio para ningun proposito ilegal o de ninguna manera que pueda danar, deshabilitar o perjudicar el Servicio. No debe intentar obtener acceso no autorizado a ninguna parte del Servicio.',
        },
        {
          heading: '4. Propiedad Intelectual',
          text: 'El Servicio, incluyendo su contenido original, caracteristicas y funcionalidad, es propiedad de AI Idea Validator y esta protegido por leyes internacionales de derechos de autor, marcas comerciales y otras leyes de propiedad intelectual. Su uso del Servicio no le otorga propiedad sobre ningun contenido o material al que pueda acceder.',
        },
        {
          heading: '5. Contenido del Usuario',
          text: 'Cualquier informacion que envie a traves del Servicio sigue siendo de su propiedad. Al enviar contenido, nos otorga una licencia no exclusiva, mundial y libre de regalias para usar, procesar y analizar ese contenido unicamente con el proposito de proporcionarle el Servicio. No reclamamos propiedad sobre sus ideas de startup o conceptos de negocio.',
        },
        {
          heading: '6. Descargo de Garantias',
          text: 'El Servicio se proporciona "tal cual" y "segun disponibilidad" sin garantias de ningun tipo, ya sean expresas o implicitas. No garantizamos que el Servicio sea ininterrumpido, seguro o libre de errores. Las evaluaciones generadas se basan en marcos generales y pueden no tener en cuenta todos los factores relevantes para su situacion especifica.',
        },
        {
          heading: '7. Limitacion de Responsabilidad',
          text: 'En ningun caso AI Idea Validator, sus operadores o afiliados seran responsables de ningun dano indirecto, incidental, especial, consecuente o punitivo que surja de su uso del Servicio. Esto incluye cualquier decision comercial tomada en base a las evaluaciones proporcionadas.',
        },
        {
          heading: '8. Cambios en los Terminos',
          text: 'Nos reservamos el derecho de modificar estos terminos en cualquier momento. Los cambios entraran en vigor inmediatamente despues de su publicacion en el Servicio. Su uso continuado del Servicio despues de cualquier cambio constituye la aceptacion de los nuevos terminos.',
        },
        {
          heading: '9. Ley Aplicable',
          text: 'Estos terminos se regiran e interpretaran de acuerdo con las leyes aplicables, sin tener en cuenta los principios de conflicto de leyes.',
        },
        {
          heading: '10. Contacto',
          text: 'Si tiene alguna pregunta sobre estos Terminos de Servicio, por favor contactenos a traves de la informacion proporcionada en nuestro sitio web.',
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
