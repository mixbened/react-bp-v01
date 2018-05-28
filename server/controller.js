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
        req.app.get('db').findUser(username).then(response => {
            console.log(response)
            if(response[0]){
                res.status(200).send('User already registered.')
            } else {
                // password hashing
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    // user registration - incl hashed Password
                    req.app.get('db').registerUser(userData).then(response => {
                        // put necessary Information in the User Session
                        req.session.user = {session.object}
                        res.status(200).send('Registration Successfull')
                    }).catch(err => console.log('Error in Registration:', err ));
                });
            }
        }).catch(err => console.log('Error in finding User:', err))
    },
    login: (req, res) => {
        req.app.get('db').findUser(username).then(response => {
            // console.log(response)
            if(response.data){
                bcrypt.compare(password, data[0].password).then(passwordsMatch => {
                    if(passwordsMatch) {
                        req.session.user = { session.object }
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
    }
}