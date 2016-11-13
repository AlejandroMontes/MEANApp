var mongoose = require('mongoose');

// Create the DonatorSchema.
var donatorSchema = new mongoose.Schema({
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
    required: true
  },
  email: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  geographicalCoordinates: {
    type: String,
    required: true
  },
});
// Export the model.
module.exports = donatorSchema;
