# Brief for Cursor: exploring Quran recitation audio in AyahDay

> **Mode: exploration only.** Build a throwaway spike on a local branch (e.g. `spike/recitation-audio`). Do **not** push to `main`, deploy, register API accounts, or change production files. Ask Saad before any step that touches the live site, a third-party account, or a license.

Prepared Sun 18 Oct 2026 (PKT). Repo facts were read from the public GitHub API at `saadkhantp/ayahday@main` (last push 25 May 2026, 13:32 PKT). Items marked **[UNVERIFIED]** need checking.

---

## 1. What AyahDay is today (from the repo)

- **Site:** https://www.ayahday.cc/. A static site on GitHub Pages (`CNAME`, `has_pages: true`). No backend, no account. Reflection only, not fiqh.
- **Files that matter:**
  | File | Role |
  |---|---|
  | `index.html` (~25 KB) | Single page. Card is `#verseDisplay` → `#verseContent` + `#versePanelFooter` (`#surahMeta`, `#saveAyahBtn`, `#shareBtn`). Nav: `#prevBtn` / `#nextBtn`. `#saveToast` is `role="status" aria-live="polite"`. Loads html2canvas 1.3.2 (cdnjs), Font Awesome kit, gtag (GA4), Tally embed. |
  | `script.js` (~50 KB, vanilla JS) | All app logic. |
  | `theme.js`, `theme-init.js` | Light/dark theme. |
  | `manifest.json` | PWA manifest (`display: standalone`, `orientation: portrait`, scope `https://www.ayahday.cc/`). |
  | `src/styles/*.css` → `dist/app.css` | Tailwind 3 build (`npm run build`). `package.json` says "React/Vite shell deferred". |
  | `faq/`, `ur/faq/` | FAQ pages (EN/UR). |
- **No service worker.** The tree has no `sw.js` or similar, `script.js` never calls `navigator.serviceWorker`, and `https://www.ayahday.cc/sw.js` and `/service-worker.js` both return 404. Today the "PWA" is the manifest only, with no offline caching. Any offline audio means **adding a service worker for the first time**.
- **Verse data source:** Al Quran Cloud. `API_CONFIG.url = "https://api.alquran.cloud/v1/ayah"`; `fetchAyah(ref)` calls `/{ref}/quran-uthmani` plus `/{ref}/{currentLang}` (`en.asad`, `ur.maududi`, `ms.basmeih`). `ref` is the **global ayah number 1–6236**. The response's `data.surah.number` and `data.numberInSurah` are stored as `currentSurahNumber` / `currentAyahInSurah` and on `#verseDisplay` as `data-surah-number` / `data-ayah-in-surah`.
- **Which ayah is shown:** `getRandomAyahNumber()` (`Math.random()*6236+1`) runs on load and on "next". I found no date-seeded "ayah of the day" in `script.js`. **[Check with Saad: is "one ayah a day" meant to be deterministic?]**
- **History / navigation:** `ayahHistory` is an in-memory array. Swipe: `touchstart`/`touchend` add a `swipe-left`/`swipe-right` class, then `animationend` runs `runVerseTransition(fetchNewVerseCore | fetchPrevVerseCore)`. Buttons call `fetchNewVerse` / `fetchPrevVerse`. Saved ayahs live in `localStorage["ayahday-saved-ayahs"]` as `{surah, ayah}` (max 5) and open via `viewSavedAyah`.
- **Share:** `openSharePreview` → `runShareFromPreview`. It captures a PNG of the preview with html2canvas. On mobile it calls `navigator.share({ files: [png], text })`; otherwise it downloads the PNG and opens `https://wa.me/?text=…`. The text is the ayah, the Arabic surah name, and "Explore more at https://www.ayahday.cc/".

**Note:** Al Quran Cloud stays fine for **text**. Its **audio** CDN is not usable (see §3).

---

## 2. Goal and user experience

**Goal:** let a user listen to the current ayah's recitation (Arabic) without leaving the card, and keep the calm, reflection-only feel.

