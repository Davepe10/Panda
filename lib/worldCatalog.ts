export type WorldItemCategory='furniture'|'wearable'|'activity'
export type WearSlot='head'|'face'|'neck'|'body'
export type WorldShopItem={id:string;emoji:string;name:string;price:number;level:number;category:WorldItemCategory;slot?:WearSlot;description:string}

export const WORLD_SHOP:WorldShopItem[]=[
 {id:'ball',emoji:'🎾',name:'Pelota',price:35,level:1,category:'furniture',description:'Un juguete para el hogar.'},
 {id:'plant',emoji:'🪴',name:'Monstera',price:45,level:1,category:'furniture',description:'Un toque verde para la habitación.'},
 {id:'frame',emoji:'🖼️',name:'Cuadro',price:50,level:1,category:'furniture',description:'Decora una pared del mundo.'},
 {id:'rug',emoji:'🧶',name:'Alfombra',price:55,level:1,category:'furniture',description:'Hace el hogar más acogedor.'},
 {id:'lamp',emoji:'💡',name:'Lámpara cálida',price:65,level:1,category:'furniture',description:'Luz suave para la noche.'},
 {id:'bed',emoji:'🛏️',name:'Cama nube',price:80,level:1,category:'furniture',description:'La cama favorita de la mascota.'},
 {id:'beanbag',emoji:'🪑',name:'Puff pastel',price:90,level:2,category:'furniture',description:'Rincón extra para descansar.'},
 {id:'sofa',emoji:'🛋️',name:'Sofá nube',price:110,level:3,category:'furniture',description:'Un sofá premium para el hogar.'},
 {id:'bookshelf',emoji:'📚',name:'Biblioteca',price:125,level:4,category:'furniture',description:'Llena el mundo de historias.'},
 {id:'telescope',emoji:'🔭',name:'Telescopio',price:140,level:5,category:'furniture',description:'Para mirar las estrellas.'},
 {id:'fountain',emoji:'⛲',name:'Fuente',price:165,level:6,category:'furniture',description:'Una fuente relajante.'},
 {id:'aquarium',emoji:'🐠',name:'Acuario',price:230,level:8,category:'furniture',description:'Un pequeño ecosistema iluminado.'},
 {id:'gaming_setup',emoji:'🕹️',name:'Rincón gamer',price:340,level:10,category:'furniture',description:'Setup especial de Pandalandia.'},
 {id:'fireplace',emoji:'🔥',name:'Chimenea',price:480,level:12,category:'furniture',description:'Desbloquea un hogar más cálido.'},
 {id:'piano',emoji:'🎹',name:'Piano',price:680,level:16,category:'furniture',description:'Decoración de alto nivel.'},
 {id:'neon_sign',emoji:'💗',name:'Neón Pandalandia',price:900,level:20,category:'furniture',description:'Objeto de colección de nivel 20.'},

 {id:'bow_red',emoji:'🎀',name:'Lazo coral',price:40,level:1,category:'wearable',slot:'head',description:'Un lazo sencillo y adorable.'},
 {id:'bandana',emoji:'🧣',name:'Bandana',price:65,level:2,category:'wearable',slot:'neck',description:'Accesorio casual para el cuello.'},
 {id:'round_glasses',emoji:'🤓',name:'Lentes redondos',price:90,level:3,category:'wearable',slot:'face',description:'Un look intelectual.'},
 {id:'cap',emoji:'🧢',name:'Gorra',price:110,level:4,category:'wearable',slot:'head',description:'Estilo deportivo.'},
 {id:'flower_crown',emoji:'🌸',name:'Corona de flores',price:145,level:5,category:'wearable',slot:'head',description:'Flores alrededor de la cabeza.'},
 {id:'hoodie',emoji:'🧥',name:'Hoodie pastel',price:190,level:6,category:'wearable',slot:'body',description:'Ropa cómoda para casa.'},
 {id:'heart_glasses',emoji:'💖',name:'Lentes corazón',price:230,level:7,category:'wearable',slot:'face',description:'Look especial de pareja.'},
 {id:'gold_crown',emoji:'👑',name:'Corona dorada',price:360,level:10,category:'wearable',slot:'head',description:'Para mascotas de nivel 10.'},
 {id:'royal_cape',emoji:'🦸',name:'Capa real',price:520,level:12,category:'wearable',slot:'body',description:'Una capa digna del reino.'},
 {id:'astronaut',emoji:'🧑‍🚀',name:'Traje espacial',price:720,level:15,category:'wearable',slot:'body',description:'Colección espacial.'},
 {id:'angel_wings',emoji:'🪽',name:'Alas luminosas',price:980,level:20,category:'wearable',slot:'body',description:'Accesorio legendario.'},
 {id:'diamond_crown',emoji:'💎',name:'Corona diamante',price:1450,level:25,category:'wearable',slot:'head',description:'Coleccionable de nivel 25.'},
 {id:'costume_blue_alien',emoji:'👽',name:'Alien azul',price:260,level:7,category:'wearable',slot:'body',description:'Disfraz original de criatura espacial azul. Unisex.'},
 {id:'costume_toy_sheriff',emoji:'🤠',name:'Sheriff de juguete',price:320,level:8,category:'wearable',slot:'body',description:'Look original del lejano oeste de juguete. Unisex.'},
 {id:'costume_space_ranger',emoji:'🚀',name:'Explorador galáctico',price:380,level:9,category:'wearable',slot:'body',description:'Traje espacial retro original. Unisex.'},
 {id:'costume_dino',emoji:'🦖',name:'Dinosaurio',price:430,level:10,category:'wearable',slot:'body',description:'Disfraz verde de dinosaurio con cresta. Unisex.'},
 {id:'costume_dragon',emoji:'🐉',name:'Dragón',price:500,level:11,category:'wearable',slot:'body',description:'Dragón fantástico con alas y cresta. Unisex.'},
 {id:'costume_ninja',emoji:'🥷',name:'Ninja',price:560,level:12,category:'wearable',slot:'body',description:'Traje sigiloso de aventura. Unisex.'},
 {id:'costume_knight',emoji:'🛡️',name:'Caballero',price:630,level:13,category:'wearable',slot:'body',description:'Armadura fantástica ligera. Unisex.'},
 {id:'costume_wizard',emoji:'🪄',name:'Mago estelar',price:700,level:14,category:'wearable',slot:'body',description:'Capa y sombrero de magia estelar. Unisex.'},
 {id:'costume_chef',emoji:'👨‍🍳',name:'Chef',price:760,level:15,category:'wearable',slot:'body',description:'Uniforme de cocina con gorro integrado. Unisex.'},
 {id:'costume_firefighter',emoji:'🧑‍🚒',name:'Bombero',price:840,level:16,category:'wearable',slot:'body',description:'Uniforme heroico original. Unisex.'},
 {id:'costume_football',emoji:'⚽',name:'Futbolista',price:900,level:17,category:'wearable',slot:'body',description:'Camiseta deportiva de Pandalandia. Unisex.'},
 {id:'costume_superhero',emoji:'🦸',name:'Héroe de Pandalandia',price:980,level:18,category:'wearable',slot:'body',description:'Traje de héroe original con capa. Unisex.'},
 {id:'costume_monster',emoji:'👾',name:'Monstruo peludo',price:1060,level:19,category:'wearable',slot:'body',description:'Disfraz fantástico de monstruo suave. Unisex.'},
 {id:'costume_halloween',emoji:'🎃',name:'Noche de sustos',price:1180,level:21,category:'wearable',slot:'body',description:'Colección original de Halloween. Unisex.'},
 {id:'costume_winter',emoji:'❄️',name:'Invierno mágico',price:1300,level:23,category:'wearable',slot:'body',description:'Abrigo festivo de invierno. Unisex.'},
 {id:'costume_royal',emoji:'✨',name:'Realeza estelar',price:1600,level:26,category:'wearable',slot:'body',description:'Conjunto legendario de Pandalandia. Unisex.'},

 {id:'action_spin',emoji:'🌀',name:'Aprender giro',price:75,level:2,category:'activity',description:'Desbloquea la acción Girar.'},
 {id:'action_dance',emoji:'💃',name:'Aprender baile',price:150,level:4,category:'activity',description:'Desbloquea la acción Bailar.'},
 {id:'action_fetch',emoji:'🦴',name:'Aprender buscar',price:230,level:6,category:'activity',description:'Desbloquea Buscar pelota.'},
 {id:'action_photo',emoji:'📸',name:'Sesión de fotos',price:320,level:8,category:'activity',description:'Desbloquea una pose especial.'},
 {id:'action_treasure',emoji:'🗺️',name:'Buscar tesoros',price:520,level:12,category:'activity',description:'Una acción especial con recompensa limitada.'},
 {id:'action_stargaze',emoji:'🌠',name:'Mirar estrellas',price:760,level:16,category:'activity',description:'Actividad nocturna especial.'},
 {id:'action_party',emoji:'🎉',name:'Fiesta de Pandalandia',price:1100,level:20,category:'activity',description:'La actividad premium del mundo.'}
]

export const ACTIONS=[
 {id:'spin',requires:'action_spin',emoji:'🌀',name:'Girar'},
 {id:'dance',requires:'action_dance',emoji:'💃',name:'Bailar'},
 {id:'fetch',requires:'action_fetch',emoji:'🦴',name:'Buscar'},
 {id:'photo',requires:'action_photo',emoji:'📸',name:'Foto'},
 {id:'treasure',requires:'action_treasure',emoji:'🗺️',name:'Tesoro'},
 {id:'stargaze',requires:'action_stargaze',emoji:'🌠',name:'Estrellas'},
 {id:'party',requires:'action_party',emoji:'🎉',name:'Fiesta'}
] as const

export function nextUnlock(level:number){return WORLD_SHOP.filter(x=>x.level>level).sort((a,b)=>a.level-b.level)[0]||null}
export function slotForItem(key:string){return WORLD_SHOP.find(x=>x.id===key)?.slot}
