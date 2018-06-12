const bcrypt = require('bcrypt');
const saltRounds = 12;

module.exports = {
    getData: (req, res) => {
        req.app.get('db').getData().then((data) => {
            res.status(200).send(data)
        }).catch(err => console.log('Error fetching Data:', err ))
    },
    register: (req, res) => {
        // check for duplicates
        const { password, username } = req.body;
        req.app.get('db').findUser(username).then(response => {
            console.log(response)
            if(response[0]){
                res.status(200).send('User already registered.')
            } else {
                // password hashing
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    // user registration - incl hashed Password
                    req.app.get('db').addUser([username ,hashedPassword]).then(response => {
                        // put necessary Information in the User Session
                        console.log(response)
                        req.session.user = response.data
                        res.status(200).send('Registration Successfull')
                    }).catch(err => console.log('Error in Registration:', err ));
                });
            }
        }).catch(err => console.log('Error in finding User:', err))
    },
    login: (req, res) => {
        const { password, username } = req.body;
        console.log(username)
        req.app.get('db').findUser(username).then(response => {
            console.log(response)
            if(response[0]){
                bcrypt.compare(password, response[0].password).then(passwordsMatch => {
                    if(passwordsMatch) {
                        req.session.user = {user: username}
                        // console.log('-----req.session.user',req.session.user)
                        res.status(200).send( req.session.user )
                    } else {
                        res.status(403).send( 'Invalid password' )
                    }
                }).catch(err => console.log('error in comparing Passwords:', err));
            } else {
                res.status(200).send( 'User does not exist.' )
            }
        }).catch(err => console.log( 'Error in finding User:', err ))
    },
    logout: (req, res) => {
        req.session.destroy(err => {
            res.status(200).send(`Session destruction or fail with: ${err}`)
        })
    },
    session: (req, res) => {
        res.status(200).json(req.session.user)
    }
}