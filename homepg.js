const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc1YzdhMzNkYWRhMDAwMThhNjllNjMiLCJpYXQiOjE3MDIyMTc2MzUsImV4cCI6MTcwMzQyNzIzNX0.gu8aSlYJS9Eid9Lkm3MFCIFIMxL5JMzQ9cHumO2PzOM";

const productList = document.getElementById('productList');

fetch('https://striveschool-api.herokuapp.com/api/product/', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    data.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('col-md-4', 'mb-3');

      card.innerHTML = `
        <div class="card">
          <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text text-center"><i>${product.description}</i></p>
            <p class="card-text"><b>Region</b>: ${product.brand}</p>
            <p class="card-text"><b>Price</b>: ${product.price} €</p>
            <a href="#" class="btn btn-primary">Learn more</a>
          </div>
        </div>
      `;

      productList.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Si è verificato un errore:', error);
    alert('Si è verificato un errore. Controlla la console per i dettagli.');
  });
