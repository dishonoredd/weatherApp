import { useRef } from "react";
import css from "/src/form/form.module.css";

type FormProps = {
  getWeatherFn: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: string) => void;
  inputVal: string;
};

export const Form = (props: FormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // const clearInput = () => {
  //   if (inputRef.current) {
  //     inputRef.current.value = "";
  //   }
  // };

  return (
    <form onSubmit={props.getWeatherFn} className={css.form}>
      <input
        className={css.input}
        type="text"
        placeholder="city"
        name="cityInput"
        // value={props.inputVal}
        ref={inputRef}
        onChange={(e) => {
          props.onChange(e.target.value);
          // clearInput();
        }}
      />
      <button className={css.btn}>Get Weather</button>
    </form>
  );
};
