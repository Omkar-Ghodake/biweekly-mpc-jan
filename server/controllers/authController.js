const Agent = require('../models/Agent')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { capitalizeFirstLetter } = require('../utils')
const mongoose = require('mongoose')

const JWT_SECRET = process.env.JWT_SECRET

exports.createAgent = async (req, res) => {
  try {
    const {
      domain_name,
      emp_id,
      pre_score,
      severity_count,
      total_score,
      courses,
      role,
      resigned,
    } = req.body

    const agent = req.agent

    if (!domain_name || !emp_id)
      return res
        .status(400)
        .json({ success: false, message: 'Missing required fields.' })

    if (emp_id.length < 8 || emp_id.length > 8)
      return res.json({ success: false, message: 'Invalid Detective ID.' })

    let existingAgentID = await Agent.findOne({ emp_id })
    if (existingAgentID)
      return res
        .status(400)
        .json({ success: false, message: 'Detective ID already exists.' })

    let existingAgentDomainName = await Agent.findOne({ domain_name })
    if (existingAgentDomainName)
      return res
        .status(400)
        .json({ success: false, message: 'Agent name already exists.' })

    if (agent.role !== 'chief' && agent.role !== 'captain') {
      return res.json({ success: false, message: 'Unauthorized activity.' })
    }

    const newAgent = await Agent.create({
      domain_name,
      emp_id,
      pre_score,
      severity_count,
      total_score,
      courses,
      role,
      resigned,
    })

    if (!newAgent)
      return res
        .status(500)
        .json({ success: false, message: 'Failed to create agent.' })

    res.json({ success: true, message: 'Agent created successfully.' })
  } catch (error) {
    res.json({ success: false, message: 'Server error occurred.' })
    console.error(error)
  }
}

exports.agentLogin = async (req, res) => {
  try {
    const { emp_id } = req.body

    if (!emp_id)
      return res
        .status(400)
        .json({ success: false, message: 'Missing required fields.' })

    if (emp_id.length < 8 || emp_id.length > 8)
      return res.json({ success: false, message: 'Invalid Detective ID.' })

    let agent = await Agent.findOne({ emp_id })

    if (!agent) return res.json({ success: false, message: 'Agent not found.' })

    const data = {
      agent: { id: agent.id, role: agent.role },
    }

    const authToken = jwt.sign(data, JWT_SECRET)

    return res.json({
      success: true,
      message: `Welcome ${capitalizeFirstLetter(agent.role)} ${
        agent.domain_name
      }!`,
      authToken,
    })
  } catch (error) {
    res.json({ success: false, message: 'Server error occurred.' })
    console.error(error)
  }
}

exports.getAgentInfo = async (req, res) => {
  try {
    const agent = req.agent

    if (!agent)
      return res.json({ success: false, message: 'Unauthorized access.' })

    const agentInfo = await Agent.findById(agent.id)

    if (!agentInfo)
      return res.json({ success: false, message: 'Agent not found.' })

    return res.json({ success: true, agent: agentInfo })
  } catch (error) {
    res.json({ success: false, message: 'Server error occurred.' })
    console.error(error)
  }
}

exports.getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find({})

    if (!agents)
      return res.json({ success: false, message: 'No agents found.' })

    return res.json({ success: true, agents })
  } catch (error) {
    res.json({ success: false, message: 'Server error occurred.' })
    console.error(error)
  }
}

exports.updateAgent = async (req, res) => {
  try {
    let {
      domain_name,
      emp_id,
      pre_score,
      severity_count,
      total_score,
      courses,
      role,
      resigned,
    } = req.body

    const agent = req.agent

    if (agent.role !== 'chief' && agent.role !== 'captain') {
      return res.json({ success: false, message: 'Unauthorized activity.' })
    }

    const existingAgent = await Agent.findOne({ emp_id })

    if (!existingAgent)
      return res.json({ success: false, message: 'No agent found.' })

    const updatedAgent = await Agent.findOneAndUpdate(
      existingAgent._id,
      {
        $set: req.body,
      },
      { new: true }
    )

    return res.json({ success: true, updatedAgent })
  } catch (error) {
    res.json({ success: false, message: 'Server error occurred.' })
    console.error(error)
  }
}
