const library = require("./library.json");

const books = [
  ...library.shelves.map((s) => ({ label: s.book.label, url: `/${s.slug}/`, colour: s.book.colour })),
  { label: "Catalogue", url: "/catalogue/", colour: "#5A3550" },
  { label: "Workshop", url: "/workshop/", colour: "#1F5158" },
  { label: "Contact", url: "/contact/", colour: "#8A6A24" },
];

const CASE = {
  width: 300,
  frame: 11,
  padding: 14,
  shelves: [
    { top: 19, base: 224 },
    { top: 233, base: 425 },
  ],
};

const SPINE = {
  minWidth: 44,
  maxWidth: 92,
  perChar: 3.1,
  gap: 5,
  fontSize: 15,
  charHeight: 9.8,
  bandInset: 14,
  bandThick: 4,
  clearance: 12,
  minFill: 0.62,
};

const ENDS = 2 * (SPINE.bandInset + SPINE.bandThick + SPINE.clearance);

function layout() {
  const perShelf = Math.ceil(books.length / CASE.shelves.length);
  const laid = [];

  books.forEach((book, i) => {
    const shelfIndex = Math.min(Math.floor(i / perShelf), CASE.shelves.length - 1);
    (laid[shelfIndex] ||= []).push(book);
  });

  const out = [];

  laid.forEach((row, shelfIndex) => {
    const shelf = CASE.shelves[shelfIndex];
    const available = shelf.base - shelf.top;
    const inner = CASE.width - 2 * CASE.frame - 2 * CASE.padding;

    let widths = row.map((b) =>
      Math.min(SPINE.maxWidth, Math.max(SPINE.minWidth, b.label.length * SPINE.perChar + 30))
    );
    const totalGap = SPINE.gap * (row.length - 1);
    const scale = (inner - totalGap) / widths.reduce((a, b) => a + b, 0);
    widths = widths.map((w) => w * scale);

    let x = CASE.frame + CASE.padding;

    row.forEach((book, i) => {
      const width = widths[i];
      const needed = book.label.length * SPINE.charHeight + ENDS;
      const wobble = [0.94, 1.0, 0.88, 0.97, 0.91][i % 5];

      let height = Math.max(needed, available * SPINE.minFill * wobble);
      height = Math.min(height, available);

      const room = height - ENDS;
      const fontSize =
        book.label.length * SPINE.charHeight > room
          ? Math.max(9, Math.floor((room / book.label.length) * (SPINE.fontSize / SPINE.charHeight)))
          : SPINE.fontSize;

      out.push({
        ...book,
        x: Math.round(x),
        y: Math.round(shelf.base - height),
        width: Math.round(width),
        height: Math.round(height),
        fontSize,
        centreX: Math.round(x + width / 2),
        centreY: Math.round(shelf.base - height / 2),
        bandTop: Math.round(shelf.base - height + SPINE.bandInset),
        bandLow: Math.round(shelf.base - SPINE.bandInset - SPINE.bandThick),
      });

      x += width + SPINE.gap;
    });
  });

  return out;
}

module.exports = {
  case: CASE,
  height: CASE.shelves[CASE.shelves.length - 1].base + CASE.frame + 4,
  books: layout(),
};
