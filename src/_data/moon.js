const RAD = Math.PI / 180;
const SYNODIC_DAYS = 29.530588;

function phaseAt(date) {
  const jd = date.getTime() / 86400000 + 2440587.5;
  const d = jd - 2451545.0;

  const sunAnomaly = 357.529 + 0.98560028 * d;
  const sunMeanLong = 280.459 + 0.98564736 * d;
  const sunLong =
    sunMeanLong + 1.915 * Math.sin(sunAnomaly * RAD) + 0.02 * Math.sin(2 * sunAnomaly * RAD);

  const moonMeanLong = 218.316 + 13.176396 * d;
  const moonAnomaly = 134.963 + 13.064993 * d;
  const moonLong = moonMeanLong + 6.289 * Math.sin(moonAnomaly * RAD);

  const elongation = (((moonLong - sunLong) % 360) + 360) % 360;
  const illumination = (1 - Math.cos(elongation * RAD)) / 2;
  const age = (elongation / 360) * SYNODIC_DAYS;

  let name = "New Moon";
  if (age >= 1 && age < 7) name = "Waxing Crescent";
  else if (age >= 7 && age < 8) name = "First Quarter";
  else if (age >= 8 && age < 14) name = "Waxing Gibbous";
  else if (age >= 14 && age < 16) name = "Full Moon";
  else if (age >= 16 && age < 22) name = "Waning Gibbous";
  else if (age >= 22 && age < 23) name = "Last Quarter";
  else if (age >= 23 && age < 29) name = "Waning Crescent";

  return { elongation, illumination, age, name };
}

function litPath(elongation, cx, cy, r) {
  const e = elongation * RAD;
  const rx = Math.abs(Math.cos(e)) * r;
  const waxing = elongation < 180;
  const gibbous = Math.cos(e) < 0;

  const top = `${cx} ${cy - r}`;
  const bottom = `${cx} ${cy + r}`;
  const limbSweep = waxing ? 1 : 0;
  const termSweep = waxing === gibbous ? 1 : 0;

  return `M ${top} A ${r} ${r} 0 0 ${limbSweep} ${bottom} A ${rx.toFixed(2)} ${r} 0 0 ${termSweep} ${top} Z`;
}

const now = process.env.SITE_BUILT_AT ? new Date(process.env.SITE_BUILT_AT) : new Date();
if (Number.isNaN(now.getTime())) throw new Error(`SITE_BUILT_AT is not a date: ${process.env.SITE_BUILT_AT}`);
const phase = phaseAt(now);

module.exports = {
  phaseAt,
  litPath,
  builtAt: now.toISOString(),
  builtOn: new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(now),
  name: phase.name,
  percent: Math.round(phase.illumination * 100),
  ageDays: phase.age.toFixed(1),
  elongation: phase.elongation.toFixed(1),
  path: litPath(phase.elongation, 60, 60, 52),
};
