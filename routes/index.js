var express = require('express');
var router = express.Router();
var request = require('request');
const yelp = require('yelp-fusion');

// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const clientId = 'f16ljGR-yqYospd9vf76jA';
const clientSecret = 'mbkRlfAnUxaP25js26fkB1jJTIYVsC5262Ig1uv90SNwaRFQc0lfmISWYkjOEJ2J';



// https://www.yelp.com/developers/documentation/v3/business_search
// yelp.search({term: 'coffee', location: '30097', limit: 10})
// .then(function (data) {
// 	var coffeeData = JSON.parse(data);
//     console.log(coffeeData);
//     console.log('$$$$$$$$$')

// })
// .catch(function (err) {
//     console.error(err);
// });


router.get('/', function(req,res,next){
		// res.json to view in window
		// res.json(coffeeData);
    var formHTML = '<form action="/" method="post">' +
               'Where do you want coffee? ' +
               '<input type="text" name="term" placeholder="Coffee please!" />' +
               '<br>' +
               '<button type="submit">Submit</button>' +
            '</form>';

   //  response={ zipCode: req.body.zipCode }  
    res.send(formHTML);

   //  yelp.search({term: 'coffee', location: req.body.zipCode, limit: 10})
   //  .then(function (data) {
   //    var coffeeData = JSON.parse(data);
   //      console.log('$$$$$$$$$');
   //      console.log(coffeeData);
   //      console.log('$$$$$$$$$');
   //  })
   //  .catch(function (err) {
   //      console.error(err);
   //  });
  	// 	res.render('index',{coffeeData})
  	// });
});

router.post('/', function(req, res){
  var zipCode = "30308"//req.body.zipCode;
  // console.log(zipCode)
  var query = req.body.term;
  var location2 = 'atlanta';

  const searchRequest = {
    term:query,
    location: location2
  };

  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search(searchRequest).then(response => {
      const firstResult = response.jsonBody.businesses[0];
      const prettyJson = JSON.stringify(firstResult, null, 4);
      console.log(prettyJson);
      var html = 'Here are all the coffee shops near you:  ' + prettyJson + '.<br>' +'<a href="/">Search again.</a>';
      res.render('searchResults', { coffeeData: prettyJson});
      res.send(html);

    });
  }).catch(e => {
    console.log(e);
  });

  
});

module.exports = router;