const container = document.getElementById('results');
const input = document.getElementById('search');
const langSelect = document.getElementById('language');
const chapterSelect = document.getElementById('chapter');
let oecdData = [];

async function loadData() {
  const lang = langSelect.value;
  const chapter = chapterSelect.value;
  try {
    const res = await fetch(`assets/oecd/${lang}/${chapter}.json`);
    oecdData = await res.json();
  } catch (e) {
    oecdData = [];
  }
  renderParagraphs(oecdData);
}

function renderParagraphs(data) {
  container.textContent = '';
  data.forEach(p => {
    const div = document.createElement('div');
    div.className = 'para';

    const h3 = document.createElement('h3');
    h3.textContent = `¶ ${p.id} — ${p.title}`;
    const content = document.createElement('div');
    content.style.display = 'none';

    const text = document.createElement('p');
    text.textContent = p.text;
    const expl = document.createElement('div');
    expl.className = 'explanation';
    expl.textContent = p.explanation;

    content.appendChild(text);
    content.appendChild(expl);
    div.appendChild(h3);
    div.appendChild(content);

    h3.addEventListener('click', () => {
      content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });

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

input.addEventListener('input', () => searchParagraphs(input.value));
langSelect.addEventListener('change', loadData);
chapterSelect.addEventListener('change', loadData);

// initial load
loadData();
