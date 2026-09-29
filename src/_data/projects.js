const STAMPS = require("./stamps.js");

const projects = [
  {
    slug: "fpszero",
    name: "fpszero.com",
    host: "fpszero.com",
    url: "https://fpszero.com",
    stamps: ["open-source", "in-browser", "no-api"],
    blurb:
      "The lab's front door. A real-time moon, a graph of every active system, " +
      "and a working terminal, all running in the page.",
    detail: {
      kicker: "The lab's front door",
      lede:
        "A research lab and personal site that runs entirely in the browser. Its " +
        "README opens with Feynman: “What I cannot create, I do not understand.”",
      sections: [
        {
          heading: "The moon",
          figure: "moon",
          body: [
            "The moon on fpszero.com is not a picture. Its phase is calculated from " +
              "the current time: where the Sun and Moon sit along the sky, counted in " +
              "days since the J2000 epoch, the angle between them, and how much of " +
              "the disc that leaves lit.",
            "No astronomy API is called. In southern-hemisphere time zones the lit " +
              "side flips, as it does in the real sky. The surface comes from NASA " +
              "Lunar Reconnaissance Orbiter data.",
          ],
        },
        {
          heading: "The system graph",
          figure: "graph",
          body: [
            "Every active system is a node on a slowly turning sphere. The live " +
              "ones, Spectra, FPSZERO Lab and Identity Defense Grid, pulse like " +
              "pulsars. Select a node to read about that system.",
            "Lines join systems that sit close together on the sphere.",
          ],
        },
        {
          heading: "The terminal",
          figure: "terminal",
          body: [
            "A working shell in the page, with a small filesystem that lives in " +
              "your browser's own storage.",
            "Everything it prints is escaped before it reaches the page, so typed " +
              "input cannot turn into markup or script. None of the site's scripts " +
              "make a network request: no fetch, no WebSocket, no beacon.",
          ],
          list: [
            "help", "ls", "cd", "pwd", "cat", "mkdir", "whoami", "history",
            "date", "uptime", "uname", "top", "status", "moon", "matrix",
            "sound", "source", "reboot", "clear",
          ],
        },
      ],
      facts: [
        "Vanilla JavaScript, Three.js and GSAP, built with Vite",
        "Code under AGPL-3.0",
      ],
      links: [
        { label: "Visit fpszero.com", url: "https://fpszero.com" },
        { label: "Source on GitHub", url: "https://github.com/KashishOO7/fpszero" },
      ],
    },
  },
  {
    slug: "spectra",
    name: "Spectra",
    host: "spectra.fpszero.com",
    url: "https://spectra.fpszero.com",
    stamps: ["open-source", "no-account", "in-browser"],
    blurb:
      "A free safety checklist for your accounts, devices, location and the " +
      "people who might come after them. Say what worries you and 45 steps " +
      "reorder around it.",
    detail: {
      kicker: "A free safety checklist, online and offline",
      lede:
        "Most security advice is a hundred-item wall. Spectra asks what you are " +
        "worried about, then hands you a short list, one step at a time, each " +
        "with a primary source.",
      sections: [
        {
          heading: "What you say changes what comes first",
          body: [
            "Tapping the harms, or answering five yes-or-no questions, is all the " +
              "setup there is, and everything works for someone who taps nothing " +
              "at all.",
            "The reordering is measured rather than asserted. Of the 22 single " +
              "answers a reader can give, 16 change the first step, and 8 " +
              "different steps come first.",
            "Underneath sit four layers: who you are, the 10 things that can " +
              "happen, the 17 ways they happen, and the 45 steps you can take.",
          ],
        },
        {
          heading: "Say it in your own words",
          body: [
            "Type what is happening, in a plain sentence, and the step that covers " +
              "it comes first. Below its threshold Spectra says it does not cover " +
              "that, and stops, rather than handing you the nearest thing on the " +
              "shelf. No model, no download, nothing generated.",
            "For a reader already in trouble there are five incident paths, " +
              "reachable from every page, because that reader cannot start with a " +
              "checklist.",
          ],
        },
        {
          heading: "Yours, and it stays yours",
          body: [
            "Your answers live in IndexedDB on your own device. The page ships " +
              "connect-src 'self', so the browser itself forbids the app from " +
              "contacting anything else.",
            "Your setup travels as seven characters, or as a link or QR code. All " +
              "of them ride in the URL fragment, which browsers never transmit, so " +
              "nothing reaches a server. The code is a fixed width, so its length " +
              "cannot leak how far through the list you are, and it carries a " +
              "checksum, so a mis-heard character is refused rather than quietly " +
              "loading someone else's setup.",
            "A timeline keeps what you finished and when, and /playbook turns the " +
              "list into paper with tick boxes through the browser's own Save as " +
              "PDF, with no PDF library to download.",
          ],
        },
      ],
      facts: [
        "45 steps, 10 harms, 17 attack vectors",
        "26 validators: every step carries a primary source",
        "SvelteKit 2, a static app on GitHub Pages",
        "Code AGPL-3.0-only, content CC BY-SA 4.0",
      ],
      links: [
        { label: "Open Spectra", url: "https://spectra.fpszero.com" },
        { label: "Source on GitHub", url: "https://github.com/KashishOO7/spectra" },
      ],
    },
  },
  {
    slug: "fpszero-lab",
    name: "fpszero-lab",
    host: "lab.fpszero.com",
    url: "https://lab.fpszero.com",
    stamps: ["open-source", "knowledge-base"],
    blurb:
      "An open knowledge base for security, systems, forensics, quantum and AI. " +
      "Every page decomposes a topic to its base axioms and rebuilds from the " +
      "ground up.",
    detail: {
      kicker: "Knowledge base",
      lede:
        "A free, structured knowledge base. Every page takes a topic down to its " +
        "base axioms and rebuilds it from there.",
      sections: [
        {
          heading: "How it is organised",
          body: [
            "Six sections: Protocol, Roadmaps, Mental Models, Knowledge, Research " +
              "and Reference. Mental Models explains hard ideas as physical " +
              "analogies. Roadmaps run from zero to operational.",
            "The roadmaps cover cybersecurity, DFIR, mobile security, CTF, quantum " +
              "computing, cloud, bug bounty, reverse engineering and AI/ML security.",
          ],
        },
      ],
      facts: ["Built with MkDocs and the Material theme", "No paywalls"],
      links: [
        { label: "Open the lab", url: "https://lab.fpszero.com" },
        { label: "Source on GitHub", url: "https://github.com/KashishOO7/fpszero-lab" },
      ],
    },
  },
  {
    slug: "svalekh",
    name: "Svalekh",
    host: "kashishoo7.github.io/svalekh",
    url: "https://kashishoo7.github.io/svalekh/",
    stamps: ["open-source", "in-browser", "privacy-first", "offline"],
    blurb:
      "A private resume builder. No account, no servers, no tracking. " +
      "Exports to PDF, DOCX and HTML.",
    detail: {
      kicker: "Résumé builder",
      lede:
        "Build a résumé in your browser with no account, no server and no " +
        "tracking. Every feature is free, including PDF and Word export.",
      sections: [
        {
          heading: "What it does",
          body: [
            "Exports to PDF, Word and HTML. Install it once and it keeps working " +
              "offline. Black-bar redactions hide a phone number or a salary before " +
              "a résumé goes public, and a backup file keeps your data yours.",
            "Its sample résumés belong to Mark Watney, Ryland Grace and Joseph Cooper.",
          ],
        },
      ],
      facts: ["Works offline as an installed web app", "Code AGPL-3.0"],
      links: [
        { label: "Open Svalekh", url: "https://kashishoo7.github.io/svalekh/" },
        { label: "Source on GitHub", url: "https://github.com/KashishOO7/svalekh" },
      ],
    },
  },
  {
    slug: "aegis",
    name: "AEGIS",
    host: null,
    url: null,
    stamps: ["in-development", "on-device", "privacy-first"],
    blurb:
      "Phishing detection using local multi-headed attention models. " +
      "Nothing leaves the device.",
    detail: {
      kicker: "In development",
      lede:
        "Phishing detection that runs on your own device, using local " +
        "multi-headed attention models. Nothing leaves the device.",
      sections: [
        { heading: "Status", body: ["Not public yet."] },
      ],
      facts: [],
      links: [],
    },
  },
];

for (const p of projects) {
  for (const key of p.stamps || []) {
    if (!STAMPS[key]) {
      throw new Error(
        `projects.js: "${p.name}" uses unknown stamp "${key}". ` +
          `Known stamps: ${Object.keys(STAMPS).join(", ")}`
      );
    }
  }
  if (!/^[a-z0-9-]+$/.test(p.slug || "")) {
    throw new Error(`projects.js: "${p.name}" needs a lowercase slug for its dossier id`);
  }
  p.stampLabels = (p.stamps || []).map((key) => ({ key, label: STAMPS[key] }));
}

module.exports = projects;
