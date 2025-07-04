const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    mobile: {type: String, required: true},
    email: {type: String, required: true},
    position: {type: String, required: true},
    salary: {type: String, required: true},
}, {timestamps: true })

module.exports = mongoose.model('Employee', employeeSchema)