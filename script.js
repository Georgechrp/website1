document.getElementById("langSwitcher").addEventListener("change", async function () {
  const lang = this.value;
  const res = await fetch("lang.json");
  const data = await res.json();
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (data[lang] && data[lang][key]) el.textContent = data[lang][key];
  });
});



async function loadSiteData() {
  try {
    const res = await fetch("data/site.yml");
    const yamlText = await res.text();
    const siteData = jsyaml.load(yamlText);

    document.getElementById("name").textContent = siteData.name;
    document.getElementById("title").textContent = siteData.title;
    document.getElementById("about").textContent = siteData.about_text;
    document.getElementById("email").textContent = siteData.email;
    document.getElementById("github").href = siteData.github;
  } catch (error) {
    console.error("Failed to load site.yml:", error);
  }
}

loadSiteData();
