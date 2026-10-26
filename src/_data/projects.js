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
        "A research lab and personal site that runs entirely in the browser.",
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
      "A free security playbook: guided steps for your accounts, money, devices " +
      "and privacy, so you know what to do first, before something goes wrong " +
      "and right after it does.",
    detail: {
      kicker: "A free security playbook",
      lede:
        "Guided steps for your accounts, money, devices and privacy, so you know " +
        "what to do first, before something goes wrong and right after it does.",
      sections: [
        {
          heading: "Why I built it",
          body: [
            "I once got the chance to run an on-site security audit for a client. " +
              "Nothing goes as planned. You can be an experienced auditor with a " +
              "well-defined scope and a carefully crafted way of working, and " +
              "reality is still relative. You iterate on the spot, you uncover the " +
              "blind spots, and above all you are the best at what you do. Voilà, " +
              "audit done.",
            "But what about the vulnerabilities we carry with us all the time? " +
              "Unlike our clients, we have no auditors reviewing our own lives. " +
              "Nobody scopes our digital footprint, flags our physical habits or " +
              "points out our blind spots. We have to own our privacy posture, " +
              "digital or physical, and keep it secure.",
            "And here is the thing. From clicking a random link to filling out a " +
              "survey form outside a mall, we tend to run weak, not at the " +
              "security level but at the emotional one.",
            "TARS said it best: “Absolute honesty isn’t always the most " +
              "diplomatic, or the safest form of communication with emotional " +
              "beings.” We are not purely rational, and attackers know that. To " +
              "protect ourselves, we first have to understand how we respond " +
              "emotionally when things feel urgent.",
          ],
        },
        {
          heading: "Where it came from",
          body: [
            "Spectra began as a Notion template. Friends and relatives kept " +
              "coming to me with the same problems: a phishing link they had " +
              "clicked, a social media account taken over, someone stalking them. " +
              "I could not help everyone, so I built Spectra for people to learn " +
              "the everyday habits that look after their accounts, devices and " +
              "personal details, under the FPSZERO ecosystem.",
            "If any of this resonates with you, I would love for you to try it " +
              "and tell me what you think. Honest thoughts, rough edges, ideas, " +
              "all of it. I am the sole maintainer and this is very much a living " +
              "project.",
          ],
        },
        {
          heading: "What you say changes what comes first",
          body: [
            "Someone worried about a partner, someone worried about scams and " +
              "someone worried about data brokers get different priorities out of " +
              "the same steps, because the order follows what the reader says is " +
              "going on. Of the 22 single answers a reader can give, 16 change the " +
              "first step, and 8 different steps come first.",
            "Tapping the harms, or answering five yes-or-no questions, is all the " +
              "setup there is, and everything works for someone who taps nothing " +
              "at all. You can also type “my ex knows where I am”, and the step " +
              "that covers it comes first. Below its threshold Spectra says it " +
              "does not cover that, and stops, instead of handing you the closest " +
              "thing on the shelf. No model, no download, nothing generated.",
            "Get help has six guides for the reader already in trouble, from a " +
              "hacked account to having just paid a scammer. There is also a " +
              "42-question FAQ, a timeline of what you finished and when, and a " +
              "printable checklist through the browser's own Save as PDF.",
          ],
        },
        {
          heading: "Yours, and it stays yours",
          body: [
            "Everything runs in the browser. Your state lives in IndexedDB on your " +
              "own device and never leaves it, and the page ships connect-src " +
              "'self', so the browser itself forbids the app from contacting " +
              "anything. Nobody pays to appear in Spectra, and it never tells you " +
              "to buy or install a named product.",
            "Your setup moves to another device as seven characters, or as a link " +
              "or QR code. Both ride in the URL fragment, which browsers never " +
              "transmit, so the server never receives either.",
          ],
        },
        {
          heading: "What it is, and is not",
          body: [
            "Spectra is a prioritisation engine, not a calibrated risk calculator. " +
              "The weights are judgement, set against a written rubric, not " +
              "measured from data. It is educational information, not " +
              "professional advice. It is not accepting contributions yet: the " +
              "content is being rewritten.",
          ],
        },
      ],
      facts: [
        "60 steps, 10 harms, 17 attack vectors",
        "27 blocking validators run on the content, and every step needs a primary source",
        "No accounts, no server, no analytics",
        "SvelteKit 2, Svelte 4, TypeScript and Tailwind, built to GitHub Pages as a PWA",
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
