let http = new XMLHttpRequest();
http.open('get', './js/data.json', true);
http.send();
http.onload = function(){
  if(this.readyState == 4 && this.status == 200){
    let houses = JSON.parse(this.responseText);
    let output = "";
    for(let i of houses){
      output += `
        <div class="house" onclick="displayModal('${i.id}')">
          <img src="${i.image}" alt="Card img cap">
          <h5 class="price">${"$"+i.price.toLocaleString()}</h5>
          <p class="description">${i.beds+" bds | " +i.baths+" ba | " + i.sqft+" sqft"}</p>
          <p class="description">${i.address}</p>
        </div>
      `
    }
    document.querySelector(".houses").innerHTML = output;

    // add event listener to search input field
    const searchInput = document.querySelector('#search');
    searchInput.addEventListener('input', function(e) {
      const searchString = e.target.value.toLowerCase().trim();
      const filteredHouses = houses.filter(house => {
        return (
          house.city.toLowerCase().includes(searchString) ||
          house.address.toLowerCase().includes(searchString) ||
          house.type.toLowerCase().includes(searchString)
        );
      });
      
      let filteredOutput = "";
      for(let i of filteredHouses){ 
        filteredOutput += `
        <div class="house" onclick="displayModal('${i.id}')">
          <img src="${i.image}" alt="Card img cap">
          <h5 class="price">${"$"+i.price.toLocaleString()}</h5>
          <p class="description">${i.beds+" bds | " +i.baths+" ba | " + i.sqft+" sqft"}</p>
          <p class="description">${i.address}</p>
        </div>
        `
      }
      document.querySelector(".houses").innerHTML = filteredOutput;
    });
  }   
}

function displayModal(itemId) {
  // Load data from JSON file
  fetch('./js/data.json')
    .then(response => response.json())
    .then(data => {
      const item = data.find(item => item.id === itemId);
      console.log(itemId)
      console.log(item.price)
      // Populate modal with data
      document.getElementById('modal-title').textContent = "$"+(item.price.toLocaleString());
      //const modalTitle = document.getElementById('modal-title');
      //modalTitle.textContent = "$" + (parseFloat(item.price.replace(',', '')) / 2);
      document.getElementById('bed').textContent = item.beds +" bed |";
      document.getElementById('bath').textContent = item.baths +" bath |";
      document.getElementById('sqft').textContent = item.sqft +" sqft |";
      document.getElementById('psqft').textContent = "$"+(item.price / (parseFloat(item.sqft.replace(',', '')))).toFixed(2) +" per sqft ";
      document.getElementById('address').textContent = "Address: "+item.address;
      document.getElementById('modal-description').textContent = "Type: "+item.type;
      document.getElementById('house-description').textContent = item.description;
      document.getElementById('house-img').src = item.image;
      // Show modal
      document.getElementById('modal').style.display = 'block';
    })
    .catch(error => console.error(error));
}

// Get the modal
const modal = document.getElementById('modal');

// Get the close button
const closeBtn = document.getElementsByClassName('modal-close')[0];

// When the user clicks on the close button, close the modal
closeBtn.onclick = function() {
  modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}


    