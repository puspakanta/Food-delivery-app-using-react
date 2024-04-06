import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const [cookies] = useCookies(['email']);

    useEffect(() => {
        fetchMyOrder();
    }, []);

    const fetchMyOrder = () => {
        const mail = {
            email: cookies['email']
        };
        axios.post("http://127.0.0.1:5000/myorderData", mail)
            .then((res) => {
                setOrderData(res.data.order_data.reverse());
                
            })
            .catch((error) => {
                console.error("Error fetching order data:", error);
            });
    }

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? (
                        orderData.map((order, index) => (
                            <div key={index}>
                                <div className="m-auto mt-5">
                                    <h2>{order[0].Order_date}</h2>
                                    <hr />
                                </div>
                                <div className="row">
                                    {order.slice(1).map((item, i) => (
                                        <div key={i} className='col-12 col-md-6 col-lg-3'>
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                {/* <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                        <span className='m-1'>{item.qty}</span>
                                                        <span className='m-1'>{item.size}</span>
                                                        <span className='m-1'>{item.Order_date}</span>
                                                        <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                            ₹{item.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="m-auto mt-5">
                            <h2>No orders found</h2>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}
