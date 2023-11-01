import express from 'express';
import tasksRouter from './routes/tasks.js';
 // import pool from './db/connect.js'
import connectDB from './db/connect.js'
import {createSchema} from './models/Task.js';
import {swaggerUi,specs}  from './swagger.js';

const app = express();

// Middleware
app.use(express.static('./public'));
app.use(express.json());
// Route
app.use('/api/v1/tasks', tasksRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

const port = process.env.PORT || 3001;

const start = async() => {
  try {
    // pool.on('connect', () => {
    //   console.log('PostgreSQL에 연결되었습니다.');
    // });

    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });

    createSchema()
    .then(() => {
      console.log('스키마 생성이 완료되었습니다.');
    })
    .catch((err) => {
      console.error('스키마 생성 오류:', err);
    });

  }
  catch (error) {
    console.log(error)
    // pool.on('error',(err)=>{
    //   console.error('PostgreSQL 연결 에러:', err);
    // })
  }
};

start();




