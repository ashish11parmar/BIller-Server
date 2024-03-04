const companyService = require('../service/company.service');
const companyController = {}

companyController.createCompany = async (req, res) => {
    companyService.createCompany(req).then((response) => {
        res.status(response.status).json(response);
    }).catch((error) => {
        res.status(500).json({ msg: "Internal Server Error...", data: error });
    });
}
companyController.getCompany = async (req, res) => {
    companyService.getCompany(req).then((response) => {
        res.status(response.status).json(response);
    }).catch((error) => {
        res.status(500).json({ msg: "Internal Server Error...", data: error });
    });
}
companyController.updateCompany = async (req, res) => {
    companyService.updateCompany(req).then((response) => {
        res.status(response.status).json(response);
    }).catch((error) => {
        res.status(500).json({ msg: "Internal Server Error...", data: error });
    });
}
companyController.deleteCompany = async (req, res) => {
    companyService.deleteCompany(req).then((response) => {
        res.status(response.status).json(response);
    }).catch((error) => {
        res.status(500).json({ msg: "Internal Server Error...", data: error });
    });
}
module.exports = companyController;