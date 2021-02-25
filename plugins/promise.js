Promise.delay = function(t, val) {
  return new Promise((resolve) => {
    setTimeout(resolve.bind(null, val), t)
  })
}

Promise.raceAll = function(promises, timeoutTime, timeoutVal) {
  return Promise.all(promises.map((p) => {
    return Promise.race([p, Promise.delay(timeoutTime, timeoutVal)])
  }))
}