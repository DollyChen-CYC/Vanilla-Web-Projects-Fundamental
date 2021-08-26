let img = document.querySelector('.dog-picture')

axios
	.get('https://dog.ceo/api/breeds/image/random')
	.then(response => { img.src = response.data.message})
	.catch(error => console.log('Failed to get image'))
