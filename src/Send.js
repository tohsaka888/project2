import React from 'react';

const Send = ({str, setStr, str1, setStr1}) => {
    return (
        <div>
          <input onChange={(event)=>{setStr1(event.target.value)}}/>
          <button onClick={()=>{setStr([...str,str1])}}>click me</button>
        </div>
    );
};

export default Send;
