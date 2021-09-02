import { Request, Response } from 'express'
import { IssueModel } from '@/models/issue/issue.model'
import { IssueBase } from '@/types/issues/issue'

export default class IssueController {
  // Get all Issues
  async get(req: Request, res: Response) {
    if (!req.params.id) {
      const issues = await IssueModel.find()

      const complete = req.query.completed

      if (complete === '1') {
        return res.status(201).send({
          status: 'success',
          message: `Found ${issues.length} issue(s)`,
          data: issues
        })
      }

      const filtered = issues.filter((i) => {
        return i.status !== 'complete' && i.sprintId === undefined
      })

      return res.status(201).send({
        status: 'success',
        message: `Found ${filtered.length} issue(s) in the backlog`,
        data: filtered
      })
    } else {
      const id = req.params.id
      const issue = await IssueModel.findById(id)

      if (issue === null) {

        return res.status(401).send({
          status: 'error',
          message: `An issue with id: ${id} does not exist. Please try a different id`
        })
      }


      return res.status(201).send({
        status: 'success',
        message: `Found ${issue.id}`,
        data: issue
      })
    }
  }

  // Create issue
  async createIssue(req: Request, res: Response) {
    const newIssue = req.body as IssueBase

    newIssue.issueId = await this.createIssueNumber()

    let issue
    try {
      issue = await IssueModel.create(newIssue)
    } catch (error) {
      return res.status(400).send({
        status: 'error',
        message: error
      })
    }

    return res.status(201).send({
      status: 'success',
      message: `${newIssue.title} was successfully created`,
      data: issue
    })
  }

  /**
   * TODO: Refactor to use the projects name once the project endpoints are in
   * Creates a new ticket number based on the total amount of 
   * created tickets
   * @returns A new issue/ticket number
   */
  async createIssueNumber() {
    const totalIssues = await (await IssueModel.find()).length + 1
    const projectName = 'Test'

    let issueId
    if (totalIssues < 10) {
      issueId = `0${totalIssues}`
    } else {
      issueId = `${totalIssues}`
    }

    return `${projectName.toUpperCase()}-${issueId}`
  }

  // Updates an issue

  // Delete an issue
}
