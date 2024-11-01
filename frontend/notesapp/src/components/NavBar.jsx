import React from 'react'
import { useState } from 'react'

export const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };
    
  return (
    <div>
        <nav className=" shadow text-black mb-10">
            {/* <div className='p-5 font-plight'><a href='/'>NotesApp</a></div> */}
        </nav>
    </div>
  )
}
