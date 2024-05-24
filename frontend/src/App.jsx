import { useEffect, useRef, useState } from 'react'
import './App.css'

const BASE_URL= import.meta.env.DEV ? 'http://localhost:8080/api/todos'
: "https://todos-backend-qm94.onrender.com/api/todos" 

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [todos, setTodos] = useState([]);
  //acting like query selector

  useEffect(() => {
    async function getTodos() {
      try {
        setIsLoading(true)
        const response = await fetch(BASE_URL);
        const data = await response.json();
        console.log(data)
        setTodos(data)
        // setIsLoading(false)
      } catch (error) {
        console.log(error)
      }finally{
        setIsLoading(false)
      }
    }
    getTodos()
  }, [])

  const textRef = useRef();
  const completeRef = useRef()

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      text: textRef.current.value,
      completed: completeRef.current.checked,
      user: 'bob'
    }
    // console.log(body, JSON.stringify(body))
    try {
      setIsLoading(true)
      const response = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(body), //turn object to string
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const newTodo = await response.json()
      setTodos([...todos, newTodo])
      textRef.current.value = "";
      completeRef.current.checked= false
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      // console.log("updated to false")
    }
    
    // console.log(textRef.current.value);
    // console.log(completeRef.current.checked)
  }

  async function handleDelete(id) {
try {
  setIsLoading(true)
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  })
  setTodos(todos.filter((todo)=> todo._id !== id))
} catch (error) {
  console.log(error)
}finally{
  setIsLoading(false)
}
  }

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <label>
          I want to:
          <br />
          <input type="text" ref={textRef} />
        </label>
        <label>
          <input type="checkbox" ref={completeRef} />
        </label>
        <br/><br/>
        <button>Add Todo</button>
      </form>
      <br/><br/>
        {
          isLoading ?
            <p>Loading...</p>
            :
          todos.map((todo) => 
              <p 
                style={{ textDecoration: todo.completed ? 'line-through' : '' }} 
                key={todo._id}>
                  {todo.text} 
                  <span 
                    onClick={() => handleDelete(todo._id)} 
                    style={{ marginLeft: '15px', fontWeight: '500', cursor: 'pointer' }}>
                      X
                  </span>
              </p>
          )
        }
    </>
  )
}

export default App
