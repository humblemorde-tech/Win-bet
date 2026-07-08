'use client'
import { useState } from 'react'

export default function Login() {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState(1)

  const sendOTP = async () => {
    await fetch('/api/auth/send-otp', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ phone }) })
    setStep(2)
    alert("Check Vercel Logs for OTP code for now")
  }

  const verifyOTP = async () => {
    const res = await fetch('/api/auth/verify-otp', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ phone, code }) })
    const data = await res.json()
    if(data.token){
      localStorage.setItem('token', data.token)
      window.location.href = '/dashboard'
    } else {
      alert(data.error)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-10 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold">WINBET Login</h1>
      <input placeholder="07XXXXXXXX" value={phone} onChange={e => setPhone(e.target.value)} className="border p-2 text-black rounded"/>
      {step === 1 && <button onClick={sendOTP} className="bg-green-600 text-white p-2 rounded">Send OTP</button>}
      {step === 2 && <>
        <input placeholder="Enter 6 digit code" value={code} onChange={e => setCode(e.target.value)} className="border p-2 text-black rounded"/>
        <button onClick={verifyOTP} className="bg-green-600 text-white p-2 rounded">Verify</button>
      </>}
    </div>
  )
}
