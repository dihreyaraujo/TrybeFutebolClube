import * as express from 'express';
import TeamsGetAllController from '../database/controllers/TeamsGetAllController';

const teamsRoute = express.Router();

teamsRoute.get('/teams', (req, res) => TeamsGetAllController.getAllTeams(req, res));

teamsRoute.get('/teams/:id', (req, res) => TeamsGetAllController.getById(req, res));

export default teamsRoute;
