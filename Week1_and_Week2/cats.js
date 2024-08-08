let p=document.querySelector(".catpara");
let url="https://catfact.ninja/fact"; //using public api
document.querySelector(".btn").addEventListener("click",async()=>{
    try{
        let jsonres=await fetch(url); //using await to stop execution till response from api
        let res=await jsonres.json(); //parsing data into json format
        console.log(res);
        p.innerText=res.fact;
    }
    catch(e){
        p.innerText="Cannot fetch the database, please try again.";
    }      
})
