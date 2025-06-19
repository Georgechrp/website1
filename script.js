document.getElementById("langSwitcher").addEventListener("change", async function () {
  const lang = this.value;
  const res = await fetch("lang.json");
  const data = await res.json();
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (data[lang] && data[lang][key]) el.textContent = data[lang][key];
  });
});
