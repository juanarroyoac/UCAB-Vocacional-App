// src/questions.js
// Este archivo contiene el banco oficial de preguntas cerradas para la prueba vocacional.
// Cada pregunta tiene un ID único, el bloque al que pertenece, el tipo de respuesta esperada (likert o yes-no),
// y el texto de la pregunta que se mostrará al usuario.

export const closedQuestions = [
  // --- BLOQUE 1: Intereses y Gustos Generales ---
  { id: 1, block: 1, type: 'likert', text: 'Disfruto aprendiendo sobre tecnologías emergentes y su impacto en la sociedad.' },
  { id: 2, block: 1, type: 'likert', text: 'Me interesa explorar cómo los sistemas automatizados pueden optimizar procesos industriales.' },
  { id: 3, block: 1, type: 'likert', text: 'Me atrae analizar datos económicos para entender tendencias de mercado.' },
  { id: 4, block: 1, type: 'likert', text: 'Disfruto actividades que implican diseño y creatividad aplicada.' },
  { id: 5, block: 1, type: 'likert', text: 'Me motiva participar en discusiones que requieren argumentación lógica y persuasiva.' },
  { id: 6, block: 1, type: 'likert', text: 'Encuentro fascinante entender cómo se construyen sistemas complejos.' },
  { id: 7, block: 1, type: 'likert', text: 'Me interesa investigar fenómenos naturales y sus aplicaciones prácticas.' },
  { id: 8, block: 1, type: 'likert', text: 'Siento satisfacción al ayudar a otros a superar desafíos educativos.' },
  { id: 9, block: 1, type: 'likert', text: 'Me apasiona crear formas de expresión artística que conecten con las personas.' },
  { id: 10, block: 1, type: 'likert', text: 'Me interesa trabajar en proyectos que generen impacto positivo en comunidades.' },

  // --- BLOQUE 2: Habilidades y Aptitudes Autopercibidas ---
  { id: 22, block: 2, type: 'likert', text: 'Tengo facilidad para identificar problemas complejos y proponer soluciones prácticas.' },
  { id: 23, block: 2, type: 'likert', text: 'Me considero una persona organizada que prioriza tareas eficientemente.' },
  { id: 24, block: 2, type: 'likert', text: 'Tiendo a asumir roles de liderazgo en proyectos grupales.' },
  { id: 25, block: 2, type: 'likert', text: 'Disfruto tareas que requieren atención al detalle y precisión.' },
  { id: 26, block: 2, type: 'likert', text: 'Tengo facilidad para entender y empatizar con las necesidades de otros.' },
  { id: 27, block: 2, type: 'likert', text: 'Soy hábil visualizando estructuras y sistemas en tres dimensiones.' },
  { id: 28, block: 2, type: 'likert', text: 'Me siento cómodo/a presentando ideas y conceptos frente a un público.' },
  { id: 29, block: 2, type: 'likert', text: 'Tengo habilidad para comunicar ideas complejas de forma sencilla.' },
  { id: 30, block: 2, type: 'likert', text: 'Disfruto trabajar con datos numéricos para llegar a conclusiones.' },
  { id: 31, block: 2, type: 'likert', text: 'Tengo capacidad para analizar textos extensos y extraer puntos clave.' },

  // --- BLOQUE 3: Preferencias de Ambiente y Rol ---
  { id: 37, block: 3, type: 'likert', text: 'Me interesa trabajar en proyectos que involucren la gestión de recursos y planificación estratégica.' },
  { id: 38, block: 3, type: 'likert', text: 'Disfruto analizando datos financieros y proponiendo soluciones para optimizar procesos.' },
  { id: 39, block: 3, type: 'likert', text: 'Me atrae la idea de trabajar en un entorno colaborativo donde se fomente la innovación.' },
  { id: 40, block: 3, type: 'likert', text: 'Prefiero un trabajo que combine análisis técnico con interacción directa con clientes o usuarios.' },
  { id: 41, block: 3, type: 'likert', text: 'Me interesa aprender sobre cómo las empresas pueden ser más sostenibles y responsables socialmente.' },
  { id: 42, block: 3, type: 'likert', text: 'Disfruto diseñando soluciones creativas para problemas complejos en equipos multidisciplinarios.' },
  { id: 43, block: 3, type: 'likert', text: 'Me motiva la idea de liderar proyectos que tengan un impacto positivo en la sociedad.' },
  { id: 44, block: 3, type: 'likert', text: 'Me interesa trabajar en un entorno dinámico que valore la adaptabilidad y el aprendizaje continuo.' },
  { id: 45, block: 3, type: 'likert', text: 'Prefiero roles que me permitan combinar habilidades analíticas con creatividad.' },

  // --- BLOQUE 4: Nuevas Preguntas Generadas por IA ---
  { id: 46, block: 4, type: 'likert', text: 'Me interesa aprender sobre cómo los sistemas tecnológicos pueden mejorar la calidad de vida.' },
  { id: 47, block: 4, type: 'likert', text: 'Disfruto trabajar en proyectos que requieran innovación y pensamiento crítico.' },
  { id: 48, block: 4, type: 'likert', text: 'Me motiva participar en iniciativas que promuevan el desarrollo sostenible.' },
  { id: 49, block: 4, type: 'likert', text: 'Prefiero roles que impliquen investigación y desarrollo de nuevas ideas.' },
  { id: 50, block: 4, type: 'likert', text: 'Me atrae la idea de colaborar en equipos internacionales para resolver problemas globales.' },
];