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

        const unsplashRequest = new XMLHttpRequest();

        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 20c26a358eabb14066fce4e5a2a3299783d103dfa30a947297ac49a545d9ec6c');
        unsplashRequest.send();

        function addImage(){
          let htmlContent = '';
          const data = JSON.parse(this.responseText);

          if(data && data.results && data.results[0]){
            const firstImage = data.results[0];
            htmlContent = `<figure>
              <img src="${firstImage.urls.regular}" alt="${searchedForText}">
              <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
              </figure>`;
          } else {
            htmlContent = '<div class="error-no-image">No images available</div>';
          }

          responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }
    });




})();
