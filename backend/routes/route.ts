import express from "express";
import { sprint } from './sprint.route'
import { issue } from './issue.route'

export const router = express.Router()

router
  .use('/sprint', sprint)
  .use('/issue', issue)