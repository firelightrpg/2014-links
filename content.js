const replacements = [
    {
        suffix: "Condition",
        matchPath: "/sources/dnd/free-rules/rules-glossary",
        replacePath: "/sources/dnd/basic-rules-2014/appendix-a-conditions"
    },
    {
        suffix: "Skill",
        matchPath: "/sources/dnd/free-rules/playing-the-game",
        replacePath: "/sources/dnd/basic-rules-2014/using-ability-scores"
    },
    {
        suffix: "Sense",
        matchPath: "/sources/dnd/free-rules/rules-glossary",
        replacePath: "/sources/dnd/basic-rules-2014/monsters"
    }
];

const observer = new MutationObserver(() => {
    document.querySelectorAll('a[href*="/sources/dnd/free-rules/"]').forEach(el => {
        for (const { suffix, matchPath, replacePath } of replacements) {
            try {
                const url = new URL(el.href);
                if (url.pathname === matchPath && url.hash.endsWith(suffix)) {
                    const anchorBase = url.hash.slice(1, -suffix.length);
                    el.href = `${replacePath}#${anchorBase}`;
                    break;
                }
            } catch (_) {
                // skip invalid URLs
            }
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

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

document.querySelectorAll('a[href="/sources/dnd/free-rules/playing-the-game#Skills"]').forEach(el => {
    const text = el.textContent.trim();
    const anchor = skillAnchors[text];
    if (anchor) {
        el.href = `/sources/dnd/basic-rules-2014/using-ability-scores#${anchor}`;
    }
});

const senseAnchors = {
    "blindsight": "Blindsight",
    "darkvision": "Darkvision",
    "tremorsense": "Tremorsense",
    "truesight": "Truesight"
};

document.querySelectorAll('a[href^="/sources/dnd/free-rules/rules-glossary#"]').forEach(el => {
    const text = el.textContent.trim().toLowerCase();
    const anchor = senseAnchors[text];
    if (anchor && el.href.endsWith(`#${anchor}`)) {
        el.href = `/sources/dnd/basic-rules-2014/monsters#${anchor}`;
    }
});

