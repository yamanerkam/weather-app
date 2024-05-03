import React, { useEffect, useState } from 'react'
import './Card.css'


export default function Card() {
    const [cityName, setCityName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
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
            {data && <p>{data.main.temp}</p>}
            {loading && <p>loading</p>}
            {error && <p>{error}</p>}

        </div>
    )
}
