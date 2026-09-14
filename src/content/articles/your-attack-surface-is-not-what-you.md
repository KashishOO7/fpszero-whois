---
title: "Your Attack Surface Is Not What You Think It Is"
author: "Kashish Charaya (FPSZERO)"
date: 2026-03-24
source: substack
source_url: "https://fpszero.substack.com/p/your-attack-surface-is-not-what-you"

category: security
tags: [threat-modelling, attack-surface, social-engineering, privacy]
---
We entered the age of surveillance long before AI was a thing among the masses.

It started with the thought of keeping law and order. Then it expanded to surveilling enemies, intruders, and opposition. Then it became something else entirely: hacking. Making something do what it was not meant to do. Breaking into telephone systems to make free calls. Entering digital spaces without limits. Stalking people through their social presence, not just physical but virtual.

Between 2004 and 2008, Facebook became the new norm of social interaction. The early days of Google, Yahoo, and MySpace had limited interactivity for public usage but still exposed a surprising amount of user information to anyone who looked. The surface was already cracking before most people noticed.

Then came the era of advertisement. We saw billboards, pamphlets, ads on TV and the internet, all serving one purpose: sell a product, an idea, or an action. You pay cash, you get the stuff. Simple transaction. But it escalated sideways when advertisement became the breeding ground for scams, data breaches, and privacy intrusions.

Your personal data became the input fed into systems to generate highly targeted ad campaigns designed to redirect your attention and thought process. In 2018, Cambridge Analytica demonstrated this at scale: 87 million Facebook profiles harvested without consent, used to build psychological profiles and influence political behavior. That wasn’t a hack in the traditional sense. It was the system working exactly as designed.

Social media became the biggest data collector and a live hub for threat actors to scrape data in real time. The process is straightforward: scrape PII, craft a personalized individual profile, map the available attack surface of the target (how and where they are most vulnerable), then launch the attack. Phishing, spear phishing, doxxing, and further exploitation for reasons that don’t need elaboration.

This became easier when every app in your phone became an active amplifier of your personal life. What you do, where you are, whom you meet, what you like, what you don’t, what hurts you easily. Especially how easy you are to manipulate.

Instagram specifically has been the top contributor here. The way it delivers personalized ads, what it knows about your behavior patterns, how it shapes attention. In 2021, Facebook’s own internal research (leaked by Frances Haugen) confirmed that Instagram’s algorithm was worsening body image issues in teenage girls and amplifying anxiety. The platform knew. It optimized for engagement anyway, because engagement is monetization.

But it’s not just social media. Every app you use knows a generous amount about you in real time. It’s not always that the app needs all this information to function. It doesn’t. It’s a way of gathering enormous amounts of data to improve and introduce more features, improve monetization models, and most importantly to keep the user hooked.

Consider the tracking pixel in every email you receive daily. Your real-time DNS queries to your ISP. The metadata from every photo you upload. The AI that is so keen to get to know you. Think about what you discussed with an LLM last time using your personal email account. What you shared with it. How deeply analyzed a personal profile it must have built of you. All stored on a remote server you don’t have access to, with no knowledge of who else can see your data.

In 2023, OpenAI’s privacy policy explicitly stated that conversations may be reviewed by human trainers. In 2024, multiple AI companies faced scrutiny for retaining user data beyond stated purposes. You gave it your thoughts, your fears, your half-formed plans. You gave it context that even your closest people might not have. And you clicked “agree” without reading the terms.

But there are always two sides. As malpractice increases, defense systems also respond and improve.

And somewhere in between all of this sits privacy. The right to privacy. Most people dismiss it by saying “I don’t have anything to hide, why should I care?”

True privacy doesn’t mean staying private all the time and sharing nothing. It means closing the gap between a false sense of safety and the consequences of not being careful in the first place. It means being mindful of what you share, online and offline. What is silently scraping your personal life to use against you, to sell you what you never asked for.

Remember: nothing is free. If you don’t see the underlying cost, you are the product, perceiving a free-of-cost liability as an asset.

In my work, I had the opportunity to conduct a security audit for a client. It gave me a different perception of cybersecurity. We didn’t simply scan the network to find potential vulnerabilities. We investigated the whole organization for loopholes, whether in infrastructure, digital systems, or people. We mapped findings to established frameworks like ISO 27001, NIST SP 800-53, and the NIST Cybersecurity Framework. Most importantly, we refactored our understanding of real-world scenarios and their security implications, and based on that established meaningful scoring for a thorough audit.

