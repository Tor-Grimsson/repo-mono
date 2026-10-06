# Gutter + container audit — kolkrabbi.io

**Date:** 2026-08-30 · browser-measured at 1280 and 1920, every public route
**Question (user):** why does the horizontal gutter appear on some page sections and not others — "I shouldn't have to open dev tools to check this"
**Verdict:** the gutter has **no single owner**. Three different layers supply it, none of them consistently, and the result is that no two page families share a left edge or a content width.

---

## 1. The gutter comes from three different places

| Route | Where the 24px comes from | Cap padding |
|---|---|---|
| `/work` · `/prints` | the page's own container (`px-4 md:px-6`) | 24 |
| `/foundry` · `/foundry/typefaces/*` | an **ancestor** — the container itself has none | 0 |
| `/studio` · `/foundry/licensing` | an ancestor, at **56px** not 24 | 0 |
| `/metrics` | `main` carries `px-3` (12px) | no ruled container at all |
| `/chess` · `/apparat` | `main` carries 24 | no ruled container at all |
| `/workshop` | nothing | no ruled container at all |

At 1280 this mostly *looks* fine — `/work`, `/foundry` and `/prints` all land their chrome at 24 — but they get there by three different mechanisms, so nothing holds them together when anything changes.

## 2. The content width is not the ruled width

`--kol-container-max` is a responsive ladder in kol-framework (`100%` → 1400 → 1600 at ≥1280 → 1800 at ≥1920). That part is correct. What differs is what each page does *inside* it.

**At 1920 (cap = 1800):**

| Route | Cap padding | Actual content width | Chrome left edge |
|---|---|---|---|
| `/work` | 24 | **1752** | 84 |
| `/prints` | 24 | **1752** | 84 |
| `/foundry` | 0 | **1800** | 60 |
| `/foundry/typefaces/malromur` | 0 | **1800** | **108** |

Two pages obey a 1752 measure, two obey 1800, and the two foundry pages **disagree with each other by 48px** despite sharing a container with identical classes. The "ruled 1800" is a ceiling, not a shared measure.

## 3. The row adds its own gutter on top

The page gutter is not the end of it — each row variant pads again, and the variants disagree:

| Variant | Row pad | Text edge at 1280 |
|---|---|---|
| `showcase` (`/work`, `/prints`) | 16 | 40 |
| `showcaseCanvas` (`/foundry`) | 24 | 48 |

So even where two pages align their containers, their *content* lands 8px apart. That is the difference visible in a side-by-side skim.

## 4. Vertical has the same problem

`main`'s top padding: **224px** on `/work` and `/prints`, **0** everywhere else, **80** on `/metrics`. `/work` and `/prints` only match because they were deliberately matched by hand on 2026-08-29 — nothing enforces it, and no other page joined.

## 5. Four routes are outside the system entirely

`/metrics`, `/workshop`, `/chess`, `/apparat` render **no ruled container**. They are not capped at 1800 at any viewport and their gutters come from `main` at 12px or 24px. Whatever is decided about the gutter will not reach them until they adopt the container.

---

## What to take to the DS

1. **One owner for the gutter.** Today it is variously the page container, an ancestor, or `main`. The proposal: the ruled container owns it — one component or one class that supplies cap + gutter together, so a page cannot get one without the other.
2. **Decide whether the gutter is inside or outside the cap.** This is the 1752-vs-1800 question. Either answer is defensible; having both is not.
3. **Row padding should compose with the page gutter, not stack blindly on it.** A row inside a padded container currently double-indents.
4. **`showcase` and `showcaseCanvas` should agree on their pad** (16 vs 24) unless there is a reason, in which case it should be written down.
5. **The four unruled routes** need a decision: adopt the container, or be declared deliberately full-bleed.

## Method

Both passes ran the same probe in a same-origin iframe at fixed widths (1280, 1920), reading `getBoundingClientRect` and `getComputedStyle` — no eyeballing. The probe measured, per route: `main`'s padding, every element carrying `max-w-[var(--kol-container-max)]` (left, width, padding, resulting content box), the first `.kol-row`'s padding, and the left edge of the page's leading chrome.
