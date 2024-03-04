const express = require('express');
const router = express.Router();
const companyController = require('../controller/company.controller');
const verifyToken = require('../service/verifytoken.service');


router.post('/company', verifyToken, companyController.createCompany);
router.get('/company', verifyToken, companyController.getCompany);
router.put('/company/:id', verifyToken, companyController.updateCompany);
router.delete('/company/:id', verifyToken, companyController.deleteCompany);