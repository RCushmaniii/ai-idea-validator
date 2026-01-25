export type Language = 'en' | 'es';

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      killTest: 'AI Idea Validator',
    },

    // Header
    header: {
      logo: 'AI Idea Validator',
    },

    // Footer
    footer: {
      tagline: 'Know before you build.',
      description: 'A brutal, honest assessment for founders who refuse to waste years on ideas that were never going to work.',
      navigation: 'Navigation',
      builtFor: 'Built for founders who value their time.',
      copyright: '© 2025 AI Idea Validator. No rights reserved—ideas are free.',
    },

    // Homepage
    home: {
      hero: {
        title: 'Is your idea defensible?',
        subtitle: 'Find out before you build.',
        description: 'Most startup ideas fail not because they\'re bad—but because they\'re replaceable. Run the AI Idea Validator to discover if your business can survive competition, platform changes, and the brutal realities of solo building.',
        cta: 'Run the AI Idea Validator',
        secondary: 'Learn how it works',
      },
      problem: {
        title: 'The Uncomfortable Truth',
        subtitle: 'Why Most Ideas Fail',
        points: [
          {
            title: 'Features aren\'t moats',
            description: 'Anything you build with public APIs can be cloned in weeks. Your "AI-powered" feature is one prompt away from being a commodity.',
          },
          {
            title: 'Platforms don\'t care about you',
            description: 'One policy change, one price increase, one API restriction—and your entire business model evaporates overnight.',
          },
          {
            title: 'Being good isn\'t enough',
            description: 'Your product might be technically excellent. But if customers can easily switch to a competitor or live without you, you have nothing.',
          },
        ],
      },
      whatItDoes: {
        title: 'What the AI Idea Validator Does',
        subtitle: 'A Ruthless Evaluation',
        points: [
          {
            title: 'Exposes false moats',
            description: 'Identifies where your competitive advantages are actually illusions waiting to be shattered.',
          },
          {
            title: 'Tests platform dependency',
            description: 'Reveals how vulnerable you are to changes from platforms you don\'t control.',
          },
          {
            title: 'Evaluates solo-founder survivability',
            description: 'Determines if the business can thrive—or will quietly become a 24/7 job.',
          },
          {
            title: 'Measures switching costs',
            description: 'Assesses whether customers would actually feel pain if they left.',
          },
          {
            title: 'Calculates asymmetric risk',
            description: 'Weighs the potential upside against what you\'re truly risking.',
          },
        ],
      },
      whoItsFor: {
        title: 'Who It\'s For',
        subtitle: 'Serious Builders Only',
        personas: [
          {
            title: 'Solo Founders',
            description: 'You\'re betting your time and sanity on an idea. Make sure it\'s worth it before you go all in.',
          },
          {
            title: 'Freelancers',
            description: 'Thinking of productizing your services? Know if it\'ll become a business or just more client work in disguise.',
          },
          {
            title: 'Indie Hackers',
            description: 'Ship fast, but ship smart. Don\'t build something a weekend project could replace.',
          },
        ],
      },
      howItWorks: {
        title: 'How It Works',
        subtitle: 'Five Minutes to Clarity',
        steps: [
          {
            number: '01',
            title: 'Describe your idea',
            description: 'Tell us what you\'re building, who pays, and what happens when it works.',
          },
          {
            number: '02',
            title: 'Face the hard questions',
            description: 'Answer 24 questions designed to expose weaknesses in defensibility, platform risk, and scaling.',
          },
          {
            number: '03',
            title: 'Get your verdict',
            description: 'Receive a clear recommendation: Kill, Flip, Build, or Bet—with specific risk highlights.',
          },
        ],
      },
      cta: {
        title: 'Ready to find out?',
        description: 'Stop guessing. Stop hoping. Get a clear answer about whether your idea has what it takes.',
        button: 'Start the AI Idea Validator',
        note: 'Takes about 5-10 minutes. No signup required.',
      },
    },

    // About page
    about: {
      title: 'About AI Idea Validator',
      subtitle: 'Why This Exists',
      intro: 'AI Idea Validator was built because too many founders waste years on ideas that were never going to work—not because the ideas were bad, but because they were fundamentally replaceable.',
      sections: [
        {
          title: 'The Problem We Solve',
          content: 'Most startup advice focuses on execution: ship fast, talk to customers, iterate. That\'s all true. But none of it matters if your idea lacks structural defensibility. You can execute perfectly on an idea that has no moat—and still fail.',
        },
        {
          title: 'What Makes This Different',
          content: 'This isn\'t a brainstorming tool or an idea validator that tells you what you want to hear. It\'s a filter. A hostile, rational evaluation that assumes competitors have the same tools you do, platforms change rules when convenient, and customers are lazy and risk-averse.',
        },
        {
          title: 'How We Evaluate',
          content: 'The AI Idea Validator runs your idea through 24 carefully crafted questions covering defensibility, copycat velocity, platform dependency, data moats, workflow lock-in, pricing power, solo-founder sustainability, and failure modes.',
        },
        {
          title: 'The Outcomes',
          content: 'Every idea gets one of four verdicts: KILL (fundamentally weak), FLIP (pivot required), BUILD (defensible with discipline), or BET (risky but asymmetric upside). No middle ground. No "it depends." A clear answer.',
        },
      ],
      philosophy: {
        title: 'Our Philosophy',
        points: [
          'Killing an idea early is success, not failure.',
          'If an idea passes twice, it\'s probably real.',
          'Refusing to answer honestly means the idea already failed.',
          'Most failed products were technically correct—they failed because they were replaceable.',
        ],
      },
      cta: {
        text: 'Ready to test your idea?',
        button: 'Start the AI Idea Validator',
      },
    },

    // AI Idea Validator
    killTest: {
      title: 'Defensibility AI Idea Validator',
      subtitle: 'Founder-Grade, No-Mercy Edition',
      intro: {
        title: 'Before We Begin',
        description: 'This evaluation combines the perspectives of a platform PM (who knows how features get commoditized), a solo founder operator (who knows what breaks at 2 a.m.), and a buyer who controls a budget and hates switching tools.',
        warning: 'Be honest. Optimistic answers only hurt you.',
        start: 'Begin the Test',
      },
      progress: 'Step {current} of {total}',
      navigation: {
        back: 'Back',
        next: 'Next',
        submit: 'See Results',
      },
      sections: {
        setup: {
          title: 'Setup',
          subtitle: 'Define your idea',
        },
        killTest: {
          title: 'AI Idea Validator',
          subtitle: 'Brutal honesty required',
        },
        scoring: {
          title: 'Quick Scores',
          subtitle: 'Instinctive assessment',
        },
        verdict: {
          title: 'Verdict',
          subtitle: 'The moment of truth',
        },
      },
      questions: {
        // Setup questions
        ideaDefinition: {
          label: 'In one sentence, what is the business idea you are evaluating?',
          placeholder: 'Describe your idea clearly and concisely...',
        },
        targetCustomer: {
          label: 'Who is the primary customer?',
          subLabel: 'Who pays? Who uses it? Be specific.',
          placeholder: 'Describe who pays and who uses the product...',
        },
        coreWorkflow: {
          label: 'Describe the core workflow',
          subLabel: 'Event → Decision → Action',
          placeholder: 'What triggers usage? What decision gets made? What action results?',
        },
        monetization: {
          label: 'How does this make money?',
          placeholder: 'Subscription, usage-based, one-time, freemium...',
        },
        platformDependencies: {
          label: 'Which platforms, APIs, or ecosystems does this depend on?',
          placeholder: 'OpenAI, Stripe, Shopify, WhatsApp, etc...',
        },
        disappearanceTest: {
          label: 'If this product disappeared tomorrow, what would break for the customer?',
          placeholder: 'Be honest about the actual impact...',
        },

        // AI Idea Validator questions
        inevitabilityTest: {
          label: 'Why doesn\'t a dominant solution for this already exist?',
          placeholder: 'What market gap exists and why hasn\'t it been filled?',
        },
        copycatVelocity: {
          label: 'How fast could a competent competitor reach "good enough"?',
          options: {
            under30: '< 30 days',
            '30to60': '30-60 days',
            '60to90': '60-90 days',
            over6months: '6+ months',
          },
        },
        aiCommoditization: {
          label: 'If AI becomes cheaper and better everywhere, what remains valuable here?',
          placeholder: 'What part of your business can\'t be replaced by better AI?',
        },
        platformHostageRisk: {
          label: 'What single platform change could seriously damage or kill this business?',
          placeholder: 'API pricing, policy changes, feature absorption...',
        },
        dataMoatReality: {
          label: 'What proprietary data does this accumulate over time?',
          placeholder: 'Behavioral data, transaction history, outcomes...',
        },
        dataCompounding: {
          label: 'Does this data compound and become harder to replicate over time?',
          options: {
            yesStrongly: 'Yes, strongly',
            somewhat: 'Somewhat',
            no: 'No',
          },
        },
        workflowLockIn: {
          label: 'How painful would it be for a customer to stop using this?',
          scaleMin: 'Pure convenience',
          scaleMax: 'Business breaks',
        },
        pricingPower: {
          label: 'Could you double the price without massive churn?',
          options: {
            yes: 'Yes',
            maybe: 'Maybe',
            no: 'No',
          },
        },
        budgetOwner: {
          label: 'Who controls the budget for this purchase?',
          placeholder: 'Job title, relationship to the user, budget type...',
        },
        soloFounderRisk: {
          label: 'What part of this could quietly turn into human babysitting?',
          placeholder: 'Customization, support, sales, edge cases...',
        },
        scalingStress: {
          label: 'What breaks first at 10× scale?',
          placeholder: 'Support, infrastructure, quality, your sanity...',
        },
        likelyFailureMode: {
          label: 'What is the most likely way this business fails?',
          placeholder: 'Platform ban, competitor bundles it free, churn, burnout...',
        },

        // Scoring questions
        copycatRiskScore: {
          label: 'How easy is this to copy?',
          scaleMin: 'Very hard',
          scaleMax: 'Trivial',
        },
        platformRiskScore: {
          label: 'How exposed is this to platform changes?',
          scaleMin: 'Minimal',
          scaleMax: 'Hostage',
        },
        lockInStrengthScore: {
          label: 'How strong is customer lock-in?',
          scaleMin: 'None',
          scaleMax: 'Very strong',
        },
        pricingPowerScore: {
          label: 'How strong is pricing power?',
          scaleMin: 'Price sensitive',
          scaleMax: 'Premium OK',
        },

        // Verdict questions
        finalVerdict: {
          label: 'Based on everything above, what is your verdict?',
          options: {
            kill: 'KILL',
            flip: 'FLIP',
            build: 'BUILD',
            bet: 'BET',
          },
          descriptions: {
            kill: 'Fundamentally weak—move on',
            flip: 'Pivot required to survive',
            build: 'Defensible with discipline',
            bet: 'Risky but asymmetric upside',
          },
        },
        biggestUnresolvedRisk: {
          label: 'What is the single biggest unresolved risk?',
          placeholder: 'The one thing that keeps you up at night...',
        },
      },
      helper: {
        button: 'What does this mean?',
        close: 'Got it',
      },
    },

    // Results
    results: {
      title: 'Your Verdict',
      verdicts: {
        kill: {
          title: 'KILL',
          emoji: '❌',
          description: 'This idea has too many structural weaknesses. The problems identified cannot be fixed with better execution—they require a completely different approach.',
        },
        flip: {
          title: 'FLIP',
          emoji: '🔁',
          description: 'This idea has potential, but a significant pivot is required to survive. Focus on addressing the major risk areas before investing more time.',
        },
        build: {
          title: 'BUILD',
          emoji: '🧱',
          description: 'This idea is defensible with discipline. Execute carefully, prioritize building moats, and avoid the temptation to over-expand.',
        },
        bet: {
          title: 'BET',
          emoji: '🎲',
          description: 'This is a strong opportunity with favorable asymmetric upside. The downside is significant, but the potential reward justifies a calculated gamble.',
        },
      },
      scores: {
        title: 'Risk Scores',
        copycatRisk: 'Copycat Risk',
        platformRisk: 'Platform Risk',
        lockInStrength: 'Lock-in Strength',
        pricingPower: 'Pricing Power',
      },
      biggestRisk: 'Biggest Unresolved Risk',
      ideaSummary: 'Idea',
      actions: {
        startOver: 'Test Another Idea',
        copyResults: 'Copy Results',
        copied: 'Copied!',
      },
      note: 'Remember: Killing an idea early is success, not failure. If you\'re unsure, run the test again with more honest answers.',
    },

    // Common
    common: {
      loading: 'Loading...',
    },
  },

  es: {
    // Navigation
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      killTest: 'AI Idea Validator',
    },

    // Header
    header: {
      logo: 'AI Idea Validator',
    },

    // Footer
    footer: {
      tagline: 'Saber antes de construir.',
      description: 'Una evaluacion brutal y honesta para fundadores que se niegan a desperdiciar anos en ideas que nunca iban a funcionar.',
      navigation: 'Navegacion',
      builtFor: 'Hecho para fundadores que valoran su tiempo.',
      copyright: '© 2025 AI Idea Validator. Sin derechos reservados—las ideas son libres.',
    },

    // Homepage
    home: {
      hero: {
        title: '¿Tu idea es defendible?',
        subtitle: 'Descubrelo antes de construir.',
        description: 'La mayoria de las ideas de startup fracasan no porque sean malas, sino porque son reemplazables. Ejecuta el AI Idea Validator para descubrir si tu negocio puede sobrevivir a la competencia, cambios de plataforma y las brutales realidades de construir en solitario.',
        cta: 'Ejecutar el AI Idea Validator',
        secondary: 'Aprende como funciona',
      },
      problem: {
        title: 'La Verdad Incomoda',
        subtitle: 'Por que la mayoria de las ideas fracasan',
        points: [
          {
            title: 'Las funcionalidades no son fosos',
            description: 'Cualquier cosa que construyas con APIs publicas puede clonarse en semanas. Tu funcion "con IA" esta a un prompt de ser un commodity.',
          },
          {
            title: 'A las plataformas no les importas',
            description: 'Un cambio de politica, un aumento de precio, una restriccion de API—y todo tu modelo de negocio se evapora de la noche a la manana.',
          },
          {
            title: 'Ser bueno no es suficiente',
            description: 'Tu producto puede ser tecnicamente excelente. Pero si los clientes pueden cambiar facilmente a un competidor o vivir sin ti, no tienes nada.',
          },
        ],
      },
      whatItDoes: {
        title: 'Que Hace el AI Idea Validator',
        subtitle: 'Una Evaluacion Despiadada',
        points: [
          {
            title: 'Expone falsos fosos',
            description: 'Identifica donde tus ventajas competitivas son en realidad ilusiones esperando ser destruidas.',
          },
          {
            title: 'Prueba dependencia de plataformas',
            description: 'Revela cuan vulnerable eres a cambios de plataformas que no controlas.',
          },
          {
            title: 'Evalua supervivencia en solitario',
            description: 'Determina si el negocio puede prosperar—o si se convertira silenciosamente en un trabajo 24/7.',
          },
          {
            title: 'Mide costos de cambio',
            description: 'Evalua si los clientes realmente sentirian dolor si se fueran.',
          },
          {
            title: 'Calcula riesgo asimetrico',
            description: 'Sopesa el potencial alcista contra lo que realmente estas arriesgando.',
          },
        ],
      },
      whoItsFor: {
        title: 'Para Quien Es',
        subtitle: 'Solo Constructores Serios',
        personas: [
          {
            title: 'Fundadores en Solitario',
            description: 'Estas apostando tu tiempo y cordura en una idea. Asegurate de que valga la pena antes de ir con todo.',
          },
          {
            title: 'Freelancers',
            description: '¿Pensando en productizar tus servicios? Sabe si se convertira en un negocio o solo mas trabajo de cliente disfrazado.',
          },
          {
            title: 'Indie Hackers',
            description: 'Lanza rapido, pero lanza inteligente. No construyas algo que un proyecto de fin de semana podria reemplazar.',
          },
        ],
      },
      howItWorks: {
        title: 'Como Funciona',
        subtitle: 'Cinco Minutos Hacia la Claridad',
        steps: [
          {
            number: '01',
            title: 'Describe tu idea',
            description: 'Cuentanos que estas construyendo, quien paga y que sucede cuando funciona.',
          },
          {
            number: '02',
            title: 'Enfrenta las preguntas dificiles',
            description: 'Responde 24 preguntas disenadas para exponer debilidades en defendibilidad, riesgo de plataforma y escalamiento.',
          },
          {
            number: '03',
            title: 'Obten tu veredicto',
            description: 'Recibe una recomendacion clara: Kill, Flip, Build, o Bet—con riesgos especificos destacados.',
          },
        ],
      },
      cta: {
        title: '¿Listo para descubrirlo?',
        description: 'Deja de adivinar. Deja de esperar. Obten una respuesta clara sobre si tu idea tiene lo que se necesita.',
        button: 'Comenzar el AI Idea Validator',
        note: 'Toma unos 5-10 minutos. No requiere registro.',
      },
    },

    // About page
    about: {
      title: 'Acerca de AI Idea Validator',
      subtitle: 'Por Que Existe Esto',
      intro: 'AI Idea Validator fue creado porque demasiados fundadores desperdician anos en ideas que nunca iban a funcionar—no porque las ideas fueran malas, sino porque eran fundamentalmente reemplazables.',
      sections: [
        {
          title: 'El Problema Que Resolvemos',
          content: 'La mayoria de los consejos para startups se enfocan en la ejecucion: lanza rapido, habla con clientes, itera. Todo eso es verdad. Pero nada de eso importa si tu idea carece de defendibilidad estructural. Puedes ejecutar perfectamente una idea sin foso—y aun asi fracasar.',
        },
        {
          title: 'Que Nos Hace Diferentes',
          content: 'Esto no es una herramienta de brainstorming o un validador de ideas que te dice lo que quieres escuchar. Es un filtro. Una evaluacion hostil y racional que asume que los competidores tienen las mismas herramientas que tu, las plataformas cambian reglas cuando les conviene, y los clientes son perezosos y reacios al riesgo.',
        },
        {
          title: 'Como Evaluamos',
          content: 'El AI Idea Validator ejecuta tu idea a traves de 24 preguntas cuidadosamente disenadas que cubren defendibilidad, velocidad de copia, dependencia de plataformas, fosos de datos, lock-in de flujo de trabajo, poder de precios, sostenibilidad de fundador solo y modos de fallo.',
        },
        {
          title: 'Los Resultados',
          content: 'Cada idea recibe uno de cuatro veredictos: KILL (fundamentalmente debil), FLIP (requiere pivote), BUILD (defendible con disciplina), o BET (arriesgado pero con potencial asimetrico). Sin puntos medios. Sin "depende". Una respuesta clara.',
        },
      ],
      philosophy: {
        title: 'Nuestra Filosofia',
        points: [
          'Matar una idea temprano es exito, no fracaso.',
          'Si una idea pasa dos veces, probablemente es real.',
          'Negarse a responder honestamente significa que la idea ya fracaso.',
          'La mayoria de los productos fracasados eran tecnicamente correctos—fracasaron porque eran reemplazables.',
        ],
      },
      cta: {
        text: '¿Listo para probar tu idea?',
        button: 'Comenzar el AI Idea Validator',
      },
    },

    // AI Idea Validator
    killTest: {
      title: 'AI Idea Validator de Defendibilidad',
      subtitle: 'Edicion de Grado Fundador, Sin Piedad',
      intro: {
        title: 'Antes de Comenzar',
        description: 'Esta evaluacion combina las perspectivas de un PM de plataforma (que sabe como las funciones se comoditizan), un operador fundador en solitario (que sabe que se rompe a las 2 a.m.), y un comprador que controla un presupuesto y odia cambiar de herramientas.',
        warning: 'Se honesto. Las respuestas optimistas solo te perjudican.',
        start: 'Comenzar el Test',
      },
      progress: 'Paso {current} de {total}',
      navigation: {
        back: 'Atras',
        next: 'Siguiente',
        submit: 'Ver Resultados',
      },
      sections: {
        setup: {
          title: 'Configuracion',
          subtitle: 'Define tu idea',
        },
        killTest: {
          title: 'AI Idea Validator',
          subtitle: 'Honestidad brutal requerida',
        },
        scoring: {
          title: 'Puntuaciones Rapidas',
          subtitle: 'Evaluacion instintiva',
        },
        verdict: {
          title: 'Veredicto',
          subtitle: 'El momento de la verdad',
        },
      },
      questions: {
        // Setup questions
        ideaDefinition: {
          label: 'En una sola frase, ¿cual es la idea de negocio que estas evaluando?',
          placeholder: 'Describe tu idea de forma clara y concisa...',
        },
        targetCustomer: {
          label: '¿Quien es el cliente principal?',
          subLabel: '¿Quien paga? ¿Quien lo usa? Se especifico.',
          placeholder: 'Describe quien paga y quien usa el producto...',
        },
        coreWorkflow: {
          label: 'Describe el flujo de trabajo principal',
          subLabel: 'Evento → Decision → Accion',
          placeholder: '¿Que dispara el uso? ¿Que decision se toma? ¿Que accion resulta?',
        },
        monetization: {
          label: '¿Como genera dinero este producto?',
          placeholder: 'Suscripcion, basado en uso, unico, freemium...',
        },
        platformDependencies: {
          label: '¿De que plataformas, APIs o ecosistemas depende?',
          placeholder: 'OpenAI, Stripe, Shopify, WhatsApp, etc...',
        },
        disappearanceTest: {
          label: 'Si este producto desapareciera manana, ¿que dejaria de funcionar para el cliente?',
          placeholder: 'Se honesto sobre el impacto real...',
        },

        // AI Idea Validator questions
        inevitabilityTest: {
          label: '¿Por que no existe ya una solucion dominante para esto?',
          placeholder: '¿Que brecha de mercado existe y por que no se ha llenado?',
        },
        copycatVelocity: {
          label: '¿Que tan rapido podria un competidor competente llegar a "suficientemente bueno"?',
          options: {
            under30: '< 30 dias',
            '30to60': '30-60 dias',
            '60to90': '60-90 dias',
            over6months: '6+ meses',
          },
        },
        aiCommoditization: {
          label: 'Si la IA se vuelve mas barata y mejor en todos lados, ¿que sigue siendo valioso aqui?',
          placeholder: '¿Que parte de tu negocio no puede ser reemplazada por mejor IA?',
        },
        platformHostageRisk: {
          label: '¿Que cambio de plataforma unico podria danar gravemente o matar este negocio?',
          placeholder: 'Precios de API, cambios de politica, absorcion de features...',
        },
        dataMoatReality: {
          label: '¿Que datos propietarios acumula esto con el tiempo?',
          placeholder: 'Datos de comportamiento, historial de transacciones, resultados...',
        },
        dataCompounding: {
          label: '¿Estos datos se acumulan y se vuelven mas dificiles de replicar con el tiempo?',
          options: {
            yesStrongly: 'Si, fuertemente',
            somewhat: 'Algo',
            no: 'No',
          },
        },
        workflowLockIn: {
          label: '¿Que tan doloroso seria para un cliente dejar de usar esto?',
          scaleMin: 'Pura conveniencia',
          scaleMax: 'El negocio se rompe',
        },
        pricingPower: {
          label: '¿Podrias duplicar el precio sin una fuga masiva de clientes?',
          options: {
            yes: 'Si',
            maybe: 'Tal vez',
            no: 'No',
          },
        },
        budgetOwner: {
          label: '¿Quien controla el presupuesto para esta compra?',
          placeholder: 'Titulo del puesto, relacion con el usuario, tipo de presupuesto...',
        },
        soloFounderRisk: {
          label: '¿Que parte de esto podria convertirse silenciosamente en trabajo humano constante?',
          placeholder: 'Personalizacion, soporte, ventas, casos edge...',
        },
        scalingStress: {
          label: '¿Que se rompe primero al escalar 10×?',
          placeholder: 'Soporte, infraestructura, calidad, tu cordura...',
        },
        likelyFailureMode: {
          label: '¿Cual es la forma mas probable en que este negocio fracase?',
          placeholder: 'Ban de plataforma, competidor lo regala, churn, burnout...',
        },

        // Scoring questions
        copycatRiskScore: {
          label: '¿Que tan facil es de copiar?',
          scaleMin: 'Muy dificil',
          scaleMax: 'Trivial',
        },
        platformRiskScore: {
          label: '¿Que tan expuesto esta a cambios de plataforma?',
          scaleMin: 'Minimo',
          scaleMax: 'Rehen',
        },
        lockInStrengthScore: {
          label: '¿Que tan fuerte es el lock-in del cliente?',
          scaleMin: 'Ninguno',
          scaleMax: 'Muy fuerte',
        },
        pricingPowerScore: {
          label: '¿Que tan fuerte es el poder de precios?',
          scaleMin: 'Sensible al precio',
          scaleMax: 'Premium OK',
        },

        // Verdict questions
        finalVerdict: {
          label: 'Con base en todo lo anterior, ¿cual es tu veredicto?',
          options: {
            kill: 'KILL',
            flip: 'FLIP',
            build: 'BUILD',
            bet: 'BET',
          },
          descriptions: {
            kill: 'Fundamentalmente debil—sigue adelante',
            flip: 'Pivote requerido para sobrevivir',
            build: 'Defendible con disciplina',
            bet: 'Riesgoso pero con potencial asimetrico',
          },
        },
        biggestUnresolvedRisk: {
          label: '¿Cual es el mayor riesgo no resuelto?',
          placeholder: 'Lo que te quita el sueno...',
        },
      },
      helper: {
        button: '¿Que significa esto?',
        close: 'Entendido',
      },
    },

    // Results
    results: {
      title: 'Tu Veredicto',
      verdicts: {
        kill: {
          title: 'KILL',
          emoji: '❌',
          description: 'Esta idea tiene demasiadas debilidades estructurales. Los problemas identificados no pueden arreglarse con mejor ejecucion—requieren un enfoque completamente diferente.',
        },
        flip: {
          title: 'FLIP',
          emoji: '🔁',
          description: 'Esta idea tiene potencial, pero se requiere un pivote significativo para sobrevivir. Enfocate en abordar las areas de riesgo principales antes de invertir mas tiempo.',
        },
        build: {
          title: 'BUILD',
          emoji: '🧱',
          description: 'Esta idea es defendible con disciplina. Ejecuta cuidadosamente, prioriza construir fosos, y evita la tentacion de sobre-expandirte.',
        },
        bet: {
          title: 'BET',
          emoji: '🎲',
          description: 'Esta es una oportunidad fuerte con potencial asimetrico favorable. La desventaja es significativa, pero la recompensa potencial justifica una apuesta calculada.',
        },
      },
      scores: {
        title: 'Puntuaciones de Riesgo',
        copycatRisk: 'Riesgo de Copia',
        platformRisk: 'Riesgo de Plataforma',
        lockInStrength: 'Fuerza de Lock-in',
        pricingPower: 'Poder de Precios',
      },
      biggestRisk: 'Mayor Riesgo No Resuelto',
      ideaSummary: 'Idea',
      actions: {
        startOver: 'Probar Otra Idea',
        copyResults: 'Copiar Resultados',
        copied: '¡Copiado!',
      },
      note: 'Recuerda: Matar una idea temprano es exito, no fracaso. Si no estas seguro, ejecuta el test de nuevo con respuestas mas honestas.',
    },

    // Common
    common: {
      loading: 'Cargando...',
    },
  },
} as const;

export type Translations = typeof translations;
export type TranslationKey = keyof typeof translations.en;
