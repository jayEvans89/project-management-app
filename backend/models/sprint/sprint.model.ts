import { Sprint } from '@/types/sprint/sprint'
import { Schema } from 'mongoose'
import * as Mongoose from "mongoose";


const sprintSchema: Schema = new Schema ({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: false,
    default: false
  },
  issues: {
    type: Array,
    required: false
  },
  complete: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true
})

export const SprintModel = Mongoose.model<Sprint>(
  'sprint',
  sprintSchema
)
