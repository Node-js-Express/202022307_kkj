// app.get('/api/v1/tasks')             - 모든 task를 가져오기
// app.post('/api/v1/tasks')            - 새로운 task 만들기
// app.get('/api/v1/tasks/:id')         - 해당 id에 대한 task를 가져오기
// app.patch('/api/v1/tasks/:id')       - 해당 id에 대한 task를 업데이트
// app.delete('/api/v1/tasks/:id')      - 해당 id에 대한 task를 삭제
// import pool from "../db/connect.js";
import { PrismaClient } from "@prisma/client"
// const prisma = new PrismaClient();

import mongoose from "mongoose";
import {Task} from '../models/Task.js'

const getAllTasks = async (req, res) => {
    try {
        // const { rows } = await pool.query("SELECT * FROM tasks");
        // res.status(200).json(rows);

        // const tasks = await prisma.task.findMany();
        // res.status(200).json({tasks});

        const find = await Task.find();
        res.status(200).json(find);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTask = async (req, res) => {
    try {
        // const {rows} = await pool.query("INSERT INTO tasks(name, completed) VALUES($1, $2) RETURNING *",[name,completed]);
        // res.status(201).json(rows[0]);

        // const newTask = await prisma.task.create({
        //     data: { name, completed }
        // });

        // res.status(201).json(newTask);

        const { name, completed } = req.body;


        let newTask = await Task.create({
            name: name,
            completed:completed
        });
        res.status(201).json(newTask);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, completed } = req.body;

        // const { rows } = await pool.query("UPDATE tasks SET name = $1, completed = $2 WHERE id = $3 RETURNING *", [name, completed, id]);
        // if (rows.length === 0) {
        //     res.status(404).send('Task not found');
        // } else {
        //     res.status(200).json(rows[0]);
        // }

        // const updatedTask = await prisma.task.update({
        //     where: { id: parseInt(id) },
        //     data: { name, completed }
        // });
        //
        // res.status(200).json(updatedTask);

        Task.findOneAndUpdate(
            {_id: id}, // 업데이트할 문서를 찾는 조건
            {name: name, completed: completed}, // 업데이트할 내용
            {new: true} // 업데이트 후의 문서를 반환할지 여부
        )
            .then(updatedTask => {
                if (updatedTask) {
                    res.status(200).json(updatedTask);
                } else {
                    res.status(404).send('Task not found');
                }
            });

    } catch (err) {
        res.status(500).json({ error: err.message });

        // if (err.code === 'P2025') {
        //     res.status(404).send('Task not found');
        // } else {
        //     res.status(500).json({ error: err.message });
        // }


    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        // const { rowCount } = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
        //
        // if (rowCount === 0) {
        //     res.status(404).send('Task not found');
        // } else {
        //     res.status(200).send('Task deleted');
        // }

        // await prisma.task.delete({
        //     where: { id: parseInt(id) }
        // });

        Task.findOneAndDelete({_id: id}, {new: false}).then(
            deletedTask => {
                if (deletedTask) {
                    res.status(200).send('Task deleted');
                } else {
                    res.status(404).send('Task not found');
                }
            });
    } catch (err) {
        res.status(500).json({ error: err.message });

        // if (err.code === 'P2025') {
        //     res.status(404).send('Task not found');
        // } else {
        //     res.status(500).json({ error: err.message });
        // }
    }
};

const getTask = async (req, res) => {
    try {
        const { id } = req.params;
        // const { rows } = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
        // if (rows.length === 0) {
        //     res.status(404).send('Task not found');
        // } else {
        //     res.status(200).json(rows[0]);
        // }

        // const task = await prisma.task.findUnique({
        //     where: { id: parseInt(id) }
        // });
        //
        // if (!task) {
        //     res.status(404).send('Task not found');
        // } else {
        //     res.status(200).json(task);
        // }

        Task.findOne({_id:id}).then(
            foundTask=>{
                if(foundTask){
                    res.status(200).json(foundTask);
                }
                else{
                    res.status(404).send('Task not found');
                }
            }
        )

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { getAllTasks, createTask, getTask, updateTask, deleteTask};

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
