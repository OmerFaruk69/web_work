"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var encoding_down_1 = __importDefault(require("encoding-down"));
var leveldown_1 = __importDefault(require("leveldown"));
var levelup_1 = __importDefault(require("levelup"));
var level_ws_1 = __importDefault(require("level-ws"));
var db = levelup_1.default(encoding_down_1.default(leveldown_1.default("path"), { valueEncoding: 'json' }));
var ws = level_ws_1.default(db);
ws.on('error', function (err) {
    console.log('Oh my!', err);
});
ws.on('close', function () {
    console.log('Stream closed');
});
ws.write({ key: 'occupation', value: 'Clown' });
ws.end();
var rs = db.createReadStream()
    .on('data', function (data) {
    console.log(data.key, '=', data.value);
})
    .on('error', function (err) {
    console.log('Oh my!', err);
})
    .on('close', function () {
    console.log('Stream closed');
})
    .on('end', function () {
    console.log('Stream ended');
});
/*db.put('animal', 'beer', (err) => {
    }
  )
  
  db.get('animal', (err, animal) => {
      console.log(animal)
  })
 */
