import express from 'express';

import Guides from '../models/guides.js';

const router = express.Router();

router
  .get('/', async (req, res) => {
    res.send('Main guides page')
  })
  .get('/all', async (req, res, next) => {
    try {
      const guides = await Guides.query();
      res.json(guides);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const guide = await Guides
      .query()
      .findById(id)
      .throwIfNotFound()
      .withGraphFetched('timings');

      res.status(200).json(guide);
    } catch (e) {
      res.status(404).json(e);
      next(e);
    }
  })
  .post('/add_guide', async (req, res, next) => {
    const guide = new Guides();
    guide.$set(req.body);

    try {
      const validGuide = Guides.fromJson(req.body);
      await Guides.query().insert(validGuide);
      res.status(201).json(validGuide);
    } catch (e) {
      res.status(400).json(e.data);
      next(e);
    }
  }).delete('/:id', async(req, res, next) => {
    const id = parseInt(req.params.id);

    try {
      const guideToDelete = await Guides.query().findById(id).throwIfNotFound();
      const relatedTimings = await guideToDelete.$relatedQuery('timings');
      if (relatedTimings.length > 0) {
        res.status(403).json({message: 'Cannot delete guides that have related timings'});
      } else {
        await guideToDelete.$query().delete();
        res.sendStatus(204);
      }
    } catch (e) {
      res.status(400).json(e);
      next(e);
    }
  })

export default router;