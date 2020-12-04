document.addEventListener("DOMContentLoaded", function (){
    let connexion = new MovieDB();

    if(document.location.pathname.search("fiche-film.html") > 0){
        let params = (new URL(document.location)).searchParams;
        connexion.requeteInfoFilm(params.get("id"));
    }else {
        connexion.requeteDernierFilm();
    }

})

class MovieDB{
    constructor() {
        console.log("constructeur");

        this.APIkey = "6fd211838cf55ca75201ed2ec8b41e85";

        this.lang = "fr-CA";

        this.baseURL = "https://api.themoviedb.org/3";

        this.imgPath = "https://image.tmdb.org/t/p/";

        this.totalFilm = 8;

        this.largeurAffiche = ["w92", "w154", "w185", "w342", "w500", "w780"];

        this.largeurTeteAffiche = ["w45", "w185"];

        this.largeurToileFond = ["w300", "w780", "w1280"];

    }

    requeteDernierFilm(){
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("loadend", this.retourRequeteDernierFilm.bind(this));

        //xhr.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=6fd211838cf55ca75201ed2ec8b41e85&language=fr-CA&page=1");
        xhr.open("GET", this.baseURL + "/movie/now_playing?api_key=" + this.APIkey + "&language=" + this.lang + "&page=1");

        xhr.send();
    }

    retourRequeteDernierFilm(e){
        console.log("Retour dernier Film");

        let target = e.currentTarget;
        let data;
        //console.log(target.responseText);

        data = JSON.parse(target.responseText).results;
        console.log(data);

        this.afficheDernierFilm(data);
    }

    afficheDernierFilm(data){
        for (let i = 0; i < this.totalFilm; i++) {
            console.log(data[i].title);

            let unArticle = document.querySelector(".template>article.film").cloneNode(true);

            unArticle.querySelector("h2").innerHTML = data[i].title;

            unArticle.querySelector(".description").innerHTML = data[i].overview || "Aucune description";

            let src = this.imgPath + "w185" + data[i].poster_path;

            let uneImage = unArticle.querySelector("img");

            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data[i].title);

            unArticle.querySelector("a").setAttribute("href", "fiche-film.html?id=" + data[i].id);

            document.querySelector(".liste-films").appendChild(unArticle);
        }
    }

    requeteInfoFilm(movieID){
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("loadend", this.retourRequeteInfoFilm.bind(this));

        //xhr.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=6fd211838cf55ca75201ed2ec8b41e85&language=fr-CA&page=1");
        xhr.open("GET", this.baseURL + "/movie/" + movieID + "?api_key=" + this.APIkey + "&language" + this.lang);

        // https://api.themoviedb.org/3/movie/{movie_id}?api_key=6fd211838cf55ca75201ed2ec8b41e85&language=fr-CA

        xhr.send();
    }

    retourRequeteInfoFilm(e){
        console.log("Retour dernier Film");

        let target = e.currentTarget;
        let data;
        //console.log(target.responseText);

        data = JSON.parse(target.responseText);
        console.log(data);

        this.afficheInfoFilm(data);
    }

    afficheInfoFilm(data){
        document.querySelector("h1").innerHTML = data.title;

        // let src = this
        // let uneImage = document.querySelector("img");
        // uneImage.setAttribute("src", src);

        this.requeteActeur(data.id);

        // for (let i = 0; i < this.totalFilm; i++) {
        //     console.log(data[i].title);
        //
        //     let unArticle = document.querySelector(".template>article.film").cloneNode(true);
        //
        //     unArticle.querySelector("h2").innerHTML = data[i].title;
        //
        //     unArticle.querySelector(".description").innerHTML = data[i].overview || "Aucune description";
        //
        //     let src = this.imgPath + "w185" + data[i].poster_path;
        //
        //     let uneImage = unArticle.querySelector("img");
        //
        //     uneImage.setAttribute("src", src);
        //     uneImage.setAttribute("alt", data[i].title);
        //
        //     unArticle.querySelector("a").setAttribute("href", "fiche-film.html?id=" + data[i].id);
        //
        //     document.querySelector(".liste-films").appendChild(unArticle);
        // }
    }

    requeteActeur(movieID){
        //Get credits

    }

    retoutRequeteActeur(e){

    }

    afficheActeur(data){

    }

}