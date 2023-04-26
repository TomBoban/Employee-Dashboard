const mongoose = require("mongoose");

const employeemodel = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },

  age: {
    type: Number,
  },
  dateOfJoining: {
    type: String,
  },
  title: {
    type: String,
  },
  department: {
    type: String,
  },
  employeeType: {
    type: String,
  },
  currentStatus: {
    type: Boolean,
  },
});

const employeeModel = mongoose.model("employeemodel", employeemodel);
module.exports = employeeModel;
