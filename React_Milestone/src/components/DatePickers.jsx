import React, { useState } from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';
import styled from 'styled-components';

const Div = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-wrap:wrap;
`;

export default function DatePickers() {
    

    const [start,setStart]=useState(moment().subtract(7,'days'));
    const onChange=(date,dateString) => {
        setStart(date);
    }
    const disabledEndDate=(current)=>{
        return current && current<start
    }
    return (
    <div>
        {/* Default value must be given in moment.js format */}
        <Div>
            <div style={{padding:"1%"}}>
                <label>Enter Start Date : </label>
                <DatePicker id='startDate' onChange={onChange} format={"DD-MM-YYYY"} placeholder='DD-MM-YYYY' defaultValue={start} needConfirm/>  
            </div>
            <div style={{padding:"1%"}}>
                <label>Enter End Date : </label>
                <DatePicker id='endDate' format={"DD-MM-YYYY"} placeholder='DD-MM-YYYY' defaultValue={moment()} disabledDate={disabledEndDate} needConfirm/>
            </div>
        </Div>
    </div>
  )
}
