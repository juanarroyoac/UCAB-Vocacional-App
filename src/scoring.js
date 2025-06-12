// src/scoring.js
// Este archivo contiene la lógica completa para calcular la afinidad del estudiante con cada carrera.

// Ponderaciones: Le damos más peso a las aptitudes que a los intereses o ambientes.
const WEIGHTS = {
  aptitude: 2.0,
  interest: 1.5, // Reducido para evitar sesgo hacia intereses específicos
  environment: 1.75, // Incrementado para dar más peso a preferencias de ambiente
};

// Mapeo COMPLETO de ID de pregunta a la clave correspondiente en el JSON de carreras.
const questionToKeyMap = {
  // --- BLOQUE 1: Intereses y Gustos Generales ---
  1: { key: 'palabras_clave_intereses', value: ['tecnología', 'innovación', 'software', 'hardware', 'internet', 'redes', 'programación', 'datos'], type: 'interest' }, // Matched with Ingeniería Informática, Telecomunicaciones
  2: { key: 'palabras_clave_intereses', value: ['automatización', 'procesos industriales', 'optimización', 'sistemas', 'eficiencia', 'logística', 'calidad'], type: 'interest' }, // Matched with Ingeniería Industrial
  3: { key: 'palabras_clave_intereses', value: ['economía', 'mercados', 'análisis financiero', 'gestión', 'finanzas', 'estrategia', 'emprendimiento', 'optimización', 'números', 'tendencias globales', 'política'], type: 'interest' }, // Matched with Administración, Contaduría, Economía
  4: { key: 'palabras_clave_intereses', value: ['creatividad', 'diseño', 'arte', 'estética', 'espacios', 'escritura', 'redes sociales', 'audiovisual', 'contar historias', 'cultura', 'actualidad', 'literatura', 'idiomas'], type: 'interest' }, // Matched with Comunicación Social, Arquitectura, Letras
  5: { key: 'palabras_clave_intereses', value: ['argumentación', 'debate', 'política', 'negociación', 'justicia', 'leyes', 'defensa', 'orden', 'lectura'], type: 'interest' }, // Matched with Derecho, Filosofía
  6: { key: 'palabras_clave_intereses', value: ['estructuras', 'sistemas', 'procesos', 'planificación', 'construcción', 'matemáticas'], type: 'interest' }, // Matched with Ingeniería Civil
  7: { key: 'palabras_clave_intereses', value: ['fenómenos naturales', 'investigación', 'aplicaciones prácticas', 'sociedad', 'cultura', 'análisis crítico', 'problemas sociales', 'gente', 'historia'], type: 'interest' }, // Matched with Sociología
  8: { key: 'palabras_clave_intereses', value: ['educación', 'ayuda a otros', 'vocación de servicio', 'enseñar', 'paciencia', 'psicología', 'niños y jóvenes', 'impacto social', 'mente humana', 'comportamiento', 'salud mental', 'empatía'], type: 'interest' }, // Matched with Educación, Psicología
  9: { key: 'palabras_clave_intereses', value: ['arte', 'expresión artística', 'conexión emocional', 'creatividad', 'cultura', 'literatura', 'diseño'], type: 'interest' }, // Partially matched, broader terms
  10: { key: 'palabras_clave_intereses', value: ['impacto social', 'comunidad', 'bienestar', 'ayuda a otros', 'espiritualidad', 'fe', 'reflexion'], type: 'interest' }, // Matched with Teología, Sociología, Educación, Psicología

  // --- BLOQUE 2: Habilidades y Aptitudes Autopercibidas ---
  22: { key: 'aptitudes_clave', value: ['resolucion_problemas', 'pensamiento_analitico', 'razonamiento_logico', 'resolucion_problemas_complejos', 'capacidad_analitica'], type: 'aptitude' }, // Broad match
  23: { key: 'aptitudes_clave', value: ['organizacion', 'planificacion_estrategica', 'planificacion'], type: 'aptitude' }, // Broad match
  24: { key: 'aptitudes_clave', value: ['liderazgo', 'gestión de proyectos', 'liderazgo_en_el_aula'], type: 'aptitude' }, // Broad match
  25: { key: 'aptitudes_clave', value: ['precision', 'atencion_al_detalle', 'razonamiento_numerico'], type: 'aptitude' }, // Matched with Contaduría
  26: { key: 'aptitudes_clave', value: ['empatia', 'inteligencia_emocional', 'escucha_activa', 'comunicacion_asertiva', 'habilidades_de_negociacion', 'resolucion_de_conflictos'], type: 'aptitude' }, // Matched with Psicología, Relaciones Industriales
  27: { key: 'aptitudes_clave', value: ['vision_espacial', 'habilidades_graficas', 'pensamiento_de_diseno'], type: 'aptitude' }, // Matched with Arquitectura, Ing. Civil
  28: { key: 'aptitudes_clave', value: ['comunicacion_oral_y_escrita', 'oratoria', 'habilidades_de_comunicacion_oral_y_escrita', 'storytelling', 'redaccion_avanzada'], type: 'aptitude' }, // Matched with Comunicación Social, Derecho, Letras
  29: { key: 'aptitudes_clave', value: ['simplificación de ideas complejas', 'pensamiento_critico', 'capacidad_de_abstraccion', 'interpretacion_de_textos', 'lectura_critica', 'investigacion_documental', 'capacidad_hermeneutica', 'reflexion_filosofica'], type: 'aptitude' }, // Matched with Filosofía, Letras, Teología, Sociología
  30: { key: 'aptitudes_clave', value: ['análisis numérico', 'estadística', 'razonamiento_cuantitativo', 'modelado_estadistico', 'fisica_aplicada'], type: 'aptitude' }, // Matched with Economía, Ing. Civil
  31: { key: 'aptitudes_clave', value: ['lectura_critica', 'interpretacion_de_textos', 'investigacion_cualitativa_y_cuantitativa', 'observacion', 'redaccion_academica'], type: 'aptitude' }, // Matched with Sociología, Filosofía, Letras

  // --- BLOQUE 3: Preferencias de Ambiente y Rol ---
  37: { key: 'ambiente_trabajo', value: ['corporativo', 'orientado_a_objetivos', 'dinamico', 'oficina', 'colaborativo', 'gubernamental', 'analitico', 'orientado_a_datos'], type: 'environment' }, // Matched with Administración, Economía, Ing. Industrial
  38: { key: 'ambiente_trabajo', value: ['analitico', 'corporativo', 'estructurado', 'orientado_al_detalle', 'trabajo_individual_y_equipo', 'regulado', 'despachos_y_tribunales', 'alta_presion'], type: 'environment' }, // Matched with Contaduría, Derecho
  39: { key: 'ambiente_trabajo', value: ['colaborativo', 'innovador', 'tecnologico', 'resolucion_de_problemas', 'flexible', 'creativo', 'dinamico', 'agencias', 'medios_de_comunicacion', 'estudio_de_diseno'], type: 'environment' }, // Matched with Ing. Informática, Telecomunicaciones, Comunicación Social, Arquitectura
  40: { key: 'ambiente_trabajo', value: ['trabajo_de_campo_y_oficina', 'orientado_a_proyectos', 'tecnico', 'regulado', 'oficina_y_data_center'], type: 'environment' }, // Matched with Ing. Civil, Telecomunicaciones
  41: { key: 'ambiente_trabajo', value: ['academico', 'investigativo', 'trabajo_de_campo', 'analitico', 'oficina_y_comunidad', 'reflexivo', 'intelectual', 'editorial', 'cultural', 'pastoral', 'comunitario', 'vocacional'], type: 'environment' }, // Matched with Sociología, Filosofía, Letras, Teología
  42: { key: 'ambiente_trabajo', value: ['creativo', 'equipos multidisciplinarios', 'entorno_educativo', 'colaborativo', 'estructurado', 'centrado_en_personas', 'vocacional', 'consultorio', 'confidencial', 'interpersonal'], type: 'environment' }, // Matched with Educación, Psicología, Relaciones Industriales
  43: { key: 'ambiente_trabajo', value: ['liderazgo', 'impacto social', 'corporativo', 'interpersonal', 'mediacion', 'centrado_en_personas'], type: 'environment' }, // Matched with Relaciones Industriales
  44: { key: 'ambiente_trabajo', value: ['adaptabilidad', 'aprendizaje continuo', 'dinamico', 'innovador', 'flexible', 'tecnologico'], type: 'environment' }, // Broad match for tech/dynamic roles
  45: { key: 'ambiente_trabajo', value: ['habilidades analíticas', 'creatividad', 'analitico', 'creativo', 'resolucion_de_problemas', 'orientado_a_proyectos'], type: 'environment' }, // Broad match for analytical/creative roles

  // --- BLOQUE 4: Nuevas Preguntas Generadas por IA ---
  46: { key: 'palabras_clave_intereses', value: ['tecnología', 'calidad de vida', 'innovación', 'software', 'hardware', 'internet', 'redes', 'programación', 'datos', 'ayuda a otros', 'comportamiento', 'salud mental'], type: 'interest' }, // Mix of tech and helping professions
  47: { key: 'palabras_clave_intereses', value: ['innovación', 'pensamiento crítico', 'investigación', 'nuevas ideas', 'resolución de problemas', 'estrategia', 'optimización'], type: 'interest' }, // Focus on innovation and problem solving
  48: { key: 'palabras_clave_intereses', value: ['desarrollo sostenible', 'impacto social', 'comunidad', 'bienestar', 'problemas sociales', 'política'], type: 'interest' }, // Focus on social impact and sustainability
  49: { key: 'palabras_clave_intereses', value: ['investigación', 'nuevas ideas', 'pensamiento abstracto', 'lectura', 'análisis', 'historia de las ideas', 'descubrimiento'], type: 'interest' }, // Focus on research and intellectual pursuits
  50: { key: 'palabras_clave_intereses', value: ['equipos internacionales', 'problemas globales', 'tendencias globales', 'cultura', 'idiomas', 'comunicación', 'negociación'], type: 'interest' } // Focus on global and intercultural aspects
};


async function calculateResults(answers, careersData) {
  const scores = careersData.map(career => {
    let score = 0;

    Object.entries(answers).forEach(([questionId, answerValue]) => {
      const mapping = questionToKeyMap[questionId];
      // Ensure mapping and mapping.value exist, and career[mapping.key] is an array
      if (mapping && mapping.value && Array.isArray(career[mapping.key])) {
        // Check if ANY of the values in mapping.value are present in career[mapping.key]
        const hasMatch = mapping.value.some(val => career[mapping.key].includes(val));
        if (hasMatch) {
          score += answerValue * WEIGHTS[mapping.type];
        }
      }
    });

    return { carrera: career.carrera, compatibilidad: score };
  });

  return scores.sort((a, b) => b.compatibilidad - a.compatibilidad); // Return all results, slicing is done in ResultsScreen
}

export { calculateResults };