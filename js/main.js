//HTML element
let elBox = document.querySelector("#box")
let elMoviesForm = document.querySelector("#movies-form");
let elInput = document.querySelector("#search-input");
let elRating = document.querySelector("#rating");
let elFormSelect = document.querySelector("#form-select");
let elFormSort = document.querySelector("#form-sort");
let elBtn = document.querySelector("#form-btn");
let elHeading = document.querySelector("#search-result");
let elTemplate = document.querySelector("#template").content;

// console.log(elTemplate)

let sliceMovies = movies.slice(0, 50);

// console.log(sliceMovies);

let newArrayNormolize = sliceMovies.map(function (item, index, ) {
    return{
        id: index + 1,
        title: item.Title.toString(),
        movie_categororie: item.Categories,
        movie_year: item.movie_year,
        movie_rating: item.imdb_rating,
        movie_img: `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`,
        movie_youtubeLink: `https://www.youtube.com/watch?v=${item.ytid}`
        
        
        
    }
})

// console.log(newArrayNormolize);

function renderMovies(array, box) {
    
    let newFragment = document.createDocumentFragment()
    
    array.forEach(function (item) {
        
        let cardTemplate = elTemplate.cloneNode(true)
        
        cardTemplate.querySelector(".card-img-top").src = item.movie_img,
        cardTemplate.querySelector(".card-title").textContent = item.title,
        cardTemplate.querySelector(".card-categories").textContent = item.movie_categororie.split("|").join(", "),
        cardTemplate.querySelector(".card-year").textContent = item.movie_year,
        cardTemplate.querySelector(".card-rate").textContent = item.movie_rating,
        cardTemplate.querySelector(".card-link").href = item.movie_youtubeLink,
        
        
        newFragment.appendChild(cardTemplate)
    })
    
    box.appendChild(newFragment)
    elHeading.textContent = array.length
}

renderMovies(newArrayNormolize, box)







