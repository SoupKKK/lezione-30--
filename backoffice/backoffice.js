const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc1YzdhMzNkYWRhMDAwMThhNjllNjMiLCJpYXQiOjE3MDIyMTc2MzUsImV4cCI6MTcwMzQyNzIzNX0.gu8aSlYJS9Eid9Lkm3MFCIFIMxL5JMzQ9cHumO2PzOM";

document.getElementById('productForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const brand = document.getElementById('brand').value;
  const imageUrl = document.getElementById('imageUrl').value;
  const price = parseFloat(document.getElementById('price').value);

  const productData = {
    name: name,
    description: description,
    brand: brand,
    imageUrl: imageUrl,
    price: price
  };

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Prodotto inserito con successo:', data);
    alert('Prodotto inserito con successo!');
  })
  .catch(error => {
    console.error('Si è verificato un errore durante l\'inserimento del prodotto:', error);
    alert('Si è verificato un errore durante l\'inserimento del prodotto. Controlla la console per i dettagli.');
  });
});

document.getElementById('deleteProduct').addEventListener('click', function(event) {
  event.preventDefault();

  const productName = document.getElementById('productname').value;

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(data => {
    const productToDelete = data.find(product => product.name.toLowerCase() === productName.toLowerCase());

    if (!productToDelete) {
      alert(`Prodotto con nome ${productName} non trovato.`);
      return;
    }

    const productId = productToDelete._id;

    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => {
      if (response.ok) {
        console.log(`Prodotto con nome ${productName} eliminato con successo`);
        alert(`Prodotto con nome ${productName} eliminato con successo`);
      } else {
        console.error('Si è verificato un errore durante l\'eliminazione del prodotto');
        alert('Si è verificato un errore durante l\'eliminazione del prodotto');
      }
    })
    .catch(error => {
      console.error('Si è verificato un errore:', error);
      alert('Si è verificato un errore. Controlla la console per i dettagli.');
    });
  })
  .catch(error => {
    console.error('Si è verificato un errore:', error);
    alert('Si è verificato un errore durante il recupero dei dati.');
  });
});

document.getElementById('edit').addEventListener('click', function(event) {
    event.preventDefault();
    
    const productName = prompt("Inserisci il nome del prodotto da modificare:");
  
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const productToEdit = data.find(product => product.name.toLowerCase() === productName.toLowerCase());
  
      if (!productToEdit) {
        alert(`Prodotto con nome ${productName} non trovato.`);
        return;
      }
  
      const propertyToEdit = prompt(`Quale proprietà di ${productName} vuoi modificare? (name, description, brand, imageUrl, price)`);
      let newValue;
  
      if (propertyToEdit) {
        newValue = prompt(`Inserisci il nuovo valore per ${propertyToEdit}`);
      }
  
      if (!newValue) {
        alert("Operazione annullata o valore non valido.");
        return;
      }
  
      const productId = productToEdit._id;
  
      fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ [propertyToEdit]: newValue })
      })
      .then(response => {
        if (response.ok) {
          console.log(`Proprietà ${propertyToEdit} del prodotto ${productName} modificata con successo`);
          alert(`Proprietà ${propertyToEdit} del prodotto ${productName} modificata con successo`);
        } else {
          console.error('Si è verificato un errore durante la modifica del prodotto');
          alert('Si è verificato un errore durante la modifica del prodotto');
        }
      })
      .catch(error => {
        console.error('Si è verificato un errore:', error);
        alert('Si è verificato un errore. Controlla la console per i dettagli.');
      });
    })
    .catch(error => {
      console.error('Si è verificato un errore:', error);
      alert('Si è verificato un errore durante il recupero dei dati.');
    });
  });