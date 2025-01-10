const mongoose = require('mongoose')
const { Schema, model } = mongoose

const ActivitiesSchema = new Schema({
  title: {
    type: 'string',
    required: true,
  },
  description: {
    type: 'string',
    required: true,
  },
  totalScore: {
    type: 'number',
    required: true,
  },
  issueCount: {
    type: 'number',
    required: true,
  },
})
