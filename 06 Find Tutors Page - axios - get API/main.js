const btn = document.querySelector('.btn')
const cardsDiv = document.querySelector('.cards-container')
const url = "https://randomuser.me/api/?gender=female&results=3"

btn.addEventListener('click', event => {
	axios
		.get(url)
		.then(response => {
			for(let i = 0; i < 3; i++ ){
				let profile = response.data.results[i]
			
				cardsDiv.innerHTML += `
					<div class="card">
					<h3 class="name">${profile.name.first} ${profile.name.last}</h3>
					<img src=${profile.picture.large} alt="" class="avatar">
					<p class="email">${profile.email}</p>
					</div>
				`
			}		
	})
	.catch(error => console.log("failed to connect API"))
})