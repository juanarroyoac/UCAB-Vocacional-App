// src/questions.js
// Este archivo contiene el banco oficial de preguntas cerradas para la prueba vocacional.
// Cada pregunta tiene un ID único, el bloque al que pertenece, el tipo de respuesta esperada (likert o yes-no),
// y el texto de la pregunta que se mostrará al usuario.

export const closedQuestions = [
  // --- BLOQUE 1: Intereses y Gustos Generales ---
  { id: 1, block: 1, type: 'likert', text: 'Disfruto aprendiendo sobre tecnologías emergentes y su impacto en la sociedad.' },
  { id: 2, block: 1, type: 'likert', text: 'Me interesa explorar cómo los sistemas automatizados pueden optimizar procesos industriales.' },
  { id: 3, block: 1, type: 'likert', text: 'Me atrae analizar datos económicos para entender tendencias de mercado.' },
  { id: 4, block: 1, type: 'likert', text: 'Disfruto actividades que implican diseño y creatividad aplicada a espacios o productos.' },
  { id: 5, block: 1, type: 'likert', text: 'Me motiva participar en discusiones que requieren argumentación lógica y persuasiva.' },
  { id: 6, block: 1, type: 'likert', text: 'Encuentro fascinante entender cómo se construyen y mantienen grandes obras de infraestructura.' },
  { id: 7, block: 1, type: 'likert', text: 'Me interesa investigar fenómenos sociales para comprender sus causas y consecuencias.' },
  { id: 8, block: 1, type: 'likert', text: 'Siento satisfacción al guiar y facilitar el aprendizaje y desarrollo de otras personas.' },
  { id: 9, block: 1, type: 'likert', text: 'Me apasiona crear formas de expresión artística y cultural que conecten con las personas.' },
  { id: 10, block: 1, type: 'likert', text: 'Me interesa trabajar en proyectos que generen un impacto social positivo y promuevan el bienestar comunitario.' },

  // --- BLOQUE 2: Habilidades y Aptitudes Autopercibidas ---
  { id: 22, block: 2, type: 'likert', text: 'Tengo facilidad para descomponer problemas complejos en partes manejables para resolverlos.' },
  { id: 23, block: 2, type: 'likert', text: 'Me considero una persona organizada que planifica y prioriza tareas eficientemente.' },
  { id: 24, block: 2, type: 'likert', text: 'Tiendo a asumir roles de liderazgo y coordinación en proyectos grupales.' },
  { id: 25, block: 2, type: 'likert', text: 'Disfruto tareas que requieren alta atención al detalle y precisión numérica o normativa.' },
  { id: 26, block: 2, type: 'likert', text: 'Tengo facilidad para entender las necesidades y motivaciones de otras personas.' },
  { id: 27, block: 2, type: 'likert', text: 'Soy hábil visualizando y diseñando estructuras y sistemas en tres dimensiones.' },
  { id: 28, block: 2, type: 'likert', text: 'Me siento cómodo/a presentando y defendiendo ideas de forma clara y persuasiva ante un público.' },
  { id: 29, block: 2, type: 'likert', text: 'Tengo habilidad para analizar críticamente textos complejos y extraer sus ideas fundamentales.' },
  { id: 30, block: 2, type: 'likert', text: 'Disfruto trabajar con datos cuantitativos para modelar fenómenos y llegar a conclusiones.' },
  { id: 31, block: 2, type: 'likert', text: 'Tengo habilidad para realizar investigaciones sistemáticas y redactar informes académicos o técnicos.' },

  // --- BLOQUE 3: Preferencias de Ambiente y Rol ---
  { id: 37, block: 3, type: 'likert', text: 'Me interesa trabajar en proyectos que involucren la gestión de recursos y la planificación estratégica.' },
  { id: 38, block: 3, type: 'likert', text: 'Disfruto analizando información financiera y aplicando normativas para garantizar la precisión.' },
  { id: 39, block: 3, type: 'likert', text: 'Me atrae la idea de trabajar en un entorno colaborativo y dinámico donde se fomente la innovación tecnológica.' },
  { id: 40, block: 3, type: 'likert', text: 'Prefiero un trabajo que combine análisis técnico en oficina con actividades prácticas de campo.' },
  { id: 41, block: 3, type: 'likert', text: 'Me atrae un ambiente académico o de investigación donde se valore el pensamiento profundo y el debate intelectual.' },
  { id: 42, block: 3, type: 'likert', text: 'Me motiva un rol centrado en las personas, ya sea en un entorno educativo, clínico o corporativo, promoviendo su desarrollo.' },
  { id: 43, block: 3, type: 'likert', text: 'Me interesa un rol de mediación, donde pueda gestionar el talento humano y resolver conflictos de forma constructiva.' },
  { id: 44, block: 3, type: 'likert', text: 'Prefiero un entorno laboral que exija aprendizaje continuo y adaptación a nuevas tecnologías y metodologías.' },
  { id: 45, block: 3, type: 'likert', text: 'Me siento a gusto en roles que me permitan combinar el análisis lógico con la creatividad para resolver problemas.' },

  // --- BLOQUE 4: Nuevas Preguntas (Refinadas para reducir sesgo) ---
  { id: 46, block: 4, type: 'likert', text: 'Me interesa aplicar la tecnología para desarrollar soluciones que mejoren directamente la salud o el bienestar de las personas.' },
  { id: 47, block: 4, type: 'likert', text: 'Disfruto diseñando experimentos o estrategias para probar hipótesis y descubrir nuevos conocimientos.' },
  // REEMPLAZADA: La pregunta 48 fue eliminada por ser redundante con la 10. Se sustituye por una enfocada en datos.
  { id: 48, block: 4, type: 'likert', text: 'Me atrae la idea de usar grandes volúmenes de datos (Big Data) para tomar decisiones más inteligentes y eficientes.' },
  { id: 49, block: 4, type: 'likert', text: 'Me apasiona investigar sobre el origen de las ideas, las culturas y el pensamiento humano a lo largo de la historia.' },
  { id: 50, block: 4, type: 'likert', text: 'Me atrae la idea de colaborar en equipos multiculturales para resolver problemas con alcance global.' },
];