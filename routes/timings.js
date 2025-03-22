import express from 'express';

import Timings from '../models/timings.js'

const router = express.Router();

router
  .get('/', async (req, res) => {
    res.send('Main timings page')
  })
  .get('/all', async (req, res) => {
    try {
      const timings = await Timings.query();
      res.json(timings);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const timing = await Timings
      .query()
      .findById(id)
      .throwIfNotFound();
      res.status(200).json(timing);
    } catch (e) {
      res.status(404).json(e);
      next(e);
    }
  })
  .post('/add_timing', async (req, res, next) => {
    const timing = new Timings();
    timing.$set(req.body);

    try {
      const validTiming = Timings.fromJson(req.body);
      await Timings.query().insert(validTiming);
      res.status(201).json(validTiming);
    } catch (e) {
      res.status(400).json(e.data);
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);

    try {
      const timingToDelete = await Timings.query().findById(id).throwIfNotFound();
      await timingToDelete.$query().delete();
      res.sendStatus(204);
    } catch (e) {
      res.status(400).json(e);
      next(e);
    }
  })

export default router;