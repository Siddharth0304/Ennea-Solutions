let p=document.querySelector(".dadpara");
let url="https://icanhazdadjoke.com/"; //using public api
document.querySelector(".jokeanc").addEventListener("click",async()=>{
    let config={headers:{
        Accept:"application/json",
    }};
    try{
        let jsonres=await fetch(url,config); //using await to stop execution till response from api
        let res=await jsonres.json(); //parsing data into json format
        console.log(res);
        p.innerText=res.joke;
    }
    catch(e){
        p.innerText="Cannot fetch the database, please try again.";
    }      
})
