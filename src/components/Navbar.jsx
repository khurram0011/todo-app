import React from 'react'

function Navbar() {
  return (
    <nav className=' flex justify-between bg-slate-900 text-white py-2'>
       <div className='logo'>
        <span className='font-bold text-xl mx-8'> ToDo APp</span>
       </div>
       <ul className="flex gap-3 mx-10">
        <li>Home</li>
        <li>task</li>
       </ul>
    </nav>
  )
}

export default Navbar;