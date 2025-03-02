import { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";


export function Card(props) {
    let dispatch=useDispatchCart();
    let data=useCart();
    const priceRef=useRef();
    let options=props.options;
    let priceOPtions=Object.keys(options);
    const[qty,setQty]= useState(1);
    const[size,setSize]=useState('');
    const handleAddToCart=async()=>{
        let food=[];
        for(const item of data){
            if(item.id===props.foodItem._id){
                food=item;
                break;
            }
        }
        if(food!=[]){
            if(food.size===size){
                await dispatch({type:'UPDATE',id:props.foodItem._id,price:finalPrice,qty:qty})
                return;
            }
            else if(food.size!==size){
                await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name, price:finalPrice,qty:qty,size:size});
                //console.log(data)
                return;
            }
            return;
        }
        await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name, price:finalPrice,qty:qty,size:size});
      
        
    }
    let finalPrice=qty * parseInt(options[size]);
    useEffect(()=>{
        
        setSize(priceRef.current.value)
    },[])
    return (
        <div>
            <div>
                <div className="card mt-3 p-2" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{"maxHeight":"145px"}} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className="container w-100">
                            <select className="m-2 h-100 bg-success rounded" onChange={(e)=>setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className="m-2 h-100  bg-success rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                               {
                                priceOPtions.map((data)=>{
                                    return <option key={data} value={data}>{data}</option>
                                })
                               }
                            </select>
                            <div className="d-inline fs-5 h-100">
                            {isNaN(finalPrice) ? 'Price not available' : finalPrice}
                            </div>
                        </div>
                        <hr/>
                        <button className="btn btn-success justify-content-center ms-2" onClick={handleAddToCart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
