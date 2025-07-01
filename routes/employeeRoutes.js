const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')


const {
    createEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
    getEmployeeById
} = require('../controllers/employeeController')

router.get('/', getEmployees)
router.get('/:id', getEmployeeById)
router.post('/', auth, createEmployee)
router.put('/:id', auth, updateEmployee)
router.delete('/:id', auth, deleteEmployee)


module.exports = router