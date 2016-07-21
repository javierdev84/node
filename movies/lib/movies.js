/* eslint-disable semi */
"use strict";

const fdebug = require("./fdebug");
const debug = fdebug("movies:lib:movies");
const http = require("http");

function Movies(main) {
    this.db = main.db;
    debug('init');
}

//http://www.omdbapi.com/?t=starwars&y=&plot=short&r=json



Movies.prototype.search = function(obj){
    var self = this;

    debug("search called: "+JSON.stringify(obj));

    return new Promise((resolve, rejec)=>{

        let query = {};
		console.log("BUSQUEDA");
        if(obj.title) query.Title = new RegExp(obj.title);
        if(obj.year) query.Year = obj.year;
        if(obj.id) query.imdbID = obj.id;

        self.db.movies.find(query, {}, (err, docs)=>{
 
		if(err){
		return reject(err);
		}else{
		if(0 < docs.length){
		return resolve(docs);
		}else{
		
		var username = 'desa';
var password = 'casino2015';
var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
		
		
		var opt = {
    host: 'proxy.oper.cbasa-ciesa.com.ar',
    port: 8080,
    path: 'http://www.omdbapi.com/?t=' + obj.title +'&y=&plot=short&r=json',
	 headers: {
        Host: 'http://www.omdbapi.com/?t=' + obj.title +'&y=&plot=short&r=json',
        "Proxy-Authorization" : auth
     }
	
}
		
		http.get( opt, (res) => {
		 
		// consume response body
		/*res.on("data", function(chunk) {
		console.log("BODY: " , chunk);
		self.db.movies.insert(JSON.parse(chunk));
		return resolve(JSON.parse(chunk));
		})*/
		
		
		
		
		var body = [];
		res.on('data', function(chunk) {
		  body.push(chunk);
		}).on('end', function() {
		  body = Buffer.concat(body).toString();
		  console.log(body);
			self.db.movies.insert(JSON.parse(body));
			return resolve(JSON.parse(body));
		});
		
		});
		
		
		
		//return resolve({});
		}
		 
		}
            //err ? reject(err) : resolve(docs);
        })
    });
}

Movies.prototype.add = function(p){
    var self = this;

    return new Promise((resolve, rejec)=>{


        self.db.movies.insert(p, (err, docs)=>{
            err ? reject(err) : resolve(docs);
        })
    });
}

module.exports = Movies;