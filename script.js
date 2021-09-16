const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");

let apiQuotes = [];

// loading func
function startLoading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// done loading func
function completeLoading() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show New Quote
function getNewQuote() {
  startLoading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Set Quote
  quoteText.textContent = quote.text;
  if (quote.author) {
    authorText.textContent = quote.author;
  } else {
    authorText.textContent = "unknown";
  }
  completeLoading();
}

// Get Quotes From API
async function getQuotes() {
  startLoading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    getNewQuote();
  } catch (error) {
    // Catch error here
    console.error("Error - " + error);
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// On click
newQuoteBtn.addEventListener("click", getNewQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
