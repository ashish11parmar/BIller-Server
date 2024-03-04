const Comapny = require('../model/company.model')
const companyService = {}

companyService.createCompany = async (req, res) => {
    const company = new Comapny(req.body)
    await company.save()
    res.status(200).send({ message: "Company created successfully" })
}
companyService.getCompany = async () => { }
companyService.updateCompany = async () => { }
companyService.deleteCompany = async () => { }




module.exports = companyService