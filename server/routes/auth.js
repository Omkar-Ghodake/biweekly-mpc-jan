const express = require('express')
const {
  createAgent,
  agentLogin,
  getAgentInfo,
  getAllAgents,
  updateAgent,
} = require('../controllers/authController')
const verifyAgent = require('../middlewares/verifyAgent')
const router = express.Router()

router.post('/create-agent', verifyAgent, createAgent)

router.post('/agent-login', agentLogin)

router.post('/get-agent', verifyAgent, getAgentInfo)

router.post('/agents', verifyAgent, getAllAgents)

router.post('/update-agent', verifyAgent, updateAgent)

module.exports = router
