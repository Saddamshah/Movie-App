$(document).ready(() => {
    $("#searchForm").on('submit', (e) => {
    let searchText = $("#searchText").val()
    getMovies(searchText)
    $("#searchText").val('')
    e.preventDefault()
    })
})

function getMovies(searchText){
    axios.get(`http://www.omdbapi.com/?s=${searchText}&apikey=7c6a312d`)
    .then((response) => {
        let movies = response.data.Search;
        let output = '';

        $.each( movies, (index, movie) => {
            output += ` 
            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
              <div class="each-card">
                <div class="card">
                  <h5 class="card-header">${movie.Title}</h5>
                   <img src="${movie.Poster}" height="200em"/>
                     <div class="card-title"><h5>Released on ${movie.Year}</h5></div>
                     <a onclick="movieSelected('${movie.imdbID}')" href="#" class="btn btn-primary">Movie Details</a>
                </div>
              </div>  
            </div>
            `
        })
        $('#movies').html(output)
    })
    .catch((err) => console.log(err))
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id)
    window.location = 'movie.html'
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId')
    axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=7c6a312d`)
    .then((response) => {
       let movie = response.data;
       let output = `
       <div class="row">
            <div class="col-md-8">
                <div class="p- text-center list-group-item bg-warning"><strong>Genre : </strong bg-info>${movie.Title}</div>
                <div class="p-2 list-group-item"><strong>Director :- </strong>${movie.Director}</div>
                <div class="p-2 list-group-item"><strong>Released :- </strong>${movie.Released}</div>
                <div class="p-2 list-group-item"><strong>Actors :- </strong>${movie.Actors}</div>
                <div class="p-2 list-group-item"><strong>Awards :- </strong>${movie.Awards}</div>
                <div class="p-2 list-group-item"><strong>Production :- </strong>${movie.Production}</div>
                <div class="p-2 list-group-item"><strong>imdbRating :- </strong>${movie.imdbRating}</div>
                <div class="p-2 list-group-item bg-info text-center"><strong>Movie Story</strong></div>
                <div class="p-2 list-group-item  text-center">${movie.Plot}</div>
                <a class="btn btn-danger mb-4 btn-block" href="index.html">Go Back!</a>
            </div> 

            <div style="margin: 0 auto; ">
              <img src="${movie.Poster}" />
           </div> 
        </div>   

       `
       $('#movie').html(output)
    })
    .catch((err) => console.log(err))
}