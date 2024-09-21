import React from 'react'
import NavBar from './NavBar'
import FetchTransaction from './FetchTransaction'

function UserLayout() {
  const currentUser=JSON.parse(localStorage.getItem("TransactionUser"));
  return (
    <>
    <NavBar/>
    <div className='mt-5 p-4'>
        <h4 className='mb-3 mt-2'>Welcome {currentUser.username}!</h4>
        <FetchTransaction/>
        
    </div>
    </>
    
  )
}

export default UserLayout