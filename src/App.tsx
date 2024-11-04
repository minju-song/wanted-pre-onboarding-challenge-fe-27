import BaseLayout from './layouts/BaseLayout'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import TodoHome from './pages/TodoHome';
import TodoPage from './pages/\bTodoPage';

import './App.css'

function App() {

  return (
    <BaseLayout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/register' element={<Register/>}/>
        <Route path='/todo' element={<TodoHome />}/>
        <Route path='/todo/:id' element={<TodoPage/>}/>
      </Routes>
    </BaseLayout>
  )
}

export default App
