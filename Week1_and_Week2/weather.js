let key="6c6d272fe7f0ba286c5033c7de0aab61";
let d=document.querySelector(".btn");
let inp=document.querySelector(".form-control");

document.querySelector(".needs-validation").addEventListener("submit",async(event)=>{
    try{
        event.preventDefault();
        let points=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inp.value}&limit=5&appid=${key}`); //using public api to get coordinates
        let res=await points.json(); //parsing data into json format
        let lat=res[1].lat;
        let lon=res[1].lon;
        let wea=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`) //using coordinates in map api
        let weares=await wea.json(); //parsing data into json format
        console.log(weares);
        let div=document.querySelector(".weatherpara");
        document.querySelector(".weathead").innerText=inp.value;
        div.innerHTML=` 
            <div class="card" style="width: 20rem;">
                <div class="card-body">
                    <p class="card-text">
                            <span>&#9729; Current Temparature : ${(weares.main.temp-273.15).toFixed(2)}&deg;C<br>
                            <span>&#9729; Minimum Temparature : ${(weares.main.temp_min-273.15).toFixed(2)}&deg;C<br>
                            <span>&#9729; Maximum Temperature : ${(weares.main.temp_max-273.15).toFixed(2)}&deg;C<br>
                            <span>&#9729; Feels like : ${(weares.main.feels_like-273.15).toFixed(2)}&deg;C<br>
                            <span>&#9729; Humidity : ${(weares.main.humidity)}<br>
                            <span>&#9729; Weather : ${(weares.weather[0].description)}<br></p>
                </div>
            </div>               
        `       
        
    }
    catch(e){
        document.querySelector(".weathead").innerText="";
        let div=document.querySelector(".weatherpara");
        div.innerHTML=`<h4>Cannot find city name in database</h4>`;
    }
    
});


