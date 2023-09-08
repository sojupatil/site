document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  // Function to fetch search results from the JSON file
  async function fetchSearchResults() {
    try {
      const response = await fetch("searchResults.json");
      const resultsData = await response.json();
      return resultsData;
    } catch (error) {
      console.error("Error fetching search results:", error);
      return [];
    }
  }

  // Function to perform the search and display results
  async function performSearch(query) {
    const resultsData = await fetchSearchResults();
    const filteredResults = resultsData.filter((result) =>
      result.title.toLowerCase().includes(query.toLowerCase())
    );

    // Display results in the searchResults div
    if (filteredResults.length > 0) {
      searchResults.innerHTML = filteredResults
        .map(
          (result) => `
                <a href="${result.url}">
                    <div class="searchr">
                        ${result.title}
                    </div>
                    </a>
                `
        )
        .join("");
    } else {
      searchResults.innerHTML = "No results found.";
    }
  }

  // Event listener for input changes
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim();

    if (query === "") {
      searchResults.innerHTML = ""; // Clear results if the input is empty
    } else {
      performSearch(query); // Perform the search
    }
  });
});
