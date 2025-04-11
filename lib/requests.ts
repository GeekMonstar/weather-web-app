export async function getCityByCoordinates(lon: number, lat: number){
    try{
        const req = await fetch(`${process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`);
        if(req.ok){
            const res = await req.json();
            return res;
        }else{
            throw new Error("Impossible d'obtenir les données.")
        }
    }catch(error){
        console.log((error as Error).message);
    }
}

export async function getWeather(lon: number, lat: number): Promise<WeatherDataInterFace>{
    try{
        const req = await fetch(`${process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric&lang=fr`);
        console.log(req);
        if(req.ok){
            const res = await req.json();
            console.log(res);
            return res as WeatherDataInterFace
        }
        throw new Error("Impossible d'obtenir les données.")
    }catch(error){
        throw error
    }
}

export interface CityObject {
  country: string,
  lon: number,
  lat: number,
  name: string,
  state: string
}

export interface WeatherObject {
  city: {
    name: string,
    coordinates: {
      lon: number,
      lat: number
    }
  },
  weather: WeatherDataInterFace
}

export interface WeatherDataInterFace {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: CurrentWeather;
    minutely: MinutelyForecast[];
    hourly: HourlyForecast[];
    daily: DailyForecast[];
    alerts?: Alert[];
  }

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  interface Temperature {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  }
  
  interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
  }
  
  interface DailyForecast {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    summary: string;
    temp: Temperature;
    feels_like: FeelsLike;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    clouds: number;
    pop: number;
    rain?: number;
    uvi: number;
  }
  
  interface HourlyForecast {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    pop: number;
  }
  
  interface MinutelyForecast {
    dt: number;
    precipitation: number;
  }
  
  interface CurrentWeather {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
  }
  
  interface Alert {
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
    tags: string[];
  }
  

