const express = require('express')
const request = require('@fatmatto/ptth')
const app = express()


app.all('/', (req,res,next) => {
  request({
    method:'GET',
    url:`https://ifconfig.me`
  }).then(response => {
    res.send({ip:response.body})
  })
  .catch(err => {
    next(err)
  })
})


// 404 handler
app.use((req, res, next) => {
  const err = new Errors.NotFound('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  res.status(500).send(err)
})

app.listen(3000, () => {
  console.log('ip-check service listening on port 3000')
})