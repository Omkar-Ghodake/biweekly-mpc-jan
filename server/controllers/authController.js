const Agent = require('../models/Agent')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { capitalizeFirstLetter } = require('../utils')
const multer = require('multer')
const path = require('path')
const upload = require('./upload')
const fs = require('fs')

const imageDirectoryPath = path.join(__dirname, '../uploads')

const JWT_SECRET = process.env.JWT_SECRET

// Handle file upload logic
exports.uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: 'No file uploaded.' })
    }

    // Send back the uploaded file metadata
    res.json({
      success: true,
      message: 'File uploaded successfully',
      file: req.file, // Send the file's metadata (including filename)
    })
  } catch (error) {
    res.json({ success: false, message: 'Server error occurred.' })
    console.error(error)
  }
}

exports.getAllImages = async (req, res) => {
  try {
    const imageDirectory = path.join('uploads')

    fs.readdir(imageDirectory, (err, files) => {
      if (err) {
        return res.json({ success: false, message: 'Error reading directory.' })
      }

      const imageObject = files.reduce((acc, file) => {
        acc[file] = `http://localhost:5000/images/${file}`

        return acc
      }, {})

      res.json({ success: true, images: imageObject })
    })
  } catch (error) {
    res.json({ success: false, message: 'Server error occurred.' })
    console.error(error)
  }
}

exports.createAgent = async (req, res) => {
  try {
    const {
      domain_name,
      emp_id,
      pre_score,
      severity_count,
      courses,
      role,
      resigned,
    } = req.body

    // res.setHeader('Access-Control-Allow-Origin', '*')
    // res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT')
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    const agent = req.agent

    let totalScore = 0
    if (severity_count) {
      totalScore =
        parseInt(severity_count.blocker) * 10 +
        parseInt(severity_count.critical) * 8 +
        parseInt(severity_count.major) * 5 +
        parseInt(severity_count.normal) * 3 +
        parseInt(severity_count.minor) * 1
    }

    // console.log(parseInt(severity_count.blocker))
    // console.log(parseInt(severity_count.critical))
    // console.log(parseInt(severity_count.major))
    // console.log(parseInt(severity_count.normal))
    // console.log(parseInt(severity_count.minor))

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

    // Ensure that Multer correctly handles the file upload
    upload.single('image')(req, res, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: 'Error during file upload' })
      }
    })

    const newAgent = await Agent.create({
      domain_name,
      emp_id,
      pre_score,
      severity_count,
      total_score: totalScore,
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
    const agents = await Agent.find({}).sort({ domain_name: 1 })

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

    // console.log(parseInt(severity_count.blocker))
    // console.log(parseInt(severity_count.critical))
    // console.log(parseInt(severity_count.major))
    // console.log(parseInt(severity_count.normal))
    // console.log(parseInt(severity_count.minor))

    // console.log('severity_count:', severity_count)

    let totalScore = 0
    if (parseInt(severity_count.blocker) * 10) {
      totalScore += parseInt(severity_count.blocker) * 10
    }
    if (parseInt(severity_count.critical) * 8) {
      totalScore += parseInt(severity_count.critical) * 8
    }
    if (parseInt(severity_count.major) * 5) {
      totalScore += parseInt(severity_count.major) * 5
    }
    if (parseInt(severity_count.normal) * 3) {
      totalScore += parseInt(severity_count.normal) * 3
    }
    if (parseInt(severity_count.minor)) {
      totalScore += parseInt(severity_count.minor)
    }

    req.body.total_score = totalScore

    if (agent.role !== 'chief' && agent.role !== 'captain') {
      return res.json({ success: false, message: 'Unauthorized activity.' })
    }

    const existingAgent = await Agent.findOne({ emp_id })

    if (!existingAgent)
      return res.json({ success: false, message: 'No agent found.' })

    const oldFileName = `${existingAgent.domain_name}.png`
    const newFileName = `${domain_name}.png`

    const oldFilePath = path.join(imageDirectoryPath, oldFileName)
    const newFilePath = path.join(imageDirectoryPath, newFileName)

    fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) {
        console.error('Error renaming the file:', err)
      }
    })

    const updatedAgent = await Agent.findOneAndUpdate(
      existingAgent._id,
      {
        $set: req.body,
      },
      { new: true }
    )

    return res.json({
      success: true,
      message: 'Agent updated successfully.',
      updatedAgent,
    })
  } catch (error) {
    res.json({ success: false, message: 'Server error occurred.' })
    console.error(error)
  }
}

exports.deleteAgent = async (req, res) => {
  try {
    let { emp_id } = req.body

    const agent = req.agent

    if (agent.role !== 'chief' && agent.role !== 'captain') {
      return res.json({ success: false, message: 'Unauthorized activity.' })
    }

    const existingAgent = await Agent.findOne({ emp_id })

    const fileName = `${existingAgent.domain_name}.png`
    const filePath = path.join(imageDirectoryPath, fileName)

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting the file:', err)
        throw new Error(err)
      }
    })

    if (!existingAgent)
      return res.json({ success: false, message: 'No agent found.' })

    const deletedAgent = await Agent.findOneAndDelete(existingAgent._id, {
      new: true,
    })

    return res.json({
      success: true,
      message: 'Agent deleted successfully.',
      deletedAgent,
    })
  } catch (error) {
    res.json({ success: false, message: 'Server error occurred.' })
    console.error(error)
  }
}
