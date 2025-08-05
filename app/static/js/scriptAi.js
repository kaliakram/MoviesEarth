let stop=false;
function typer(){
    let text="AI Recommendation";
    let element=document.querySelector("h1");
    let index=0;
    let speed=50;
    function writechar(){
        if(index<text.length){
            element.textContent+=text[index];
            index++;
            setTimeout(writechar,speed);
        }
    }
    writechar();
}
function waitingtyper(){
    let para=document.querySelector("#popover-content > p");
    let i=0;
    let speed=350;
    function type(){
        if(para.textContent.length==0){
            para.textContent="ai is recommending for you";
        }
        if(stop){ 
            para.textContent=""
            return;}
        if(i<5){
            para.textContent+='.';
            i++;
            setTimeout(type,speed);
        }
        else{
            i=0;
            para.textContent="ai is recommending for you";
            setTimeout(type,speed);
        }
    }
        type();
    
}
document.addEventListener("DOMContentLoaded",()=>{
    typer();
    let genres=[];
    let suggmovies=[];
    let button=document.getElementById("button");
    let popovercont=document.getElementById("popover-container");
    let exitIcon=document.getElementById("exit");
    let genres_wrapper=document.getElementById("chose-from");
    let suggested_movies_wrapper=document.getElementById("chooose");
    genres_wrapper.addEventListener("click",(event)=>{
        let target=event.target.closest(".genre");
        if (!target || !genres_wrapper.contains(target)) return ;
        if(target.children[0].classList.contains("selected")){
            genres=genres.filter(elem=>elem!=target.children[1].textContent);
            target.children[0].classList.remove("selected");
        }
        else{
            genres.push(target.children[1].textContent);
            target.children[0].classList.add("selected");
        }
        })
  suggested_movies_wrapper.addEventListener("click",(event)=>{
    let target=event.target.closest(".movieSug");
    if(!target || !suggested_movies_wrapper.contains(target)){
        return;
    }
    if(target.children[0].classList.contains("select")){
        suggmovies=suggmovies.filter(elem=>elem!=target.children[1].textContent);
        target.children[0].classList.remove("select");
    }
    else{
        suggmovies.push(target.children[1].textContent);
        target.children[0].classList.add("select");

        
    }
  })
    button.addEventListener("click",()=>{
        if(!genres.length && !suggmovies.length){
            alert("you should choose at least a category or a preffered movie !");
        }
        else{
                    popovercont.style.display="block";
        document.getElementById("loadingCircle").style.display='block';
        stop=false;
        waitingtyper();
        let oldcontent=document.getElementById("newcontent");
        if(oldcontent){
                oldcontent.remove();
            }
        let popover_content=document.getElementById("popover-content");
        let options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'genres':genres,
                                'movies':suggmovies
            })
        }
        fetch(url,options)
        .then(res=>res.json())
        .then(res=>{
            stop=true;
            document.querySelector("#popover-content > p").textContent="";
            document.getElementById("loadingCircle").style.display='none';
            let newcontent=document.createElement("div");
            newcontent.id="newcontent";
            let title=document.createElement("h3");
            title.id="title";
            title.style.fontSize="2.5em";
            title.style.textAlign="center";
            let img=document.createElement("img");
            img.id="poster";
            img.alt="poster";
            img.style.height="32vh";
            img.style.width="20vh";
            img.style.border="2px solid rgb(165, 0, 113)";
            img.style.borderRadius="10px";
            let overview=document.createElement("p");
            overview.id="overview";
			title.textContent=res.original_title;
			img.src=`https://image.tmdb.org/t/p/original/${res.poster_path}`;
			overview.textContent=res.overview;
            newcontent.appendChild(title);
            newcontent.appendChild(img);
            newcontent.appendChild(overview);
            document.getElementById("popover-content").appendChild(newcontent);
        })
        .catch(error=>console.error(error));

        }

    })
    exitIcon.addEventListener("click",()=>{
        document.getElementById("popover-container").style.display="none";
    })

})