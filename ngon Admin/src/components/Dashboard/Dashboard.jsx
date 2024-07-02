import React from 'react'
import Header from '../Header/Header'
import Total from './Total'
import BarChartComponent from './BarChartComponent'
import Top10Table from './Top10Table'

const Dashboard = () => {
  
  return (
    <div className='container'>
      <Header />
      <Total />
      <div className="table-container">
        <div className="chart">
          <BarChartComponent  />
        </div>
        <div className="table">
          <Top10Table />
        </div>
      </div>
    </div>
  )
}

export default Dashboard