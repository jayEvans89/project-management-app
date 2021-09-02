import { IssueBase } from '@/types/issues/issue'
import { Schema } from 'mongoose'
import * as Mongoose from "mongoose";


const issueSchema: Schema = new Schema ({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  issues: {
    type: Array,
    required: false
  },
  status: {
    type: String,
    required: false,
    default: 'backlog'
  },
  order: {
    type: Number,
    required: false
  },
  type: {
    type: String,
    required: true
  },
  labels: {
    type: Array,
    required: false
  },
  sprintId: {
    type: String,
    required: false
  },
  subTasks: {
    type: Array,
    required: false
  },
  effort: {
    type: Number,
    required: false
  },
  assignees: {
    type: Array,
    required: false
  },
  issueId: {
    type: String,
    Required: true
  }
},
{
  timestamps: true
})

export const IssueModel = Mongoose.model<IssueBase>(
  'issue',
  issueSchema
)
