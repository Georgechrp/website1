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
    // site.yml
    const resSite = await fetch("data/site.yml");
    const siteYml = await resSite.text();
    const siteData = jsyaml.load(siteYml);
    document.getElementById("title").textContent = siteData.title;
    document.title = siteData.title; // browser tab title
    document.getElementById("name").textContent = siteData.name;
    document.getElementById("profile").src = siteData.profile_photo;

    // about.yml
    const resAbout = await fetch("data/about.yml");
    const aboutYml = await resAbout.text();
    const aboutData = jsyaml.load(aboutYml);
    document.getElementById("about").textContent = aboutData.about_text;

    // contact.yml
    const resContact = await fetch("data/contact.yml");
    const contactYml = await resContact.text();
    const contactData = jsyaml.load(contactYml);
    document.getElementById("email").textContent = "Email: " + contactData.email;
    document.querySelector("#github a").href = contactData.github;
    document.querySelector("#github a").textContent = contactData.github;

  } catch (error) {
    console.error("Failed to load data:", error);
  }
}

loadSiteData();
