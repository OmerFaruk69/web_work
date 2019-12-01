import express from 'express'
import path from 'path'
import { MetricsHandler } from './metrics'

const app = express()
const port: string = process.env.PORT || '8080'

app.use(express.static(path.join(__dirname, '/../public')))
app.set('views', path.join(__dirname, '/../view')); 
app.set('view engine', 'ejs');

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


app.get('/metrics.json', (req: any, res: any) => {
    MetricsHandler.get((err: Error | null, result?: any) => {
      if (err) {
        throw err
      }
      res.json(result)
    })
  })

  app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
  });
app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})