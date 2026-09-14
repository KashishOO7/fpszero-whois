module.exports = {
  author: "Kashish Charaya (FPSZERO)",
  name: "Kashish Charaya",
  brand: "FPSZERO",
  role: "Security researcher. India.",
  domain: "whois.fpszero.com",
  url: "https://whois.fpszero.com",
  email: "kashish@fpszero.com",
  lang: "en",

  securityExpires: new Date(
    (process.env.SITE_BUILT_AT ? Date.parse(process.env.SITE_BUILT_AT) : Date.now()) + 365 * 86400000
  ).toISOString(),

  profiles: [
    { label: "GitHub", url: "https://github.com/KashishOO7" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/kashish-charaya/" },
    { label: "Medium", url: "https://medium.com/@kashi.sh" },
    { label: "Medium (essays)", url: "https://medium.com/@Kashish101" },
    { label: "A Principia", url: "https://fpszero.substack.com" },
    { label: "Beyond the Absurd", url: "https://kashish101.substack.com" },
    { label: "fpszero.com", url: "https://fpszero.com" },
  ],
};
