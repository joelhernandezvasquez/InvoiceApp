import React, { useEffect } from 'react'
import MenuDashboard from './MenuDashboard'
import LogoInvoicely from './LogoInvoicely'
import ProfileUser from './ProfileUser'
import UseScreenSize from '../Hooks/UseScreenSize'
import { Link } from 'react-router-dom'
import { BsFileEarmarkPlus } from 'react-icons/bs'

const DashboardHeader = ({ currentLocation }) => {
  const viewportWidth = UseScreenSize()

  const renderCreateInvoiceBtn = () => {
    return (
      <Link to='/' className='btn-create-invoice'>
        <BsFileEarmarkPlus id='plus-invoice-icon' />
        <span>New Invoices</span>
      </Link>
    )
  }
  return (
    <div className='dashboard-header'>
      <div className='container'>
        <div className='test'>
          {viewportWidth < 1280 ? <MenuDashboard /> : ''}
          {viewportWidth >= 767 ? (
            <h2 id='route-title'>{currentLocation}</h2>
          ) : (
            ''
          )}
        </div>

        {viewportWidth < 767 ? <LogoInvoicely /> : ''}
        {viewportWidth > 767 ? renderCreateInvoiceBtn() : ''}

        <ProfileUser />
      </div>
    </div>
  )
}

export default DashboardHeader;
