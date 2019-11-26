express = require('express')
app = express()
path = require('path');
metrics = require('./metrics')
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', 1338);
app.set('views', __dirname + "/view");
app.set('view engine', 'ejs');

/*app.get(
  '/hello/:name', 
  (req, res) => res.send("Hello " + req.params.name)
)*/

app.get(
  '/', 
  (req, res) => res.render('home.ejs')
)

app.get(
  '/hello/Omer', 
  (req, res) => res.render('hello.ejs', {name: "Omer etudiant a l'ECE Paris"})
)

app.get(
  '/hello/:name', 
  (req, res) => res.render('hello.ejs', {name: req.params.name})
)


app.get('/metrics.json', (req, res) => {
  metrics.get((err, data) => {
    if(err) throw err
    res.status(200).json(data)
  })
})

app.use(function(req, res, next){
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page introuvable !');
});



app.listen(
  app.get('port'), 
  () => console.log(`server listening on ${app.get('port')}`)
)