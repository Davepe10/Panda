export type AdventureNode={id:string;title:string;text:string;choices?:{label:string;next:string}[];ending?:string}
export type Adventure={id:string;title:string;subtitle:string;start:string;nodes:Record<string,AdventureNode>}

export const ADVENTURES:Adventure[]=[
 {id:'storm',title:'La señal de la tormenta',subtitle:'Misterio · bosque',start:'s0',nodes:{
  s0:{id:'s0',title:'Kilómetro 47',text:'La carretera queda bloqueada por la tormenta. A la izquierda hay una cabaña con luz; a la derecha, un sendero con señales reflectantes.',choices:[{label:'Entrar a la cabaña',next:'s1a'},{label:'Seguir las señales',next:'s1b'}]},
  s1a:{id:'s1a',title:'La radio',text:'La puerta estaba abierta. Una radio antigua repite: “No usen la llave azul”. Junto a ella hay dos llaves.',choices:[{label:'Tomar la llave azul',next:'s2blue'},{label:'Tomar la llave de cobre',next:'s2copper'}]},
  s1b:{id:'s1b',title:'Las huellas',text:'Las señales terminan junto a una torre meteorológica. Hay huellas recientes y una compuerta medio abierta.',choices:[{label:'Subir a la torre',next:'s2tower'},{label:'Entrar por la compuerta',next:'s2hatch'}]},
  s2blue:{id:'s2blue',title:'La puerta roja',text:'La llave azul abre una puerta roja que da a un túnel. Al fondo se escucha un motor.',choices:[{label:'Seguir el sonido',next:'s3rescue'},{label:'Cerrar y volver',next:'s3lost'}]},
  s2copper:{id:'s2copper',title:'El generador',text:'La llave de cobre enciende un generador. En una pantalla aparece un mapa con una ruta de evacuación.',choices:[{label:'Seguir la ruta',next:'s3map'},{label:'Enviar una señal de radio',next:'s3radio'}]},
  s2tower:{id:'s2tower',title:'Desde arriba',text:'Ven luces de emergencia a tres kilómetros y una zona inundada entre ustedes y la salida.',choices:[{label:'Bajar y rodear la inundación',next:'s3map'},{label:'Encender la baliza de la torre',next:'s3radio'}]},
  s2hatch:{id:'s2hatch',title:'Bajo tierra',text:'La compuerta lleva a un cuarto técnico. Un panel marca una puerta de servicio bloqueada.',choices:[{label:'Restaurar energía',next:'s3rescue'},{label:'Buscar otra salida',next:'s3lost'}]},
  s3rescue:{id:'s3rescue',title:'Un motor en la oscuridad',text:'El ruido era un vehículo de mantenimiento. Las llaves siguen puestas y el camino lateral está libre.',choices:[{label:'Tomar el vehículo',next:'endA'},{label:'Esperar a su dueño',next:'endB'}]},
  s3lost:{id:'s3lost',title:'Sin señal',text:'Al volver, la tormenta empeoró. Solo queda una bengala y la radio.',choices:[{label:'Usar la bengala',next:'endB'},{label:'Intentar la radio',next:'endC'}]},
  s3map:{id:'s3map',title:'Ruta oculta',text:'El mapa lleva a un puente de servicio aún intacto. Una caja indica “solo para emergencias”.',choices:[{label:'Cruzar de inmediato',next:'endA'},{label:'Revisar la caja',next:'endC'}]},
  s3radio:{id:'s3radio',title:'Respuesta',text:'Una voz responde: “Los vemos. Mantengan la luz encendida y no se muevan”.',choices:[{label:'Esperar juntos',next:'endB'},{label:'Ir hacia las luces',next:'endA'}]},
  endA:{id:'endA',title:'Salida al amanecer',text:'Encuentran la carretera abierta justo cuando empieza a aclarar.',ending:'Final: Los exploradores'},
  endB:{id:'endB',title:'Luces entre la lluvia',text:'Un equipo de rescate llega siguiendo su señal. La tormenta queda atrás.',ending:'Final: La señal correcta'},
  endC:{id:'endC',title:'El mensaje oculto',text:'Dentro de la caja hay coordenadas y una nota de antiguos técnicos. Descubrieron el secreto de la estación y una ruta segura.',ending:'Final: El secreto de la estación'},
 }},
 {id:'orbital',title:'Órbita 9',subtitle:'Ciencia ficción · cooperación',start:'o0',nodes:{
  o0:{id:'o0',title:'Alarma silenciosa',text:'Despiertan en una estación orbital. La IA informa que quedan 38 minutos de oxígeno auxiliar.',choices:[{label:'Revisar el reactor',next:'o1a'},{label:'Ir al puente',next:'o1b'}]},
  o1a:{id:'o1a',title:'Reactor frío',text:'El reactor está estable, pero alguien desconectó el circuito de refrigeración manualmente.',choices:[{label:'Reconectar circuito',next:'o2a'},{label:'Buscar registro de acceso',next:'o2b'}]},
  o1b:{id:'o1b',title:'Puente vacío',text:'La órbita está decayendo. Pueden corregir rumbo o enviar una llamada de emergencia.',choices:[{label:'Corregir órbita',next:'o2c'},{label:'Enviar llamada',next:'o2d'}]},
  o2a:{id:'o2a',title:'Temperatura estable',text:'Recuperan energía. Ahora pueden alimentar motores o soporte vital.',choices:[{label:'Motores',next:'o3a'},{label:'Soporte vital',next:'o3b'}]},
  o2b:{id:'o2b',title:'Registro 031',text:'El último acceso fue de un dron de mantenimiento averiado.',choices:[{label:'Buscar el dron',next:'o3c'},{label:'Ignorarlo y volver al puente',next:'o3a'}]},
  o2c:{id:'o2c',title:'Ventana orbital',text:'La corrección requiere energía extra del módulo científico.',choices:[{label:'Usar esa energía',next:'o3a'},{label:'Conservar experimentos',next:'o3b'}]},
  o2d:{id:'o2d',title:'Eco',text:'Una nave responde, pero tardará 25 minutos. Deben mantener soporte vital.',choices:[{label:'Priorizar oxígeno',next:'o3b'},{label:'Intentar acercarse',next:'o3a'}]},
  o3a:{id:'o3a',title:'Impulso',text:'Los motores responden. Una maniobra puede estabilizar la estación o acercarla a la nave de rescate.',choices:[{label:'Estabilizar',next:'oEndA'},{label:'Acercarse',next:'oEndC'}]},
  o3b:{id:'o3b',title:'Aire',text:'El oxígeno vuelve a niveles seguros. Queda energía para una única transmisión.',choices:[{label:'Enviar coordenadas',next:'oEndB'},{label:'Enviar diagnóstico',next:'oEndA'}]},
  o3c:{id:'o3c',title:'Dron 7',text:'El dron tenía una batería intacta y una orden corrupta.',choices:[{label:'Usar batería en motores',next:'oEndC'},{label:'Usarla en comunicaciones',next:'oEndB'}]},
  oEndA:{id:'oEndA',title:'Órbita segura',text:'La estación queda estable y el rescate llega sin más incidentes.',ending:'Final: Ingeniería impecable'},
  oEndB:{id:'oEndB',title:'Contacto',text:'Sus coordenadas llegan a tiempo. La nave se acopla minutos después.',ending:'Final: Señal recibida'},
  oEndC:{id:'oEndC',title:'Encuentro',text:'La maniobra los coloca junto a la nave de rescate. Una salida arriesgada, pero perfecta.',ending:'Final: Maniobra audaz'},
 }}
]

