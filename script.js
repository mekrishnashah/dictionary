function searchWord() {
  const word = document.getElementById('wordInput').value.trim();
  const resultDiv = document.getElementById('result');

  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word!</p>";
    return;
  }

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then(data => {
      const wordData = data[0];
      const meaning = wordData.meanings[0];
      const phonetics = wordData.phonetics.find(p => p.audio) || {};

      resultDiv.innerHTML = `
        <h2>${wordData.word}</h2>
        <p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>
        <p><strong>Definition:</strong> ${meaning.definitions[0].definition}</p>
        ${meaning.definitions[0].example ? `<p><strong>Example:</strong> "${meaning.definitions[0].example}"</p>` : ''}
        ${phonetics.audio ? `
          <div class="pronounce">
            <p><strong>Pronunciation:</strong></p>
            <audio controls src="${phonetics.audio}"></audio>
          </div>
        ` : ''}
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}
