const mongoose = require('mongoose')
const { Schema } = mongoose

const AgentSchema = new Schema({
  domain_name: {
    type: String,
    required: true,
    unique: true,
  },
  emp_id: {
    type: Number,
    required: true,
    unique: true,
  },
  pre_score: Number,
  severity_count: {
    blocker: Number,

    critical: Number,

    major: Number,

    normal: Number,

    minor: Number,
  },
  total_score: Number,
  courses: String,
  about: String,
  role: {
    type: String,
    default: 'agent',
  },
  resigned: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Agent', AgentSchema)
