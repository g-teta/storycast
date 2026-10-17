/* StoryCast — shared data and page logic */

const STORIES = [
  {
    id: "kivu-quiet",
    type: "Audio",
    category: "Nature & place",
    duration: "08:42",
    title: "Finding quiet on Lake Kivu",
    summary: "On the shores of Lake Kivu, one traveler discovers that sometimes the most powerful stories are the ones without words.",
    author: "Eric Mugisha",
    alt: "A lone walker on the shore of Lake Kivu in western Rwanda",
    image: "assets/lake-kivu-rwanda-africa-51725776.webp",
    tone: "kivu",
    transcript: [
      "There is a particular kind of quiet you only find when you leave the road behind. Here, on the shore of Lake Kivu, the green hills rise from the water like old friends. I came looking for a place.",
      "What I found was a different way to listen. The wind moves through the banana leaves. Water touches the shore.",
      "For a moment, there is nothing to do but be here. We spend so much of our lives filling the silence. But out here, silence is not empty.",
      "It is full of everything we have forgotten to notice."
    ]
  },
  {
    id: "woven-by-hand",
    type: "Video",
    category: "People & craft",
    duration: "06:18",
    title: "A life woven by hand",
    summary: "A basket weaver on patience, imperfect things, and the small joy of making something that lasts.",
    author: "Aline Uwase",
    alt: "A weaver shaping a traditional basket in a sunlit courtyard",
    image: "https://i.ytimg.com/vi/bomGCWjq2CY/hqdefault.jpg",
    video: "https://www.youtube-nocookie.com/embed/bomGCWjq2CY?cc_load_policy=1",
    tone: "weave",
    transcript: [
      "Every morning, I sit outside before the village wakes up. The sisal is waiting. It asks for patience, and for hands willing to start again.",
      "My grandmother taught me that a basket does not have to be perfect to be beautiful. It has to hold something. Over the years, I have learned that weaving is also a way of making a life.",
      "Slowly. With care. One small strand at a time."
    ]
  },
  {
    id: "kigali-after-dark",
    type: "Audio",
    category: "Culture & community",
    duration: "12:05",
    title: "When Kigali comes alive",
    summary: "Beyond the city lights, meet the people who give Kigali’s evening streets their unmistakable rhythm.",
    author: "Grace Ingabire",
    alt: "People walking along a lively Kigali street at dusk",
    image: "assets/kigali.jpg",
    tone: "kigali",
    transcript: [
      "As the last light leaves the sky, another city wakes up. The rain turns every street into a reflection. Behind the little shop doors, people are beginning their evenings.",
      "A cook lights the stove. A musician tunes a guitar. Friends find their familiar table.",
      "These are the small rituals that make a city feel like home. Listen closely, and every corner has a story."
    ]
  }
];

/* Photo (if the file exists) on top of a gradient placeholder.
   Put your pictures in an "images" folder using the file names above. */
function mediaHTML(story, extra = "") {
  return `<div class="media tone-${story.tone} ${extra}" role="img" aria-label="${story.alt}">
    <span class="media-note">${story.alt}</span>
    <img src="${story.image}" alt="" onerror="this.remove()">
  </div>`;
}

function storyUrl(story) { return `story.html?id=${story.id}`; }

function cardHTML(s) {
  return `<article class="card">
    <a href="${storyUrl(s)}" tabindex="-1" aria-hidden="true">${mediaHTML(s, "small")}</a>
    <span class="chip">${s.type} story</span>
    <p class="meta">${s.category} · ${s.duration} min</p>
    <h3><a href="${storyUrl(s)}">${s.title}</a></h3>
    <p>${s.summary}</p>
    <p class="by">By ${s.author} · Transcript available</p>
  </article>`;
}

