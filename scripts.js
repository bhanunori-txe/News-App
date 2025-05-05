// scripts.js

const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

async function fetchNews() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayNews(data.articles);
  } catch (error) {
    console.error('There was an error!', error);
  }
}

function displayNews(articles) {
  const newsDiv = document.querySelector('#news');
  newsDiv.innerHTML = ''; // Clear previous results

  for (const article of articles) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-6 col-lg-4';

    const card = document.createElement('div');
    card.className = 'card h-100 shadow-sm';

    if (article.urlToImage) {
      const image = document.createElement('img');
      image.src = article.urlToImage;
      image.className = 'card-img-top';
      image.alt = 'Article image';
      card.appendChild(image);
    }

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = article.title;
    cardBody.appendChild(title);

    const description = document.createElement('p');
    description.className = 'card-text';
    description.textContent = article.description || 'No description available.';
    cardBody.appendChild(description);

    const link = document.createElement('a');
    link.href = article.url;
    link.className = 'btn btn-primary mt-auto';
    link.target = '_blank';
    link.textContent = 'Read More';
    cardBody.appendChild(link);

    card.appendChild(cardBody);
    colDiv.appendChild(card);
    newsDiv.appendChild(colDiv);
  }
}


fetchNews();
