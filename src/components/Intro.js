import React from 'react'
import { Link } from 'react-router-dom'
const Intro = () => {
  return (
    <div className="max-w-xl mx-auto text-center p-6 rounded-lg shadow-md bg-gray-100 mt-24">
    <h1 className="text-blue-600 text-2xl font-bold mb-4">Nice! We've assigned you the number (205) 433-2756.</h1>
    <p className="text-gray-700 mb-3">
     You can always Change it later
    </p>
   <Link to ='/lastthing'>
    <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition">
      Start my free Trial
    </button>
    </Link>
  </div>
  )
}

export default Intro
