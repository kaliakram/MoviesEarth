export async function getMovies(url) {
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
  .catch(err => console.error(err));
}
export function type(string,element){
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