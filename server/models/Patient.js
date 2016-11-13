var mongoose = require('mongoose');

// Create the PatientSchema.
var patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  bloodGroup: {
    type: String,
    required: false
  }
});
// Export the model.
module.exports = patientSchema;
