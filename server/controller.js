

module.exports = {
    getData: (req, res) => {
        req.app.get('db').getData().then((data) => {
            res.status(200).send(data)
        })
    }
}