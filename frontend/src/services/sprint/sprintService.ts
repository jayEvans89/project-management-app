import { NewSprint, SingleSprintResponse, SprintCreationResponse, SprintsResponse } from '@/models/sprints/sprints'
import http from '@/services/http'

class SprintService {
  /**
   * Gets all un-complete sprints
   * @returns An array of sprints
   */
  async getSprints(): Promise<SprintsResponse> {
    const res = await http.get('sprint/get')
    return res.data
  }
  
  /**
   * Gets a specific sprint
   * @param id The id of the sprint to get
   * @returns Returns to requested sprint
   */
  async getSprint(id: string): Promise<SingleSprintResponse> {
    const res = await http.get(`sprint/get/${id}`)
    return res.data
  }

  /**
   * Gets the currently active sprint
   * @returns The active sprint
   */
  async getActiveSprint(): Promise<SingleSprintResponse> {
    const res = await http.get('sprint/getActiveSprint')
    return res.data
  }

  /**
   * Creates a new sprint
   * @param newSprint The new sprint to create
   * @returns the newly created sprint
   */
  async createSprint(newSprint: NewSprint): Promise<SprintCreationResponse> {
    const res = await http.post('sprint/create', newSprint)
    return res.data
  }

  /**
   * Starts the specified sprint
   * @param id The id of the sprint to start
   * @returns The started sprint
   */
  async startSprint(id: number): Promise<SprintCreationResponse> {
    const res = await http.post(`sprint/start/${id}`)
    return res.data
  }

  /**
   * Ends the specified sprint
   * @param id The id of the sprint to end
   * @returns The ended sprint
   */
  async endSprint(id: number): Promise<SprintCreationResponse> {
    const res = await http.post(`sprint/end/${id}`)
    return res.data
  }
}

export default new SprintService()