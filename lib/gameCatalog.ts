export type GameMode = 'async' | 'live' | 'both'
export type GameCategory = 'conectar'|'creatividad'|'mente'|'arcade'|'cooperativo'
export type GameDef = {id:string;title:string;emoji:string;description:string;mode:GameMode;category:GameCategory;accent:string;points:number;minutes:string}

export const GAME_CATALOG: GameDef[] = [
  {id:'mind-meld',title:'Mentes conectadas',emoji:'🧠',description:'Escriban lo primero que se les ocurra y descubran si pensaron igual.',mode:'both',category:'conectar',accent:'violet',points:20,minutes:'2–3 min'},
  {id:'would-you-rather',title:'¿Qué elegirías?',emoji:'🪄',description:'Decisiones imposibles, absurdas y profundas. Se revela cuando ambos responden.',mode:'async',category:'conectar',accent:'rose',points:15,minutes:'2 min'},
  {id:'know-me',title:'¿Cuánto me conoces?',emoji:'💭',description:'Predice la respuesta del otro antes de verla.',mode:'async',category:'conectar',accent:'peach',points:20,minutes:'3 min'},
  {id:'likely',title:'¿Quién es más probable?',emoji:'👀',description:'Voten en secreto y comparen resultados.',mode:'async',category:'conectar',accent:'amber',points:15,minutes:'2 min'},
  {id:'either-or',title:'Esto o aquello',emoji:'⚡',description:'Rondas rápidas para descubrir coincidencias.',mode:'both',category:'conectar',accent:'sky',points:10,minutes:'1–2 min'},
  {id:'truth-dare',title:'Verdad o reto',emoji:'🎴',description:'Cartas de humor, creatividad, conversación y retos.',mode:'both',category:'creatividad',accent:'rose',points:15,minutes:'3–8 min'},
  {id:'roulette',title:'Ruleta',emoji:'🎡',description:'Gira y deja que el azar elija pregunta, reto o sorpresa.',mode:'both',category:'creatividad',accent:'amber',points:10,minutes:'2–5 min'},
  {id:'two-truths',title:'Dos verdades y una mentira',emoji:'🕵️',description:'Engaña con estilo o descubre la afirmación falsa.',mode:'async',category:'creatividad',accent:'violet',points:20,minutes:'4 min'},
  {id:'taboo',title:'Código secreto',emoji:'🔐',description:'Da pistas sin usar las palabras prohibidas.',mode:'async',category:'creatividad',accent:'ink',points:25,minutes:'3 min'},
  {id:'draw',title:'Dibuja y adivina',emoji:'🎨',description:'Dibuja con el dedo. El otro podrá ver el trazo y adivinar después.',mode:'async',category:'creatividad',accent:'sky',points:25,minutes:'4 min'},
  {id:'word-chain',title:'Cadena',emoji:'🔤',description:'Continúen la cadena de palabras sin repetir.',mode:'async',category:'mente',accent:'sage',points:15,minutes:'3–6 min'},
  {id:'code4',title:'Código 4',emoji:'🔢',description:'Descifra una combinación mediante pistas lógicas.',mode:'async',category:'mente',accent:'ink',points:30,minutes:'4–8 min'},
  {id:'puzzle',title:'Puzzle cooperativo',emoji:'🧩',description:'Ordenen juntos un tablero. Cada movimiento queda guardado.',mode:'async',category:'cooperativo',accent:'peach',points:35,minutes:'4–8 min'},
  {id:'trivia-coop',title:'Trivia cooperativa',emoji:'🌎',description:'Ustedes dos contra el juego. Construyan una puntuación conjunta.',mode:'both',category:'cooperativo',accent:'sage',points:20,minutes:'3 min'},
  {id:'trivia-versus',title:'Trivia versus',emoji:'🏁',description:'Misma pregunta, dos respuestas, un ganador.',mode:'both',category:'mente',accent:'amber',points:20,minutes:'3 min'},
  {id:'cards',title:'Cartas de Nosotros',emoji:'🃏',description:'Imagina, decide, adivina, haz o arriésgate.',mode:'both',category:'creatividad',accent:'violet',points:15,minutes:'2–6 min'},
  {id:'adventure',title:'La aventura',emoji:'🗺️',description:'Historias por episodios donde cada decisión cambia el camino.',mode:'async',category:'cooperativo',accent:'sage',points:40,minutes:'5–12 min'},
  {id:'escape',title:'Escape Room',emoji:'🗝️',description:'Pistas, inventario y códigos compartidos. Resuélvanlo entre los dos.',mode:'async',category:'cooperativo',accent:'ink',points:50,minutes:'8–15 min'},
  {id:'bomb',title:'La bomba',emoji:'💣',description:'Responde antes de que el temporizador impredecible explote.',mode:'live',category:'arcade',accent:'rose',points:20,minutes:'2–4 min'},
  {id:'reaction',title:'Reaction Duel',emoji:'⚡',description:'No toques antes de tiempo. El menor tiempo gana.',mode:'live',category:'arcade',accent:'amber',points:25,minutes:'2 min'},
  {id:'pong',title:'Pong Duo',emoji:'🏓',description:'Arcade clásico optimizado para pantalla táctil y Realtime.',mode:'live',category:'arcade',accent:'sky',points:25,minutes:'3–5 min'},
  {id:'air-hockey',title:'Air Hockey',emoji:'🥅',description:'Desliza, defiende y marca. Partidas cortas en vivo.',mode:'live',category:'arcade',accent:'violet',points:25,minutes:'3–5 min'},
  {id:'snake-duo',title:'Snake Duo',emoji:'🐍',description:'Recolecten orbes sin chocar. El host mantiene el mundo sincronizado.',mode:'live',category:'arcade',accent:'sage',points:30,minutes:'3–6 min'},
  {id:'turbo-race',title:'Turbo Race',emoji:'🏎️',description:'Duelo de aceleración y reflejos: toca en el momento justo para avanzar.',mode:'live',category:'arcade',accent:'rose',points:25,minutes:'2–4 min'},
  {id:'block-drop',title:'Block Drop',emoji:'🧱',description:'Puzzle de bloques cooperativo para completar líneas entre los dos.',mode:'async',category:'cooperativo',accent:'sky',points:30,minutes:'4–8 min'},
]

