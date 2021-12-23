const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      
      const { username, password } = req.body
      console.log('log in user and passowrd', username, password)
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          let authenticated = bcrypt.compareSync(password, users[i].passWordHash)

          if(authenticated){
            let userToReturn = {...users[i]}
            delete userToReturn.passWordHash
            res.status(200).send(userToReturn)
          }
          

        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        const {username, email, firstName, lastName, password} = req.body
        const salt = bcrypt.genSaltSync(5)
        const passWordHash = bcrypt.hashSync(password, salt)
        console.log('passWordHash', passWordHash)
        console.log('username', username)

      let user ={
        username,
        email,
        firstName,
        lastName,
        passWordHash,

      }
        users.push(user)
  
        let userToReturn = {...user}
        delete userToReturn.passWordHash
        res.status(200).send(userToReturn)
    }
}

console.log('users array', users)