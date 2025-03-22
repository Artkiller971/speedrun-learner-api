import express from 'express';

import Games from '../models/games.js';

const router = express.Router();


router
  .get('/', async (req, res) => {
    res.send('Main games page');
  })
  .get('/all', async (req, res) => {
    try {
      const games = await Games.query();
      res.json(games);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const game = await Games
        .query()
        .findById(id)
        .throwIfNotFound()
        .withGraphFetched('guides');
      res.json(game);
    } catch (e) {
      res.status(404).json(e);
      next(e);
    }
  })
  .post('/add_game', async (req, res, next) => {
    const game = new Games();
    game.$set(req.body);

    try {
      const validGame = Games.fromJson(req.body);
      await Games.query().insert(validGame);
      res.status(201).json(validGame);
    } catch (e) {
      res.status(400).json(e.data);
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id);

    try {
      const gameToDelete = await Games.query().findById(id).throwIfNotFound();
      const relatedGuides = await gameToDelete.$relatedQuery('guides');
      if (relatedGuides.length > 0) {
        res.status(403).json({message: 'Cannot delete games that have related guides'});
      } else {
        await gameToDelete.$query().delete();
        res.sendStatus(204);
      }
    } catch (e) {
      res.status(400).json(e);
      next(e);
    }
  })


export default router;