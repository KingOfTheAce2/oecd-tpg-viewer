const container = document.getElementById('results');
const input = document.getElementById('search');

function renderParagraphs(data) {
  container.innerHTML = '';
  data.forEach(p => {
    const div = document.createElement('div');
    div.className = 'para';
    div.innerHTML = `
      <h3 onclick="this.nextElementSibling.style.display = 
        (this.nextElementSibling.style.display === 'none' ? 'block' : 'none')">
        ¶ ${p.id} — ${p.title}
      </h3>
      <div style="display: none;">
        <p>${p.text}</p>
        <div class="explanation">${p.explanation}</div>
      </div>
    `;
    container.appendChild(div);
  });
}

function searchParagraphs(query) {
  const q = query.toLowerCase();
  const filtered = oecdData.filter(p =>
    p.id.includes(q) ||
    p.title.toLowerCase().includes(q) ||
    p.text.toLowerCase().includes(q) ||
    p.explanation.toLowerCase().includes(q)
  );
  renderParagraphs(filtered);
}

input.addEventListener('input', () => {
  searchParagraphs(input.value);
});

renderParagraphs(oecdData);
