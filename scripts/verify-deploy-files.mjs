import { access, readFile } from 'node:fs/promises'
import { constants } from 'node:fs'

const required = [
  'lib/supabase/server.ts',
  'lib/supabase/client.ts',
  'lib/supabase/proxy.ts',
  'app/onboarding/page.tsx',
  'app/app/page.tsx',
  'proxy.ts',
  'tsconfig.json',
]

for (const file of required) {
  try {
    await access(file, constants.R_OK)
  } catch {
    console.error(`DEPLOY ERROR: required file is missing or unreadable: ${file}`)
    process.exit(1)
  }
}


const forbidden = [
  'components/world/CockerUser300K.tsx',
  'components/world/CockerRealScene.tsx',
  'components/world/CockerRealtime3D.tsx',
  'public/models/pets/cocker-user-300k.stl',
  'public/models/pets/cocker-real-stand.glb',
  'public/models/pets/cocker-real-sit.glb',
  'public/models/pets/cocker-real-stand-hd.glb',
  'public/models/pets/cocker-real-sit-hd.glb',
]

for (const file of forbidden) {
  try {
    await access(file, constants.F_OK)
    console.error(`DEPLOY ERROR: obsolete production asset/source must not exist: ${file}`)
    process.exit(1)
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error
  }
}

const tsconfig = JSON.parse(await readFile('tsconfig.json', 'utf8'))
const alias = tsconfig?.compilerOptions?.paths?.['@/*']?.[0]
if (alias !== './*') {
  console.error('DEPLOY ERROR: tsconfig path alias @/* must resolve to ./*')
  process.exit(1)
}

console.log('Deploy file check: OK')
