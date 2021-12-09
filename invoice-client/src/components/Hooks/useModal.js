import {useState} from 'react';

const useModal = (defaultValue) => {
   
    const [isOpen,setIsOpen] = useState(defaultValue);

    const openModal = () =>{
        setIsOpen(true);
    }

    const closeModal = () =>{
        setIsOpen(false);
    }

    return [isOpen,openModal,closeModal];
}

export default useModal;