- **Play/pause button on the ayah card**, in `#versePanelFooter` next to save/share. States: idle → loading → playing → paused → error. Show it only when audio exists for that ayah (with Aaqib Azeez, most ayahs have no clip; see §3).
- **Auto-pause on navigation.** Stop audio on swipe, next/prev, opening a saved ayah, and language change. Hook it at the start of `runVerseTransition` (all of these go through it) or in `fetchNewVerseCore`, `fetchPrevVerseCore` and `viewSavedAyah`. Also pause on `visibilitychange` if Saad wants that.
- **No autoplay.** Play only on a user tap. Browsers block autoplay anyway, and it suits a reflection app.
- **Optional reciter choice.** Save it in `localStorage` (e.g. `ayahday-reciter`). Only offer reciters from licensed sources. Hide the picker if only one reciter is available.
- **Offline / PWA.** No service worker exists today (§1). Decide whether offline audio is worth adding one; caching rules per license are in §5.
- **Accessibility:**
  - Use a real `<button>` with `aria-label` ("Play recitation" / "Pause recitation") and `aria-pressed`, or a label swap.
  - Announce loading and errors through the existing `aria-live` toast pattern.
  - Make it keyboard operable with a visible focus ring.
  - Respect `prefers-reduced-motion` (already used via `prefersReducedMotion()`) for any playing animation.
  - Show the reciter name as text.
  - Localise labels for EN/AR/UR/MS, as the "What's new" copy already does.
  - Don't let audio cover the Arabic text.
- **Data cost.** Clips are small: the Commons 2:156 file is about 656 KB for about 16 s. Still, load audio only on tap and use `preload="none"`.

---

## 3. Licensing constraints (summary of `recitation-licensing.md`)

> ⚠️ **The research was done for social-media Reels (audio embedded in a video), not in-app streaming.** These are different uses with different rules. Re-verify every source's terms for **in-app streaming/caching** before shipping. The research is "due diligence, not legal advice".

### ✅ Option A: Aaqib Azeez on Wikimedia Commons, CC BY-SA 4.0
- Category: https://commons.wikimedia.org/wiki/Category:Recitations_of_the_Qur'an_by_Aaqib_Azeez (186 files, re-checked via the Commons API today). Sample: https://commons.wikimedia.org/wiki/File:Al-Baqarah_verse_156.mp3
- The reciter is also the uploader (Commons user **Atcovi**; files marked "Own work"). Hafs 'an 'Asim.
- License, as rendered on Commons: *"I, the copyright holder of this work, hereby publish it under the following license: This file is licensed under the Creative Commons Attribution-Share Alike 4.0 International license."* Commons API for 2:156: `LicenseShortName "CC BY-SA 4.0"`, `AttributionRequired "true"`, `LicenseUrl https://creativecommons.org/licenses/by-sa/4.0`.
- **Attribution:** reciter name, source, license name with a link, and a note of any changes. For an unmodified stream, a suggested line is "Recitation: Aaqib Azeez (Wikimedia Commons), CC BY-SA 4.0". Add "trimmed" if clips are cut.
- **ShareAlike:** the research's Reels concern is CC BY-SA 4.0 §1(a): *"…Adapted Material is always produced where the Licensed Material is synched in timed relation with a moving image."* That clause targets video. Whether showing text alongside streamed audio, or **trimming** a surah file into per-ayah clips, creates "Adapted Material" in an app is **[UNVERIFIED]**. Ask Saad or get advice. Playing the file unmodified is the lowest-risk case.
- **Coverage is limited.** Single-verse files exist only for 2:156, 2:216, 2:255, 2:285–286, 4:34, 4:157 and a few short passages. Full-surah files exist for most surahs. Any other ayah has to be cut out of the surah file by timestamp, and each cut must be checked so no word is clipped.
- The category says new recitations are being produced and old ones re-done, so file names and timings can change. Saad should listen-check (he is a student reciter, not a famous qari).
- **Never show his picture**: *"The reciter does not permit the posting of his picture."*

### ⚠️ Option B: Quran Foundation (Quran.com) API, Developer Terms
- Terms: https://api-docs.quran.foundation/legal/developer-terms/ ("Last updated: 2026-10-11"; I re-read it today).
- "QF Content" includes *"audio"*. The grant covers using the APIs *"solely to develop and operate Applications that provide beneficial Quranic experiences to end users"*, and *"Developer may display QF Content to end users within the Application"*. Whether "display" clearly covers audio playback is **[UNVERIFIED wording; confirm with developers@quran.com]**.
- **Credit:** the research says to credit Quran Foundation, and per their FAQ *"recitations by their named source or edition"*. The developer terms quote "credits Quran Foundation in a reasonably accessible place" in the social-video and font/Mushaf clauses. **[Confirm the exact in-app credit requirement]**
- **Registration:** you need a Developer Console app (`client_id` / `client_secret`). The quickstart says: *"A browser or mobile app must not embed a Content API `client_secret`… call your own backend."* **AyahDay has no backend**, so this needs a small proxy (e.g. a serverless function). New apps start in **pre-live**, where the content dataset *"includes only Al-Fatihah (surah 1) and Al-Baqarah (surah 2)"*. Production access needs approval.
- **Caching limit:** Developers must not *"Cache or store QF Content longer than 1 week unless it is obtained and maintained through the Content Sync APIs…"* Also: *"Attempt to extract, scrape, or index QF Content … outside the API responses"* is prohibited. So get audio URLs from the API; don't build them by hand. Whether audio is offered via Content Sync is **[UNVERIFIED]**.
- **Other obligations:** keep context and meaning; *"Provide a publicly reachable Privacy Policy and Terms of Use for the Application"* (I saw no privacy or terms page in the repo, only FAQs, and the site runs GA4); report security incidents within 24 h. QF *"may suspend or revoke"* credentials and gives about 30 days' notice of breaking changes.
- QF warrants nothing about reciters' rights (*"PROVIDED 'AS IS'"*).

