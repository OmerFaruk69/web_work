module.exports={

 serverHandle : function (req, res) {
    const url = require('url')
    const query = require('querystring')
    const route =url.parse(req.url)
    const path = route.pathname
    const params = query.parse(route.query)
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    if(path ==='/')
    {
        res.write('Hello anonymous')
    }

  else if(path==='/hello' && 'name' in params)
    {   
        if(params['name']==='Omer')
        {
            res.write('My name is Omer and I am a student of ECE Paris ')
        }
        else{
             res.write('Hello ' + params['name'])
        }
       
    }
    else{
        res.writeHead(404,{'Content-Type' : 'text/html'});
        res.write('Erreur 404')
    }

    res.end();
  }
  
}


