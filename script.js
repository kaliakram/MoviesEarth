async function getPost() {
const url = 'https://movie-database-api1.p.rapidapi.com/list_movies.json?limit=20&page=1&quality=all&genre=all&minimum_rating=0&query_term=0&sort_by=date_added&order_by=desc&with_rt_ratings=false';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'ed4951a5d9mshebfa01c7c5d481ep1fb982jsn6857bfa2b2a7',
		'x-rapidapi-host': 'movie-database-api1.p.rapidapi.com'
	}
};
try {
	const response = await fetch(url, options);
	const result = await response.json();
	const bigClass=document.getElementById("movies");
	document.body.appendChild(bigClass);
	result.data.movies.forEach(element => {
		let newElement=document.createElement("div");
		let newTitle=document.createElement("p");
		newElement.className="movie";
		newTitle.innerHTML=element.title_long;
		newElement.style.backgroundImage=`url("${element.large_cover_image}")`;
		newElement.style.backgroundSize="cover";
		newElement.appendChild(newTitle);
		bigClass.appendChild(newElement);
		
	});
	console.log(result);
} catch (error) {
	console.error(error);
}
}

document.addEventListener("DOMContentLoaded",()=>{
    getPost();

})