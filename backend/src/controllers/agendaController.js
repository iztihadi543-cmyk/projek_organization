const Agenda = require('../models/agendaModel');

const getAgenda = async (req, res) => {
  try {
    const agenda = await Agenda.find().sort({ tanggalMulai: 1 });
    res.status(200).json(agenda);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAgenda = async (req, res) => {
  try {
    const agenda = await Agenda.create(req.body);
    res.status(201).json(agenda);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAgenda, createAgenda };