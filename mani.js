const apikey = "edee48e01b5141ef9b3677838359443d";
const pageSize = 20;
function fetchNews() {
    const url =` https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}&pageSize=${pageSize}`;
    fetch(url)
        .then(response => response.json())
        .then(data =>disblayArticles(data.articles))
        .catch(error => { 
            console.log(error)
        });
};

function disblayArticles(articles) {
    const newsList = document.querySelector(".news-list");
    newsList.innerHTML = "";
    articles.forEach((article) =>{
        const truncateTitle = truncateString(article.title, 10);
        const listItem = document.createElement("li");
        listItem.innerHTML = ` 
        <div class="info">
            <div class="author">
                <span>Author </span>  ${article.author || "UnKnown"}
            </div>
            <div class="published-at">
                ${new Date(article.publishedAt).toDateString()}
            </div>
        </div>
        <img src="${article.urlToImage}" alt="${article.title}"></img>
        <a  class="title" href="${article.url}" title="${article.title}" target="b-lank">${truncateTitle}</a>
        <p class="description">${article.description || "NO Description"} </p>
        <div class="source">
            <span>[source]</span>${article.source.name}
        </div>
        `;
        newsList.appendChild(listItem);
    });

};
function truncateString(str, numWords) {
    const words = str.split(" ");
    if(words.length <= numWords) {
        return str ;
    }else {
        return words.slice(0, numWords).join(" ")+"..." ;
    }
};
window.onload = fetchNews;