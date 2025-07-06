async function getMovies() {
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTllZTZiMjJkYjQ5MDc3NTgyNzY0ZDM1ZjhjYjQ2YSIsIm5iZiI6MTc1MDI4NTg1Ny40MDcsInN1YiI6IjY4NTMzZTIxZWUzZmM4ZTg1ZjBjZjA0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Eacu25qDg7V_HmQpT0QZU6YgbObnuAXQnY-n-aKcikE'
  }
};

fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
  .then(res => res.json())
  .then(res => {
	const bigClass=document.getElementById("movies");
	bigClass.innerHTML="";
	for(i=0;i<200;i++){
		let element=res.results[i];
		let newElement=document.createElement("div");
		let newTitle=document.createElement("p");
		let newOverlay=document.createElement("div");
		newOverlay.className="movieOverlay";
		let newImagePath=`https://image.tmdb.org/t/p/original/${element.poster_path}`;
		newElement.className="movie";
		newElement.imagePath=`https://image.tmdb.org/t/p/original/${element.poster_path}`;
		newElement.originalLang=element.original_language;
		newElement.overview=element.overview;
		newElement.releaseDate=element.release_date;
		newTitle.innerHTML=element.original_title;
		newElement.style.backgroundImage=`url("${newImagePath}")`;
		newElement.style.backgroundSize="cover";
		newElement.appendChild(newTitle);
		newElement.appendChild(newOverlay);
		bigClass.appendChild(newElement);

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
})