const router = require('express').Router();

const { buscar } = require('../controllers/');

router.get('/:coleccion/:termino', buscar);

module.exports = router;