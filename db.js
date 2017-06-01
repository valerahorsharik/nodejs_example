let mongoClient = require('mongodb').MongoClient;
let state={
  db:null
};


exports.connect = (url,done) => {
  if(state.db){
    return done();
  }

  mongoClient.connect(url,(err, db) => {
    if(err){
      return done(err);
    }
    state.db = db;
    done();
  })
}

exports.get = () => {
  return state.db;
}
