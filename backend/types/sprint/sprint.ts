import { Document } from 'mongoose'
import { IssueBase } from '../issues/issue'

export interface Sprint extends Document {
  /** Name of the sprint */
  name: string;

  /** Sprint description/goals */
  description: string;

  /** Sprint start date */
  startDate: string;

  /** Sprint end date */
  endDate: string;

  /** List of issues */
  issues?: Array<IssueBase>;

  /** Whether the sprint is active */
  active: boolean;

  /** Whether the sprint is complete */
  complete: boolean;
}
