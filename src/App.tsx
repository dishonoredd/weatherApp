import "./App.css";

import { Form } from "./form/fomr";
import { useState } from "react";
import { Weather } from "./weather/weather";
import css from "/src/app.module.css";

const API_KEY = "972378369e2ae98bb973947416392c82";

export type CityObjectType = {
  temp: number;
  city: string;
  country: string;
  sunrise: string;
  sunset: string;
};

function App() {
  const [city, setCity] = useState("");
  const [cityObject, setCityObject] = useState<CityObjectType | undefined>(
    undefined
  );
  const [error, setError] = useState("");

  const getWeather = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.message);
      }
      console.log(data);

      const getSunTime = (phenomenonTime: number) => {
        let phenomenon = phenomenonTime * 1000;
        let date = new Date();
        date.setTime(phenomenon);
        return String(date.getHours()) + ":" + String(date.getMinutes());
      };

      setCityObject({
        ...cityObject,
        temp: Math.floor(data.main.temp),
        city: data.name,
        country: data.sys.country,
        sunrise: getSunTime(data.sys.sunrise),
        sunset: getSunTime(data.sys.sunset),
      });
    } catch (error) {
      setError((error as Error).message);
    }
  };

  console.log(cityObject);

  return (
    <div className={css.main}>
      <div className={css.window}>
        <Form
          getWeatherFn={getWeather}
          inputVal={city}
          onChange={(x) => {
            setCity(x);
          }}
        />
        {error ? <p>{error}</p> : <Weather obj={cityObject} />}
      </div>
    </div>
  );
}

export default App;
