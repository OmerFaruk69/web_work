const http = require('http')
const handles = require('./handles.js')
const server=http.createServer(handles.serverHandle)
server.listen(3000)
