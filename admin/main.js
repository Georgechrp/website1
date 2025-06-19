if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

// Περιμένουμε να φορτωθεί πλήρως
window.addEventListener("load", function () {
  if (window.CMS) {
    window.CMS.init();
  } else {
    console.error("CMS failed to load.");
  }
});
  