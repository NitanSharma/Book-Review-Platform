import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom';
import LoginUser from './pages/LoginUser';
import BookDetails from './pages/BookDetails';
import RegisterUser from './pages/RegisterUser';
import UserProfile from './pages/UserProfile';
const App = () => {

  UserProfile
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />   {/* display all books */}
        <Route path='/login' element={<LoginUser />} />
        <Route path='/register' element={<RegisterUser />} />
        <Route path='/books/:id' element={<BookDetails />} />
        <Route path='/profile' element={<UserProfile/>}/>
      </Routes>
    </div>

  )
}

export default App