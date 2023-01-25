import { Routes, Route, Link } from 'react-router-dom'

import {CreateNewList, Home }from './pages'
import { logo } from './assets'

function App() {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-[#bee3ff] min-h-screen">
      <header className="bg-teal-600 w-full p-2 rounded-sm">
        <nav className="flex flex-row justify-between items-center">
          <Link to="/">
            <img src={logo} alt="" className="w-20" />
          </Link>

          <h1 className="font-bold font-montserrat capitalize text-xl text-white">
            shopping List App
          </h1>
          <Link to="/create-new-list">
            <span className="text-lg bg-slate-500 hover:bg-stone-300/60 p-2 rounded-l-md shadow-md hover:text-white text-zinc-300 duration-75 transition-all ease-linear">
              Create New List
            </span>
          </Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-new-list" element={<CreateNewList />} />
      </Routes>
    </div>
  )
}

export default App
