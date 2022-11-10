import * as express from 'express';
import LeaderBoardController from '../database/controllers/LeaderBoardController';

const leaderBoardRoute = express.Router();

leaderBoardRoute.get('/leaderboard/home', (req, res) => LeaderBoardController.boardHome(req, res));

leaderBoardRoute.get('/leaderboard/away', (req, res) => LeaderBoardController.boardAway(req, res));

leaderBoardRoute.get('/leaderboard', (req, res) => LeaderBoardController.board(req, res));

export default leaderBoardRoute;
