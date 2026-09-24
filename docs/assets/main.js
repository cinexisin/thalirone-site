// thalirone.com — the only script: turns the contact form into a ready-to-send WhatsApp message.
(function () {
  var f = document.getElementById("composer");
  if (!f) return;
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = function (n) { return (f.elements[n] && f.elements[n].value || "").trim(); };
    if (!v("name")) { f.elements.name.focus(); f.elements.name.setAttribute("aria-invalid", "true"); return; }
    var lines = ["Hi Thalir Innovations!", "Name: " + v("name")];
    if (v("area")) lines.push("Area: " + v("area"));
    lines.push("Interested in: " + v("topic"));
    if (v("msg")) lines.push("", v("msg"));
    var url = "https://wa.me/" + f.dataset.wa + "?text=" + encodeURIComponent(lines.join("\n"));
    var w = window.open(url, "_blank", "noopener");
    if (!w) window.location.href = url;
  });
  f.elements.name.addEventListener("input", function () { this.removeAttribute("aria-invalid"); });
})();
