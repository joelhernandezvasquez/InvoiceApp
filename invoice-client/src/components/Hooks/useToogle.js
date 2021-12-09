
import {useState} from 'react';
const useToogle = ({defaultValue}) => {
    const [toggle,setToogle] = useState(defaultValue);

    const toogleValue = (value) =>{
      typeof value === 'boolean'? setToogle(value):setToogle(!toggle)
    }

    return[toggle,toogleValue];
}

export default useToogle;
