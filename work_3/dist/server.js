"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var metrics_1 = require("./metrics");
var encoding_down_1 = __importDefault(require("encoding-down"));
var leveldown_1 = __importDefault(require("leveldown"));
var levelup_1 = __importDefault(require("levelup"));
var body_parser_1 = __importDefault(require("body-parser"));
var dbMet = new metrics_1.MetricsHandler('./db/metrics');
var app = express_1.default();
var port = process.env.PORT || '8080';
app.use(express_1.default.static(path_1.default.join(__dirname, '/../public')));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded());
app.set('views', path_1.default.join(__dirname, '/../view'));
app.set('view engine', 'ejs');
var db = levelup_1.default(encoding_down_1.default(leveldown_1.default("path"), { valueEncoding: 'json' }));
app.get('/hello/Omer', function (req, res) { return res.render('hello.ejs', { name: "Omer etudiant a l'ECE Paris" }); });
app.get('/hello/:name', function (req, res) { return res.render('hello.ejs', { name: req.params.name }); });
app.get('/', function (req, res) { return res.render('home.ejs'); });
app.post('/metrics/:id', function (req, res) {
    dbMet.save(req.params.id, req.body, function (err) {
        if (err)
            throw err;
        res.status(200).send('save');
    });
});
app.get('/metrics/:id', function (req, res) {
    dbMet.get(req.params.id, function (err) {
        if (err)
            throw err;
        res.status(200).send();
    });
});
app.delete('/metrics/:id', function (req, res) {
    dbMet.del(req.params.id, function (err) {
        if (err)
            throw err;
        res.status(200).send();
    });
});
app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !!!');
});
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});
