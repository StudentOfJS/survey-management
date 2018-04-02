import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const Company = mongoose.model('Company', {
  companyName: String,
  groups: [String]
})


export const Employee = mongoose.model('Employee', {
  companyName: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  mobile: String,
  manager: String,
  groupMembership: [String],
  dashboardAccess: Boolean,
  surveyName: String,
  surveyOwed: Boolean,
  firstTime: Boolean,
  isDeleted: Boolean
})

export const Survey = mongoose.model('Survey', {
  surveyName: String,
  companyName: String,
  introPage1: String,
  introPage2: String,
  subHeading: {
    p1: String,
    p2: String,
    p3: String,
    p4: String,
    p5: String,
    p6: String
  },
  start: {
    p1: String,
    p2: String,
    p3: String,
    p4: String,
    p5: String,
    p6: String
  },
  end: {
    p1: String,
    p2: String,
    p3: String,
    p4: String,
    p5: String,
    p6: String
  }
})

export const Result = mongoose.model('Results', {
  email: String,
  participant: String,
  manager: String,
  group: String,
  companyName: String,
  surveyName: String,
  date: Date,
  p1: Number,
  p2: Number,
  p3: Number,
  p4: Number,
  p5: Number,
  p6: Number
})
