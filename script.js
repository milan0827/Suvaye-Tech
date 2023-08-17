let search = document.getElementById("search");
const form = document.getElementById("form");
const output = document.getElementById("output");
const audio = document.getElementById("audio");
const result = document.getElementById("result");

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(`${url}${search.value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      result.innerHTML = `
  <div
    class="output border-gray-200 border-solid border-2 h-96 rounded-xl bg-slate-50	"
    id="output"
  >
    <div class="output__word ml-6 mt-4">
      <button onclick="playAudio()">
        <i
          class="fa-solid fa-play bg-black w-8 h-8 text-zinc-50 inline-flex items-center justify-center rounded-2xl icon"
        ></i>
      </button>
      <p class="output-word-origin inline">${data[0].phonetic}</p>
    </div>
    <div class="flex items-center gap-4 ml-8 mt-4">
      <p class="text-white py-1 px-2 rounded-md speech active">${data[0].meanings[0].partOfSpeech}</p>
      <p class="text-white py-1 px-2 rounded-md speech">${data[0].meanings[1].partOfSpeech}</p>
    </div>

    <div class="output__desc ml-8 mt-4">
      <ul class="output__desc--list">
        <li class="output__desc--list-item mb-2">
          ${data[0].meanings[0].definitions[0].definition}
        </li>
        <li class="output__desc--list-item mb-2">
          ${data[0].meanings[0].definitions[1].definition}
        </li>
      </ul>
    </div>
  </div>
    `;

      audio.setAttribute("src", `https:${data[0].phonetics[1].audio}`);
    })
    .catch((data) => {
      result.innerHTML = `<p>No such word found</p>`;
    });
});

function playAudio() {
  audio.play();
}
