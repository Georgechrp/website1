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
    document.getElementById("email").textContent = "Email: " + contactData.email;

    const socialContainer = document.getElementById("socials");
    socialContainer.innerHTML = ""; // clear existing content

    contactData.socials.forEach(social => {
      const link = document.createElement("a");
      link.href = social.url;
      link.textContent = social.platform;
      link.target = "_blank";
      socialContainer.appendChild(link);
      socialContainer.appendChild(document.createElement("br")); // optional line break
    });


  } catch (error) {
    console.error("Failed to load data:", error);
  }
}

loadSiteData();
