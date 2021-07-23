import { NewSprint, SprintCreationResponse, SprintsResponse } from '@/models/sprints/sprints'
import http from '@/services/http'

class SprintService {
  async getSprints(): Promise<SprintsResponse> {
    const res = await http.get('sprint/get')
    return res.data
  }

  async createSprint(newSprint: NewSprint): Promise<SprintCreationResponse> {
    const res = await http.post('sprint/create', newSprint)
    return res.data
  }
}

export default new SprintService()