import express from 'express'

import cors from 'cors'
import 'dotenv/config'

import mongoConfig from './config.js'
// import Todo from './models/TodoModel.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express()

const port = 8080

app.use(cors())
app.use(express.json());

app.use("/api/todos", todoRoutes)

app.get('/', (req, res) => {
    res.json('Hello! (from Server)')
})
//added after model creation
//moved to todoController
// app.get("/api/todos", async(req, res) => {
//     try {
//         const todos = await Todo.find({})
//         res.status(200).json(todos)
//     } catch (error) {
//         console.log(error)
//         res.status(400).json(error)
//     }
// })

app.listen(port, () => {
    console.log('Listening on port: ' + port)
    mongoConfig()
})