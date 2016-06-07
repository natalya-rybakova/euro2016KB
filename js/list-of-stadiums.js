//var endpoint = "http://dbpedia.org/sparql";
      //var query = "select * {?s ?p ?o} limit 5" ;
	  
	  var endpoint = "http://localhost:8890/sparql";
	  var query = "prefix dbo:	<http://dbpedia.org/ontology/> \n\
prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n\

SELECT ?stadiumName \n\
WHERE { \n\
?stadiumName rdf:type dbo:Stadium  \n\
} "
	  

      // Define a callback function to receive the SPARQL JSON result.
      function myCallback(str) {
        // Convert result to JSON
        var jsonObj = eval('(' + str + ')');

        // Build up a table of results.
        var result = " <table border='2' cellpadding='9'>" ;
        for(var i = 0; i<  jsonObj.results.bindings.length; i++) {
          result += " <tr> <td>" + jsonObj.results.bindings[i].stadiumName.value;
          //result += " </td><td>" + jsonObj.results.bindings[i].time.value;
          //result += " </td><td>" + jsonObj.results.bindings[i].o.value;
          result += " </td></tr>"; 
        } 
        result += "</table>" ;
        document.getElementById("results").innerHTML = result;
     }
      
     // Make the query.
     sparqlQueryJson(query, endpoint, myCallback, true);
      