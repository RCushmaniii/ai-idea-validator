export type QuestionType = 'textarea' | 'radio' | 'scale' | 'verdict';

export interface HelperContent {
  title: string;
  content: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  required?: boolean;
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: { min: string; max: string };
  helper?: {
    en: HelperContent;
    es: HelperContent;
  };
}

export interface Section {
  id: string;
  questions: Question[];
}

export const killTestSections: Section[] = [
  // SECTION 0 — SETUP (6 steps)
  {
    id: 'setup',
    questions: [
      {
        id: 'ideaDefinition',
        type: 'textarea',
        required: true,
      },
      {
        id: 'targetCustomer',
        type: 'textarea',
        required: true,
      },
      {
        id: 'coreWorkflow',
        type: 'textarea',
        required: true,
      },
      {
        id: 'monetization',
        type: 'textarea',
        required: true,
      },
      {
        id: 'platformDependencies',
        type: 'textarea',
        required: true,
      },
      {
        id: 'disappearanceTest',
        type: 'textarea',
        required: true,
      },
    ],
  },
  // SECTION 1 — KILL TEST (12 steps)
  {
    id: 'killTest',
    questions: [
      {
        id: 'inevitabilityTest',
        type: 'textarea',
        required: true,
      },
      {
        id: 'copycatVelocity',
        type: 'radio',
        options: ['under30', '30to60', '60to90', 'over6months'],
        required: true,
        helper: {
          en: {
            title: 'How to estimate copycat velocity',
            content: `This measures how quickly a funded, competent team could ship a "good enough" version.

• **< 30 days** — Basic CRUD + APIs + prompts
• **30-60 days** — Some domain knowledge needed
• **60-90 days** — Meaningful iteration required
• **6+ months** — Deep expertise, data, or regulatory barriers

If it's mostly glue code and AI prompts, lean toward faster.`,
          },
          es: {
            title: 'Cómo estimar la velocidad de copia',
            content: `Esto mide qué tan rápido un equipo competente podría lanzar una versión "suficientemente buena".

• **< 30 días** — CRUD básico + APIs + prompts
• **30-60 días** — Requiere conocimiento del dominio
• **60-90 días** — Iteración significativa necesaria
• **6+ meses** — Experiencia profunda, datos o barreras regulatorias

Si es mayormente código de integración y prompts, inclínate hacia más rápido.`,
          },
        },
      },
      {
        id: 'aiCommoditization',
        type: 'textarea',
        required: true,
        helper: {
          en: {
            title: 'The AI commoditization question',
            content: `AI capabilities are becoming cheaper and more accessible every month.

Ask yourself: If GPT-5 is 10x better and costs 1/10th the price, what part of this business still matters?

Strong answers mention:
• Proprietary data or workflows
• Regulatory compliance
• Deep customer relationships
• Network effects

Weak answers rely on:
• "Better prompts"
• "Faster iteration"
• "First mover advantage"`,
          },
          es: {
            title: 'La pregunta de comoditización de IA',
            content: `Las capacidades de IA son más baratas y accesibles cada mes.

Pregúntate: Si GPT-5 es 10x mejor y cuesta 1/10, ¿qué parte del negocio sigue importando?

Respuestas fuertes mencionan:
• Datos o flujos propietarios
• Cumplimiento regulatorio
• Relaciones profundas con clientes
• Efectos de red

Respuestas débiles dependen de:
• "Mejores prompts"
• "Iteración más rápida"
• "Ventaja del primero"`,
          },
        },
      },
      {
        id: 'platformHostageRisk',
        type: 'textarea',
        required: true,
        helper: {
          en: {
            title: 'Platform hostage scenarios',
            content: `Think about specific changes that could hurt you:

• **API pricing** — OpenAI, Stripe, Twilio raise prices 5x
• **Policy changes** — App store removes your category
• **Feature absorption** — Platform ships your feature natively
• **Access revocation** — API access limited or removed

The most dangerous is when ONE platform controls your entire value chain.`,
          },
          es: {
            title: 'Escenarios de rehén de plataforma',
            content: `Piensa en cambios específicos que podrían afectarte:

• **Precios de API** — OpenAI, Stripe, Twilio suben precios 5x
• **Cambios de política** — App store elimina tu categoría
• **Absorción de features** — Plataforma lanza tu función
• **Revocación de acceso** — API limitada o eliminada

Lo más peligroso es cuando UNA plataforma controla toda tu cadena de valor.`,
          },
        },
      },
      {
        id: 'dataMoatReality',
        type: 'textarea',
        required: true,
        helper: {
          en: {
            title: 'What counts as a real data moat',
            content: `Real data moats are:
• **Exclusive** — Can't be bought, scraped, or simulated
• **Compounding** — Gets more valuable with use
• **Defensible** — Hard to replicate even with resources

Examples of real moats:
• Historical transaction outcomes
• Proprietary customer behavior patterns
• Validated decision-quality data

NOT moats:
• Customer lists
• Basic usage analytics
• Public data with better UX`,
          },
          es: {
            title: 'Qué cuenta como un foso de datos real',
            content: `Los fosos de datos reales son:
• **Exclusivos** — No se pueden comprar, scrappear o simular
• **Compuestos** — Más valiosos con el uso
• **Defendibles** — Difíciles de replicar incluso con recursos

Ejemplos de fosos reales:
• Resultados históricos de transacciones
• Patrones de comportamiento propietarios
• Datos de calidad de decisión validados

NO son fosos:
• Listas de clientes
• Analytics básicos de uso
• Datos públicos con mejor UX`,
          },
        },
      },
      {
        id: 'dataCompounding',
        type: 'radio',
        options: ['yesStrongly', 'somewhat', 'no'],
        required: true,
      },
      {
        id: 'workflowLockIn',
        type: 'scale',
        scaleMin: 1,
        scaleMax: 10,
        required: true,
        helper: {
          en: {
            title: 'What does "lock-in" mean here?',
            content: `Lock-in measures **how painful it is for a customer to stop using this**.

• **1** — Pure convenience
  Example: A note-taking app, a basic chatbot, a landing page builder

• **5** — Helpful but replaceable
  Example: An internal tool, reporting dashboard, lightweight automation

• **10** — Business breaks without it
  Example: Payroll, compliance system, revenue recovery, system of record

Ask yourself:
> *If this disappeared tomorrow, would they scramble—or shrug?*`,
          },
          es: {
            title: '¿Qué significa "lock-in" aquí?',
            content: `El lock-in mide **qué tan doloroso es para el cliente dejar de usar esto**.

• **1** — Comodidad pura
  Ejemplo: App de notas, chatbot básico, creador de landing pages

• **5** — Útil pero reemplazable
  Ejemplo: Herramienta interna, dashboard, automatización ligera

• **10** — El negocio se rompe sin esto
  Ejemplo: Nómina, cumplimiento legal, recuperación de ingresos

Pregúntate:
> *Si desaparece mañana, ¿entran en pánico o les da igual?*`,
          },
        },
      },
      {
        id: 'pricingPower',
        type: 'radio',
        options: ['yes', 'maybe', 'no'],
        required: true,
        helper: {
          en: {
            title: 'Pricing power explained',
            content: `Can you raise prices without losing customers?

• **Yes** — Value tied to revenue, risk avoidance, or compliance. Customers need this.
• **Maybe** — Some pushback expected, but most would stay.
• **No** — Price-sensitive market with many alternatives. Constantly compared.

Ask: *Do customers pay because it's nice—or because they must?*`,
          },
          es: {
            title: 'Poder de precios explicado',
            content: `¿Puedes subir precios sin perder clientes?

• **Sí** — Valor ligado a ingresos, evitación de riesgos o cumplimiento.
• **Tal vez** — Algo de resistencia esperada, pero la mayoría se quedaría.
• **No** — Mercado sensible al precio con muchas alternativas.

Pregunta: *¿Pagan porque es útil o porque es crítico?*`,
          },
        },
      },
      {
        id: 'budgetOwner',
        type: 'textarea',
        required: true,
        helper: {
          en: {
            title: 'Why budget owner matters',
            content: `The person who feels the pain is often NOT the person who controls the budget.

Best case: Same person (founder, solopreneur)
Okay case: Pain-feeler has influence over budget
Worst case: Budget holder doesn't understand the problem

Also consider: Is this "must-have" budget or "nice-to-have" budget?`,
          },
          es: {
            title: 'Por qué importa el dueño del presupuesto',
            content: `La persona que siente el dolor a menudo NO es quien controla el presupuesto.

Mejor caso: Misma persona (fundador, solopreneur)
Caso ok: Quien siente el dolor influye en el presupuesto
Peor caso: Quien controla el presupuesto no entiende el problema

También considera: ¿Es presupuesto "necesario" o "nice-to-have"?`,
          },
        },
      },
      {
        id: 'soloFounderRisk',
        type: 'textarea',
        required: true,
        helper: {
          en: {
            title: 'Solo founder risk patterns',
            content: `Watch for these traps:

• **Customization creep** — "Just one more tweak" becomes your job
• **Support escalation** — Edge cases require human judgment
• **Sales friction** — Complex products need demos and hand-holding
• **Service in disguise** — Product turns into consulting

If growth = more of YOUR time, that's a red flag.`,
          },
          es: {
            title: 'Patrones de riesgo de fundador solo',
            content: `Cuidado con estas trampas:

• **Personalización infinita** — "Solo un ajuste más" se vuelve tu trabajo
• **Escalación de soporte** — Casos edge requieren juicio humano
• **Fricción de ventas** — Productos complejos necesitan demos
• **Servicio disfrazado** — El producto se vuelve consultoría

Si crecimiento = más de TU tiempo, es una bandera roja.`,
          },
        },
      },
      {
        id: 'scalingStress',
        type: 'textarea',
        required: true,
      },
      {
        id: 'likelyFailureMode',
        type: 'textarea',
        required: true,
        helper: {
          en: {
            title: 'Common failure modes',
            content: `Most businesses fail in predictable ways:

• Platform change or ban
• Competitor bundles it for free
• Customers won't pay enough
• Sales cycle too slow
• Founder burnout / service creep
• Churn due to weak lock-in

Pick the one that feels **most realistic**, not most dramatic.`,
          },
          es: {
            title: 'Modos de fallo comunes',
            content: `La mayoría de los negocios fracasan de forma predecible:

• Cambio o bloqueo de plataforma
• Competidor lo regala como feature
• Clientes no pagan lo suficiente
• Ventas demasiado lentas
• Burnout del fundador
• Churn por lock-in débil

Elige el **más probable**, no el más alarmante.`,
          },
        },
      },
    ],
  },
  // SECTION 2 — SCORING (4 steps)
  {
    id: 'scoring',
    questions: [
      {
        id: 'copycatRiskScore',
        type: 'scale',
        scaleMin: 1,
        scaleMax: 10,
        required: true,
        helper: {
          en: {
            title: 'How fast can others replicate this?',
            content: `This measures **how quickly a competitor could reach "good enough."**

• **1** — Very hard to copy
  Requires proprietary data, regulatory approval, or years of history

• **5** — Medium effort
  Solid engineering, domain knowledge, some iteration

• **10** — Trivial to copy
  CRUD + APIs + prompts = done in weeks

Rule of thumb:
> *If another dev can ship a clone in <60 days, score it high.*`,
          },
          es: {
            title: '¿Qué tan rápido pueden replicar esto?',
            content: `Esto mide **qué tan rápido un competidor puede llegar a "suficientemente bueno."**

• **1** — Muy difícil de copiar
  Requiere datos únicos, regulación o años de historial

• **5** — Esfuerzo medio
  Buen desarrollo + conocimiento del dominio

• **10** — Fácil de copiar
  CRUD + APIs + prompts = semanas

Regla práctica:
> *Si alguien puede copiarlo en <60 días, puntúa alto.*`,
          },
        },
      },
      {
        id: 'platformRiskScore',
        type: 'scale',
        scaleMin: 1,
        scaleMax: 10,
        required: true,
        helper: {
          en: {
            title: 'Platform risk explained',
            content: `Platform risk = **how much control you don't have**.

• **1** — Minimal dependency
  Your own infra, optional integrations

• **5** — Meaningful dependency
  APIs or platforms you rely on but can replace

• **10** — Platform hostage
  One policy or pricing change could kill the business

Ask:
> *Could a single ToS change ruin this?*`,
          },
          es: {
            title: 'Riesgo de plataforma explicado',
            content: `El riesgo de plataforma es **cuánto control no tienes**.

• **1** — Dependencia mínima
  Infraestructura propia, integraciones opcionales

• **5** — Dependencia relevante
  APIs importantes pero reemplazables

• **10** — Rehén de la plataforma
  Un cambio puede matar el negocio

Pregunta clave:
> *¿Un cambio de reglas lo destruye?*`,
          },
        },
      },
      {
        id: 'lockInStrengthScore',
        type: 'scale',
        scaleMin: 1,
        scaleMax: 10,
        required: true,
        helper: {
          en: {
            title: 'Lock-in strength calibration',
            content: `How painful is it to leave?

• **1** — Trivial switch
  Export data, import elsewhere, done

• **5** — Some friction
  Learning curve, some data loss, inconvenient

• **10** — Extremely painful
  Months of migration, business disruption, retraining

Think about: data portability, workflow dependencies, team habits.`,
          },
          es: {
            title: 'Calibración de fuerza de lock-in',
            content: `¿Qué tan doloroso es irse?

• **1** — Cambio trivial
  Exportar datos, importar en otro lado, listo

• **5** — Algo de fricción
  Curva de aprendizaje, pérdida de datos, inconveniente

• **10** — Extremadamente doloroso
  Meses de migración, disrupción del negocio, reentrenamiento

Piensa en: portabilidad de datos, dependencias de flujo, hábitos del equipo.`,
          },
        },
      },
      {
        id: 'pricingPowerScore',
        type: 'scale',
        scaleMin: 1,
        scaleMax: 10,
        required: true,
        helper: {
          en: {
            title: 'Pricing power calibration',
            content: `Pricing power = **how much you can raise prices without losing customers**.

• **1** — Price sensitive
  Compared constantly, many alternatives

• **5** — Some flexibility
  Customers complain but stay

• **10** — Strong pricing power
  Tied to revenue, risk, or compliance

Ask:
> *Do customers pay because it's nice—or because they must?*`,
          },
          es: {
            title: 'Calibración de poder de precios',
            content: `El poder de precios es **qué tanto puedes subir precios sin perder clientes**.

• **1** — Muy sensible al precio
  Comparado constantemente, muchas alternativas

• **5** — Algo de flexibilidad
  Clientes se quejan pero se quedan

• **10** — Poder fuerte
  Ligado a ingresos, riesgo o cumplimiento

Pregunta:
> *¿Pagan porque es útil o porque es crítico?*`,
          },
        },
      },
    ],
  },
  // SECTION 3 — FINAL REFLECTION (1 step - AI generates the verdict)
  {
    id: 'reflection',
    questions: [
      {
        id: 'biggestUnresolvedRisk',
        type: 'textarea',
        required: true,
        helper: {
          en: {
            title: 'Be honest with yourself',
            content: `This is your chance to name the elephant in the room.

What's the one thing that could kill this idea that you haven't fully addressed?

• A platform dependency you're hoping won't matter?
• A competitor advantage you're downplaying?
• A scaling problem you're ignoring?
• A market reality you're avoiding?

The AI will analyze all your responses and generate a verdict. This final reflection helps ensure nothing is overlooked.`,
          },
          es: {
            title: 'Sé honesto contigo mismo',
            content: `Esta es tu oportunidad de nombrar el elefante en la habitación.

¿Cuál es la cosa que podría matar esta idea que no has abordado completamente?

• ¿Una dependencia de plataforma que esperas no importe?
• ¿Una ventaja competitiva que estás minimizando?
• ¿Un problema de escala que estás ignorando?
• ¿Una realidad del mercado que estás evitando?

La IA analizará todas tus respuestas y generará un veredicto. Esta reflexión final ayuda a asegurar que nada se pase por alto.`,
          },
        },
      },
    ],
  },
];

// Get total number of questions
export const getTotalQuestions = (): number => {
  return killTestSections.reduce((total, section) => total + section.questions.length, 0);
};

// Flatten all questions into a single array
export const getAllQuestions = (): { section: Section; question: Question; index: number }[] => {
  let index = 0;
  return killTestSections.flatMap((section) =>
    section.questions.map((question) => ({ section, question, index: index++ }))
  );
};