/* ---------- Home ---------- */
function initHome() {
  const featuredEl = document.getElementById("featured");
  const gridEl = document.getElementById("grid");
  const statusEl = document.getElementById("filter-status");
  if (!featuredEl || !gridEl) return;

  const f = STORIES[0];
  featuredEl.innerHTML = `
    ${mediaHTML(f)}
    <div>
      <p class="kicker"><span class="muted">The featured story</span><span class="acc">${f.category}</span></p>
      <h2>${f.title}</h2>
      <p class="summary">${f.summary}</p>
      <div class="actions">
        <a class="btn" href="${storyUrl(f)}">Listen to the story</a>
        <span class="meta">${f.duration} min</span>
      </div>
      <p class="meta">Full transcript available</p>
    </div>`;

  function render(filter) {
    const list = filter === "all" ? STORIES : STORIES.filter(s => s.type === filter);
    gridEl.innerHTML = list.map(cardHTML).join("");
    statusEl.textContent = `Showing ${list.length} ${list.length === 1 ? "story" : "stories"}`;
  }

  document.querySelectorAll(".filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(b => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      render(btn.dataset.filter);
    });
  });
  render("all");
}

/* ---------- About ---------- */
function initAbout() {
  const el = document.getElementById("about-image");
  if (el) el.innerHTML = mediaHTML({
    alt: "A weaver thoughtfully shaping a basket in her courtyard",
    image: "https://i.ytimg.com/vi/bomGCWjq2CY/hqdefault.jpg", tone: "weave"
  }, "wide");
}

/* ---------- Story room ---------- */
function initStory() {
  const root = document.getElementById("story-root");
  if (!root) return;

  const id = new URLSearchParams(location.search).get("id");
  const s = STORIES.find(x => x.id === id) || STORIES[0];
  document.title = `${s.title} — StoryCast`;

  document.getElementById("crumb-cat").textContent = s.category;
  document.getElementById("story-cat").textContent = s.category;
  document.getElementById("story-title").textContent = s.title;
  document.getElementById("story-summary").textContent = s.summary;
  document.getElementById("story-author").textContent = `By ${s.author}`;
  document.getElementById("story-type").textContent = `${s.type} story · ${s.duration} min`;
  document.getElementById("story-media").innerHTML = s.video
    ? `<div class="video-frame"><iframe src="${s.video}" title="${s.title} (video)" loading="lazy" allowfullscreen allow="encrypted-media; picture-in-picture"></iframe></div>`
    : mediaHTML(s, "wide");
  document.getElementById("speaker").textContent = `${s.author} · Narrator`;
  document.getElementById("transcript-body").innerHTML = s.transcript.map(p => `<p>${p}</p>`).join("");
  document.getElementById("related-grid").innerHTML =
    STORIES.filter(x => x.id !== s.id).map(cardHTML).join("");

  /* Reading preview using the browser's built-in voice */
  const text = s.transcript.join(" ");
  const btn = document.getElementById("play-btn");
  const bar = document.getElementById("bar");
  const fill = bar.querySelector("span");
  const pct = document.getElementById("pct");
  const note = document.getElementById("player-note");
  let playing = false;

  function setProgress(p) {
    const v = Math.max(0, Math.min(1, p));
    fill.style.width = `${v * 100}%`;
    pct.textContent = `${Math.round(v * 100)}%`;
    bar.setAttribute("aria-valuenow", Math.round(v * 100));
  }
  function setPlaying(on) {
    playing = on;
    btn.textContent = on ? "Stop" : "Play";
    btn.setAttribute("aria-pressed", String(on));
  }

  btn.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
      note.textContent = "Your browser cannot read aloud. Please use the transcript below.";
      return;
    }
    if (playing) { speechSynthesis.cancel(); setPlaying(false); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-GB"; u.rate = 0.95;
    u.onboundary = e => setProgress(e.charIndex / text.length);
    u.onend = () => { setProgress(1); setPlaying(false); };
    u.onerror = () => setPlaying(false);
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    setPlaying(true);
  });
  window.addEventListener("pagehide", () => speechSynthesis && speechSynthesis.cancel());

  /* Download the transcript as a text file */
  document.getElementById("download-btn").addEventListener("click", () => {
    const body = `${s.title}\nBy ${s.author}\n\n${s.transcript.join("\n\n")}\n`;
    const url = URL.createObjectURL(new Blob([body], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url; a.download = `${s.id}-transcript.txt`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  });
}

initHome();
initAbout();
initStory();