import { useState } from 'react'
import Header from '../components/Header'
import {
  Play, CheckCircle2, Circle, Award, Lock, ChevronLeft,
  ChevronRight, X, Check, Pause
} from 'lucide-react'
import { img } from '../utils'

const initialModules = [
  {
    id: 1,
    title: 'Show Stacking',
    desc: 'Posiciones y técnicas de presentación',
    status: 'completed',
    video: 'images/dog-doberman.jpg',
    lessons: [
      { title: 'Posición de stack natural', content: 'El stack natural es la posición básica donde el perro se para de forma equilibrada, mostrando su conformación natural. El handler debe guiar suavemente al perro sin forzar la postura.' },
      { title: 'Stack manual paso a paso', content: 'Coloca las patas delanteras perpendiculares al suelo, luego ajusta las traseras para crear una línea de espalda firme. Levanta la cabeza con la correa y mantén la cola en posición.' },
      { title: 'Errores comunes', content: 'Evita sobreextender las patas traseras, mantener la cabeza muy alta o baja, y tensionar demasiado la correa. El perro debe verse natural y relajado.' },
    ],
    quiz: [
      { q: '¿Cuál es la base del stack natural?', options: ['Forzar la postura', 'Equilibrio natural del perro', 'Correa tensa', 'Patas separadas'], correct: 1 },
      { q: '¿Qué se ajusta primero en el stack manual?', options: ['Cola', 'Cabeza', 'Patas delanteras', 'Patas traseras'], correct: 2 },
    ],
  },
  {
    id: 2,
    title: 'Gait & Movement',
    desc: 'Movimiento y desplazamiento en pista',
    status: 'completed',
    video: 'images/dog-golden.jpg',
    lessons: [
      { title: 'Trote correcto', content: 'El trote es el movimiento más evaluado en el ring. El perro debe moverse con pasos fluidos, cubriendo terreno de manera eficiente con movimiento paralelo de las extremidades.' },
      { title: 'Patrones de movimiento', content: 'Los patrones más comunes son: triángulo, línea recta (ida y vuelta), y en L. Cada patrón permite al juez evaluar diferentes aspectos del movimiento del perro.' },
      { title: 'Velocidad y ritmo', content: 'La velocidad debe ser la adecuada para que el perro muestre su mejor movimiento. Ni muy rápido (galope) ni muy lento. Mantén un ritmo constante durante todo el recorrido.' },
    ],
    quiz: [
      { q: '¿Cuál es el movimiento más evaluado?', options: ['Galope', 'Paso', 'Trote', 'Sprint'], correct: 2 },
      { q: '¿Qué patrón NO es común en el ring?', options: ['Triángulo', 'Línea recta', 'Círculo completo', 'En L'], correct: 2 },
    ],
  },
  {
    id: 3,
    title: 'Ring Etiquette',
    desc: 'Protocolo y comportamiento en el ring',
    status: 'current',
    video: 'images/dog-german-shepherd.jpg',
    lessons: [
      { title: 'Presentación ante el juez', content: 'Al entrar al ring, saluda al juez con contacto visual y una sonrisa profesional. Mantén a tu perro bajo control y en posición de atención. Escucha las instrucciones con atención.' },
      { title: 'Espaciado y cortesía', content: 'Mantén distancia adecuada con los demás competidores (al menos 2 metros). Nunca bloquees la vista del juez hacia otros perros. Sé respetuoso con todos los participantes.' },
      { title: 'Vestimenta y profesionalismo', content: 'Viste de forma profesional pero cómoda para correr. Usa zapatos con buena tracción. Evita colores que se confundan con el color de tu perro. La presentación personal es parte de la evaluación.' },
    ],
    quiz: [
      { q: '¿Cuál es la distancia mínima recomendada entre competidores?', options: ['1 metro', '2 metros', '3 metros', '5 metros'], correct: 1 },
      { q: '¿Qué debes evitar en tu vestimenta?', options: ['Zapatos cómodos', 'Colores similares al perro', 'Ropa profesional', 'Tela resistente'], correct: 1 },
    ],
  },
  {
    id: 4,
    title: 'Grooming Profesional',
    desc: 'Preparación del perro para competencia',
    status: 'locked',
    video: 'images/dog-poodle.jpg',
    lessons: [
      { title: 'Baño y secado pre-show', content: 'El baño debe realizarse 1-2 días antes del show. Usa productos específicos para la raza. El secado debe ser completo y con técnica de cepillado simultáneo.' },
      { title: 'Trimming por raza', content: 'Cada raza tiene estándares específicos de trimming. Conoce el estándar de tu raza y practica las técnicas de corte y nivelado apropiadas.' },
      { title: 'Productos y acabado final', content: 'Aplica productos de acabado el día del show: sprays de brillo, productos volumizadores según la raza, y toque final de chalk o color enhancer si es necesario.' },
    ],
    quiz: [
      { q: '¿Cuándo debe bañarse al perro antes del show?', options: ['El mismo día', '1-2 días antes', '1 semana antes', 'No importa'], correct: 1 },
      { q: '¿Qué determina la técnica de trimming?', options: ['El handler', 'El juez', 'El estándar de raza', 'El dueño'], correct: 2 },
    ],
  },
  {
    id: 5,
    title: 'Evaluación Final',
    desc: 'Examen práctico y teórico',
    status: 'locked',
    video: 'images/seal-alianz.png',
    lessons: [
      { title: 'Repaso general', content: 'Este módulo final evalúa todos los conocimientos adquiridos en los módulos anteriores. Revisa tus notas y practica las técnicas antes de comenzar.' },
    ],
    quiz: [
      { q: '¿Cuál es la posición básica de presentación?', options: ['Free stack', 'Stack natural', 'Down stay', 'Heel position'], correct: 1 },
      { q: '¿Qué movimiento evalúa principalmente el juez?', options: ['Galope', 'Trote', 'Paso', 'Sprint'], correct: 1 },
      { q: '¿Cuál es la distancia mínima entre competidores?', options: ['1 metro', '2 metros', '50 cm', '3 metros'], correct: 1 },
    ],
  },
]

