//selectors
const qContainer = document.getElementById("quote-container");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const xBtn = document.getElementById("x");
const loader = document.getElementById("loader");

const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

let apiQuotes = [];

function geneRandomQoute() {
  const q = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (q.text.includes("Isra")) {
    quote.innerText = "Free Free Palestine";
    // console.log(q.text,q.author)
    // author.innerText = "محمـــد محمـــود ";
    return;
  }
  quote.innerText = q.text;
  if (!q.author || q.author === "Anonymous") author.innerText = "Un-Known";
  else author.innerText = q.author;
  //check qoute length
  q.text.length > 100 ? quote.classList.add("long-quote") : quote.classList.remove("long-quote");
}

async function getData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("something gose wrong");
    apiQuotes = await response.json();
    geneRandomQoute();
  } catch (err) {
    alert(err);
  }
}
function postQuote() {
  const xUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
  window.open(xUrl, "_blank");
}
//on click
// newQuote.addEventListener("click", getData);
["keydown", "click"].forEach((ev) => {
  newQuoteBtn.addEventListener(ev, getData);
});

xBtn.addEventListener("click", postQuote);

//q container hide
window.addEventListener("load", function () {
  qContainer.classList.add("hide");
  setTimeout(() => {
    qContainer.classList.remove("hide");
  }, 500);
});
