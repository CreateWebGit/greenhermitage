'use client'
import React, { createContext, useState } from 'react'

export const Message_data = createContext('sv')

function Context({ children }) {
  const [inLanguage, setLanguage] = useState('sv')

  return (
    <Message_data.Provider value={{ inLanguage, setLanguage }}>{children}</Message_data.Provider>
  )
}

export default Context
