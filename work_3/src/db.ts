import encoding from 'encoding-down'
import leveldown from 'leveldown'
import levelup from 'levelup'
import WriteStream from 'level-ws'

const db = levelup(encoding(
  leveldown("path"), 
  { valueEncoding: 'json' })
)

const ws = WriteStream(db);

ws.on('error', function (err) {
    console.log('Oh my!', err)
  })
  ws.on('close', function () {
    console.log('Stream closed')
  })
  ws.write({ key: 'occupation', value: 'Clown' })
  ws.end()
const rs = db.createReadStream()
  .on('data', function (data) {
    console.log(data.key, '=', data.value)
  })
  .on('error', function (err) {
    console.log('Oh my!', err)
  })
  .on('close', function () {
    console.log('Stream closed')
  })
  .on('end', function () {
    console.log('Stream ended')
  })

/*db.put('animal', 'beer', (err) => {
    }
  )
  
  db.get('animal', (err, animal) => {
      console.log(animal)
  })
 */ 

