import express, { NextFunction, Request, Response } from "express";
import { sprint } from './sprint.route'

export const router = express.Router()

router.use('/sprint', sprint)