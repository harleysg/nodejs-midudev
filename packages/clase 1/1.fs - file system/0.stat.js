const fs = require('node:fs') // a partir de Node 16, se recomienda poner node:

const stats = fs.statSync('./file.txt')

console.log({
  isFile: stats.isFile(), // si es un fichero
  isDirectory: stats.isDirectory(), // si es un directorio
  isSymbolicLink: stats.isSymbolicLink(), // si es un enlace simbólico
  size: stats.size // tamaño en bytes
})
