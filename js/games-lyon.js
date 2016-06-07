//var endpoint = "http://dbpedia.org/sparql";
      //var query = "select * {?s ?p ?o} limit 5" ;
	  
	  var endpoint = "http://localhost:8890/sparql";
	  var query = "prefix lode: <http://linkedevents.org/ontology/> \n\
					prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n\

					SELECT ?label ?date \n\
					WHERE { \n\
					?s lode:inPlace <dbpedia.org/resource/Parc_Olympique_Lyonnais> ; \n\
					rdfs:label ?label ; \n\
					lode:atTime ?date  \n\
					} "
	  

      // Define a callback function to receive the SPARQL JSON result.
      function myCallback(str) {
        // Convert result to JSON
        var jsonObj = eval('(' + str + ')');

        // Build up a table of results.
        var result = " <table border='2' cellpadding='9'>" ;
        for(var i = 0; i<  jsonObj.results.bindings.length; i++) {
          result += " <tr> <td>" + jsonObj.results.bindings[i].label.value;
          result += " </td><td>" + jsonObj.results.bindings[i].time.value;
          //result += " </td><td>" + jsonObj.results.bindings[i].o.value;
          result += " </td></tr>"; 
        } 
        result += "</table>" ;
        document.getElementById("results").innerHTML = result;
     }
      
     // Make the query.
     sparqlQueryJson(query, endpoint, myCallback, true);
      