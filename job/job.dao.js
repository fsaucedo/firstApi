const mongoose = require('mongoose');
const jobSchema = require('./job.model');

jobSchema.statics = {
  create: function (data, cb) {
    const user = new this(data);
    user.save(cb);
  }
}

const jobModel = mongoose.model('Jobs', jobSchema);
module.exports = jobModel;