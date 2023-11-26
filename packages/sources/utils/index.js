import { createRequire } from 'node:module'
const require = createRequire(import.meta.url) // TODO: Solucionar ruta relativa a la ejecución del require

export default require
