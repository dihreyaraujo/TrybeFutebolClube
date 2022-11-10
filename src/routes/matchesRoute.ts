import * as express from 'express';
import MatchPostController from '../database/controllers/MatchPostController';
import AllMatchesController from '../database/controllers/AllMatchesController';
import UpdateStatusController from '../database/controllers/UpdateStatusMatchController';
import MiddlewaresMatch from '../database/middlewares/middlewaresMatch';

const matchesRoute = express.Router();

matchesRoute.get('/matches', (req, res) => AllMatchesController.getAllMatches(req, res));

matchesRoute.post(
  '/matches',
  (req, res, next) => MiddlewaresMatch.haveNotTeam(req, res, next),
  (req, res, next) => MiddlewaresMatch.notEqualTeam(req, res, next),
  (req, res) => MatchPostController.matchPost(req, res),
);

matchesRoute.patch(
  '/matches/:id/finish',
  (req, res) => UpdateStatusController.updateInProgress(req, res),
);

matchesRoute.patch('/matches/:id', (req, res) => UpdateStatusController.updateMatch(req, res));

export default matchesRoute;
