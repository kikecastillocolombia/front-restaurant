
import React from 'react'

interface CustomSelectProps {
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
  className?: string
  children: React.ReactNode
}

export function CustomSelect({
  id,
  name,
  value,
  onChange,
  required = false,
  className = '',
  children,
}: CustomSelectProps) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={className}
    >
      {children}
    </select>
  )
}
