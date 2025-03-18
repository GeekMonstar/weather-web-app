"use client";
import { getCityByCoordinates, getWeather, WeatherDataInterFace } from "@/lib/requests";
import { daysArray } from "@/lib/utils";
import {useState, useEffect} from "react";

export default function Home() {
  const [city, setCity] = useState();
  const [weather, setWeather] = useState<WeatherDataInterFace | null>(null);
  const [position, setPosition] = useState({
    lon: 0,
    lat: 0
  })
  useEffect(()=>{
    document.body.style.background = "skyblue";
    document.body.style.color = "#FFF";
    navigator.geolocation.getCurrentPosition((currentPosition)=>{
      console.log(currentPosition);
      setPosition({
        lon: currentPosition.coords.longitude,
        lat: currentPosition.coords.latitude
      })
      console.log("position:",position)
    });
  },[])

  useEffect(()=>{
    getCityByCoordinates(position.lon,position.lat)
      .then(data =>{
        console.log(data)
        setCity(data[0])
      })
    getWeather(position.lon, position.lat)
      .then(data=>{
        console.log("data:", data)
        setWeather(data)
      })
  }, [position]);

  useEffect(()=>{
    console.log("weather:",weather)
  }, [weather]);
  return (
    <div className="">
      <div className="z-[-1] fixed w-screen h-full left-0 top-0">
          {weather && <img className="w-full h-full object-cover" src={`/backgrounds/${weather.current.weather[0].icon}.jpg`}></img>}
        </div>
      <main className="z-10 bg-[#0006]">
        <section className="min-h-screen h-full max-w-full max-xl:flex max-xl:flex-col xl:grid lg:grid-cols-2 gap-2 items-center">
              <>
                <div className="flex flex-col items-center">
                  {city ? <p className="text-[2rem]">{city.name}</p>: <div className="w-32 h-8 bg-gray-100 rounded"></div>}
                  <p className="text-[5rem] text-align-right">{weather ? Math.round(weather.current.temp) : "--"}°</p>
                  <div className="w-[96px] h-[96px]">
                    {weather ?<img className="w-full h-full" src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt="weather icon" /> : ""}
                  </div>
                  <p>{weather && weather.current.weather[0].description}</p>
                </div>
                <div className="max-w-screen p-4">
                <div className="w-full p-4 mb-4 bg-[#FFF3] backdrop-blur-xl rounded-xl">
                  <h2 className="mb-2 text-lg font-semibold">Prévisions par heures</h2>
                  <div className="w-full overflow-x-scroll">
                    <div className="w-fit flex gap-4">
                      {weather && weather.hourly.map((hour, index) => {
                        const date = new Date(hour.dt * 1000)
                        return (<div className="w-fit flex flex-col items-center" key={hour.dt}>
                          <p>{index === 0 ? "Maint.": `${date.getHours()}h`}</p>
                          <div className="w-[64px] h-[64px]">
                            <img className="w-full h-full" src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}/>
                          </div>
                          <p>{Math.round(hour.temp)}°</p>
                        </div>)
                      })}
                    </div>
                  </div>
                </div>
                <div className="w-full p-4 mb-4 bg-[#FFF3] backdrop-blur-xl rounded-xl">
                      <h2 className="mb-2 text-lg font-semibold">Prévisions sur 1 semaine</h2>
                      <div>
                        {weather && weather.daily.map((day, index)=>{
                          const date = new Date(day.dt * 1000);
                          return (
                            <div key={day.dt} className="flex justify-between border-t">
                              <div className="flex gap-2 items-center">
                              <p>{index === 0 ? "Auj." : daysArray[date.getDay()]}</p>
                              <div className="w-[42px] h-[42px]">
                                <img className="w-full h-full" src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="weather icon" />
                              </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <p className="w-4">{Math.round(day.temp.min)}°</p>
                                <div className="w-32 h-2 bg-white rounded-xl"></div>
                                <p className="w-2">{Math.round(day.temp.max)}°</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                  </div>
                  <div className="w-full flex gap-4">
                    <div className="w-full flex flex-col items-center justify-center bg-[#FFF3] backdrop-blur-xl rounded-xl p-4">
                      <h2>Levé du soleil</h2>
                      <svg className="w-[64px] h-[64px]" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-760v-80h120v80H120Zm125 213-57-56 85-85 57 56-85 85Zm235-93q-83 0-141.5-58.5T280-840h80q0 50 35 85t85 35q50 0 85-35t35-85h80q0 83-58.5 141.5T480-640Zm0-200Zm-40 360v-120h80v120h-80Zm275-67-84-85 56-56 85 84-57 57Zm5-213v-80h120v80H720ZM80-120v-80q38 0 56.5-20t77.5-20q59 0 77.5 20t54.5 20q38 0 56.5-20t77.5-20q57 0 77.5 20t56.5 20q38 0 55.5-20t76.5-20q59 0 77.5 20t56.5 20v80q-57 0-77.5-20T746-160q-36 0-54.5 20T614-120q-57 0-77.5-20T480-160q-38 0-56.5 20T346-120q-59 0-76.5-20T214-160q-38 0-56.5 20T80-120Zm0-160v-80q38 0 56.5-20t77.5-20q57 0 76.5 20t55.5 20q38 0 56.5-20t77.5-20q57 0 77 20t55 20q38 0 56.5-20t77.5-20q57 0 77.5 20t56.5 20v80q-59 0-78.5-20T746-320q-36 0-54.5 20T614-280q-57 0-77.5-20T480-320q-38 0-55.5 20T348-280q-59 0-78.5-20T214-320q-36 0-56.5 20T80-280Z"/></svg>
                      <p>{weather && `${new Date(weather.current.sunrise * 1000).getHours()}:${new Date(weather.current.sunrise * 1000).getMinutes()}`}</p>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center bg-[#FFF3] backdrop-blur-xl rounded-xl p-4">
                      <h2>Couché du soleil</h2>
                      <svg className="w-[64px] h-[64px]" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m734-556-56-58 86-84 56 56-86 86ZM80-160v-80h800v80H80Zm360-520v-120h80v120h-80ZM226-558l-84-86 56-56 86 86-58 56Zm71 158h366q-23-54-72-87t-111-33q-62 0-111 33t-72 87Zm-97 80q0-117 81.5-198.5T480-600q117 0 198.5 81.5T760-320H200Zm280-80Z"/></svg>                      
                      <p>{weather && `${new Date(weather.current.sunset * 1000).getHours()}:${new Date(weather.current.sunset * 1000).getMinutes()}`}</p>
                    </div>
                  </div>
                </div>
              </>
        </section>
      </main>
    </div>
  );
}
