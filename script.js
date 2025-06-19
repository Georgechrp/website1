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
    const base = window.location.pathname.includes("/website1/") ? "/website1" : "";

    // site.yml
    const resSite = await fetch(base + "/data/site.yml");
    const siteYml = await resSite.text();
    const siteData = jsyaml.load(siteYml);
    document.getElementById("title").textContent = siteData.title;
    document.title = siteData.title;
    document.getElementById("name").textContent = siteData.name;
    document.getElementById("profile").src = base + "/" + siteData.profile_photo;

    // about.yml
    const resAbout = await fetch(base + "/data/about.yml");
    const aboutYml = await resAbout.text();
    const aboutData = jsyaml.load(aboutYml);
    document.getElementById("about").textContent = aboutData.about_text;

    // contact.yml
    const resContact = await fetch(base + "/data/contact.yml");
    const contactYml = await resContact.text();
    const contactData = jsyaml.load(contactYml);
    document.getElementById("email").textContent = "Email: " + contactData.email;
    const githubLink = document.querySelector("#github a");
    githubLink.href = contactData.github;
    githubLink.textContent = contactData.github;

  } catch (error) {
    console.error("Failed to load data:", error);
  }
}

loadSiteData();
