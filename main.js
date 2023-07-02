function getData(){
    fetch("http://localhost:3000/films")
    .then((response)=>response.json())
    .then((json)=>renderSidebar(json))
}
getData()

function renderPosters(films){
    films.forEach(film => {

        let content=document.querySelector(".content")
        let movieCard=document.createElement('div')
        movieCard.className='card'

        let poster=document.createElement('img')
        poster.src=film.poster
        movieCard.appendChild(poster)

        let movieDetails=document.createElement('div')
        movieDetails.className='container'
        let movieTitle=document.createElement('h3')
        movieTitle.innerHTML=film.title
        movieDetails.appendChild(movieTitle)

        let movieDescription=document.createElement('p')

        let availableTickets=film.capacity-film.tickets_sold
        movieDescription.innerHTML = `<p>Description:${film.description}</p>
                                    <p>Runtime: ${film.runtime} min</p>
                                    <p>Showtime: ${film.showtime}</p>`
        let movieTickets=document.createElement('p')                           

        movieTickets.innerHTML=`<p>Available Tickets: ${availableTickets}</p>`
        movieDescription.appendChild(movieTickets)
        movieDetails.appendChild(movieDescription)

        let btn=document.createElement('button')
        btn.innerHTML = 'Buy a ticket'
        btn.addEventListener('click', ()=>{
            if(availableTickets>=1){
                btn.innerHTML=`Ticket purchased`
                btn.style.backgroundColour = `light blue`
                availableTickets--
                movieTickets.innerHTML=`<p>Available Tickets: ${availableTickets}</p>`
                film.tickets_sold++
                updateServer()
            }else {
                btn.innerHTML=`sold out`
                btn.style.backgroundColour = `red`
                movieTickets.innerHTML=`<p>Available Tickets: ${availableTickets}</p>`
                updateServer()
            }
            // console.log(films)
        
        })

        movieDetails.appendChild(btn)
        movieCard.appendChild(movieDetails)

        content.appendChild(movieCard)



        function updateServer(){
            fetch(`http://localhost:3000/films/${film.id}`, {
              method: 'PATCH',
              headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(film)
            })
            .then(res => res.json())
            .then(film => console.log(film))
        
           }


        
    });
   
    
}

function renderSidebar(films){
    let sideBarContent=document.querySelector('.sidebar')
    let movieList=document.createElement('ul')
    movieList.className = 'films'
    films.forEach(film=>{
        let movieListItem=document.createElement('li')
        movieListItem.innerHTML = `${film.title}`
        movieListItem.className='film-item'
        movieList.appendChild(movieListItem)
    })
    sideBarContent.appendChild(movieList)
    renderPosters(films)

}



