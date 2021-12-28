// require {connect} mongoose package
let { connect } = require('mongoose');

// url connection
let urlApi = process.env.URL_MONGO;

console.log(typeof urlApi);

// start connection
const CONECTION = connect(urlApi, {

    useNewUrlParser: true,
    useUnifiedTopology: true

}).then((res) => console.log('DB connect successfull')).catch((err) => console.log(err));

// export file (connect)
module.exports = CONECTION;