export const CHOICE_QUESTIONS: Record<string,{q:string;options:string[]}[]> = {
  'would-you-rather': [
    {q:'¿Qué poder elegirías por una semana?',options:['Teletransportarme','Detener el tiempo','Leer la mente','Volar']},
    {q:'Tienes un fin de semana completamente libre. ¿Qué eliges?',options:['Viaje improvisado','Maratón de películas','Naturaleza','Comer por la ciudad']},
    {q:'¿Qué preferirías dominar instantáneamente?',options:['Un idioma','Un instrumento','Cocina','Programación']},
    {q:'Si pudieras vivir un año en otra época, ¿cuál?',options:['Pasado','Futuro']},
    {q:'¿Qué escogerías para viajar durante un mes?',options:['Japón','Italia','Nueva Zelanda','México']},
    {q:'¿Qué habilidad fantástica sería más útil en el día a día?',options:['No necesitar dormir','Recordar todo','Hablar con animales','Respirar bajo el agua']},
    {q:'¿Qué preferirías perder durante un mes?',options:['Redes sociales','Streaming','Delivery','Videojuegos']},
    {q:'¿Qué aventura suena mejor?',options:['Dormir bajo estrellas','Viaje en tren sin plan','Ruta gastronómica','Parque temático']},
    {q:'¿Qué casa elegirías?',options:['Cabaña en bosque','Departamento en ciudad','Casa frente al mar','Casa de campo']},
    {q:'¿Qué talento artístico te gustaría tener?',options:['Dibujar','Bailar','Cantar','Fotografía']},
    {q:'¿Qué preferirías conocer?',options:['El fondo del océano','El espacio exterior']},
    {q:'¿Qué te parece más valioso?',options:['Mucho tiempo libre','Mucho dinero']},
    {q:'¿Qué comida podrías repetir más seguido?',options:['Pizza','Sushi','Pasta','Comida peruana']},
    {q:'¿Qué clima elegirías todo el año?',options:['Frío','Templado','Calor','Lluvia suave']},
    {q:'Si solo pudieras conservar uno, ¿cuál?',options:['Música','Películas','Libros','Juegos']},
    {q:'¿Qué experiencia extrema probarías primero?',options:['Paracaidismo','Buceo','Escalada','Rally']},
  ],
  'likely': [
    {q:'¿Quién es más probable que se quede dormido durante una película?',options:['Yo','Mi persona']},
    {q:'¿Quién sobreviviría mejor a una semana sin internet?',options:['Yo','Mi persona']},
    {q:'¿Quién terminaría hablando con un desconocido en una fila?',options:['Yo','Mi persona']},
    {q:'¿Quién compraría algo solo porque se veía bonito?',options:['Yo','Mi persona']},
    {q:'¿Quién organizaría un viaje con una hoja de cálculo?',options:['Yo','Mi persona']},
    {q:'¿Quién olvidaría dónde dejó el celular?',options:['Yo','Mi persona']},
    {q:'¿Quién ganaría un concurso de preguntas?',options:['Yo','Mi persona']},
    {q:'¿Quién probaría una comida extraña primero?',options:['Yo','Mi persona']},
    {q:'¿Quién adoptaría otra mascota sin pensarlo mucho?',options:['Yo','Mi persona']},
    {q:'¿Quién se reiría en un momento donde no debería?',options:['Yo','Mi persona']},
    {q:'¿Quién escogería una ruta diferente solo por curiosidad?',options:['Yo','Mi persona']},
    {q:'¿Quién tardaría más eligiendo qué ver?',options:['Yo','Mi persona']},
  ],
  'either-or': [
    {q:'Elige sin pensarlo demasiado',options:['Playa','Montaña']},{q:'Elige sin pensarlo demasiado',options:['Dulce','Salado']},
    {q:'Elige sin pensarlo demasiado',options:['Película','Serie']},{q:'Elige sin pensarlo demasiado',options:['Planear','Improvisar']},
    {q:'Elige sin pensarlo demasiado',options:['Día','Noche']},{q:'Elige sin pensarlo demasiado',options:['Café','Chocolate']},
    {q:'Elige sin pensarlo demasiado',options:['Perros','Gatos']},{q:'Elige sin pensarlo demasiado',options:['Ciudad','Campo']},
    {q:'Elige sin pensarlo demasiado',options:['Llamada','Mensajes']},{q:'Elige sin pensarlo demasiado',options:['Desayuno','Cena']},
    {q:'Elige sin pensarlo demasiado',options:['Aventura','Descanso']},{q:'Elige sin pensarlo demasiado',options:['Verano','Invierno']},
    {q:'Elige sin pensarlo demasiado',options:['Fotos','Videos']},{q:'Elige sin pensarlo demasiado',options:['Museo','Concierto']},
    {q:'Elige sin pensarlo demasiado',options:['Picante','Sin picante']},{q:'Elige sin pensarlo demasiado',options:['Ventana','Pasillo']},
  ],
  'know-me': [
    {q:'¿Qué plan escogería hoy?',options:['Salir','Quedarme en casa','Comer algo rico','Hacer algo nuevo']},
    {q:'¿Qué me recarga más?',options:['Dormir','Hablar','Estar a solas','Salir']},
    {q:'Si tengo un día pesado, ¿qué me ayuda más?',options:['Comida rica','Silencio','Conversar','Dormir']},
    {q:'¿Qué elegiría en un viaje?',options:['Itinerario lleno','Pocas cosas y calma','Improvisar todo','Comer y caminar']},
    {q:'¿Qué me cuesta más resistir?',options:['Un postre','Una oferta','Una siesta','Un plan espontáneo']},
    {q:'¿Qué prefiero recibir sin ocasión especial?',options:['Comida','Una nota','Un detalle útil','Una sorpresa']},
    {q:'¿Cuál sería mi noche ideal?',options:['Película','Salir','Conversar','Jugar algo']},
    {q:'¿Qué me emociona más de un lugar nuevo?',options:['Comida','Paisajes','Historia','Compras']},
    {q:'Si aprendo algo nuevo, ¿cómo prefiero hacerlo?',options:['Probando','Viendo videos','Leyendo','Con alguien']},
    {q:'¿Qué tipo de regalo elegiría?',options:['Experiencia','Tecnología','Ropa','Algo hecho a mano']},
  ]
}

