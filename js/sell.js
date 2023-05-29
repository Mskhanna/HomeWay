// Import the fs module
const fs = require('fs');

function saveData() {

  var beds = document.getElementById("Bedrooms").value;
  var bath = document.getElementById("Bathrooms").value;
  var address = document.getElementById("Address").value;

  // Create a JSON object with the data
  var data = {
    "beds": beds,
    "bath": bath,
    "address": address,
  };

  //writeData(data);
  // Import the fs module
const fs = require('fs');

// Read the existing data from the file
fs.readFile('data.json', 'utf8', function (err, data) {
  if (err) throw err;

  // Parse the JSON data
  const jsonData = JSON.parse(data);

  // Modify the data
  jsonData.name = 'Jane';
  jsonData.age = 25;
  jsonData.email = 'jane@example.com';

  // Convert the data back to JSON format
  const updatedData = JSON.stringify(jsonData, null, 2);

  // Write the updated data back to the file
  fs.writeFile('data.json', updatedData, function (err) {
    if (err) throw err;
    console.log('Data updated!');
  });
});

  // Convert the JSON object to a string
  var jsonString = JSON.stringify(data);

  // Save the string to local storage
  localStorage.setItem("myData", jsonString);

  // Confirm that the data was saved
  alert("Data saved!");
};

// Retrieve the data from local storage
var jsonString = localStorage.getItem("myData");

// Convert the string to a JSON object
var data = JSON.parse(jsonString);

// Use the data as needed
console.log(data.beds); // Output: John
console.log(data.bath); // Output: 30
console.log(data.address); // Output: john@example.com