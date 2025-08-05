        async function getMovies() {
fetch("{{url_for('get_movies',pages=page)}}")
  .then(res => res.json())
  .then(res => {
    const forbidden=['Pleasure','Des jours plus belles que la nuit','Intimacy','After'];
	const bigClass=document.getElementById("movies");
	bigClass.innerHTML="";
	for(i=0;i<20;i++){
		let element=res.results[i];
		let newElement=document.createElement("div");
		let newTitle=document.createElement("p");
		let newOverlay=document.createElement("div");
		newOverlay.className="movieOverlay";
		let newImagePath=`https://image.tmdb.org/t/p/original/${element.poster_path}`;
		newElement.className="movie";
		newElement.imagePath=`https://image.tmdb.org/t/p/original/${element.poster_path}`;
		newElement.overview=element.overview;
		newTitle.innerHTML=element.original_title;
        if(!(forbidden.includes(element.original_title))){
		newElement.style.backgroundImage=`url("${newImagePath}")`;
		newElement.style.backgroundSize="cover";
		newElement.appendChild(newTitle);
		newElement.appendChild(newOverlay);
		bigClass.appendChild(newElement);
        }

};
  })
  .catch(err => console.error(err));
}
function type(string,element){
    let speed=50;
    let i=0;
    function writechar(){
        if(i<string.length){
            element.textContent+=string[i];
            i++;
            setTimeout(writechar,speed);
        }
    }
    writechar();
}

document.addEventListener("DOMContentLoaded",()=>{
    getMovies();
    let string='Explore Movies';
    let element=document.querySelector("h2");
    type(string,element);
	let movies=document.getElementById("movies");
	let popover_container=document.getElementById("popover-container");
	let popover=document.getElementById("popover");
	let popover_content=document.getElementById("popover-content");
	let exit=document.getElementById("exit");
	movies.addEventListener("click",(event)=>{
		let movie=event.target.closest(".movie");
		console.log(movie);
		if(!movie || !movies.contains(movie)) return;
			popover_container.style.display="block";
			document.getElementById("title").innerHTML=movie.children[0].innerHTML;
			document.querySelector("#overview").innerHTML="";
			let overview=document.getElementById("overview");
			document.getElementById("poster").src=movie.imagePath;
			document.getElementById("loadingCircle").style.display="none";
			overview.innerHTML=movie.overview;
			})

	exit.addEventListener("click",()=>{
			let loading=document.getElementById("loadingCircle");
			popover_content.style.display="block";
			popover_container.style.display="none";
	})

})