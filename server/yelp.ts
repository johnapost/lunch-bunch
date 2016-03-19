var yelpApi = require('yelp')
var yelp = new yelpApi({
  consumer_key: process.env.LUNCH_CON_KEY,
  consumer_secret: process.env.LUNCH_CONS_SEC,
  token: process.env.LUNCH_TOK,
  token_secret: process.env.LUNCH_TOK_SEC
})

export function sample() {
  yelp.search({term: 'food', location: 'Jacksonville'})
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
    })
}
