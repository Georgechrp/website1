function initCMSWhenReady() {
  if (window.CMS) {
    window.CMS.init();
  } else {
    setTimeout(initCMSWhenReady, 100);
  }
}

initCMSWhenReady();
