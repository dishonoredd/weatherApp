import { CityObjectType } from "../App";

type WeatherProps = {
  obj: CityObjectType | undefined;
};

export const Weather = (props: WeatherProps) => {
  return (
    <>
      {props.obj && (
        <div>
          <p>Температура: {props.obj.temp}</p>
          <p>Город: {props.obj.city}</p>
          <p>Страна: {props.obj.country}</p>
          <p>Рассвет: {props.obj.sunrise}</p>
          <p>Закат: {props.obj.sunset}</p>
        </div>
      )}
    </>
  );
};
