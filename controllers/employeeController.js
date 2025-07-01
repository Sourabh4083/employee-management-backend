const Employee = require('../models/Employee')



exports.createEmployee = async (req, res) =>{
    try {
        console.log('Incomeing data:', req.body);
        
        const employees = await Employee.create(req.body)
        console.log('Received data:' , req.body)
        res.status(201).json(employees)

    } catch (err) {
        console.error('Error creating employee:', err.message)
        res.status(400).json({error: err.message})
    }
}


// exports.getEmployees = async (req, res) =>{
//     try {
//         const employees = await Employee.find()
//         console.log('Received data:' , req.body)
//         res.json(employees)
//     } catch (err) {
//         res.status(500).json({ error: err.message })
//     }
// }

exports.getEmployees = async (req, res) =>{
    try {
        console.log('Query params:', req.query);

        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const search = req.query.search || ''    
        const sort = req.query.sort || 'name'
        const order = req.query.order === 'desc' ? -1 : 1

        const searchRegex = new RegExp(search, 'i')

        const query = {
            $or: [
                {name: searchRegex},
                {position: searchRegex}
            ]
        }

        const employees = await Employee.find(query)
        .sort({ [sort]: order})
        .skip((page - 1) * limit)
        .limit(limit)

        const total = await Employee.countDocuments(query)

        res.json({
            employees,
            total,
            page,
            pages: Math.ceil(total / limit)
        })
    } catch (err) {
        console.error('Error in getEmployee:', err.message)
        res.status(500).json({error: err.message})
    }
}


exports.updateEmployee = async (req, res) =>{
    try {
        const employees = await Employee.findByIdAndUpdate(req.params.id, req.body, {new: true})
        console.log('Received data:' , req.body)
        res.json(employees)

    } catch (err) {
        res.status(400).json({error: err.message })
    }
}

exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id)
        console.log('Received data:' , req.body)
        res.json({ message: 'Employee deleted'})

    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

exports.getEmployeeById = async (req,res) => {
    try{
        const employee = await Employee.findById(req.params.id)
        if(!employee) return res.status(404).json({error: 'Employee not found'})
            res.json(employee)

    } catch (err) {
    res.status(500).json({error: err.message})
    }
}
