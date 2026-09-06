import fs from 'node:fs'
import path from 'node:path'
const root=process.cwd(); const read=p=>fs.readFileSync(path.join(root,p),'utf8')
const required=['components/games/GamesHub.tsx','components/games/MiniArcade.tsx','components/world/WorldHub.tsx','components/world/Pet3D.tsx','components/WeeklyChallenge.tsx','components/Achievements.tsx','lib/gameCatalog.ts','lib/adventures.ts','supabase/production_v6.sql','supabase/migration_pet_sex_v6.sql']
for(const f of required)if(!fs.existsSync(path.join(root,f)))throw new Error(`Falta ${f}`)
const catalog=read('lib/gameCatalog.ts'),hub=read('components/games/GamesHub.tsx'),sql=read('supabase/production_v6.sql'),dashboard=read('components/Dashboard.tsx'),world=read('components/world/WorldHub.tsx'),pet3d=read('components/world/Pet3D.tsx'),pkg=JSON.parse(read('package.json'))
const expected=['mind-meld','would-you-rather','know-me','likely','either-or','truth-dare','roulette','two-truths','taboo','draw','word-chain','code4','puzzle','trivia-coop','trivia-versus','cards','adventure','escape','bomb','reaction','pong','air-hockey','snake-duo','turbo-race','block-drop']
const ids=[...catalog.matchAll(/id:'([^']+)'/g)].map(m=>m[1]); for(const id of expected)if(!ids.includes(id))throw new Error(`Juego ausente: ${id}`)
for(const dep of ['three','@react-three/fiber','@react-three/drei'])if(!pkg.dependencies?.[dep])throw new Error(`Falta dependencia 3D: ${dep}`)
for(const pet of ['Cocker','Panda','Shiba','Capybara'])if(!pet3d.includes(`function ${pet}`))throw new Error(`Falta modelo 3D: ${pet}`)
for(const field of ['thirst','hygiene','fun','affection','health','sickness_status','growth_stage','last_care_by'])if(!sql.includes(` ${field} `)&&!sql.includes(`.${field}`))throw new Error(`Falta estado de mascota: ${field}`)
for(const rpc of ['pet_refresh_state','pet_interact','adopt_pet','update_pet_profile','start_game_session','submit_game_turn','propose_weekly_challenge'])if(!sql.includes(`function public.${rpc}`))throw new Error(`Falta RPC: ${rpc}`)
for(const action of ["'feed'","'water'","'play'","'pet'","'rest'","'clean'","'care'"])if(!world.includes(action))throw new Error(`Falta cuidado UI: ${action}`)
for(const state of ['sick','dirty','sleepy'])if(!pet3d.includes(`'${state}'`))throw new Error(`Falta estado visual 3D: ${state}`)
if(!world.includes('pet_care_log')||!world.includes('pet_refresh_state'))throw new Error('Falta persistencia/refresh de vida')
if(!sql.includes('pet_sex text')||!sql.includes("p_sex not in ('male','female')"))throw new Error('Falta sexo persistente/validado de mascota')
for(const marker of ["petSex==='male'","petSex==='female'","update_pet_profile","♀️ Hembra","♂️ Macho"])if(!world.includes(marker))throw new Error(`Falta UI V6: ${marker}`)
if(/nav[^\n]{0,180}Recuerdos/i.test(dashboard))throw new Error('Recuerdos sigue expuesto')
console.log(`OK V6: ${expected.length} juegos, 4 mascotas 3D, macho/hembra persistente y editable, Pet Life, historial compartido y motor de juegos intacto.`)
