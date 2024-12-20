function getRandomFile(files) {
    const randomIndex = Math.floor(Math.random() * files.length);
    return files[randomIndex];
  }
  
  function serveRandomJson() {
    // Fetch the list of files
    fetch("cards.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load files list");
        }
        return response.json();
      })
      .then((files) => {
        const randomFile = getRandomFile(files);
        console.warn(randomFile)
        return fetch(`/json/${randomFile}.json`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load JSON file");
        }
        return response.json();
      })
      .then((data) => {
        // Serve the JSON data
        console.log(data);
        document.getElementById("output").textContent = JSON.stringify(data, null, 2);
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("output").textContent = "Error loading data.";
      });
  }
  
  // Trigger the function on page load
  document.addEventListener("DOMContentLoaded", serveRandomJson);
  