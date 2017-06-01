let db = require('../db'),
      objectID = require('mongodb').ObjectID;

exports.all = (callback) => {
  db.get().collection('posts').find().toArray((err, docs) => {
    callback(err,docs);
  })
};

exports.findById = (id,callback) => {
  db.get().collection('posts').findOne({ _id : objectID(id)},(err, doc) => {
     callback(err,doc);
   })
}

exports.update = (id, newValue,callback) => {
  db.get().collection('posts').updateOne({ _id : objectID(id)}, newValue, (err, doc) => {
    callback(err,doc);
  })
}

exports.store = (newValue, callback) => {
  db.get().collection('posts').insertOne(newValue,(err, doc) => {
    callback(err,doc);
  })
}

exports.deleteById = (id, callback) => {
  db.get().collection('posts').deleteOne({ _id : objectID(id)}, (err, doc) => {
    callback(err,doc);
  })
}
