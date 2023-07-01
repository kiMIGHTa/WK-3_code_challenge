function getData(){
    fetch("http://localhost:3000/films")
    .then((response)=>response.json())
    .then((json)=>console.log(json))
}
getData()


