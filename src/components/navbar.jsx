import React from 'react'

const navbar = () => {
  return (
    <nav className='flex justify-between bg-zinc-700 text-white py-3 hover:bg-zinc-800 transition-colors duration-900 ease-out'>
        <div className="logo mx-9">
            <span className="font-extrabold text-xl">WTask</span>
        </div>
        <ul className='flex gap-8 mx-9 font-semibold'>
            <li className='cursor-pointer hover:text-yellow-200 transition-colors duration-500 ease-in-out hover:underline hover:font-bold'>Your tasks</li>
            <li className='cursor-pointer hover:text-yellow-200 transition-colors duration-500 ease-in-out hover:underline hover:font-bold'>Home</li>
            {/* <li>Home</li> */}
        </ul>
    </nav>
    
  )
}

export default navbar