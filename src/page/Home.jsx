import React from 'react'
import FetchData from '../FetchData';
import Example from '../Modal';
const Home = () => {
  return (
    <div>
        <h1 className='bg-primary text-light text-center p-3'>Welcome to my Blogg</h1>
        <FetchData/>
        <Example/>
    </div>
  )
}

export default Home