console.log("Client side JS File is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const errorOne = document.querySelector("#error-1");

const fetchSearch = (address) => {
  searchQuery = `/weather?address=${address}`;
  fetch(searchQuery).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        errorOne.textContent = data.error;
      } else {
        messageOne.textContent = `${data.location} - ${data.forecast}`;
      }
    });
  });
};

weatherForm.addEventListener("submit", (e) => {
  messageOne.textContent = "";
  errorOne.textContent = "";
  e.preventDefault();
  const location = search.value;
  fetchSearch(location);
});
