import { useState,useEffect } from "react";


const UseLocalStorage = (key,defaultValues)=>{
  
    const [values,setValues] = useState({defaultValues})

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify({ values }))
      }, [values])

      const getLocalStorageData = (key) =>{
          const data = JSON.parse(localStorage.getItem(key));
          return data;
      }
}

export default UseLocalStorage;