### ❌ Not usable
| Source | Why (quoted) | URL |
|---|---|---|
| EveryAyah.com | No license or terms text found. The Tarteel dataset card says: *"Licensing of the individual recordings is not documented. Use at your own risk."* | https://everyayah.com/ · https://huggingface.co/datasets/tarteel-ai/everyayah |
| QuranicAudio.com | *"Mp3s on this site may be downloaded and used for personal use free of charge. However, you may not use these files for commercial purposes… Many of them are hand ripped from cds."* | https://quranicaudio.com/about |
| Quran.com site (consumer terms) | *"FOR YOUR PERSONAL, NON-COMMERCIAL USE ONLY… you will not… publicly display any of the Content… without the prior written consent of Quran.com"* (§1.4, §2.3). Use the QF API terms instead, never the website. | https://quran.com/terms-and-conditions |
| Al Quran Cloud **audio** (non-personal use) | *"Recitations are licensed to us by the reciters or their estates for free, non-commercial redistribution… You may stream, embed and download them for personal and educational use… copyrights lie with the reciters and they may ask you to remove the con[t]ent."* | https://alquran.cloud/terms-and-conditions |

The research also rules out: Tanzil (text license only, no audio license); archive.org and Commons uploads of famous reciters (uploader-applied tags aren't valid grants); the "Anasskoko" Commons set (unclear whether the uploader is the reciter).

### Required: an attribution / credits page
- Add a `/credits/` page (EN, and UR like `ur/faq/`), linked from the footer and from the audio UI (e.g. a tiny "ⓘ" by the reciter name).
- List per source: reciter, source page URL, license name and link (CC BY-SA 4.0 → https://creativecommons.org/licenses/by-sa/4.0/), any changes (e.g. "trimmed per ayah"), and "Quran Foundation" plus the reciter/edition if QF is used.
- Show the reciter name and a short credit next to the play button too.

---

## 4. Technical approaches per source

**Key mapping:** AyahDay already has `surah` and `ayah` after each fetch (`currentSurahNumber`, `currentAyahInSurah`). Use `"${surah}:${ayah}"` as the audio key; it's the same format as `savedAyahKey`. The 3-digit padded form is `SSSAAA` (e.g. 2:255 → `002255`).

### A. Wikimedia Commons (Aaqib Azeez)
- **List files:** `https://commons.wikimedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Recitations_of_the_Qur%27an_by_Aaqib_Azeez&cmlimit=500&format=json` (verified; 186 results).
- **File URL and license metadata:** `…/w/api.php?action=query&titles=File:<Name>&prop=imageinfo&iiprop=url|mime|size|extmetadata&iiextmetadatafilter=LicenseShortName|LicenseUrl|Artist|AttributionRequired&format=json` (verified). It returns `url`, `duration`, `mime: audio/mpeg`.
- **Direct URL pattern:** `https://upload.wikimedia.org/wikipedia/commons/<h1>/<h2>/<File_name>`, where `h1h2` are the first two hex characters of `md5(File_name with underscores)`. For example, 2:156 is `/9/9d/Al-Baqarah_verse_156.mp3` (verified). The alternative `https://commons.wikimedia.org/wiki/Special:FilePath/<File_name>` redirects (302) to it. The upload host returns `access-control-allow-origin: *` and `accept-ranges: bytes` (verified).
- **Mapping:** file names are not per-ayah (e.g. "Al-Baqarah verse 156.mp3", "Chapter 1, Al-Fatiha (Murattal) - …mp3"). Build a hand-curated **static manifest**, e.g. `audio/aaqib-manifest.json`: `{ "2:156": { "file": "Al-Baqarah_verse_156.mp3" }, "1:3": { "file": "<surah file>", "start": 12.4, "end": 16.0 } }`. Options for other ayahs:
  1. Per-ayah files only (a tiny set).
  2. Surah file plus start/end timestamps, played with a seek and stop. The Media Fragments `#t=start,end` support across browsers is **[UNVERIFIED]**.
  3. Pre-cut clips hosted in the repo. This is an adaptation and must be CC BY-SA; see §3.
  Timestamps could come from a faster-whisper pass, as in the research, plus a manual listen-check.
- No auth and no backend needed.

### B. Quran Foundation Content API v4
- Auth: `POST https://oauth2.quran.foundation/oauth2/token` (`grant_type=client_credentials&scope=content`, HTTP Basic). Then call `https://apis.quran.foundation/content/api/v4/...` with headers `x-auth-token` and `x-client-id`. Tokens last 3600 s. Pre-live uses `prelive-oauth2.quran.foundation` / `apis-prelive.quran.foundation`. **Backend only.**
- **List reciters:** `GET /resources/recitations`. The docs' example: `id 7` = Mishari Rashid al-Afasy (Murattal), `id 1` = AbdulBaset (Mujawwad). Note: *"These IDs are not interchangeable with chapter-reciter IDs."*
- **Per-ayah audio:** "Get Ayah recitations for specific Ayah" (`recitation_id` + `ayah_key` like `2:255`). It returns `audio_files[].url`, sometimes relative (`AbdulBaset/Mujawwad/mp3/001001.mp3`) and sometimes absolute (`https://verses.quran.foundation/Alafasy/mp3/001001.mp3`). Search results show the path as `/recitations/{recitation_id}/by_ayah/{ayah_key}` or `/quran/recitations/{id}/ayah/{key}`; **[UNVERIFIED: confirm the exact path in the API reference]**. Alternatively, use the verse-by-key endpoint with the `audio` query parameter.
- The CDN host `verses.quran.foundation` returns `access-control-allow-origin: *`, `accept-ranges: bytes`, and `cache-control: max-age=25600000` (about 296 days). That conflicts with the 1-week caching limit; see §5.
- **Proxy:** a minimal serverless function (Cloudflare Worker, Netlify or Vercel; **Saad to choose**) holds the secret, caches the token, and returns `{url, reciter, credit}` for a `surah:ayah`. GitHub Pages can't do this.

### Not to be implemented
EveryAyah (`everyayah.com/data/<Reciter>/SSSAAA.mp3`-style URLs), QuranicAudio, Quran.com website scraping, and `cdn.islamic.network` / Al Quran Cloud audio editions. Don't add them, not even as a fallback.

---

## 5. Service worker caching rules (if a SW is added)

There is no SW today, so this is a new file (`sw.js` at the root, registered from `script.js`). Keep the rules per source:

| Request | Strategy | Limit |
|---|---|---|
| App shell (`/`, `script.js`, `dist/app.css`, fonts, icons) | precache, versioned | none (own content) |
| `api.alquran.cloud` text | network-first, short cache | **[Check Al Quran Cloud's terms on caching text]** |
| `upload.wikimedia.org` Aaqib clips | cache-first in cache `audio-ccbysa-v1`, only after the user plays a clip | CC BY-SA allows copies; keep attribution in the UI. Cap the entry count (e.g. 30) to protect storage. |
| QF audio (`verses.quran.foundation`) and the QF proxy | own cache `audio-qf`, with a stored `fetchedAt` per entry; **evict anything older than 7 days** on SW activate and on each read | *"Cache or store QF Content longer than 1 week"* is prohibited. Fetch with `cache: 'no-store'` or similar so the browser HTTP cache (296-day `max-age`) doesn't hold copies past 7 days. **[UNVERIFIED whether the HTTP cache counts; be conservative]** |
| Anything else audio | don't cache | — |

Other notes:
- **Range requests:** `<audio>` sends `Range` headers, and a cached full response must be served as `206`. Test on iOS Safari, which is known to be strict about this. **[Verify in spike]**
- **No prefetching** of QF audio for "offline packs". Content Sync is the only allowed offline path, and its audio availability is unverified.
- Purge the `audio-qf` cache if QF access ends (the terms require deleting content on termination).

---

## 6. Effect on the WhatsApp share

- Today the share is a **PNG plus text** (`navigator.share({files:[png], text})` or `wa.me/?text=`). The audio feature doesn't need to change it.
- **Don't attach audio files to shares** in v1:
  - With Commons audio, sharing a file is redistribution and must carry CC BY-SA attribution.
  - With QF, *"redistribution"* includes a *"download"* and needs a commercial license, unless it falls under end-use. That's unclear.
  - Turning the card into a video brings in the §1(a) "moving image" ShareAlike rule.
- Lowest-risk option: optionally add a line to the share text such as "🎧 Listen on AyahDay" plus a deep link, e.g. `https://www.ayahday.cc/?ayah=2:255`. **The app doesn't parse a `?ayah=` param today [verify]**, so this would be a new feature.
- The share preview image could show a small "🎧 recitation available" mark. That's optional and up to Saad.

---

## 7. Open questions for Saad

1. Which source for v1: Aaqib Azeez only (free, no backend, small per-ayah coverage), or register with QF (famous reciters, every ayah, needs a proxy, approval, a privacy policy and terms)?
2. If Aaqib: show play only for the few single-verse files, or invest in timestamping surah files? Are you OK with the ShareAlike question for trimmed clips?
3. Are you willing to host a small serverless proxy, and where?
4. Do you want offline audio at all? It means introducing a service worker for the first time.
5. Should "ayah of the day" be deterministic? The code is random today.
6. Will you listen-check the Aaqib audio before it ships?
7. Do you need privacy and terms pages anyway (GA4 is already on the site)? QF requires them.
8. Should the deep-link `?ayah=` feature for shares be in scope?
9. Recitation is Arabic only. Should the button show in every language mode?

---

## 8. Step-by-step plan for Cursor (spike only)

1. **Branch.** Create a local branch `spike/recitation-audio`. Don't push. Run `npm install && npm run build` to confirm the CSS build works.
2. **Read** `script.js` around `fetchAyah`, `applyVerseData`, `runVerseTransition`, `fetchNewVerseCore`, `fetchPrevVerseCore`, `viewSavedAyah`, `handleLanguageChange` and `runShareFromPreview`. Confirm the hook points listed in §1 and §2.
3. **Audio module.** Add `audio-spike.js`: one shared `HTMLAudioElement` with `preload="none"`, `play(key)`, `pause()`, a state machine and events. No source logic yet.
4. **UI.** Add a play button in `#versePanelFooter` with ARIA states (§2), behind a flag (e.g. `?audio=1` or `localStorage` `ayahday-audio-spike`) so nothing changes for normal users.
5. **Auto-pause.** Call `pause()` at the start of `runVerseTransition` and on language change. Test swipe, buttons and saved ayahs.
6. **Source A, Commons.** Create `audio/aaqib-manifest.json` with the verified single-verse files only (2:156, 2:216, 2:255, 2:285, 2:286, 4:34, 4:157). Confirm each file name and URL via the Commons API first. Resolve the URL with `imageinfo`, or hardcode it after checking. Show the button only when the key is in the manifest. Add a credit line.
7. **Optional A+.** Prototype one surah-file clip with start/end timestamps (e.g. Al-Fatiha) to test seek accuracy on Android Chrome and iOS Safari. Don't commit cut audio files.
8. **Source B, QF (mock only).** Write the proxy contract (`GET /audio?key=2:255&recitation=7` → `{url, reciter, credit}`) and a local mock that returns fixtures. **Don't register for QF or call their API** without Saad's go-ahead. If Saad registers, test against pre-live with surahs 1–2 only.
9. **Service worker (separate experiment).** Draft `sw.js` with the §5 rules, including the 7-day eviction for QF and range handling. Test it in a local server (`npx serve` or similar), not on Pages.
10. **Credits page draft.** Add `credits/index.html` modelled on `faq/index.html`, with the §3 attribution content.
11. **Accessibility pass.** Keyboard only, a screen reader (VoiceOver/TalkBack), reduced motion, RTL layouts (AR/UR).
12. **Write up.** Produce a short `SPIKE-NOTES.md`: what worked, browser quirks, coverage numbers, and the decisions needed from Saad (§7). Stop there. No merge and no deploy.

---

### Sources
- Repo: https://github.com/saadkhantp/ayahday (read via `api.github.com`, `raw.githubusercontent.com`)
- Licensing research: `/workspace/ayahday-brand/growth/recitation-licensing.md` (Oct 18, 2026)
- QF Developer Terms: https://api-docs.quran.foundation/legal/developer-terms/
- QF quickstart: https://api-docs.quran.foundation/docs/quickstart/
- QF recitations: https://api-docs.quran.foundation/docs/content_apis_versioned/4.0.0/recitations/ · https://api-docs.quran.foundation/docs/content_apis_versioned/4.0.0/list-ayah-recitation/
- CC BY-SA 4.0: https://creativecommons.org/licenses/by-sa/4.0/