export const MIND_PROMPTS = [
 'Algo que encuentras en una playa','Una película que volverías a ver','Algo que llevarías a una isla','Un animal que te da ternura','Una ciudad que te gustaría conocer','Algo que siempre hay en una mochila','Una comida de madrugada','Una palabra que suena bonita','Un olor que recuerda a casa','Algo que harías en un día libre','Un color para una habitación','Un personaje famoso','Un objeto de cocina','Un lugar para una primera cita ficticia','Una app que abres todos los días','Una canción para carretera','Un superpoder inútil pero divertido','Algo que jamás llevarías de camping','Una bebida fría','Una excusa típica para llegar tarde','Un animal peligroso','Una cosa redonda','Algo que encuentras en un aeropuerto','Una fruta tropical','Un país de Sudamérica','Una palabra que empiece con M','Un objeto que hace ruido','Algo que regalarías a un niño','Un sabor de helado','Una cosa que se pierde fácil','Algo que usarías bajo la lluvia','Una profesión de película','Algo amarillo','Un deporte con pelota','Una comida que se come con las manos','Un lugar silencioso','Algo que hay en una fiesta','Una cosa que da sueño','Algo que llevarías a la Luna','Una palabra relacionada con verano'
]

export const DRAW_WORDS = ['pingüino','cohete','pizza','castillo','gato','paraguas','robot','jirafa','volcán','bicicleta','fantasma','tiburón','helicóptero','sandía','dragón','cactus','corona','hamburguesa','planeta','guitarra','pulpo','dinosaurio','farol','ballena','cangrejo','pirata','helado','mariposa','torre','avión']

