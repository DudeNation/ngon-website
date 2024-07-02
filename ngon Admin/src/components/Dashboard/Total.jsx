import React, {useEffect, useState} from 'react'
import dashboardApi from '../../api/dashboardApi'

const Total = () => {
    const [Orders, setOrders] = useState(0);
    const [Sold, setSold] = useState(0);
    const [Revenue, setRevenue] = useState(0);
    const [Customer, setCustomer] = useState(0);

    useEffect(() => {
        const getTotal = async () => {
            try {
                const response = await dashboardApi.getTotal();
                setOrders(response.data.totalOrders);
                setSold(response.data.totalSold);
                setRevenue(response.data.totalRevenue);
                setCustomer(response.data.totalCustomers);
            } catch (error) {
                console.error(error);
            }
        }
        getTotal();
    }, [])

  return (
    <div className="dashboard-body">
    <div class="dashboard-main">
        <div class="dashboard">
            <div class="card">
                <div class="content">
                    <div class="text">
                        <h2>Total Orders</h2>
                        <p>{Orders}</p>
                    </div>
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/></svg>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="content">
                    <div class="text">
                        <h2>Total Items</h2>
                        <p>{Sold}</p>
                    </div>
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 20v-8H3.3L12 2v8h8.7L12 20z"/></svg>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="content">
                    <div class="text">
                        <h2>Total Revenue</h2>
                        <p>{Revenue}k</p>
                    </div>
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M7 10h5V5H7v5zM7 19h5v-5H7v5zm7-9h5V5h-5v5zm0 9h5v-5h-5v5z"/></svg>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="content">
                    <div class="text">
                        <h2>Total Customer</h2>
                        <p>{Customer}</p>
                    </div>
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 12c2.66 0 8 1.34 8 4v3H4v-3c0-2.66 5.34-4 8-4zm0-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/></svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Total