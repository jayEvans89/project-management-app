import { Request, Response } from 'express'
import { SprintModel } from '@/models/sprint/sprint.model'
import { Sprint } from '@/types/sprint/sprint'

export default class SprintController {
  async get(req: Request, res: Response) {
    if (req.params.id === '') {
      const sprints = await SprintModel.find()
      const filteredSprints = sprints.filter(s => !s.complete)

      return res.status(201).send({
        status: 'success',
        message: `Found ${filteredSprints.length} sprint(s)`,
        data: filteredSprints
      })
    } else {
      const sprintId = req.params.id
      const sprint = await SprintModel.findById(sprintId)

      return res.status(201).send({
        status: 'success',
        message: `Found sprint ${sprintId}`,
        data: sprint
      })

    }
  }

  async getActiveSprint(req: Request, res: Response) {
    const sprints = await SprintModel.find()

    const filteredSprints = sprints.filter(s => !s.complete && s.active)

    return res.status(201).send({
      status: 'success',
      message: `Found the current active sprint`,
      data: filteredSprints
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
      updated = await SprintModel.findByIdAndUpdate({ _id: sprintId }, { complete: true }, { returnOriginal: false })
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
