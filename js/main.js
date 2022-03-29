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


var newArrayNormolizeList = sliceMovies.map( (item, index, ) => {
    
    return{
        id: index + 1,
        title: item.Title.toString(),
        movie_categories: item.Categories,
        movie_year: item.movie_year,
        movie_rating: item.imdb_rating,
        movie_img: `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`,
        movie_youtubeLink: `https://www.youtube.com/watch?v=${item.ytid}`
        
    }
})


function renderCategories(array) {
    
    let movieCategories = []
    
    array.forEach(function (item) {
        
        let newCategories = item.movie_categories.split("|");
        
        newCategories.forEach(function (item) {

            if (!movieCategories.includes(item)) {

                movieCategories.push(item);
            }
            
        })
        
    })
    
    movieCategories.sort()
    
    let optionFragment = document.createDocumentFragment()
    
    movieCategories.forEach(function (item) {
        
        let newOption = document.createElement("option");
        
        newOption.value = item
        newOption.textContent = item
        
        optionFragment.appendChild(newOption)
    })
    
    elFormSelect.appendChild(optionFragment)
}

renderCategories(newArrayNormolizeList);


// RenderMovies
function renderMovies(array, box) {
    
    box.innerHTML = null;
    
    let elFragment = document.createDocumentFragment();
    
    array.forEach(function (item) {
        
        let templateDiv = elTemplate.cloneNode(true)
        
        templateDiv.querySelector(".card-img-top").src = item.movie_img,
        templateDiv.querySelector(".card-title").textContent = item.title,
        templateDiv.querySelector(".card-categories").textContent = item.movie_categories.split("|").join(", "),
        templateDiv.querySelector(".card-year").textContent = item.movie_year,
        templateDiv.querySelector(".card-rate").textContent = item.movie_rating,
        templateDiv.querySelector(".card-link").href = item.movie_youtubeLink,
        
        
        elFragment.appendChild(templateDiv);
    });
    
    box.appendChild(elFragment);

    elHeading.textContent = array.length;
    
}

renderMovies(newArrayNormolizeList, elBox)


let findMovies = function (title, minRating, genre) {
    
    let filterMovies = newArrayNormolizeList.filter(function (item) {
        
        var filterCategories = genre === 'All' || item.movie_categories.includes(genre);
        
        return item.title.match(title) && item.movie_rating >= minRating && filterCategories
    })
    
    return filterMovies
}

elMoviesForm.addEventListener("input", function (event) {
    event.preventDefault()
    
    let searchInput = elInput.value.trim()
    let ratingInput = elRating.value.trim()
    let selectOption = elFormSelect.value
    let sortType = elFormSort.value
    
    let pattern = new RegExp(searchInput, "gi")
    let newArray = findMovies(pattern, ratingInput, selectOption);
    
    if (sortType === "high") {
        
        newArray.sort((b, a ) => a.movie_rating - b.movie_rating )
    }
    
    if (sortType === "low") {
        
        newArray.sort((a, b) => a.movie_rating - b.movie_rating)
    }
    
    
    renderMovies(newArray, elBox);
})


