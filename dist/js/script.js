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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCl7XHJcbiAgICBsZXQgY29ubmV4aW9uID0gbmV3IE1vdmllREIoKTtcclxuXHJcbiAgICBpZihkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zZWFyY2goXCJmaWNoZS1maWxtLmh0bWxcIikgPiAwKXtcclxuICAgICAgICBsZXQgcGFyYW1zID0gKG5ldyBVUkwoZG9jdW1lbnQubG9jYXRpb24pKS5zZWFyY2hQYXJhbXM7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVJbmZvRmlsbShwYXJhbXMuZ2V0KFwiaWRcIikpO1xyXG4gICAgfWVsc2Uge1xyXG4gICAgICAgIGNvbm5leGlvbi5yZXF1ZXRlRGVybmllckZpbG0oKTtcclxuICAgIH1cclxuXHJcbn0pXHJcblxyXG5jbGFzcyBNb3ZpZURCe1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjb25zdHJ1Y3RldXJcIik7XHJcblxyXG4gICAgICAgIHRoaXMuQVBJa2V5ID0gXCI2ZmQyMTE4MzhjZjU1Y2E3NTIwMWVkMmVjOGI0MWU4NVwiO1xyXG5cclxuICAgICAgICB0aGlzLmxhbmcgPSBcImZyLUNBXCI7XHJcblxyXG4gICAgICAgIHRoaXMuYmFzZVVSTCA9IFwiaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvM1wiO1xyXG5cclxuICAgICAgICB0aGlzLmltZ1BhdGggPSBcImh0dHBzOi8vaW1hZ2UudG1kYi5vcmcvdC9wL1wiO1xyXG5cclxuICAgICAgICB0aGlzLnRvdGFsRmlsbSA9IDg7XHJcblxyXG4gICAgICAgIHRoaXMubGFyZ2V1ckFmZmljaGUgPSBbXCJ3OTJcIiwgXCJ3MTU0XCIsIFwidzE4NVwiLCBcInczNDJcIiwgXCJ3NTAwXCIsIFwidzc4MFwiXTtcclxuXHJcbiAgICAgICAgdGhpcy5sYXJnZXVyVGV0ZUFmZmljaGUgPSBbXCJ3NDVcIiwgXCJ3MTg1XCJdO1xyXG5cclxuICAgICAgICB0aGlzLmxhcmdldXJUb2lsZUZvbmQgPSBbXCJ3MzAwXCIsIFwidzc4MFwiLCBcIncxMjgwXCJdO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXRlRGVybmllckZpbG0oKXtcclxuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCB0aGlzLnJldG91clJlcXVldGVEZXJuaWVyRmlsbS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgLy94aHIub3BlbihcIkdFVFwiLCBcImh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvbm93X3BsYXlpbmc/YXBpX2tleT02ZmQyMTE4MzhjZjU1Y2E3NTIwMWVkMmVjOGI0MWU4NSZsYW5ndWFnZT1mci1DQSZwYWdlPTFcIik7XHJcbiAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgdGhpcy5iYXNlVVJMICsgXCIvbW92aWUvbm93X3BsYXlpbmc/YXBpX2tleT1cIiArIHRoaXMuQVBJa2V5ICsgXCImbGFuZ3VhZ2U9XCIgKyB0aGlzLmxhbmcgKyBcIiZwYWdlPTFcIik7XHJcblxyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0b3VyUmVxdWV0ZURlcm5pZXJGaWxtKGUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmV0b3VyIGRlcm5pZXIgRmlsbVwiKTtcclxuXHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGUuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG5cclxuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KS5yZXN1bHRzO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmFmZmljaGVEZXJuaWVyRmlsbShkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBhZmZpY2hlRGVybmllckZpbG0oZGF0YSl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRvdGFsRmlsbTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFbaV0udGl0bGUpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHVuQXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcGxhdGU+YXJ0aWNsZS5maWxtXCIpLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDJcIikuaW5uZXJIVE1MID0gZGF0YVtpXS50aXRsZTtcclxuXHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiLmRlc2NyaXB0aW9uXCIpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXcgfHwgXCJBdWN1bmUgZGVzY3JpcHRpb25cIjtcclxuXHJcbiAgICAgICAgICAgIGxldCBzcmMgPSB0aGlzLmltZ1BhdGggKyBcIncxODVcIiArIGRhdGFbaV0ucG9zdGVyX3BhdGg7XHJcblxyXG4gICAgICAgICAgICBsZXQgdW5lSW1hZ2UgPSB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImltZ1wiKTtcclxuXHJcbiAgICAgICAgICAgIHVuZUltYWdlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBzcmMpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgZGF0YVtpXS50aXRsZSk7XHJcblxyXG4gICAgICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImFcIikuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBcImZpY2hlLWZpbG0uaHRtbD9pZD1cIiArIGRhdGFbaV0uaWQpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0ZS1maWxtc1wiKS5hcHBlbmRDaGlsZCh1bkFydGljbGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXRlSW5mb0ZpbG0obW92aWVJRCl7XHJcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJSZXF1ZXRlSW5mb0ZpbG0uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgIC8veGhyLm9wZW4oXCJHRVRcIiwgXCJodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllL25vd19wbGF5aW5nP2FwaV9rZXk9NmZkMjExODM4Y2Y1NWNhNzUyMDFlZDJlYzhiNDFlODUmbGFuZ3VhZ2U9ZnItQ0EmcGFnZT0xXCIpO1xyXG4gICAgICAgIHhoci5vcGVuKFwiR0VUXCIsIHRoaXMuYmFzZVVSTCArIFwiL21vdmllL1wiICsgbW92aWVJRCArIFwiP2FwaV9rZXk9XCIgKyB0aGlzLkFQSWtleSArIFwiJmxhbmd1YWdlXCIgKyB0aGlzLmxhbmcpO1xyXG5cclxuICAgICAgICAvLyBodHRwczovL2FwaS50aGVtb3ZpZWRiLm9yZy8zL21vdmllL3ttb3ZpZV9pZH0/YXBpX2tleT02ZmQyMTE4MzhjZjU1Y2E3NTIwMWVkMmVjOGI0MWU4NSZsYW5ndWFnZT1mci1DQVxyXG5cclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldG91clJlcXVldGVJbmZvRmlsbShlKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJldG91ciBkZXJuaWVyIEZpbG1cIik7XHJcblxyXG4gICAgICAgIGxldCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGE7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0YXJnZXQucmVzcG9uc2VUZXh0KTtcclxuXHJcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWZmaWNoZUluZm9GaWxtKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFmZmljaGVJbmZvRmlsbShkYXRhKXtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaDFcIikuaW5uZXJIVE1MID0gZGF0YS50aXRsZTtcclxuXHJcbiAgICAgICAgLy8gbGV0IHNyYyA9IHRoaXNcclxuICAgICAgICAvLyBsZXQgdW5lSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xyXG4gICAgICAgIC8vIHVuZUltYWdlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBzcmMpO1xyXG5cclxuICAgICAgICB0aGlzLnJlcXVldGVBY3RldXIoZGF0YS5pZCk7XHJcblxyXG4gICAgICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b3RhbEZpbG07IGkrKykge1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhkYXRhW2ldLnRpdGxlKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICBsZXQgdW5BcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wbGF0ZT5hcnRpY2xlLmZpbG1cIikuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaDJcIikuaW5uZXJIVE1MID0gZGF0YVtpXS50aXRsZTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcIi5kZXNjcmlwdGlvblwiKS5pbm5lckhUTUwgPSBkYXRhW2ldLm92ZXJ2aWV3IHx8IFwiQXVjdW5lIGRlc2NyaXB0aW9uXCI7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgICAgbGV0IHNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzE4NVwiICsgZGF0YVtpXS5wb3N0ZXJfcGF0aDtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICBsZXQgdW5lSW1hZ2UgPSB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImltZ1wiKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTtcclxuICAgICAgICAvLyAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGRhdGFbaV0udGl0bGUpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiYVwiKS5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIFwiZmljaGUtZmlsbS5odG1sP2lkPVwiICsgZGF0YVtpXS5pZCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0ZS1maWxtc1wiKS5hcHBlbmRDaGlsZCh1bkFydGljbGUpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXRlQWN0ZXVyKG1vdmllSUQpe1xyXG4gICAgICAgIC8vR2V0IGNyZWRpdHNcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0b3V0UmVxdWV0ZUFjdGV1cihlKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZUFjdGV1cihkYXRhKXtcclxuXHJcbiAgICB9XHJcblxyXG59Il0sImZpbGUiOiJzY3JpcHQuanMifQ==
