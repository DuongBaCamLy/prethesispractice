import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from './component/layout/header.jsx'



function App() {
useEffect(() => {
  const fetchHelloWorld = async () => {
    try {
      const res = await axios.get('/v1/api')
      console.log('>>> check res', res)
    } catch (err) {
      console.error('API error:', err)
    }
  }
  fetchHelloWorld()   // gọi đúng hàm vừa định nghĩa
}, [])
  return (
    <>
      <Header />   {/* ✅ dùng component viết hoa, không phải <header/> */}
      <Outlet />
    </>

  )
}

export default App
