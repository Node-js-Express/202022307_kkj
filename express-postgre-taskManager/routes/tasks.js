import express from 'express';
import { getAllTasks, createTask, getTask, updateTask, deleteTask } from '../controllers/tasks.js';
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
const router = express.Router();
router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)



export default router;
