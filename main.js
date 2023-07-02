//Get data from the db.json server
function getData(){
    fetch("http://localhost:3000/films")
    .then((response)=>response.json())
    .then((json)=>renderSidebar(json))
}
getData()

function renderPosters(films){
    // Iterate through each film in the films array
    films.forEach(film => {

        // Create a container for the movie card
        let content=document.querySelector(".content")
        let movieCard=document.createElement('div')
        movieCard.className='card'

        // Create an image element for the film poster and set its source
        let poster=document.createElement('img')
        poster.src=film.poster
        movieCard.appendChild(poster)

        // Create a container for the movie details
        let movieDetails=document.createElement('div')
        movieDetails.className='container'

        // Create a heading element for the movie title and set its content
        let movieTitle=document.createElement('h3')
        movieTitle.innerHTML=film.title
        movieDetails.appendChild(movieTitle)

        // Create a paragraph element for the movie description and set its content
        let movieDescription=document.createElement('p')

        // Calculate the number of available tickets by subtracting tickets sold from capacity
        let availableTickets=film.capacity-film.tickets_sold

        // Set the movie description content using template literals
        movieDescription.innerHTML = `<p>Description:${film.description}</p>
                                    <p>Runtime: ${film.runtime} min</p>
                                    <p>Showtime: ${film.showtime}</p>`

        // Create a paragraph element for the available tickets information
        let movieTickets=document.createElement('p')                           
        movieTickets.innerHTML=`<p>Available Tickets: ${availableTickets}</p>`

        // Append the available tickets paragraph to the movie description
        movieDescription.appendChild(movieTickets)

        // Append the movie description to the movie details container
        movieDetails.appendChild(movieDescription)

        // Create a button element for buying a ticket
        let btn=document.createElement('button')
        btn.innerHTML = 'Buy a ticket'

        // Add a click event listener to the button
        btn.addEventListener('click', ()=>{
            // Check if there are available tickets
            if(availableTickets>=1){
                // Update the button content and style when a ticket is purchased
                btn.innerHTML=`Ticket purchased`
                btn.style.backgroundColour = `light blue`

                // Update the available tickets count and display
                availableTickets--
                movieTickets.innerHTML=`<p>Available Tickets: ${availableTickets}</p>`

                // Increment the number of tickets sold for the film
                film.tickets_sold++

                // Call the updateServer function to update the server with the modified film data
                updateServer()
            }else {
                // Update the button content and style when no tickets are available
                btn.innerHTML=`sold out`
                btn.style.backgroundColour = `red`
                movieTickets.innerHTML=`<p>Available Tickets: ${availableTickets}</p>`

                // Call the updateServer function to update the server with the modified film data
                updateServer()
            }
        })

        // Append the button to the movie details container
        movieDetails.appendChild(btn)

        // Append the movie details container to the movie card
        movieCard.appendChild(movieDetails)

        // Append the movie card to the content container
        content.appendChild(movieCard)

        // Function to update the server with the modified film data

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
    // Get the sidebar container element
    let sideBarContent=document.querySelector('.sidebar')

    // Create a list element for the movie titles
    let movieList=document.createElement('ul')
    movieList.className = 'films'

    // Iterate through each film in the films array
    films.forEach(film=>{
        // Create a list item element for each movie title and set its content
        let movieListItem=document.createElement('li')
        movieListItem.innerHTML = `${film.title}`
        movieListItem.className='film-item'

        // Append the list item to the movie list
        movieList.appendChild(movieListItem)
    })

    // Append the movie list to the sidebar container
    sideBarContent.appendChild(movieList)

    // Call the renderPosters function to render the movie posters
    renderPosters(films)
}