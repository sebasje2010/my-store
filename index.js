const express = require ('express')
const routerApi = require ('./routes')

const {logErrors, errorHandler, boomErrorHandler}=require('./middlewares/error.handler')

const app= express()
const port = 3000

app.use(express.json()) //Esto sirve para recibir la info de postman para crear data

app.get('/',(req,res)=>{
  res.send('Hola mi server en express')
})
app.get('/nueva-ruta',(req,res)=>{
  res.send('Hola soy una nueva ruta (endopint)')
})

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port,()=>{
  console.log('Funcionando en el puerto '+port)
})
