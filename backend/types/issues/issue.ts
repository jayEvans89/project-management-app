import { Document } from 'mongoose'

export interface IssueBase extends Document {
  /** Issue title */
  title: string;

  /** Issue id/ticket number */
  id: string;

  /** Issue description */
  description: string;

  /** The order of the issue in the sprint or story */
  order: number;

  /** Type of issue. I.e story, task, bug */
  type: string;

  /** Labels assigned to the issue */
  labels: Array<string>;

  /** The id of the sprint the issue belongs to */
  sprintId: string;

  /** List of subtasks */
  subtasks: Array<IssueBase>;
  
  /** Story point estimate */
  storyPoint: number;
}
