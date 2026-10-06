---
name: verify-before-reporting-done
description: Never report a fix as done on inference — confirm it in a browser, visually, first
metadata:
  type: feedback
---

A fix is not reportable until it has been **confirmed in a running browser**, and for
anything visual that means looking at a screenshot, not reading numbers.

**Why:** on 2026-08-31 I told him feature-card images were fine because a DOM measurement
said so — the measurement had walked to the wrong element. Then my screenshots came back
black and I did not notice the page's intro preloader (`fixed z-[100]`, waits on the hero
video, never lifts in headless because headless Chromium has no h264 decoder) was covering
every capture. He said: *"stop telling me something is done and ready for review when ifs
obviously not, you need to playwright confirm before bothering me."*

**How to apply:** drive the real dev server with Playwright, strip the preloader before
screenshotting, and read the image back. Measure the element you actually mean — verify the
selector matched the visible node, not a hidden takeover-menu or overlay copy. When a
symptom will not reproduce, say so plainly instead of asserting a cause; three engines
agreeing against his device is a real result worth reporting as "cannot reproduce".
Related: [[wait-for-go-during-review]], [[build-green-is-not-verified]].
