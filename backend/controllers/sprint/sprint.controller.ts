import { Request, Response } from 'express'
import { SprintModel } from '@/models/sprint/sprint.model'
import { Sprint } from '@/types/sprint/sprint'

export default class SprintController {
  async get(req: Request, res: Response) {
    const sprints = await SprintModel.find()

    return res.status(201).send({
      status: 'success',
      message: `Found ${sprints.length} sprint(s)`,
      data: sprints
    })
  }

  /**
   * Creates a new sprint
   * @param req 
   * @param res 
   * @returns Success response with the newly created sprint. Or an error response
   */
  async createSprint(req: Request, res: Response) {
    const newSprint = req.body as Sprint

    const sprintExists = await SprintModel.findOne({ name: newSprint.name })

    if (sprintExists) {
      return res.status(400).send({
        status: 'error',
        message: 'A sprint with that name already exists. Please use a different name'
      })
    }

    let sprint
    try {
      sprint = await SprintModel.create(newSprint)
    } catch (error) {
      return res.status(400).send({
        status: 'error',
        message: error
      })
    }

    return res.status(201).send({
      status: 'success',
      message: `${newSprint.name} was successfully created`,
      data: sprint
    })
  }

  async startSprint(req: Request, res: Response) {
    const sprintId = req.params.id

    let updated

    try {
      updated = await SprintModel.findByIdAndUpdate({ _id: sprintId }, { active: true }, { returnOriginal: false })
    } catch (error) {
      return res.status(400).send({
        status: 'error',
        message: error
      })
    }

    if (updated) {
      console.log(updated)
      return res.status(201).send({
        status: 'success',
        message: `${updated.name} has been started`,
        data: updated
      })
    }
  }

  async endSprint(req: Request, res: Response) {
    const sprintId = req.params.id

    let updated

    try {
      updated = await SprintModel.findByIdAndUpdate({ _id: sprintId }, { active: true }, { returnOriginal: false })
    } catch (error) {
      return res.status(400).send({
        status: 'error',
        message: error
      })
    }

    if (updated) {
      return res.status(201).send({
        status: 'success',
        message: `${updated.name} has been completed`,
        data: updated
      })
    }
  }
}