export default function University() {
  const [modules, setModules] = useState(initialModules)
  const [activeModuleId, setActiveModuleId] = useState(null)
  const [lessonIndex, setLessonIndex] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [moduleComplete, setModuleComplete] = useState(false)

  const completedCount = modules.filter(m => m.status === 'completed').length
  const progress = Math.round((completedCount / modules.length) * 100)
  const currentModule = modules.find(m => m.status === 'current')
  const activeModule = modules.find(m => m.id === activeModuleId)

  const openModule = (mod) => {
    if (mod.status === 'locked') return
    setActiveModuleId(mod.id)
    setLessonIndex(0)
    setShowQuiz(false)
    setQuizIndex(0)
    setQuizAnswers({})
    setQuizSubmitted(false)
    setModuleComplete(false)
  }

  const closeModule = () => {
    setActiveModuleId(null)
    setShowVideo(false)
    setVideoPlaying(false)
    setVideoProgress(0)
  }

  const nextLesson = () => {
    if (lessonIndex < activeModule.lessons.length - 1) {
      setLessonIndex(lessonIndex + 1)
    } else {
      setShowQuiz(true)
      setQuizIndex(0)
    }
  }

  const prevLesson = () => {
    if (showQuiz) {
      setShowQuiz(false)
      setLessonIndex(activeModule.lessons.length - 1)
    } else if (lessonIndex > 0) {
      setLessonIndex(lessonIndex - 1)
    }
  }

  const selectAnswer = (qIdx, aIdx) => {
    if (quizSubmitted) return
    setQuizAnswers({ ...quizAnswers, [qIdx]: aIdx })
  }

  const submitQuiz = () => {
    setQuizSubmitted(true)
    const allCorrect = activeModule.quiz.every((q, i) => quizAnswers[i] === q.correct)
    if (allCorrect) {
      setTimeout(() => {
        setModuleComplete(true)
        // Update module statuses
        setModules(prev => prev.map(m => {
          if (m.id === activeModuleId) return { ...m, status: 'completed' }
          // Unlock the next one
          if (m.id === activeModuleId + 1 && m.status === 'locked') return { ...m, status: 'current' }
          return m
        }))
      }, 1500)
    }
  }

  const quizScore = activeModule ? activeModule.quiz.reduce((acc, q, i) => acc + (quizAnswers[i] === q.correct ? 1 : 0), 0) : 0
  const allQuizAnswered = activeModule ? activeModule.quiz.every((_, i) => quizAnswers[i] !== undefined) : false

  // Video player overlay
  const playVideo = (mod) => {
    setShowVideo(true)
    setVideoPlaying(true)
    setVideoProgress(0)
  }

  // Simulate video progress
  const toggleVideo = () => {
    if (videoPlaying) {
      setVideoPlaying(false)
    } else {
      setVideoPlaying(true)
    }
  }

  // Simulate progress with click
  const advanceVideo = () => {
    const next = Math.min(videoProgress + 20, 100)
    setVideoProgress(next)
    if (next >= 100) {
      setVideoPlaying(false)
    }
  }

  // Video player
  if (showVideo) {
    const mod = currentModule || modules[0]
    return (
      <div className="h-full flex flex-col bg-black">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => { setShowVideo(false); setVideoPlaying(false); setVideoProgress(0) }} className="text-white">
            <ChevronLeft size={24} />
          </button>
          <span className="text-white text-sm font-medium">{mod.title}</span>
          <div className="w-6" />
        </div>
        <div className="flex-1 flex items-center justify-center relative" onClick={advanceVideo}>
          <img
            src={img(mod.video)}
            alt={mod.title}
            className="w-full h-72 object-cover opacity-80"
          />
          <button
            onClick={(e) => { e.stopPropagation(); toggleVideo() }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              {videoPlaying ? (
                <Pause size={28} className="text-white" fill="currentColor" />
              ) : videoProgress >= 100 ? (
                <Check size={28} className="text-green-400" />
              ) : (
                <Play size={28} className="text-white ml-1" fill="currentColor" />
              )}
            </div>
          </button>
        </div>
        <div className="px-4 py-4">
          <div className="w-full bg-white/20 rounded-full h-1.5 mb-3">
            <div
              className="bg-gold-gradient h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${videoProgress}%` }}
            />
          </div>
          <p className="text-white/50 text-xs text-center">
            {videoProgress >= 100 ? 'Video completado' : 'Toca la pantalla para avanzar'}
          </p>
          {videoProgress >= 100 && (
            <button
              onClick={() => { setShowVideo(false); setVideoPlaying(false); setVideoProgress(0); openModule(mod) }}
              className="mt-4 w-full bg-gold-gradient text-white font-semibold py-3 rounded-xl"
            >
              Continuar a la Lección
            </button>
          )}
        </div>
      </div>
    )
  }

  // Module complete screen
  if (moduleComplete && activeModule) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-cream px-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
          <CheckCircle2 size={40} className="text-green-500" />
        </div>
        <h2 className="text-navy font-bold text-xl mb-2">¡Módulo Completado!</h2>
        <p className="text-gray-500 text-sm mb-1">Has completado <span className="font-semibold">{activeModule.title}</span></p>
        <p className="text-gray-400 text-xs mb-6">
          {completedCount === modules.length
            ? '¡Felicidades! Has completado todos los módulos. Tu certificación está lista.'
            : `${completedCount} de ${modules.length} módulos completados`
          }
        </p>
        <button
          onClick={closeModule}
          className="bg-gold-gradient text-white font-semibold px-8 py-3 rounded-xl"
        >
          Continuar
        </button>
      </div>
    )
  }

  // Lesson / Quiz view
  if (activeModule) {
    const totalSteps = activeModule.lessons.length + 1 // lessons + quiz
    const currentStep = showQuiz ? activeModule.lessons.length + 1 : lessonIndex + 1
    const stepProgress = (currentStep / totalSteps) * 100

    return (
      <div className="h-full flex flex-col bg-cream">
        <header className="bg-navy-gradient safe-top px-4 py-3 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <button onClick={showQuiz || lessonIndex > 0 ? prevLesson : closeModule} className="text-gold">
              <ChevronLeft size={24} />
            </button>
            <span className="text-gold/70 text-sm font-medium">
              {showQuiz ? 'Quiz' : `Lección ${lessonIndex + 1} de ${activeModule.lessons.length}`}
            </span>
            <button onClick={closeModule} className="text-gray-400">
              <X size={20} />
            </button>
          </div>
          <div className="w-full bg-navy-light rounded-full h-1.5">
            <div
              className="bg-gold-gradient h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${stepProgress}%` }}
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scroll-area px-5 pt-6 pb-4 flex flex-col">
          {!showQuiz ? (
            /* Lesson content */
            <div className="flex-1">
              <div className="bg-navy/5 rounded-xl px-3 py-2 mb-5 flex items-center gap-2">
                <Circle size={14} className="text-gold shrink-0" />
                <span className="text-navy text-xs font-medium">Módulo {activeModule.id}: {activeModule.title}</span>
              </div>

              <h2 className="text-navy font-bold text-xl mb-2">
                {activeModule.lessons[lessonIndex].title}
              </h2>
              <div className="bg-white rounded-2xl card-shadow p-5 mt-4">
                <p className="text-navy/80 text-sm leading-relaxed">
                  {activeModule.lessons[lessonIndex].content}
                </p>
              </div>

              {/* Lesson image */}
              <div className="mt-4 rounded-2xl overflow-hidden card-shadow">
                <img
                  src={img(activeModule.video)}
                  alt={activeModule.title}
                  className="w-full h-40 object-cover"
                />
              </div>
            </div>
          ) : (
            /* Quiz */
            <div className="flex-1">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                <Award size={22} className="text-gold" />
              </div>
              <h2 className="text-navy font-bold text-xl mb-1">Quiz del Módulo</h2>
              <p className="text-gray-400 text-sm mb-6">Responde correctamente para completar el módulo</p>

              <div className="space-y-5">
                {activeModule.quiz.map((q, qi) => (
                  <div key={qi} className="bg-white rounded-2xl card-shadow p-4">
                    <p className="text-navy font-semibold text-sm mb-3">{qi + 1}. {q.q}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => {
                        const selected = quizAnswers[qi] === oi
                        const isCorrect = q.correct === oi
                        let style = 'bg-gray-50 text-navy border border-gray-100'
                        if (selected && !quizSubmitted) {
                          style = 'bg-gold-gradient text-white border border-transparent'
                        } else if (quizSubmitted && selected && isCorrect) {
                          style = 'bg-green-500 text-white border border-transparent'
                        } else if (quizSubmitted && selected && !isCorrect) {
                          style = 'bg-red-400 text-white border border-transparent'
                        } else if (quizSubmitted && isCorrect) {
                          style = 'bg-green-50 text-green-700 border border-green-200'
                        }
                        return (
                          <button
                            key={oi}
                            onClick={() => selectAnswer(qi, oi)}
                            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${style}`}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {quizSubmitted && (
                <div className={`mt-4 p-4 rounded-xl text-center ${
                  quizScore === activeModule.quiz.length ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <p className={`font-bold text-base ${
                    quizScore === activeModule.quiz.length ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {quizScore === activeModule.quiz.length
                      ? '¡Perfecto! Todas las respuestas correctas'
                      : `${quizScore} de ${activeModule.quiz.length} correctas. ¡Intenta de nuevo!`
                    }
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action button */}
          {!showQuiz ? (
            <button
              onClick={nextLesson}
              className="mt-6 w-full py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 bg-gold-gradient text-white active:scale-[0.97] transition-all"
            >
              {lessonIndex < activeModule.lessons.length - 1 ? (
                <>
                  Siguiente Lección
                  <ChevronRight size={20} />
                </>
              ) : (
                <>
                  Ir al Quiz
                  <Award size={20} />
                </>
              )}
            </button>
          ) : !quizSubmitted ? (
            <button
              onClick={submitQuiz}
              disabled={!allQuizAnswered}
              className={`mt-6 w-full py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all ${
                allQuizAnswered
                  ? 'bg-gold-gradient text-white active:scale-[0.97]'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              <Check size={20} />
              Enviar Respuestas
            </button>
          ) : quizScore < activeModule.quiz.length ? (
            <button
              onClick={() => { setQuizAnswers({}); setQuizSubmitted(false) }}
              className="mt-6 w-full py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 bg-gold-gradient text-white active:scale-[0.97] transition-all"
            >
              Intentar de Nuevo
            </button>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <Header title="Alianz Universidad" showBack rightIcon="globe" />

      <div className="flex-1 overflow-y-auto scroll-area -mt-5 rounded-t-3xl bg-cream">
        <div className="px-4 pt-5 pb-6">

          {/* Video thumbnail */}
          <button
            onClick={() => currentModule && playVideo(currentModule)}
            className="relative rounded-2xl overflow-hidden card-shadow w-full"
          >
            <img
              src={img(currentModule ? currentModule.video : 'images/dog-golden.jpg')}
              alt="Curso"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                <Play size={24} className="text-navy ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute top-3 left-3 bg-navy/80 text-white text-xs px-2 py-1 rounded-full">
              {currentModule ? `Módulo ${currentModule.id}: ${currentModule.title}` : 'Todos completados'}
            </div>
          </button>

          {/* Progress */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-navy font-semibold text-sm">{progress}% Completado</span>
                <span className="text-gray-400 text-xs">{completedCount}/{modules.length} módulos</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gold-gradient h-2.5 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="shrink-0">
              <img src={img('images/seal-alianz.png')} alt="Certificado" className={`w-12 h-12 object-contain ${progress < 100 ? 'opacity-40' : ''}`} />
            </div>
          </div>

          {/* Certificate preview */}
          <div className={`mt-4 border rounded-xl p-3 flex items-center gap-3 ${
            progress >= 100
              ? 'bg-gold/10 border-gold/30'
              : 'bg-gold/5 border-gold/20'
          }`}>
            <Award size={24} className="text-gold shrink-0" />
            <div>
              <p className="text-navy text-sm font-semibold">Certificación de Handler</p>
              <p className="text-gray-500 text-xs">
                {progress >= 100
                  ? '¡Certificación obtenida! Descarga tu certificado.'
                  : 'Completa todos los módulos para obtener tu certificado oficial'
                }
              </p>
            </div>
            {progress >= 100 && (
              <CheckCircle2 size={20} className="text-green-500 shrink-0" />
            )}
          </div>

          {/* Modules */}
          <div className="mt-5">
            <h3 className="text-navy font-bold text-base mb-3">Módulos</h3>
            <div className="space-y-2.5">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => openModule(mod)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${
                    mod.status === 'current'
                      ? 'bg-white card-shadow border-l-4 border-gold'
                      : mod.status === 'completed'
                      ? 'bg-white card-shadow'
                      : 'bg-gray-100/50'
                  }`}
                  disabled={mod.status === 'locked'}
                >
                  <div className="shrink-0">
                    {mod.status === 'completed' ? (
                      <CheckCircle2 size={22} className="text-green-500" />
                    ) : mod.status === 'current' ? (
                      <Circle size={22} className="text-gold" />
                    ) : (
                      <Lock size={18} className="text-gray-300 ml-0.5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-[10px]">Módulo {mod.id}:</span>
                      {mod.status === 'completed' && (
                        <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">Completado</span>
                      )}
                      {mod.status === 'current' && (
                        <span className="text-[10px] text-gold-dark bg-gold/10 px-1.5 py-0.5 rounded-full">En progreso</span>
                      )}
                    </div>
                    <p className={`font-semibold text-sm mt-0.5 ${mod.status === 'locked' ? 'text-gray-300' : 'text-navy'}`}>
                      {mod.title}
                    </p>
                    <p className={`text-xs mt-0.5 ${mod.status === 'locked' ? 'text-gray-300' : 'text-gray-400'}`}>
                      {mod.desc}
                    </p>
                  </div>
                  {mod.status !== 'locked' && (
                    <ChevronRight size={16} className="text-gray-300 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
