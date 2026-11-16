// THE AFFLUENTACCELERATORS - CORE APPLICATION LOGIC

// ============================================================================
// CLEAN URLS & SOCIAL SHARING NORMALIZATION
// ============================================================================
(function() {
  try {
    var p = window.location.pathname;
    if (p.endsWith('/index.html')) {
      var clean = p.replace(/\/index\.html$/, '/') || '/';
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    } else if (p.endsWith('.html')) {
      var clean = p.replace(/\.html$/, '');
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    }
  } catch (e) {}
})();

// Global utility to copy clean shareable URL
window.copyCleanWebsiteLink = function(customPath) {
  try {
    var origin = window.location.origin;
    var path = customPath || window.location.pathname;
    path = path.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
    var cleanUrl = origin + path;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanUrl).then(function() {
        if (typeof showToast === 'function') {
          showToast('Clean link copied to clipboard: ' + cleanUrl);
        } else {