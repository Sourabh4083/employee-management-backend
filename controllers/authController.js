const jwt = require('jsonwebtoken')

const adminUser = {
    username: 'admin',
    password: 'admin123'
}


exports.login = async (req, res) => {
    const { username, password} = req.body
    console.log("JWT_SECRET in use:", process.env.JWT_SECRET);


    if (username === adminUser.username &&
        password === adminUser.password
    ) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET,{
            expiresIn: '2h'
        })

        return res.json({token})
    }

    res.status(401).json({error:'Invalid credentials'})
}