async function getMovies(url) {
fetch(url)
  .then(res => res.json())
  .then(res => {
	const bigClass=document.getElementById("movies");
	bigClass.innerHTML="";
	for(i=0;i<12;i++){
		let element=res.results[i];
		let newElement=document.createElement("div");
		let newTitle=document.createElement("p");
		let newOverlay=document.createElement("div");
		newOverlay.className="movieOverlay";
		newElement.className="movie";
		newElement.imagePath=`https://image.tmdb.org/t/p/original/${element.poster_path}`;
		newElement.originalLang=element.original_language;
		newElement.overview=element.overview;
		newElement.releaseDate=element.release_date;
		newTitle.innerHTML=element.original_title;
		newElement.style.backgroundImage=`url("https://image.tmdb.org/t/p/original/${element.poster_path}")`;
		newElement.style.backgroundSize="cover";
		newElement.appendChild(newTitle);
		newElement.appendChild(newOverlay);
		bigClass.appendChild(newElement);

};
  })
  .catch(err => {
	let popover=document.getElementById("popover-container");
	popover.style.display="block";
	document.getElementById("popover-content").innerHTML="<h2>failed fetching movies!</h2>";
	let button=document.createElement("button");
	button.innerHTML="Refresh";
	button.classList.add("button");
	button.id="reloading";
	document.getElementById("popover-content").appendChild(button);
		let reloading=document.getElementById("reloading");
	reloading.addEventListener("click",()=>{
		location.href=location.href;
	})
  });
}
function type(string,element){
	let speed=50;
	let index=0;
	function writechar(){
		if(index<string.length){
		element.textContent+=string[index];
		index++;
		setTimeout(writechar,speed);
	}
	}
	writechar();
}

document.addEventListener("DOMContentLoaded",()=>{
    getMovies(url);
	let animateString='Welcome to MoviesEarth- Your Best Source For Exploring Movies !';
	let element=document.querySelector("h1");
	type(animateString,element);
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
			popover_content.style.display="block";
			popover_container.style.display="none";
	})

})