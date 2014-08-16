var http = require("http"),
	fs   = require("fs"),
	path = require("path"),
	url  = require("url"),
	mime = require("mimetypes"),

	PORT = process.env.OPENSHIFT_NODEJS_PORT || 12345,
	HOST = process.env.OPENSHIFT_NODEJS_IP || "localhost";

http
	.createServer(function(request, response){
		console.log(request.method, request.url);
		var parsed = url.parse(request.url, true);
		if("/"===request.url)
			parsed.pathname = "index.html";
		fs.createReadStream(path.join(process.cwd(), parsed.pathname))
			.on("open", function(){
				response.writeHead(200, mime.contentType(parsed.pathname));
				this.pipe(response);
			})
			.on("error", function(error){
				response.writeHead(404, mime.lookup("txt"));
				response.end("\n\nERROR =\n"+error+"\nA é î ù ô");
			});
	})
	.listen(PORT, HOST, function(){
		console.log("Server listen...");
	});