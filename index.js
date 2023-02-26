document.querySelector("button").addEventListener("click",function(){
    var movie=document.querySelector("input.search").value;
    
    var xttp=new XMLHttpRequest();
   xttp.open("GET"," http://www.omdbapi.com/?s="+movie+"&apikey=54e3a25d");
  
    xttp.send();
    xttp.onreadystatechange=function()
    {
        if(this.readyState==4 && this.status==200)
        {
           var ob=JSON.parse(this.responseText);
           var tmovie;
      
             for(var i=0;;i++)
             {
               tmovie= ob.Search[i];
               fetchImdb(tmovie);
               
             }
        }                  
    }
});

function fetchImdb(tmovie)
{
var imdbRating=tmovie.imdbID;
var request=new XMLHttpRequest();
request.open("GET","http://www.omdbapi.com/?i="+imdbRating+"&apikey=54e3a25d");
request.send();
request.onreadystatechange=function()
{
  if(this.readyState==4 && this.status==200)
  {
    var imovie=JSON.parse(this.responseText);
    movieDisplay(imovie);
    
  }
}
}


function movieDisplay(imovie)
{
var createElm=document.createElement("div");
createElm.classList.add("movie-cards");
createElm.innerHTML=`
<div>
<img src=${imovie.Poster}  width="200" height="300"/>
</div>
<div class="movie-info">
<p>Title: <span class="info">${imovie.Title}</span></p><p>Released: <span class="info">${imovie.Released}</span></p><p>Director: <span class="info">${imovie.Director}</span></p><p>Genre: <span class="info">${imovie.Genre}</span></p><p>Language: <span class="info">${imovie.Language}</span></p>
`;
document.querySelector("#display-section").appendChild(createElm);
}

