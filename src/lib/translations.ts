export type Language = 'en' | 'es';

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      killTest: 'AI Idea Validator',
      support: 'Support',
    },

    // Header
    header: {
      logo: 'AI Idea Validator',
      switchToLanguage: 'Switch to Spanish',
      switchToTheme: 'Switch to dark mode',
      switchToLightTheme: 'Switch to light mode',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      switchLanguageLabel: 'Cambiar a Español',
    },

    // Footer
    footer: {
      tagline: 'Know before you build.',
      description: 'A brutal, honest assessment for founders who refuse to waste years on ideas that were never going to work.',
      navigation: 'Navigation',
      builtFor: 'Built for founders who value their time.',
      copyright: '© 2025 AI Idea Validator. No rights reserved—ideas are free.',
      documentation: 'Documentation',
      faq: 'FAQ',
      contact: 'Contact',
      termsOfService: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      resources: 'Resources',
      jsonTemplate: 'JSON Template',
      switchLanguage: 'Cambiar a Español',
      legal: 'Legal',
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
      trust: {
        title: 'Your Ideas Stay Yours',
        subtitle: 'Built with privacy-first principles',
        badges: [
          {
            title: 'No Account Required',
            description: 'Start immediately. No signup, no email, no tracking.',
          },
          {
            title: 'Browser-Based Processing',
            description: 'Your answers are processed locally. Nothing stored on our servers.',
          },
          {
            title: 'Open Source',
            description: 'Verify our claims yourself. Full code transparency on GitHub.',
          },
          {
            title: 'Session-Only Data',
            description: 'Close your browser, data disappears. No persistent storage.',
          },
        ],
        privacyLink: 'Read our full privacy policy',
        githubLink: 'View source code',
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
        reflection: {
          title: 'Final Reflection',
          subtitle: 'One last thing',
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

        // Final reflection question (AI generates verdict)
        biggestUnresolvedRisk: {
          label: 'What is the single biggest unresolved risk or concern you have about this idea?',
          subLabel: 'Be brutally honest. The AI will factor this into its analysis.',
          placeholder: 'The elephant in the room that keeps you up at night...',
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
        yourScore: 'Your Score',
        aiScore: 'AI Score',
      },
      aiAnalysis: {
        title: 'AI Analysis',
        confidence: 'Confidence',
        rationale: 'Rationale',
        contradictions: 'Contradictions Detected',
        noContradictions: 'Your self-assessment appears consistent with your written responses.',
        adjustedScores: 'AI-Adjusted Scores',
        analyzing: 'Analyzing your responses...',
        error: 'Analysis failed. Showing basic assessment.',
        fieldLabels: {
          copycatRisk: 'Copycat Risk',
          platformRisk: 'Platform Risk',
          lockInStrength: 'Lock-in Strength',
          pricingPower: 'Pricing Power',
        },
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
      support: 'Soporte',
    },

    // Header
    header: {
      logo: 'AI Idea Validator',
      switchToLanguage: 'Cambiar a inglés',
      switchToTheme: 'Cambiar a modo oscuro',
      switchToLightTheme: 'Cambiar a modo claro',
      darkMode: 'Modo Oscuro',
      lightMode: 'Modo Claro',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      switchLanguageLabel: 'Switch to English',
    },

    // Footer
    footer: {
      tagline: 'Saber antes de construir.',
      description: 'Una evaluación brutal y honesta para fundadores que se niegan a desperdiciar años en ideas que nunca iban a funcionar.',
      navigation: 'Navegación',
      builtFor: 'Hecho para fundadores que valoran su tiempo.',
      copyright: '© 2025 AI Idea Validator. Sin derechos reservados—las ideas son libres.',
      documentation: 'Documentación',
      faq: 'Preguntas Frecuentes',
      contact: 'Contacto',
      termsOfService: 'Términos de Servicio',
      privacyPolicy: 'Política de Privacidad',
      resources: 'Recursos',
      jsonTemplate: 'Plantilla JSON',
      switchLanguage: 'Switch to English',
      legal: 'Legal',
    },

    // Homepage
    home: {
      hero: {
        title: '¿Tu idea es defendible?',
        subtitle: 'Descúbrelo antes de construir.',
        description: 'La mayoría de las ideas de startup fracasan no porque sean malas, sino porque son reemplazables. Ejecuta el AI Idea Validator para descubrir si tu negocio puede sobrevivir a la competencia, cambios de plataforma y las brutales realidades de construir en solitario.',
        cta: 'Ejecutar el AI Idea Validator',
        secondary: 'Aprende cómo funciona',
      },
      problem: {
        title: 'La Verdad Incómoda',
        subtitle: 'Por qué la mayoría de las ideas fracasan',
        points: [
          {
            title: 'Las funcionalidades no son fosos',
            description: 'Cualquier cosa que construyas con APIs públicas puede clonarse en semanas. Tu función "con IA" está a un prompt de ser un commodity.',
          },
          {
            title: 'A las plataformas no les importas',
            description: 'Un cambio de política, un aumento de precio, una restricción de API—y todo tu modelo de negocio se evapora de la noche a la mañana.',
          },
          {
            title: 'Ser bueno no es suficiente',
            description: 'Tu producto puede ser técnicamente excelente. Pero si los clientes pueden cambiar fácilmente a un competidor o vivir sin ti, no tienes nada.',
          },
        ],
      },
      whatItDoes: {
        title: 'Qué Hace el AI Idea Validator',
        subtitle: 'Una Evaluación Despiadada',
        points: [
          {
            title: 'Expone falsos fosos',
            description: 'Identifica dónde tus ventajas competitivas son en realidad ilusiones esperando ser destruidas.',
          },
          {
            title: 'Prueba dependencia de plataformas',
            description: 'Revela cuán vulnerable eres a cambios de plataformas que no controlas.',
          },
          {
            title: 'Evalúa supervivencia en solitario',
            description: 'Determina si el negocio puede prosperar—o si se convertirá silenciosamente en un trabajo 24/7.',
          },
          {
            title: 'Mide costos de cambio',
            description: 'Evalúa si los clientes realmente sentirían dolor si se fueran.',
          },
          {
            title: 'Calcula riesgo asimetrico',
            description: 'Sopesa el potencial alcista contra lo que realmente estás arriesgando.',
          },
        ],
      },
      whoItsFor: {
        title: 'Para Quién Es',
        subtitle: 'Solo Constructores Serios',
        personas: [
          {
            title: 'Fundadores en Solitario',
            description: 'Estás apostando tu tiempo y cordura en una idea. Asegúrate de que valga la pena antes de ir con todo.',
          },
          {
            title: 'Freelancers',
            description: '¿Pensando en productizar tus servicios? Sabe si se convertirá en un negocio o solo más trabajo de cliente disfrazado.',
          },
          {
            title: 'Indie Hackers',
            description: 'Lanza rápido, pero lanza inteligente. No construyas algo que un proyecto de fin de semana podría reemplazar.',
          },
        ],
      },
      howItWorks: {
        title: 'Cómo Funciona',
        subtitle: 'Cinco Minutos Hacia la Claridad',
        steps: [
          {
            number: '01',
            title: 'Describe tu idea',
            description: 'Cuéntanos qué estás construyendo, quién paga y qué sucede cuando funciona.',
          },
          {
            number: '02',
            title: 'Enfrenta las preguntas difíciles',
            description: 'Responde 24 preguntas diseñadas para exponer debilidades en defendibilidad, riesgo de plataforma y escalamiento.',
          },
          {
            number: '03',
            title: 'Obtén tu veredicto',
            description: 'Recibe una recomendación clara: Kill, Flip, Build, o Bet—con riesgos específicos destacados.',
          },
        ],
      },
      cta: {
        title: '¿Listo para descubrirlo?',
        description: 'Deja de adivinar. Deja de esperar. Obtén una respuesta clara sobre si tu idea tiene lo que se necesita.',
        button: 'Comenzar el AI Idea Validator',
        note: 'Toma unos 5-10 minutos. No requiere registro.',
      },
      trust: {
        title: 'Tus Ideas Son Tuyas',
        subtitle: 'Construido con principios de privacidad primero',
        badges: [
          {
            title: 'Sin Cuenta Requerida',
            description: 'Comienza inmediatamente. Sin registro, sin email, sin rastreo.',
          },
          {
            title: 'Procesamiento en el Navegador',
            description: 'Tus respuestas se procesan localmente. Nada se guarda en nuestros servidores.',
          },
          {
            title: 'Código Abierto',
            description: 'Verifica nuestras afirmaciones. Transparencia total del código en GitHub.',
          },
          {
            title: 'Datos Solo en Sesión',
            description: 'Cierra tu navegador, los datos desaparecen. Sin almacenamiento persistente.',
          },
        ],
        privacyLink: 'Lee nuestra política de privacidad completa',
        githubLink: 'Ver código fuente',
      },
    },

    // About page
    about: {
      title: 'Acerca de AI Idea Validator',
      subtitle: 'Por Qué Existe Esto',
      intro: 'AI Idea Validator fue creado porque demasiados fundadores desperdician años en ideas que nunca iban a funcionar—no porque las ideas fueran malas, sino porque eran fundamentalmente reemplazables.',
      sections: [
        {
          title: 'El Problema Que Resolvemos',
          content: 'La mayoría de los consejos para startups se enfocan en la ejecución: lanza rápido, habla con clientes, itera. Todo eso es verdad. Pero nada de eso importa si tu idea carece de defendibilidad estructural. Puedes ejecutar perfectamente una idea sin foso—y aún así fracasar.',
        },
        {
          title: 'Qué Nos Hace Diferentes',
          content: 'Esto no es una herramienta de brainstorming o un validador de ideas que te dice lo que quieres escuchar. Es un filtro. Una evaluación hostil y racional que asume que los competidores tienen las mismas herramientas que tú, las plataformas cambian reglas cuando les conviene, y los clientes son perezosos y reacios al riesgo.',
        },
        {
          title: 'Cómo Evaluamos',
          content: 'El AI Idea Validator ejecuta tu idea a través de 24 preguntas cuidadosamente diseñadas que cubren defendibilidad, velocidad de copia, dependencia de plataformas, fosos de datos, lock-in de flujo de trabajo, poder de precios, sostenibilidad de fundador solo y modos de fallo.',
        },
        {
          title: 'Los Resultados',
          content: 'Cada idea recibe uno de cuatro veredictos: KILL (fundamentalmente débil), FLIP (requiere pivote), BUILD (defendible con disciplina), o BET (arriesgado pero con potencial asimétrico). Sin puntos medios. Sin "depende". Una respuesta clara.',
        },
      ],
      philosophy: {
        title: 'Nuestra Filosofía',
        points: [
          'Matar una idea temprano es éxito, no fracaso.',
          'Si una idea pasa dos veces, probablemente es real.',
          'Negarse a responder honestamente significa que la idea ya fracasó.',
          'La mayoría de los productos fracasados eran técnicamente correctos—fracasaron porque eran reemplazables.',
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
      subtitle: 'Edición de Grado Fundador, Sin Piedad',
      intro: {
        title: 'Antes de Comenzar',
        description: 'Esta evaluación combina las perspectivas de un PM de plataforma (que sabe cómo las funciones se comoditizan), un operador fundador en solitario (que sabe qué se rompe a las 2 a.m.), y un comprador que controla un presupuesto y odia cambiar de herramientas.',
        warning: 'Sé honesto. Las respuestas optimistas solo te perjudican.',
        start: 'Comenzar el Test',
      },
      progress: 'Paso {current} de {total}',
      navigation: {
        back: 'Atrás',
        next: 'Siguiente',
        submit: 'Ver Resultados',
      },
      sections: {
        setup: {
          title: 'Configuración',
          subtitle: 'Define tu idea',
        },
        killTest: {
          title: 'AI Idea Validator',
          subtitle: 'Honestidad brutal requerida',
        },
        scoring: {
          title: 'Puntuaciones Rápidas',
          subtitle: 'Evaluación instintiva',
        },
        reflection: {
          title: 'Reflexión Final',
          subtitle: 'Una última cosa',
        },
      },
      questions: {
        // Setup questions
        ideaDefinition: {
          label: 'En una sola frase, ¿cuál es la idea de negocio que estás evaluando?',
          placeholder: 'Describe tu idea de forma clara y concisa...',
        },
        targetCustomer: {
          label: '¿Quién es el cliente principal?',
          subLabel: '¿Quién paga? ¿Quién lo usa? Sé específico.',
          placeholder: 'Describe quién paga y quién usa el producto...',
        },
        coreWorkflow: {
          label: 'Describe el flujo de trabajo principal',
          subLabel: 'Evento → Decisión → Acción',
          placeholder: '¿Qué dispara el uso? ¿Qué decisión se toma? ¿Qué acción resulta?',
        },
        monetization: {
          label: '¿Cómo genera dinero este producto?',
          placeholder: 'Suscripción, basado en uso, único, freemium...',
        },
        platformDependencies: {
          label: '¿De qué plataformas, APIs o ecosistemas depende?',
          placeholder: 'OpenAI, Stripe, Shopify, WhatsApp, etc...',
        },
        disappearanceTest: {
          label: 'Si este producto desapareciera mañana, ¿qué dejaría de funcionar para el cliente?',
          placeholder: 'Sé honesto sobre el impacto real...',
        },

        // AI Idea Validator questions
        inevitabilityTest: {
          label: '¿Por qué no existe ya una solución dominante para esto?',
          placeholder: '¿Qué brecha de mercado existe y por qué no se ha llenado?',
        },
        copycatVelocity: {
          label: '¿Qué tan rápido podría un competidor competente llegar a "suficientemente bueno"?',
          options: {
            under30: '< 30 días',
            '30to60': '30-60 días',
            '60to90': '60-90 días',
            over6months: '6+ meses',
          },
        },
        aiCommoditization: {
          label: 'Si la IA se vuelve más barata y mejor en todos lados, ¿qué sigue siendo valioso aquí?',
          placeholder: '¿Qué parte de tu negocio no puede ser reemplazada por mejor IA?',
        },
        platformHostageRisk: {
          label: '¿Qué cambio de plataforma único podría dañar gravemente o matar este negocio?',
          placeholder: 'Precios de API, cambios de política, absorción de features...',
        },
        dataMoatReality: {
          label: '¿Qué datos propietarios acumula esto con el tiempo?',
          placeholder: 'Datos de comportamiento, historial de transacciones, resultados...',
        },
        dataCompounding: {
          label: '¿Estos datos se acumulan y se vuelven más difíciles de replicar con el tiempo?',
          options: {
            yesStrongly: 'Sí, fuertemente',
            somewhat: 'Algo',
            no: 'No',
          },
        },
        workflowLockIn: {
          label: '¿Qué tan doloroso sería para un cliente dejar de usar esto?',
          scaleMin: 'Pura conveniencia',
          scaleMax: 'El negocio se rompe',
        },
        pricingPower: {
          label: '¿Podrías duplicar el precio sin una fuga masiva de clientes?',
          options: {
            yes: 'Sí',
            maybe: 'Tal vez',
            no: 'No',
          },
        },
        budgetOwner: {
          label: '¿Quién controla el presupuesto para esta compra?',
          placeholder: 'Título del puesto, relación con el usuario, tipo de presupuesto...',
        },
        soloFounderRisk: {
          label: '¿Qué parte de esto podría convertirse silenciosamente en trabajo humano constante?',
          placeholder: 'Personalización, soporte, ventas, casos edge...',
        },
        scalingStress: {
          label: '¿Qué se rompe primero al escalar 10×?',
          placeholder: 'Soporte, infraestructura, calidad, tu cordura...',
        },
        likelyFailureMode: {
          label: '¿Cuál es la forma más probable en que este negocio fracase?',
          placeholder: 'Ban de plataforma, competidor lo regala, churn, burnout...',
        },

        // Scoring questions
        copycatRiskScore: {
          label: '¿Qué tan fácil es de copiar?',
          scaleMin: 'Muy difícil',
          scaleMax: 'Trivial',
        },
        platformRiskScore: {
          label: '¿Qué tan expuesto está a cambios de plataforma?',
          scaleMin: 'Mínimo',
          scaleMax: 'Rehén',
        },
        lockInStrengthScore: {
          label: '¿Qué tan fuerte es el lock-in del cliente?',
          scaleMin: 'Ninguno',
          scaleMax: 'Muy fuerte',
        },
        pricingPowerScore: {
          label: '¿Qué tan fuerte es el poder de precios?',
          scaleMin: 'Sensible al precio',
          scaleMax: 'Premium OK',
        },

        // Final reflection question (AI generates verdict)
        biggestUnresolvedRisk: {
          label: '¿Cuál es el mayor riesgo o preocupación no resuelta que tienes sobre esta idea?',
          subLabel: 'Sé brutalmente honesto. La IA considerará esto en su análisis.',
          placeholder: 'El elefante en la habitación que te quita el sueño...',
        },
      },
      helper: {
        button: '¿Qué significa esto?',
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
          description: 'Esta idea tiene demasiadas debilidades estructurales. Los problemas identificados no pueden arreglarse con mejor ejecución—requieren un enfoque completamente diferente.',
        },
        flip: {
          title: 'FLIP',
          emoji: '🔁',
          description: 'Esta idea tiene potencial, pero se requiere un pivote significativo para sobrevivir. Enfócate en abordar las áreas de riesgo principales antes de invertir más tiempo.',
        },
        build: {
          title: 'BUILD',
          emoji: '🧱',
          description: 'Esta idea es defendible con disciplina. Ejecuta cuidadosamente, prioriza construir fosos, y evita la tentación de sobre-expandirte.',
        },
        bet: {
          title: 'BET',
          emoji: '🎲',
          description: 'Esta es una oportunidad fuerte con potencial asimétrico favorable. La desventaja es significativa, pero la recompensa potencial justifica una apuesta calculada.',
        },
      },
      scores: {
        title: 'Puntuaciones de Riesgo',
        copycatRisk: 'Riesgo de Copia',
        platformRisk: 'Riesgo de Plataforma',
        lockInStrength: 'Fuerza de Lock-in',
        pricingPower: 'Poder de Precios',
        yourScore: 'Tu Puntuación',
        aiScore: 'Puntuación IA',
      },
      aiAnalysis: {
        title: 'Análisis de IA',
        confidence: 'Confianza',
        rationale: 'Razonamiento',
        contradictions: 'Contradicciones Detectadas',
        noContradictions: 'Tu autoevaluación parece consistente con tus respuestas escritas.',
        adjustedScores: 'Puntuaciones Ajustadas por IA',
        analyzing: 'Analizando tus respuestas...',
        error: 'El análisis falló. Mostrando evaluación básica.',
        fieldLabels: {
          copycatRisk: 'Riesgo de Copia',
          platformRisk: 'Riesgo de Plataforma',
          lockInStrength: 'Fuerza de Lock-in',
          pricingPower: 'Poder de Precios',
        },
      },
      biggestRisk: 'Mayor Riesgo No Resuelto',
      ideaSummary: 'Idea',
      actions: {
        startOver: 'Probar Otra Idea',
        copyResults: 'Copiar Resultados',
        copied: '¡Copiado!',
      },
      note: 'Recuerda: Matar una idea temprano es éxito, no fracaso. Si no estás seguro, ejecuta el test de nuevo con respuestas más honestas.',
    },

    // Common
    common: {
      loading: 'Cargando...',
    },
  },
} as const;

export type Translations = typeof translations;
export type TranslationKey = keyof typeof translations.en;
