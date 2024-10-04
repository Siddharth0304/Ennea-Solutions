import Count from "./Count"
import Button from "./Button"
import Title from "./Title"
import { useCallback, useState } from "react"

export default function ParentComponent() {
    const [age,setAge]=useState(25);
    const [salary,setSalary]=useState(50000);

    const incAge=useCallback(()=>{
        setAge((preAge)=>preAge+1);
    },[age]);

    const incSal=useCallback(()=>{
        setSalary((preSal)=>preSal+1000);
    },[salary]);

  return (
    <div>
      <Title/>
      <Count text="Age" count={age} />
      <Button handleClick={incAge}>Increment Age</Button><br /><br />
      <Count text="Salary" count={salary} />
      <Button handleClick={incSal}>Increment Salary</Button><br />
    </div>
  )
}
