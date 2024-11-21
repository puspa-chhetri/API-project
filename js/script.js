const APIKey = //paste your own API Key;
const blogContainer = document.getElementById("bolg-container");
const searchField = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function fetchRandomNews() {
       try {
              const APIUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${APIKey}`;
              const response = await fetch(APIUrl);
              const data = await response.json();
              return data.articles;
       } catch (error) {
              console.error("Error fetching random news", error);
              return [];
       }
}

// Search 
searchButton.addEventListener('click', async () => {
       const query = searchField.value.trim();
       if(query !== "") {
              try {
                     const articles = await fetchNewsQuery
                     (query)
                     displayBlogs(articles);
              } catch (error) {
                     console.log ("Error fetching news by query", error);
              }
       }
});

async function fetchNewsQuery(query) {
       try {
              const APIUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${APIKey}`; 
              const response = await fetch(APIUrl);
              const data = await response.json();
              return data.articles;
       } catch (error) {
              console.error("Error fetching random news", error);
              return [];
       }
}

function displayBlogs(articles) {
       blogContainer.innerHTML = "";
       articles.forEach((article) => {
              const blogCard = document.createElement("div");
              blogCard.classList.add("blog-card");

              const img = document.createElement("img");
              img.src = article.urlToImage;
              img.alt = article.title;

              const title = document.createElement("h2");
              const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title;
              title.textContent = truncatedTitle;

              const description = document.createElement("p");
              const truncatedDes = article.description.length > 120 ? article.description.slice(0, 120) + "...." : article.description;
              description.textContent = truncatedDes;

              blogCard.appendChild(img);
              blogCard.appendChild(title);
              blogCard.appendChild(description);
              blogCard.addEventListener('click', () => {
                     window.open(article.url, "_blank");
              });

              blogContainer.appendChild(blogCard);
       });
}

(async () => {
       try {
              const articles = await fetchRandomNews();
              displayBlogs(articles);
       } catch (error) {
              console.error("Error displaying blogs", error);
       }
})();
