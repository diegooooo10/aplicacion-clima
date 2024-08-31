import { useState } from "react";

export const WheatherApp = () => {

  const urlBase = `https://api.openweathermap.org/data/2.5/weather`
  const API_KEY = '5f5a0f9d9afc1c6d402989e23b8f6b31'
  const [ciudad, setCiudad] = useState('')
  const [dataClima, setDataClima] = useState(null)
  const difKelvin = 273.15

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value)
  
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(ciudad.length > 0) fetchClima()
  }
  
  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
      const data = await response.json()
      setDataClima(data)
    } catch(error) {
      console.log('Sucedio un error ' + error)
    }
  }

  return (
    <>
      <div className="container">

        <h1>Aplicacion de clima</h1>

        <form onSubmit={handleSubmit}>

          <input 
          type="text" 
          value= {ciudad}
          onChange = {handleCambioCiudad}
          />

          <button 
          type="submit">
            Buscar
          </button>

        </form>
        {
          dataClima && (
            <div>
              <h2>{dataClima.name}</h2>
              <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°C</p>
              <p>Humedad: {dataClima?.main?.humidity}%</p>
              <p>Velocidad del viento: {dataClima?.wind?.speed} m/s</p>
              <p>Condición Metereologica: {dataClima.weather[0].description}</p>
              <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}.png`} alt="" />
            </div>
          )
        }
      </div>
    </>
  );
};
