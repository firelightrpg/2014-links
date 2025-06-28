console.log("[DDB 2014 Link Fixer] Loaded");

const replacements = [
  {
    suffix: "Condition",
    matchPaths: [
      "/sources/dnd/free-rules/rules-glossary",
      "/sources/dnd/br-2024/rules-glossary"
    ],
    replacePath: "/sources/dnd/basic-rules-2014/appendix-a-conditions"
  },
  {
    suffix: "Skill",
    matchPaths: [
      "/sources/dnd/free-rules/playing-the-game",
      "/sources/dnd/br-2024/playing-the-game"
    ],
    replacePath: "/sources/dnd/basic-rules-2014/using-ability-scores"
  },
  {
    suffix: "Sense",
    matchPaths: [
      "/sources/dnd/free-rules/rules-glossary",
      "/sources/dnd/br-2024/rules-glossary"
    ],
    replacePath: "/sources/dnd/basic-rules-2014/monsters"
  }
];

const skillAnchors = {
  "Acrobatics": "Acrobatics",
  "Animal Handling": "AnimalHandling",
  "Arcana": "Arcana",
  "Athletics": "Athletics",
  "Deception": "Deception",
  "History": "History",
  "Insight": "Insight",
  "Intimidation": "Intimidation",
  "Investigation": "Investigation",
  "Medicine": "Medicine",
  "Nature": "Nature",
  "Perception": "Perception",
  "Performance": "Performance",
  "Persuasion": "Persuasion",
  "Religion": "Religion",
  "Sleight of Hand": "SleightofHand",
  "Stealth": "Stealth",
  "Survival": "Survival"
};

const senseAnchors = {
  "blindsight": "Blindsight",
  "darkvision": "Darkvision",
  "tremorsense": "Tremorsense",
  "truesight": "Truesight"
};

function fixLinks() {
  document.querySelectorAll('a[href*="/sources/dnd/"]').forEach(el => {
    try {
      const url = new URL(el.href, location.origin);
      for (const { suffix, matchPaths, replacePath } of replacements) {
        if (matchPaths.includes(url.pathname) && url.hash.endsWith(suffix)) {
          const anchorBase = url.hash.slice(1, -suffix.length);
          const newHref = `${replacePath}#${anchorBase}`;
          if (el.href !== newHref) {
            console.log(`[DDB Fixer] Rewriting link: ${el.href} → ${newHref}`);
            el.href = newHref;
          }
          break;
        }
      }
    } catch (e) {
      // Ignore bad hrefs
    }
  });

  // Fix skill links pointing to #Skills
  document.querySelectorAll(
    'a[href="/sources/dnd/free-rules/playing-the-game#Skills"], a[href="/sources/dnd/br-2024/playing-the-game#Skills"]'
  ).forEach(el => {
    const text = el.textContent.trim();
    const anchor = skillAnchors[text];
    if (anchor) {
      const newHref = `/sources/dnd/basic-rules-2014/using-ability-scores#${anchor}`;
      if (el.href !== newHref) {
        console.log(`[DDB Fixer] Rewriting skill link: ${el.href} → ${newHref}`);
        el.href = newHref;
      }
    }
  });

  // Fix sense links pointing to glossary
  document.querySelectorAll(
    'a[href^="/sources/dnd/free-rules/rules-glossary#"], a[href^="/sources/dnd/br-2024/rules-glossary#"]'
  ).forEach(el => {
    const text = el.textContent.trim().toLowerCase();
    const anchor = senseAnchors[text];
    if (anchor && el.href.endsWith(`#${anchor}`)) {
      const newHref = `/sources/dnd/basic-rules-2014/monsters#${anchor}`;
      if (el.href !== newHref) {
        console.log(`[DDB Fixer] Rewriting sense link: ${el.href} → ${newHref}`);
        el.href = newHref;
      }
    }
  });
}

const observer = new MutationObserver(() => fixLinks());

observer.observe(document.body, { childList: true, subtree: true });

// Trigger immediately on load
fixLinks();
