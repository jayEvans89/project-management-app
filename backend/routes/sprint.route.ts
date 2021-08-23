import express from 'express'
import SprintController from '@/controllers/sprint/sprint.controller'

export const sprint = express.Router()

const sprintController = new SprintController()

// Get all sprints
sprint.get('/get', (req, res) => {
  console.log('get sprints')
  sprintController.get(req, res)
})

// Get specific sprint
sprint.get('/get/:id', (req, res) => {
  sprintController.get(req, res)
})

// Get active sprint
sprint.get('/getActiveSprint', (req, res) => {
  sprintController.getActiveSprint(req, res)
})

// Create Sprint
sprint.post('/create', (req, res) => {
  sprintController.createSprint(req, res)
})

// Start sprint
sprint.post('/start/:id', (req, res) => {
  sprintController.startSprint(req, res)
})

// End sprint
sprint.post('/end/:id', (req, res) => {
  sprintController.endSprint(req, res)
})
