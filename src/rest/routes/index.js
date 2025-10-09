const express = require('express');
const router = express.Router();

const tutorRoutes = require('./tutorRoutes');
const animalRoutes = require('./animalRoutes');
const prontuarioRoutes = require('./prontuarioRoutes');
const authRoutes = require('./authRoutes');

router.use('/auth', authRoutes);
router.use('/tutores', tutorRoutes);
router.use('/animais', animalRoutes);
router.use('/prontuarios', prontuarioRoutes);

module.exports = router;
