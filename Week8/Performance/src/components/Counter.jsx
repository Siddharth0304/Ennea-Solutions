import React, { useMemo, useState } from 'react'

export default function Counter() {
    const [counterOne,setCounterOne]=useState(0);
    const [counterTwo,setCounterTwo]=useState(0);
    
    const incCounterOne=()=>{
        setCounterOne((preCount)=>preCount+1);
    }

    const incCounterTwo=()=>{
        setCounterTwo((preCount)=>preCount+1);
    }

    const isEven=useMemo(()=>{
        let i=0;
        while(i<1000000000) i++
        return counterOne%2==0;
    },[counterOne])

  return (
    <div>
        <div>
            <button onClick={incCounterOne} >Count One - {counterOne}</button> &nbsp; &nbsp;
            <span>{isEven?"Even":"Odd"}</span>
        </div>
        <br />
        <div>
            <button onClick={incCounterTwo}>Count Two - {counterTwo}</button>
        </div>
    </div>
  )
}
