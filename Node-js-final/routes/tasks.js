import express from 'express'
const router = express.Router()

import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask
} from '../controllers/tasks.js'

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

export default router
