// import api from '../api'

export default {
  test: (req, res, next) => {
    console.log(req.params)
    res.send('hello, ' + req.params.name)
  },
}
