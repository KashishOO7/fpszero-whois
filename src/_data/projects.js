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
    stamps: ["open-source", "no-account", "offline"],
    blurb:
      "Plain, sourced steps for your accounts, devices, location and the scams " +
      "aimed at you. You do not need a problem to start.",
    detail: {
      kicker: "A free safety checklist, online and offline",
      lede:
        "Plain, sourced steps for your accounts, devices, location and the scams " +
        "aimed at you. You do not need a problem to start. If you already have " +
        "one, this still works.",
      sections: [
        {
          heading: "What it builds for you",
          body: [
            "Say what worries you and it orders 38 steps around your situation, no " +
              "account needed. It keeps a timeline of what you have done, maps who " +
              "you are guarding against, and has step-by-step help for when " +
              "something has already happened.",
          ],
        },
        {
          heading: "Yours, on every device",
          body: [
            "Everything stays in your browser. Move your list to another phone or " +
              "laptop with a QR code, export it as a file, or print it on paper.",
          ],
        },
      ],
      facts: [
        "Every step cites its source",
        "Hard words explained on tap",
        "SvelteKit, AGPL-3.0, CC BY-SA 4.0",
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
