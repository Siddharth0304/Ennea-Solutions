let p=document.querySelector(".dogpic");
let url="https://dog.ceo/api/breeds/image/random"; //using public api
document.querySelector(".btn").addEventListener("click",async()=>{
    try{
        let jsonres=await fetch(url); //using await to stop execution till response from api
        let res=await jsonres.json(); //parsing data into json format
        p.src=res.message;
        
    }
    catch(e){
        p.style.display="none";
        let pa=document.querySelector(".doggo p");
        pa.innerText="Cannot fetch the database, please try again.";
        pa.style.color="beige";
    }      
})
