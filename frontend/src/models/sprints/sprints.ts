import { BaseResponse } from '../baseResponse'
import { Sprint } from '../../../../backend/types/sprint/sprint'

export interface SprintsResponse extends BaseResponse {
  data: Array<Sprint>
}

export interface SprintCreationResponse extends BaseResponse {
  data: Sprint
}

export interface NewSprint {
  /** The name of the sprint */
  name: string;

  /** Sprint start date */
  startDate: string;

  /** Sprint end date */
  endDate: string;

  /** A description for the sprint */
  description: string;
}
