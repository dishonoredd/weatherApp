import { CityObjectType } from "../App";

type WeatherProps = {
  obj: CityObjectType;
  city: string;
};

export const Weather = (props: WeatherProps) => {
  return (
    <>
      wefwefwefwefewfwef
      {props.city && (
        <div>
          <p>Температура: {props.obj.temp}</p>
          <p>Город: {props.obj.city}</p>
          <p>Страна: {props.obj.country}</p>
          <p>Рассвет: {props.obj.sunrise}</p>
          <p>Закат: {props.obj.sunset}</p>
        </div>
      )}
      <p>{props.obj.error}</p>
    </>
  );
};