export const TABOO_CARDS = [
 {word:'VOLCÁN',forbidden:['lava','montaña','erupción']},{word:'NETFLIX',forbidden:['serie','película','streaming']},{word:'PLAYA',forbidden:['mar','arena','sol']},
 {word:'PIZZA',forbidden:['queso','masa','italiana']},{word:'AVIÓN',forbidden:['volar','aeropuerto','piloto']},{word:'PERRO',forbidden:['mascota','ladra','animal']},
 {word:'CAFÉ',forbidden:['taza','bebida','cafeína']},{word:'CELULAR',forbidden:['teléfono','llamar','pantalla']},{word:'FÚTBOL',forbidden:['pelota','gol','jugador']},
 {word:'LUNA',forbidden:['noche','satélite','cielo']},{word:'HOSPITAL',forbidden:['médico','enfermo','salud']},{word:'CHOCOLATE',forbidden:['dulce','cacao','postre']}
]

export const TRIVIA = [
 {q:'¿Cuál es el planeta más grande del sistema solar?',o:['Marte','Júpiter','Saturno','Neptuno'],a:1,cat:'Ciencia'},
 {q:'¿En qué continente se encuentra Egipto?',o:['Asia','África','Europa','América'],a:1,cat:'Geografía'},
 {q:'¿Qué elemento químico tiene el símbolo Au?',o:['Plata','Oro','Cobre','Aluminio'],a:1,cat:'Ciencia'},
 {q:'¿Cuántos lados tiene un dodecágono?',o:['10','12','14','16'],a:1,cat:'Lógica'},
 {q:'¿Qué océano es el más grande?',o:['Atlántico','Índico','Pacífico','Ártico'],a:2,cat:'Geografía'},
 {q:'¿Quién escribió Don Quijote de la Mancha?',o:['Miguel de Cervantes','Jorge Luis Borges','Pablo Neruda','Federico García Lorca'],a:0,cat:'Cultura'},
 {q:'¿Cuál es la capital de Australia?',o:['Sídney','Melbourne','Canberra','Perth'],a:2,cat:'Geografía'},
 {q:'¿Qué gas absorben principalmente las plantas?',o:['Oxígeno','Dióxido de carbono','Helio','Hidrógeno'],a:1,cat:'Ciencia'},
 {q:'¿Cuántos jugadores tiene un equipo de fútbol en cancha al comenzar?',o:['9','10','11','12'],a:2,cat:'Deportes'},
 {q:'¿Qué instrumento mide la presión atmosférica?',o:['Termómetro','Barómetro','Anemómetro','Higrómetro'],a:1,cat:'Ciencia'},
 {q:'¿Cuál es el río más largo de Sudamérica?',o:['Orinoco','Paraná','Amazonas','Uruguay'],a:2,cat:'Geografía'},
 {q:'¿Qué país tiene forma de bota en los mapas?',o:['Grecia','Italia','Portugal','Croacia'],a:1,cat:'Geografía'},
 {q:'¿Qué órgano bombea la sangre por el cuerpo?',o:['Pulmón','Riñón','Hígado','Corazón'],a:3,cat:'Ciencia'},
 {q:'¿Cuál es el resultado de 9 × 8?',o:['64','72','81','88'],a:1,cat:'Lógica'},
 {q:'¿Qué animal es el mamífero terrestre más grande?',o:['Rinoceronte','Elefante africano','Hipopótamo','Jirafa'],a:1,cat:'Animales'},
 {q:'¿Cuál es la capital del Perú?',o:['Cusco','Arequipa','Lima','Trujillo'],a:2,cat:'Geografía'},
 {q:'¿Qué metal es líquido a temperatura ambiente?',o:['Mercurio','Hierro','Aluminio','Cobre'],a:0,cat:'Ciencia'},
 {q:'¿Qué planeta es conocido como el planeta rojo?',o:['Venus','Marte','Mercurio','Urano'],a:1,cat:'Ciencia'},
 {q:'¿Cuántos minutos tiene una hora y media?',o:['60','75','90','120'],a:2,cat:'Lógica'},
 {q:'¿Cuál es la moneda de Japón?',o:['Won','Yuan','Yen','Ringgit'],a:2,cat:'Mundo'},
 {q:'¿Quién pintó la Mona Lisa?',o:['Van Gogh','Picasso','Leonardo da Vinci','Monet'],a:2,cat:'Arte'},
 {q:'¿En qué deporte se utiliza una raqueta y un volante?',o:['Tenis','Bádminton','Squash','Pádel'],a:1,cat:'Deportes'},
 {q:'¿Qué país alberga Machu Picchu?',o:['Bolivia','Perú','Ecuador','Chile'],a:1,cat:'Cultura'},
 {q:'¿Cuál es el hueso más largo del cuerpo humano?',o:['Húmero','Tibia','Fémur','Radio'],a:2,cat:'Ciencia'},
 {q:'¿Qué idioma tiene más hablantes nativos?',o:['Inglés','Español','Mandarín','Hindi'],a:2,cat:'Mundo'},
 {q:'¿Cuál de estos animales es un marsupial?',o:['Panda','Canguro','Tigre','Lobo'],a:1,cat:'Animales'},
 {q:'¿Qué número romano representa 50?',o:['L','C','X','V'],a:0,cat:'Historia'},
 {q:'¿Qué color se obtiene al mezclar azul y amarillo?',o:['Morado','Verde','Naranja','Marrón'],a:1,cat:'Arte'},
 {q:'¿Cuál es el continente más grande por superficie?',o:['África','Asia','Europa','América del Norte'],a:1,cat:'Geografía'},
 {q:'¿Qué vitamina produce el cuerpo con ayuda de la luz solar?',o:['A','B12','C','D'],a:3,cat:'Ciencia'},
 {q:'¿Qué ciudad es famosa por la Torre Eiffel?',o:['Roma','París','Bruselas','Madrid'],a:1,cat:'Mundo'},
 {q:'¿Cuántas caras tiene un cubo?',o:['4','6','8','12'],a:1,cat:'Lógica'},
 {q:'¿Qué animal puede cambiar de color para camuflarse?',o:['Camaleón','Koala','Delfín','Avestruz'],a:0,cat:'Animales'},
 {q:'¿Qué país ganó el primer Mundial de fútbol masculino en 1930?',o:['Brasil','Argentina','Uruguay','Italia'],a:2,cat:'Deportes'},
 {q:'¿Cuál es el componente principal del Sol?',o:['Oxígeno','Hidrógeno','Carbono','Nitrógeno'],a:1,cat:'Ciencia'},
 {q:'¿Qué cordillera recorre gran parte del oeste de Sudamérica?',o:['Alpes','Andes','Himalaya','Pirineos'],a:1,cat:'Geografía'},
]

