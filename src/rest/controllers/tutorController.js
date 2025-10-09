const TutorService = require('../../common/services/tutorService');

const getAll = (req, res) => {
  const result = TutorService.getAll();
  res.json(result);
};

const getById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = TutorService.getById(id);
  if (!item) return res.status(404).json({ message: 'Tutor não encontrado' });
  res.json(item);
};

const create = (req, res) => {
  const data = req.body;
  const created = TutorService.create(data);
  res.status(201).json(created);
};

const update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = req.body;
  const updated = TutorService.update(id, data);
  if (!updated) return res.status(404).json({ message: 'Tutor não encontrado' });
  res.json(updated);
};

const remove = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const ok = TutorService.remove(id);
  if (!ok) return res.status(404).json({ message: 'Tutor não encontrado' });
  res.status(204).send();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
