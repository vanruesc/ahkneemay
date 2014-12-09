/**
 * Every route is defined in this module.
 * The middleware to handle requests for 
 * each route is defined in separate modules.
 *
 * @author Raoul van Rueschen
 * @version 0.0.1, 02.12.2014
 */

"use strict";

var navigation = require("./navigation"),
 error = require("./error"),
 main = require("./main"),
 path = require("path"),
 jade = require("jade"),
 compiledTemplates = {};

module.exports = function(server, passport)
{
 /**
  * Sends the full page or only the essential contents
  * of the requested page plus the navigation as a single json string.
  *
  * Single Page Support:
  * The generated json string is smaller than the complete website and
  * can thus be sent much faster and more efficiently. Most clients will 
  * request page contents asynchronously.
  */

 function sendPageOrJson(request, response, next)
 {
  var template = response.locals.jade.template,
   locals = response.locals.jade.locals,
   rawContents = {};

  locals.navigation = navigation;

  if(request.params.json)
  {
   rawContents.title = locals.title;
   //rawContents.description = locals.description;
   compiledTemplates.navigation = compiledTemplates.navigation || jade.compileFile(path.join(server.get("views"), "contents/navigation.jade"));
   rawContents.navigation = compiledTemplates.navigation(locals);
   compiledTemplates[template] = compiledTemplates[template] || jade.compileFile(path.join(server.get("views"), "contents", template + ".jade"));
   rawContents.contents = compiledTemplates[template](locals);

   response.writeHead(200, {"Content-Type": "application/json"});
   response.end(JSON.stringify(rawContents));
  }
  else
  {
   response.render(template, locals);
  }
 }

 /** Definition of the Routes. **/

 // Setup the homepage, which shows the overview of all watched animes.
 server.get("/", main.index, sendPageOrJson);

 // Setup an about page.
 server.get("/about/:json?", main.about, sendPageOrJson);

 // Setup a page for requesting anime infos from an external source.
 server.get("/animes/quickinfo/:anime", main.quickinfo);

 // Removes an anime.
 server.get("/animes/delete/:anime/:json?", main.removeAnime);

 // Setup a page that shows a form for adding a new anime.
 server.get("/animes/:json?", main.showForm, sendPageOrJson);

 // Add a new anime and redirect to the form with a status message.
 server.post("/animes/:json?", main.addAnime, sendPageOrJson);

 // Setup another route for the homepage to support asynchronous requests.
 server.get("/:json", main.index, sendPageOrJson);

 // Catch all other requests and treat them as 404 errors.
 server.all("*", function(request, response, next) {
  var error = new Error("Page not found.");
  error.status = 404;
  next(error);
 });

 // Handle all errors in a custom error page.
 server.use(error);
};
