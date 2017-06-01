let db = require('../db'),
      objectID = require('mongodb').ObjectID;

exports.all = (callback) => {
  db.get().collection('users').find().toArray((err, docs) => {
    callback(err,docs);
  })
};

exports.findById = (id,callback) => {
  db.get().collection('users').findOne({ _id : objectID(id)},(err, doc) => {
     callback(err,doc);
   })
}

exports.findByNameAndPassword = (name, password, callback) => {
  db.get().collection('users').findOne({ name: name, password: password }, (err, doc) => {
    callback(err, doc);
  })
}

exports.store = (newUser, callback) => {
  db.get().collection('users').insertOne(newUser,(err, doc) => {
    callback(err,doc);
  })
}
