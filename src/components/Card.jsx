import React from 'react'
import './Card.css'


export default function Card() {
    return (
        <div className='card'>
            <h1>Weather App🌤
            </h1>
            <input className='search-bar' placeholder="Search City.." type="text" name="" id="" />

            <div className="weather-content">
                <h2 className='city'></h2>
                <span className='date'></span>
                <img className='icon' src="" alt="" />
                <span></span>
                <span></span>
            </div>
        </div>
    )
}
