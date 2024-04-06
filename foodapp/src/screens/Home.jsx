import { useEffect, useState } from "react";
import { Card } from "../components/Cards";
import { Carousal } from "../components/Carousal";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import axios from "axios";



export function Home() {
    const [foodcat, setFoodcat] = useState([]);
    const [foodItem, setFooditem] = useState([]);
    const [search, setSearch] = useState('');

    const loadData = () => {
        axios.get('http://127.0.0.1:5000/fooditems')
            .then(res => {
                setFooditem(res.data[0]);
                setFoodcat(res.data[1]);
            })
    }




    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}  />
                                {/* <button className="btn btn-outline-success text-white" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?momos" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="container">
                {
                    foodcat.length > 0 
                        ? foodcat.map((data) => {
                            return (
                                <div key={data._id} className="row mb-3">
                                    <div className="fs-3 m-3">{data.CategoryName}</div>
                                    <hr />
                                    {foodItem.length>0 ? foodItem.filter((item) => (data.CategoryName === item.CategoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div className="col-12 col-md-6 col-lg-4" key={filterItems._id}>
                                                    <Card foodItem={filterItems}  options={filterItems.options[0]} />
                                                </div>
                                            )
                                        })
                                        : <div>no such data found</div>}
                                </div>
                            )
                        }) : ""
                }

            </div>
            <div><Footer /></div>

        </>
    )
}