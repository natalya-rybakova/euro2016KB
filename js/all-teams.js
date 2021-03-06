//var endpoint = "http://dbpedia.org/sparql";
      //var query = "select * {?s ?p ?o} limit 5" ;
	  
	  var endpoint = "http://localhost:8890/sparql";
	  var query = "prefix dbr: <http://dbpedia.org/resource/> \n\
prefix dbp: <http://dbpedia.org/property/> \n\
prefix dbo: <http://dbpedia.org/ontology/> \n\

SELECT distinct ?team \n\
WHERE { \n\
?s dbp:nationalteam ?team  \n\
FILTER \n\
(regex(?team, "_national_football_team" )) \n\
} \n\
"
	  

      // Define a callback function to receive the SPARQL JSON result.
      function myCallback(str) {
        // Convert result to JSON
        var jsonObj = eval('(' + str + ')');

        // Build up a table of results.
        var result = " <table border='2' cellpadding='9'>" ;
        for(var i = 0; i<  jsonObj.results.bindings.length; i++) {
          result += " <tr> <td>" + jsonObj.results.bindings[i].team.value;
          //result += " </td><td>" + jsonObj.results.bindings[i].time.value;
          //result += " </td><td>" + jsonObj.results.bindings[i].o.value;
          result += " </td></tr>"; 
        } 
        result += "</table>" ;
        document.getElementById("results").innerHTML = result;
     }
      
     // Make the query.
     sparqlQueryJson(query, endpoint, myCallback, true);
      