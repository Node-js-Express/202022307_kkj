import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Task name
 *           trim: true
 *           maxLength: 20
 *         completed:
 *           type: boolean
 *           description: Task completion status
 *           default: false
 */

// const TaskSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'must provide name'],
//     trim: true,
//     maxlength: [20, 'name can not be more than 20 characters'],
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
// })

// module.exports = mongoose.model('Task', TaskSchema)

const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 20 },
    completed: { type: Boolean, default: false },
});

export default mongoose.model("Task", TaskSchema);
