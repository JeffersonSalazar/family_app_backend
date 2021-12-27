// require {connect} mongoose package
let { connect } = require('mongoose');

// url connection
let urlApi = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.ggild.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

// start connection
const CONECTION = connect(urlApi, {

    useNewUrlParser: true,
    useUnifiedTopology: true

}).then((res) => console.log('DB connect successfull')).catch((err) => console.log(err));

// export file (connect)
module.exports = CONECTION;