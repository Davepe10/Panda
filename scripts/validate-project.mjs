import fs from 'node:fs'
import path from 'node:path'
const root=process.cwd(); const read=p=>fs.readFileSync(path.join(root,p),'utf8')
const required=['components/games/GamesHub.tsx','components/games/MiniArcade.tsx','components/games/SoloGames.tsx','components/world/WorldHub.tsx','components/world/Pet3D.tsx','components/WeeklyChallenge.tsx','components/Achievements.tsx','lib/gameCatalog.ts','lib/adventures.ts','supabase/production_v8.sql','supabase/migration_v8_game_ux_fix.sql','supabase/ACTUALIZAR_DESDE_VERSION_ORIGINAL.sql']
for(const f of required)if(!fs.existsSync(path.join(root,f)))throw new Error(`Falta ${f}`)
const catalog=read('lib/gameCatalog.ts'),hub=read('components/games/GamesHub.tsx'),solo=read('components/games/SoloGames.tsx'),sql=read('supabase/production_v8.sql'),dashboard=read('components/Dashboard.tsx'),world=read('components/world/WorldHub.tsx'),pet3d=read('components/world/Pet3D.tsx'),pkg=JSON.parse(read('package.json'))
const expected=['mind-meld','would-you-rather','know-me','likely','either-or','truth-dare','roulette','two-truths','taboo','draw','word-chain','code4','puzzle','trivia-coop','trivia-versus','cards','adventure','escape','bomb','reaction','pong','air-hockey','snake-duo','turbo-race','block-drop']
const ids=[...catalog.matchAll(/id:'([^']+)'/g)].map(m=>m[1]); for(const id of expected)if(!ids.includes(id))throw new Error(`Juego ausente: ${id}`)
for(const dep of ['three','@react-three/fiber','@react-three/drei'])if(!pkg.dependencies?.[dep])throw new Error(`Falta dependencia 3D: ${dep}`)
for(const pet of ['Cocker','Panda','Shiba','Capybara'])if(!pet3d.includes(`function ${pet}`))throw new Error(`Falta modelo 3D: ${pet}`)
for(const field of ['thirst','hygiene','fun','affection','health','sickness_status','growth_stage','last_care_by'])if(!sql.includes(` ${field} `)&&!sql.includes(`.${field}`))throw new Error(`Falta estado de mascota: ${field}`)
for(const rpc of ['pet_refresh_state','pet_interact','adopt_pet','update_pet_profile','start_game_session','submit_game_turn','propose_weekly_challenge','start_solo_game','finish_solo_game'])if(!sql.includes(`function public.${rpc}`))throw new Error(`Falta RPC: ${rpc}`)
for(const action of ["'feed'","'water'","'play'","'pet'","'rest'","'clean'","'care'"])if(!world.includes(action))throw new Error(`Falta cuidado UI: ${action}`)
for(const state of ['sick','dirty','sleepy'])if(!pet3d.includes(`'${state}'`))throw new Error(`Falta estado visual 3D: ${state}`)
if(!world.includes('pet_care_log')||!world.includes('pet_refresh_state'))throw new Error('Falta persistencia/refresh de vida')
if(!sql.includes('pet_sex text')||!sql.includes("p_sex not in ('male','female')"))throw new Error('Falta sexo persistente/validado de mascota')
for(const marker of ["petSex==='male'","petSex==='female'","update_pet_profile","♀️ Hembra","♂️ Macho"])if(!world.includes(marker))throw new Error(`Falta UI V6: ${marker}`)
if(/nav[^\n]{0,180}Recuerdos/i.test(dashboard))throw new Error('Recuerdos sigue expuesto')
const soloExpected=['memory','2048','snake','trivia-solo','reaction-solo','word-scramble','tap-rush','block-solo']
for(const id of soloExpected)if(!solo.includes(`id:'${id}'`))throw new Error(`Juego individual ausente: ${id}`)
if(!sql.includes('daily_limit')||!sql.includes('same_count>=3')||!sql.includes('today_count>=12'))throw new Error('Faltan límites anti-farmeo')
if(!hub.includes("view==='solo'")||!hub.includes('SoloGames'))throw new Error('Jugar solo no está integrado al hub')
for(const marker of ['PendingCard','Eliminar','Nueva partida','Revancha','alertPartnerTurn','Activar avisos','mode-guide'])if(!hub.includes(marker))throw new Error(`Falta UX V8: ${marker}`)
if(!sql.includes('coins_awarded=v_coins')||!sql.includes('xp_awarded=v_xp'))throw new Error('La recompensa solo V8 no usa variables calculadas')
console.log(`OK V8: ${expected.length} juegos de pareja + ${soloExpected.length} individuales, recompensas server-side, límites anti-farmeo, Pet Life 3D y progreso compartido.`)