export const CARD_DECK = [
 {type:'IMAGINA',text:'Te dan S/10,000 y debes gastarlos hoy. ¿Qué harías?'},{type:'DECIDE',text:'Solo pueden elegir una: una gran cena o una escapada espontánea.'},
 {type:'HAZ',text:'Imita durante 20 segundos a un personaje que el otro conozca.'},{type:'ADIVINA',text:'Piensa en una comida. La otra persona tiene tres preguntas para descubrirla.'},
 {type:'RIESGO',text:'Deja que la otra persona elija tu próxima canción.'},{type:'IMAGINA',text:'Diseñen mentalmente un hotel absurdo. ¿Qué tendría sí o sí?'},
 {type:'DECIDE',text:'Tienen un vuelo gratis esta noche: ¿playa, montaña o ciudad?'},{type:'HAZ',text:'Describe una película terrible como si fuera una obra maestra.'},
 {type:'ADIVINA',text:'Piensa en un animal. La otra persona tiene cinco preguntas de sí/no.'},{type:'RIESGO',text:'El otro elige una foto graciosa que debes recrear.'},
 {type:'IMAGINA',text:'Inventen un país: nombre, comida nacional y una ley absurda.'},{type:'DECIDE',text:'¿Una semana sin celular o una semana sin comida favorita?'},
 {type:'HAZ',text:'Habla durante 30 segundos con un acento inventado.'},{type:'ADIVINA',text:'Piensa en una celebridad. Solo puedes responder sí/no.'},
 {type:'RIESGO',text:'Deja que el otro elija el snack de hoy.'},{type:'IMAGINA',text:'Si tuvieran un café temático, ¿cómo se llamaría?'},
 {type:'DECIDE',text:'¿Viaje con todo planificado o sin reservas?'},{type:'HAZ',text:'Dibuja un gato sin levantar el dedo de la pantalla.'},
 {type:'ADIVINA',text:'Piensa en un lugar de Lima. Tres pistas como máximo.'},{type:'RIESGO',text:'El otro decide tu fondo de pantalla por una hora.'},
 {type:'IMAGINA',text:'Elijan tres objetos para sobrevivir en una isla ficticia.'},{type:'DECIDE',text:'¿Casa enorme lejos de todo o departamento pequeño en el centro?'},
 {type:'HAZ',text:'Cuenta una historia de 20 segundos usando “panda”, “taxi” y “tormenta”.'},{type:'ADIVINA',text:'Piensa en una serie. Da solo tres emojis como pista.'},
 {type:'RIESGO',text:'Acepta la próxima carta sin poder saltarla.'},{type:'IMAGINA',text:'Inventen una mascota fantástica mezclando dos animales.'},
 {type:'DECIDE',text:'¿Conocer el futuro una vez o poder cambiar una decisión del pasado?'},{type:'HAZ',text:'Haz una pose de estatua durante 15 segundos.'},
 {type:'ADIVINA',text:'Describe un objeto de la habitación sin decir su color ni su uso.'},{type:'RIESGO',text:'El otro elige qué juego viene después.'},
]

export const TRUTH_DARES = [
 {kind:'Verdad',text:'¿Qué pequeña cosa te pone de buen humor casi siempre?'},{kind:'Verdad',text:'¿Qué hábito raro tienes cuando estás solo?'},
 {kind:'Verdad',text:'¿Cuál fue una compra impulsiva que sí valió la pena?'},{kind:'Verdad',text:'¿Qué cosa aprenderías si mañana tuvieras el día libre?'},
 {kind:'Reto',text:'Imita un comercial de televisión durante 20 segundos.'},{kind:'Reto',text:'Haz una mini coreografía de 15 segundos.'},
 {kind:'Reto',text:'Dibuja con los ojos cerrados una casa y muéstrala.'},{kind:'Reto',text:'Habla como robot hasta que termine la siguiente ronda.'},
 {kind:'Sorpresa',text:'Ambos elijan una canción y escuchen 30 segundos de cada una.'},{kind:'Sorpresa',text:'Elijan una comida que quieran probar algún día.'}
]
