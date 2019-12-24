"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var leveldb_1 = require("./leveldb");
var level_ws_1 = __importDefault(require("level-ws"));
var Metric = /** @class */ (function () {
    function Metric(ts, v) {
        this.timestamp = ts;
        this.value = v;
    }
    return Metric;
}());
exports.Metric = Metric;
var MetricsHandler = /** @class */ (function () {
    function MetricsHandler(dbPath) {
        this.db = leveldb_1.LevelDB.open(dbPath);
    }
    // fonction qui enregistre l'id et le metrics dans la base de donnée db
    MetricsHandler.prototype.save = function (key, metrics, callback) {
        var stream = level_ws_1.default(this.db);
        stream.on('error', callback);
        stream.on('close', callback);
        metrics.forEach(function (m) {
            stream.write({ key: "metric:" + key + ":" + m.timestamp, value: m.value });
        });
        stream.end();
    };
    // on instancie deux metrics 
    MetricsHandler.prototype.get = function (key, callback) {
        var stream = this.db.createReadStream();
        var met = [];
        stream.on('error', callback)
            .on('data', function (data) {
            var _a = data.key.split(":"), metrics = _a[0], name = _a[1], k = _a[2];
            if (key != name) {
            }
            else {
                console.log(data.key, ' = ', data.value);
            }
        });
    };
    MetricsHandler.prototype.del = function (key, callback) {
        var _this = this;
        console.log("\nKey to delete: " + key + "\n");
        var stream = this.db
            .createKeyStream()
            .on('error', callback)
            .on('data', function (data) {
            if (data.split(":")[1] === key) {
                _this.db.del(data, function (err) {
                });
                console.log("Metrics deleted !");
            }
        });
    };
    return MetricsHandler;
}());
exports.MetricsHandler = MetricsHandler;
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
