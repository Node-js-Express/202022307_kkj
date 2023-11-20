import Task from "../models/Task.js";
import asyncWrapper from "../middleware/async.js";
import { createCustomError } from "../errors/custom-error.js";

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: 모든 태스크를 가져옵니다.
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: 태스크 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */

// const getAllTasks = asyncWrapper(async (req, res) => {
//   const tasks = await Task.find({})
//   res.status(200).json({ tasks })
// })

const getAllTasks = async (req, res) => {
    const tasts = await Task.find({});
    res.status(200).json(tasts);
};

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: 태스크를 하나 만들어서 저장합니다.
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *           example:
 *             name: "새로운 태스크"
 *             completed: false
 *     responses:
 *       201:
 *         description: 태스크 추가
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: 특정 태스크를 가져옵니다.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 가져올 태스크의 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 한 태스크 불러오기
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404));
    }

    res.status(200).json(task);
});

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: 특정 태스크를 지웁니다.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 삭제할 태스크의 ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 한 태스크 지우기
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */

const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404));
    }
    res.status(200).json(task);
});

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   patch:
 *     summary: 특정 태스크를 수정합니다.
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 수정할 태스크의 ID
 *         schema:
 *           type: string
 *     requestBody:
 *       description: 수정할 태스크의 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *           example:
 *             name: "새로운 태스크 이름"
 *             completed: true
 *     responses:
 *       200:
 *         description: 한 태스크 업데이트
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */

const updateTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    });

    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404));
    }

    res.status(200).json(task);
});

export { getAllTasks, createTask, updateTask, deleteTask, getTask };
