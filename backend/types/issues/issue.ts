import { Document } from 'mongoose'
import { Assignee } from '../assignee/assignee';

export interface IssueBase extends Document {
  /** Issue title */
  title: string;

  /** Mongodb Id */
  _id: string;

  /** Issuer/Ticket Id */
  issueId: string;

  /** Issue description */
  description: string;

  /** The order of the issue in the sprint or story */
  order: number;

  /** Type of issue. I.e story, task, bug */
  type: string;

  /** Labels assigned to the issue */
  labels: string[];

  /** The id of the sprint the issue belongs to */
  sprintId: string;

  /** List of subtasks */
  subtasks: IssueBase[];
  
  /** Story point estimate */
  effort: number;

  /** List of assignees */
  assignees: Assignee[]

  /** The status of the issue */
  status: string;
}
