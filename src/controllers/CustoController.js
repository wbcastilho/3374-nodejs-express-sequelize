const Controller = require('./Controller.js');
const CustoServices = require('../services/CustoServices.js');

const custoServices = new CustoServices();

class CustoController extends Controller {
    constructor() {
        super(custoServices);
    }
}

module.exports = CustoController;