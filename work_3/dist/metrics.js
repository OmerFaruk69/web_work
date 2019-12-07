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
    MetricsHandler.get = function (callback) {
        var result = [
            new Metric('2013-11-04 14:00 UTC', 12),
            new Metric('2013-11-04 14:30 UTC', 15)
        ];
        callback(null, result);
    };
    MetricsHandler.prototype.getAll = function (callback) {
        var metrics = [];
        // try to read this memory
        this.db.createReadStream()
            // Read
            .on('data', function (data) {
            console.log(data.key, '=', data.value);
            var timestamp = data.key.split(':');
            var metric = new Metric(timestamp, data.value);
            metrics.push(data);
            // callback fct is getAll 
        })
            .on('error', function (err) {
            console.log('Oh my!', err);
            callback(err, null);
        })
            .on('close', function () {
            console.log('Stream closed');
            callback(null, metrics);
        })
            .on('end', function () {
            console.log('Stream ended');
        });
    };
    return MetricsHandler;
}());
exports.MetricsHandler = MetricsHandler;
