

let mongoose = require('mongoose');

mongoose.connect('mongodb://sai:sai123@ds259109.mlab.com:59109/sai-db',{ useMongoClient: true});

module.exports = mongoose;

/*module.exports.connections = {

  
  localDiskDb: {
    adapter: 'sails-disk'
  },

  *************/

/*};mongo db
