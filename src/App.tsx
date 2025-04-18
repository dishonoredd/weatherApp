import "./App.css";

import { Form } from "./form/fomr";
import { useState } from "react";
import { Weather } from "./weather/weather";
import css from "/src/app.module.css";

const API_KEY = "972378369e2ae98bb973947416392c82";

export type CityObjectType = {
  temp: number | undefined;
  city: string | undefined;
  country: string | undefined;
  sunrise: string | undefined;
  sunset: string | undefined;
  error: string | undefined;
};

function App() {
  const [city, setCity] = useState("");
  const [cityObject, setCityObject] = useState<CityObjectType>({
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined,
  });

  const getWeather = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city) {
      const apiUrl = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await apiUrl.json();

      const getSunTime = (phenomenonTime: number) => {
        let phenomenon = phenomenonTime;
        let date = new Date();
        date.setTime(phenomenon);
        let sunsetTime =
          String(date.getHours()) + ":" + String(date.getMinutes());
        return sunsetTime;
      };

      setCityObject({
        ...cityObject,
        temp: Math.floor(data.main.temp),
        city: data.name,
        country: data.sys.country,
        sunrise: getSunTime(data.sys.sunrise),
        sunset: getSunTime(data.sys.sunset),
        error: undefined,
      });
    } else {
      setCityObject({
        ...cityObject,
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: "Введите город",
      });
    }
  };

  return (
    <div className={css.main}>
      <div className={css.window}>
        <Form
          getWeatherFn={getWeather}
          inputVal={city}
          onChange={(x) => {
            if (!x) return;
            setCity(x);
          }}
        />
        <Weather obj={cityObject} city={city} />
      </div>
    </div>
  );
}

export default App;
