"use strict";

const router = require('express').Router();
const models = require('../models');

router.post('/signup', function(req, res) {
  models.User.create({
    nameFirst: req.body.nameFirst,
    nameLast: req.body.nameLast,
    age: req.body.age,
    gender: req.body.gender,
    emergencyName: req.body.emergencyName,
    emergencyContact: req.body.emergencyContact,
    allergies: req.body.allergies,
    familyHistory: req.body.familyHistory,
    medication: req.body.medication,
    medicareCard: req.body.medicareCard
  }).then(function() {
    res.json({ success: true });
  });
});

router.get('/:id', function(req, res) {
    models.User.findOne({ where: { id: req.params.id } }).then((user) => {
      res.send({ success: true, user:user });
    });
});

module.exports = router;