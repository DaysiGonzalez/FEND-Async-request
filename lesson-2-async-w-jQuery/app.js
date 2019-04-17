(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    console.log(document.querySelector('#search-keyword').innerText);
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=N45edRsQrGMn76AaxbuBYppDEYyVHGkS`
        }).done(addArticles);

        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
              Authorization: 'Client-ID 20c26a358eabb14066fce4e5a2a3299783d103dfa30a947297ac49a545d9ec6c'
            }
        }).done(addImage);

        function addArticles (articles) {
            responseContainer.insertAdjacentHTML('afterbegin', '<ul>' + articles.response.docs.map(article => `<li class ="article">
                <h2><a href ="${article.web_url}">${article.headline.main}</a></h2>
                <p>${article.snippet}</p>
              </li>`
              ).join('') + '</lu>'
            );
        };

        function addImage(images){
          const firstImage = images.results[0];
          responseContainer.insertAdjacentHTML('afterbegin', `<figure>
                  <img src="${firstImage.urls.small}" alt="${searchedForText}">
                  <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
              </figure>`
          );
        };
    });

})();
