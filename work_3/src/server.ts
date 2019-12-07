import express from 'express'
import path from 'path'
import { MetricsHandler } from './metrics'
import encoding from 'encoding-down'
import leveldown from 'leveldown'
import levelup from 'levelup'
import bodyparser from 'body-parser'

const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')
const app = express()
const port: string = process.env.PORT || '8080'

app.use(express.static(path.join(__dirname, '/../public')))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
app.set('views', path.join(__dirname, '/../view')); 
app.set('view engine', 'ejs');

const db = levelup(encoding(
  leveldown("path"), 
  { valueEncoding: 'json' })
)

app.get(
  '/hello/Omer',
  (req, res) => res.render('hello.ejs', {name: "Omer etudiant a l'ECE Paris"})
)

app.get(
  '/hello/:name',
  (req, res) => res.render('hello.ejs', {name: req.params.name})
)
app.get(
  '/',
  (req, res) => res.render('home.ejs')
)


 app.post('/metrics/:id', (req: any, res: any) => {
  dbMet.save(req.params.id, req.body, (err: Error | null) => {
    if (err) throw err
    res.status(200).send('save')
  })
}) 
app.get('/metrics/:id', (req: any, res: any) => {
  dbMet.get(req.params.id, (err: Error | null) => {
    if (err) throw err
    res.status(200).send()
  })
})

app.delete('/metrics/:id', (req: any, res: any) => {
  dbMet.del(req.params.id, (err: Error | null) => {
    if (err) throw err
    res.status(200).send()
  })
})

  app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !!!');
  });
app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})