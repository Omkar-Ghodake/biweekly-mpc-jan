const express = require('express')
const {
  createAgent,
  agentLogin,
  getAgentInfo,
  getAllAgents,
  updateAgent,
  deleteAgent,
  getAllImages,
} = require('../controllers/authController')
const verifyAgent = require('../middlewares/verifyAgent')
const router = express.Router()

router.post('/create-agent', verifyAgent, createAgent)

router.post('/get-agent-images', verifyAgent, getAllImages)

router.post('/agent-login', agentLogin)

router.post('/get-agent', verifyAgent, getAgentInfo)

router.post('/agents', verifyAgent, getAllAgents)

router.post('/update-agent', verifyAgent, updateAgent)

router.post('/delete-agent', verifyAgent, deleteAgent)

module.exports = router
