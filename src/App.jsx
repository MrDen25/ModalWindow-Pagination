import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import axios from "axios"
import Pagination from './components/Pagination';
import ModalWindow from './components/ModalWindow/ModalWindow';

const perPage = 20

function App() {

  const [todos, setTodos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [modalWindow, setModalWindow] = useState(false)
  const [todoId, setTodoId] = useState(null)

  const lastTodosIndex = perPage * currentPage
  const firstTodosIndex = lastTodosIndex - perPage
  const currTodos = todos.slice(firstTodosIndex,lastTodosIndex)

const getPages = (totalTodos, perPage, currentPage) => {
  const totalPages = Math.ceil(totalTodos / perPage)
  const pages = []

  pages.push(1)

  if (currentPage > 2 && currentPage < totalPages - 1) {
    pages.push("...")
    pages.push(currentPage)
    pages.push("...")
  } else if (currentPage === 2) {
    pages.push(2)
    if (totalPages > 3) pages.push("...")
  } else if (currentPage === totalPages - 1) {
    if (totalPages > 3) pages.push("...")
    pages.push(totalPages - 1)
  }

  if (totalPages > 1) pages.push(totalPages)

  return pages
}
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then(response=>setTodos(response.data))
  }, [])

  const pagination = (num) => setCurrentPage(num)

  const dellTodo = (id) => {
    setTodos(prev => prev.filter(el => el.id !== id))
  }
  const switchModal = () => {
    setModalWindow(prev=>!prev)
  }
  return (
    <>
    <ul>
      {currTodos.map((el,idx) =>
        <li key={el.id}>{ firstTodosIndex + idx + 1}. {el.title}. {el.title}
          <i
            onClick={() => {
              setModalWindow(prev => !prev)
              setTodoId(el.id)
            }}

          >X</i></li>

      )}
      </ul>
      <ModalWindow
        modalWindow={modalWindow}
        dellTodo={dellTodo}
        todoId={todoId}
        switchModal={switchModal} />
      <Pagination
        totalTodos={todos.length}
        perPage={perPage}
        pagination={pagination}
        currentPage={currentPage}
        getPages={getPages} />

      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}>
        Prev
      </button>
      <button disabled={currentPage === Math.ceil(todos.length / perPage)}
        onClick={() => setCurrentPage(currentPage + 1)}>
        Next
      </button>
      </>
  )
}

export default App
