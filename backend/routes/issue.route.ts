import express from 'express'
import IssueController from '@/controllers/issue/issue.controller'

export const issue = express.Router()

const issueController = new IssueController()

// Get all Issues
issue.get('/get', (req, res) => {
  console.log('get issues')
  issueController.get(req, res)
})

// Get specific issue
issue.get('/get/:id', (req, res) => {
  issueController.get(req, res)
})

// Create issue
issue.post('/create', (req, res) => {
  issueController.createIssue(req, res)
})

// Updates an issue
issue.put('/update', (req, res) => {
  // issueController.update(req, res)
})

// Delete an issue
issue.delete('/delete/:id', (req, res) => {
  // issueController.delete(req, res )
})
