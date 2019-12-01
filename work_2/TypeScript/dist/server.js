"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var metrics_1 = require("./metrics");
var app = express_1.default();
var port = process.env.PORT || '8080';
app.use(express_1.default.static(path_1.default.join(__dirname, '/../public')));
app.set('views', path_1.default.join(__dirname, '/../view'));
app.set('view engine', 'ejs');
app.get('/hello/Omer', function (req, res) { return res.render('hello.ejs', { name: "Omer etudiant a l'ECE Paris" }); });
app.get('/hello/:name', function (req, res) { return res.render('hello.ejs', { name: req.params.name }); });
app.get('/', function (req, res) { return res.render('home.ejs'); });
app.get('/metrics.json', function (req, res) {
    metrics_1.MetricsHandler.get(function (err, result) {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});
app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("server is listening on port " + port);
});
