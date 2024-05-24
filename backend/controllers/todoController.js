import Todo from '../models/TodoModel.js';

export const getTodos = async(req, res) => {
    try {
        const todos = await Todo.find()
        res.status(200).json(todos)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

export const createTodo= async(req, res)=> {
    try {
        console.log(req.body)
       const todo = await Todo.create(req.body)
       res.status(200).json(todo)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}
// /api/todos/:id
export const deleteTodo= async(req, res)=> {
    try {
       await Todo.findByIdAndDelete(req.params.id)
       res.status(200).json({message: "Successfully Deleted"})
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}
