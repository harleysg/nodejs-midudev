function disable(app, listsOf = []) {
  listsOf.forEach(val => app.disable(val))
}

module.exports = {
  disable
}