But for a while now, I’ve had this itch.

AI is enabling even script kiddies to carry out devastating attacks toward individuals and companies. To safeguard a company, there are dedicated teams working around the clock. SOCs, incident response, red teams, blue teams. But as an individual? You don’t have any of that. You’re exposed and you’re on your own.

So I asked a simple question: what if an individual could audit their own security posture the way an organization does? Not with a generic checklist that treats everyone the same. But with something that adapts to who you actually are and what you’re actually exposed to.

The attack vector for a student differs from the attack vector for a public influencer. The difference lies in the amount of data they’ve shared online, their personality, their emotional states, and how vulnerable they can be to manipulation. The more someone knows about you, the more susceptible you are. The consequences range from personal data being sold, to personalized phishing attempts with a high probability of success, to something deeply personal surfacing publicly. The edge cases are too many to list.

But if I were to synthesize all of them into a smaller model, it would contain three questions: What have I shared that I shouldn’t have? Where am I leaking, emotionally, mentally, and digitally? How do I close this gap?

That’s why I built **Spectra**.

Spectra is an open-source personal security self-audit tool. It lives in your browser. No server interaction, no accounts, no data leaving your machine. Everything runs locally on IndexedDB. Your audit, your data, your control.

It has four modes:

- **Quick Self-Audit** : a guided questionnaire that maps your current exposure across digital, physical, and operational security.
- **Immediate Protocol** : when something has already happened. A breach, a doxxing attempt, a compromised account. Step-by-step response, not panic.
- **Better Alternatives** : privacy-respecting replacements for the tools you use daily. Concrete switches, not abstract advice.
- **Protecting Someone Else** : because sometimes you’re not the one at risk. Someone you care about is.

Each mode questions you on what you came for. The questionnaire takes seconds. The implementation provides the why of every what and how, with citations and references you can verify.

Every completed step feeds the scoring engine, building a personalized security profile. The scoring is not generalized. It’s dynamic and depends on the person, their threat model, their actual adversaries. As you progress, the score adjusts, showing how your posture improves and where the gaps remain. A graph structure gives you a clear view of every module and every step.

There is also an emotional assessment component. Because social engineering exploits emotions before it exploits systems. Urgency, authority, fear, trust: these are attack vectors, and Spectra treats them as such.

As there exist no wrong answers to anything. Just wrong questions at the wrong time.

I can’t guarantee to make your digital life impenetrable. But I can help you understand your actual exposure and improve it, one step at a time.

This is one of my public works under [FPSZERO](https://fpszero.com/), built from first principles and improved in public. The code is open, the content is open, and I intend to keep it that way.

Spectra is not perfect. It’s not trying to be.

It’s an evolving framework, not a finished product. The threat landscape shifts daily. New attack vectors emerge. Old assumptions break. A tool that claims to be complete is a tool that stopped paying attention.

This is why Spectra is built as a community-driven project. The content layer (every threat model, every control, every checklist item) is structured as YAML files that anyone can read, verify, and contribute to. Every factual claim links to a primary source. If a source is outdated or a threat model is missing, that’s a contribution waiting to happen.

What’s in the open right now is the foundation. What it becomes depends on who shows up.

**Where it’s headed:**

The threat landscape feed is already wired in, a living tracker of active security events that adjust relevance scoring in real time. The graph engine will expand to visualize not just your current posture but how it changes over time. New content tracks for specific demographics (journalists, activists, teenagers, small business owners) are mapped but need domain expertise to fill properly. That expertise lives in the community, not in one person.

**Disclaimer:** Spectra is an educational tool, not a replacement for professional security assessment, legal counsel, or incident response. If you’re facing an active, immediate threat, contact local authorities or a professional team. What Spectra offers is awareness and self-assessment for everyday digital life, the gap between doing nothing and calling in professionals.

**Contribute:** The codebase is AGPL-3.0 licensed. The content is CC BY-SA 4.0. PRs are welcome. If you have domain knowledge in physical security, women’s safety, children’s privacy, or regional threat landscapes, those are the areas that need the most attention.

**Try it:** [spectra.fpszero.com](https://spectra.fpszero.com) **Source:** [KashishOO7/spectra](https://github.com/KashishOO7/spectra/)

**Talk to me:** reach out with feedback, ideas, or just what you think is missing.

Thanks for reading A Principia! Subscribe for free to receive new posts and support my work.
