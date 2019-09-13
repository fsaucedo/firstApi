const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const jobSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  resolved: {
    type: Boolean,
    required: true
  }
}, {
    timestamps: true
  });

module.exports = jobSchema;