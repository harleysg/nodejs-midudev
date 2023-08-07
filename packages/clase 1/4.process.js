// argumentos de entrada
console.log(process.argv)

// controlar el proceso y su salida
// 0 --> Todo a ido bien
// 1 --> Algo ha pasado
// process.exit(1)

// podemos controlar eventos del proceso
process.on('exit', () => {
  // limpiar los recursos
  console.log('He limpiado los procesos')
})

// current working directory
console.log(process.cwd())

// platform
console.log(process.env.PEPITO)
