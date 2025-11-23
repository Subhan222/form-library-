import { useState } from 'react'
import { useForm } from 'react-hook-form';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {

  const { register, handleSubmit, setError, watch, reset, formState: { errors, isSubmitting } } = useForm();

  
  const delay = (time)=>{
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve();
      }, time*1000)
    })
  }
  

  const onsubmit = async (data) => {
    

    if (data.text === data.password) {
      console.log("yes chala");
      
      setError("password", { type: "custom", message: "Password should not be same as text" });
      return;
      }

     let r = await fetch("http://localhost:5000/", {
      method: "POST",
      headers:{
        "Content-type":"application/json",
      },
      body:JSON.stringify(data)
      })

      let res = await r.text();
      console.log("Response from server:", res);

    console.log(data);
    reset({ text: "", password: "" });
  }



  return (
    <>

      <form action="" onSubmit={handleSubmit(onsubmit)}>
        {isSubmitting && <p>Form is submitting...</p>}
        <input {...register("text",
          {
            required: "This field is required",
            minLength: { value: 2, message: "Minimum length is 2" },
            maxLength: { value: 16, message: "Maximum length is 16" }

          })} />
        {errors.text && <p style={{ color: "red" }}>{errors.text.message}</p>}

        <br />
        <input placeholder='Password' {...register("password", {
          required: "Password is required",
          minLength: { value: 5, message: "Minimum length is 5" }
        })}

          type="password"
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        <input disabled={isSubmitting} type="submit" value="submit" />
      </form>
    </>
  )
}

export default App
