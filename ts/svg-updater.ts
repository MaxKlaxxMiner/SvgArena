/* tslint:disable:one-line max-line-length interface-name comment-format */

class SvgUpdater
{
  static run(): void
  {
    const defaultSvg =
      '<svg width="300" viewBox="0 0 100 100" stroke="currentColor">\r\n' +
      '  <path d="M 30,30 h 40 v 40 h -40 z" />\r\n' +
      '</svg>\r\n' +
      '\r\n' +
      '<svg width="300" viewBox="0 0 10 10" stroke="currentColor" stroke-width="0.1">\r\n' +
      '  <path d="M3 3h4v4H3z" />\r\n' +
      '</svg>\r\n' +
      '\r\n' +
      '<svg style="display:none">\r\n' +
      '  <symbol id="rofl" stroke="currentColor" stroke-width="0.1">\r\n' +
      '    <path d="M3 3h4v4H3z" />\r\n' +
      '  </symbol>\r\n' +
      '</svg>\r\n' +
      '\r\n' +
      '<svg width="300" viewBox="0 0 10 10">\r\n' +
      '  <use href="#rofl"></use>\r\n' +
      '</svg>\r\n' +
      '\r\n' +
      '<svg width="300" viewBox="0 0 20 20">\r\n' +
      '  <use href="#rofl"></use>\r\n' +
      '  <use href="#rofl" transform="translate(10, 0)" style="fill: #4f7; color: #042"></use>\r\n' +
      '  <use href="#rofl" transform="translate(-4, 1) scale(2.5)" style="fill: #0003; color: #0006"></use>\r\n' +
      '  <use href="#rofl" transform="translate(15, 8) rotate(45)" style="fill: #f004; color: #f008"></use>\r\n' +
      '</svg>\r\n';

    const el = document.getElementById("txt") as HTMLTextAreaElement;
    if (!el) return;
    el.innerHTML = defaultSvg;
    const prev = document.getElementById("preview");
    if (!prev) return;

    var known = "";
    setInterval(() =>
    {
      const txt = el.value;
      if (txt === known) return;
      prev.innerHTML = known = txt;
    }, 100);
  }
}

document.addEventListener("DOMContentLoaded", SvgUpdater.run);
