/* tslint:disable:one-line max-line-length interface-name comment-format */

class SvgPaths
{
  static run(): void
  {
    const defaultPaths =
      'M  30 5\r\n' +
      'H  70\r\n' +
      'C  90  5  90  45   70  45\r\n' +
      'C  50 45  50  15   30  35\r\n' +
      'C  10 55  20   5   30   5\r\n' +
      '\r\n' +
      'M  30 55\r\n' +
      'h  40\r\n' +
      'c  20  0  20  40    0  40\r\n' +
      's        -20 -30  -40 -10\r\n' +
      '         -10 -30    0 -30\r\n' +
      '\r\n';

    const el = document.getElementById("txt") as HTMLTextAreaElement;
    if (!el) return;
    el.innerHTML = defaultPaths;
    const prev = document.getElementById("preview");
    if (!prev) return;

    var known = "";
    setInterval(() =>
    {
      const txt = el.value;
      if (txt === known) return;
      prev.innerHTML = '<svg width="300" viewBox="0 0 100 100" stroke="currentColor"><path d="' + (known = txt).replace(/[&'"<>]/g, '') + '" /></svg>';
    }, 100);
  }
}

document.addEventListener("DOMContentLoaded", SvgPaths.run);
