const mongoose = require("mongoose");
const employeeSchema = mongoose.Schema({
    emp_name: {
        type: String,
    },
    emp_number: {
        type: Number,
    },
    emp_address: {
        type: String,
    }
});
module.exports = mongoose.model("emp_dtls", employeeSchema);