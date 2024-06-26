import React, { useEffect, useState } from 'react'
import './Card.css'


export default function Card() {
    const [cityName, setCityName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const date = new Date()
    console.log(date)
    const api = 'b12e78acc7233683cbb28f56edc816fb'



    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(cityName)
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}&units=metric`



        try {
            setData(null)
            setError(null)
            setLoading(true)
            const response = await fetch(url)
            const responseData = await response.json()

            if (response.ok) {
                setData(responseData)
                console.log(data)
            } else {
                throw new Error(responseData.message)
            }
        }
        catch (err) {
            setError(err.message)
        }
        finally {
            setLoading(false)
            setCityName('')
        }

    }
    return (
        <div className='card'>
            <h1 className='weather-title'>Weather App 🌤</h1>
            <input required
                className='search-bar'
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSubmit(e); } }}
                onChange={(e) => { setCityName(e.target.value) }}
                value={cityName}
                placeholder="Search City.."
                type="text"
                name="city"
                id="" />
            {data && (<div>
                <h2 className='location-name'>{data.name}, {data.sys.country}</h2>
                <div className='temp-icon'>
                    <img className='icon' src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
                    <h1 className='temp'>{Math.ceil(data.main.temp)}</h1>
                </div>

                <div className='desc'>
                    <p>{(data.weather[0].description).toUpperCase()}</p>
                    <p>Wind Speed: {data.wind.speed}m/s</p>
                </div>

            </div>)}
            {loading && <p>loading</p>}
            {error && <p>{error}</p>}

        </div>
    )
}
