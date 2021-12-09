import React from 'react';
import { BsFillPersonFill } from 'react-icons/bs'

const RenderAvatar = ({avatar}) => {
    return (
        <>
         {avatar?<img src={avatar} alt='avatar' />:<BsFillPersonFill className='icon' />}   
        </>
    )
}

export default RenderAvatar;
