import React from 'react'
import { HeaderNav } from './HeaderNav'

export const Layout = ({children}) => {
  return (
    <>
    <HeaderNav/>
    {children}
    </>
    
  )
}
