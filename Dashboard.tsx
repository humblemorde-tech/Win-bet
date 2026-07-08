'use client'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) window.location.href = '/login'
    // TODO: fetch user balance
  }, [])

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Balance: KES {balance}</p>
      <button className="bg-green-600 p-2 mt-4 rounded">Play Crash</button>
    </div>
  )
}
