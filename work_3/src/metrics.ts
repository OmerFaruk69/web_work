import {LevelDB} from './leveldb'
import WriteStream from 'level-ws'

export class Metric {
  public timestamp: string
  public value: number
  constructor(ts: string, v: number) {
    this.timestamp = ts
    this.value = v
  }
}


export class MetricsHandler { 
  //base de donnée
  private db : any
  constructor(dbPath:string)
  {
    this.db= LevelDB.open(dbPath)
  }
// fonction qui enregistre l'id et le metrics dans la base de donnée db
  public save(key: number, metrics: Metric[], callback: (error: Error | null) => void) {
    const stream = WriteStream(this.db)
    stream.on('error', callback)
    stream.on('close', callback)
    metrics.forEach((m: Metric) => {
      stream.write({ key: `metric:${key}:${m.timestamp}`, value: m.value })
    })
    stream.end()
  }
// on instancie deux metrics 
public get(key : number, callback: (error: Error | null, result?: Metric[]) => void) {
  const stream = this.db.createReadStream()
  var met: Metric[] = []

  stream.on('error',callback)
    .on('data', function (data) {
      const [metrics, name, k]  = data.key.split(":")
      if (key != name ){
        
        
      } else {
        console.log( data.key, ' = ', data.value)
      }
    })
}
  public del(key : number, callback: (error: Error | null, result?: Metric[]) => void) {
    console.log(`\nKey to delete: ${key}\n`)
    const stream = this.db
            .createKeyStream()
      .on('error',callback)
      .on('data', data => {
        if (data.split(":")[1] === key ){
          this.db.del(data, function (err) {
          });
          console.log(`Metrics deleted !`)
        }
    })
  }

  }
  

  /*
  public getAll(
    callback: (error:Error |null,result:any)=> void 
    )
    {
      let metrics : Metric [] = []
      // try to read this memory
      this.db.createReadStream()
      // Read
  .on('data', function (data) {
    console.log(data.key, '=', data.value)
    const timestamp = data.key.split(':')
    let metric:Metric = new Metric(timestamp,data.value)
    metrics.push(data)
    // callback fct is getAll 
  })
  .on('error', function (err) {
    console.log('Oh my!', err)
    callback(err,null)
  })
  .on('close', function () {
    console.log('Stream closed')
    callback(null,metrics)
  })
  .on('end', function () {
    console.log('Stream ended')
  
  })
    }
 */   

