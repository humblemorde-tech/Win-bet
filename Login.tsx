'use client'
import { useState } from 'react'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [step, setStep] = useState(1)
  const [code, setCode] = useState('')

  const sendOTP = async () => {
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone })
    })
    if(res.ok) setStep(2)
    else alert('Failed to send OTP')
  }

  const verifyOTP = async () => {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, code })
    })
    const data = await res.json()
    if(data.token) {
      localStorage.setItem('token', data.token)
      window.location.href = '/dashboard'
    } else alert('Wrong code')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-80">
        <h1 className="text-2xl font-bold mb-4">WINBET</h1>
        {step === 1 ? (
          <>
            <input 
              type="tel" 
              placeholder="07xxxxxxxx" 
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full p-2 mb-2 bg-gray-800 rounded"
            />
            <button onClick={sendOTP} className="w-full bg-green-600 p-2 rounded">Send OTP</button>
          </>
        ) : (
          <>
            <input 
              type="text" 
              placeholder="123456" 
              value={code}
              onChange={e => setCode(e.target.value)}
              className="w-full p-2 mb-2 bg-gray-800 rounded"
            />
            <button onClick={verifyOTP} className="w-full bg-green-600 p-2 rounded">Verify</button>
          </>
        )}
      </div>
    </div>
  )
}