export type EscapeScenario={id:string;title:string;subtitle:string;code:string;objects:{id:string;emoji:string;name:string;clue:string}[];finalText:string}
export const ESCAPES:EscapeScenario[]=[
 {id:'room17',title:'Habitación 17',subtitle:'Hotel abandonado',code:'427',objects:[
  {id:'painting',emoji:'🖼️',name:'Cuadro',clue:'Detrás del cuadro hay un 4 escrito con tiza.'},
  {id:'lamp',emoji:'💡',name:'Lámpara',clue:'Bajo la base aparece grabado el número 2.'},
  {id:'book',emoji:'📕',name:'Libro',clue:'El marcador está colocado en la página 7.'},
  {id:'clock',emoji:'🕰️',name:'Reloj',clue:'El reloj está detenido a las 4:27. Eso parece demasiado específico.'},
 ],finalText:'La caja contiene la tarjeta de salida y una nota: “La habitación nunca estuvo cerrada; solo necesitaban mirar mejor”.'},
 {id:'train',title:'El vagón vacío',subtitle:'Tren nocturno',code:'315',objects:[
  {id:'ticket',emoji:'🎫',name:'Boleto',clue:'Asiento 3, vagón 1.'},{id:'case',emoji:'🧳',name:'Maleta',clue:'Una etiqueta muestra cinco estrellas.'},
  {id:'window',emoji:'🪟',name:'Ventana',clue:'En el vidrio alguien escribió 315 con el dedo.'},{id:'map',emoji:'🗺️',name:'Mapa',clue:'Las estaciones 3, 1 y 5 están circuladas.'},
 ],finalText:'La puerta del conductor se abre. El tren estaba en modo automático y el freno de emergencia podía liberarse desde allí.'},
 {id:'lab',title:'Laboratorio N',subtitle:'Instalación subterránea',code:'806',objects:[
  {id:'tube',emoji:'🧪',name:'Tubos',clue:'Hay 8 tubos llenos en la bandeja.'},{id:'monitor',emoji:'🖥️',name:'Monitor',clue:'El error termina en 06.'},
  {id:'badge',emoji:'🪪',name:'Credencial',clue:'La credencial dice N-806.'},{id:'drawer',emoji:'🗄️',name:'Archivador',clue:'Solo el cajón 8 abre; dentro hay una nota: “06”.'},
 ],finalText:'El cierre magnético se desactiva. Al otro lado hay un ascensor y el registro completo del experimento.'}
]
