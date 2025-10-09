const ProntuarioService = require('../../common/services/prontuarioService');

const getAll = (req, res) => {
  res.json(ProntuarioService.getAll());
};

const getById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = ProntuarioService.getById(id);
  if (!item) return res.status(404).json({ message: 'Prontuário não encontrado' });
  res.json(item);
};

const create = (req, res) => {
  try {
    const created = ProntuarioService.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updated = ProntuarioService.update(id, req.body);
  if (!updated) return res.status(404).json({ message: 'Prontuário não encontrado' });
  res.json(updated);
};

const remove = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const ok = ProntuarioService.remove(id);
  if (!ok) return res.status(404).json({ message: 'Prontuário não encontrado' });
  res.status(204).send();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
