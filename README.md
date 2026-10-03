# Saravoia website framework

A private presentation archive covering the wider County. Witchtown is one destination, not the whole County.

## Views

- County overview: Saravoia, Cabotsaria, Witchfort, Tetra, Witchtown and palace entry points.
- Places: ten populated place records and additional handoff-supplied names awaiting descriptions.
- Witchtown: image, four residential roads, central crossroads and navigation identifiers.
- People: eight source-supported profiles and separate terminology records.
- History: ten selected milestones and all 56 captured dated Chronicle entries.
- Language: the brief-attributed Saravic definition, two attested phrases and terminology issues.
- Craft: local materials, handoff craft direction, heraldry specification, sample scouting, collections and three dated Navy vessels.
- Records: County document cards and 207 catalogue entries with working filters and individual catalogue records.
- About: source register and contribution-review context.

Record buttons open native accessible dialogs. Source passages are expandable. Private correspondence excerpts, restricted housing directories and full raw logs are not included. Source type and dated assertions remain distinct; the site does not claim current titles, fleet condition or uninspected book content.

## Visual assets

The opening page uses the user-supplied gilded Saravoia castle artwork with accessible navigation links. The messenger scene accompanies the contribution-review action. The elaborate bat artwork is a decorative reference, separate from the heraldic specification. The keep photograph illustrates hilltop terrain only. The generated Witchtown image is used on its own destination page and is explicitly classified as artistic interpretation.

Palette: heraldic red, gold and dark framing; stone-toned reading surfaces. Wordmark and typographic favicon avoid inventing an official visual rendition of the bat arms.

## Source handling

`dist/` is the complete static output and requires no build service. `build-content.cjs` extracts a selected public-facing subset from the adjacent local research ledger when that ledger is available; it does not copy raw research logs to the site. `dist/data.js` is checked in, so the site remains independently runnable without the original research directory.

Review process follows `../SARAVOIA_DESIGN_CONSISTENCY_GUARDRAILS.md`. Current reviewer wording and Nezaya's visual permissions are still pending. New additions remain attributed to their supplied documents.

Run `node dev-server.cjs` for a local preview at the printed URL. Static delivery uses `.openai/hosting.json`. No third-party assets, external fonts, telemetry, forms or credentials are required by the website itself.

## Current rendering

Built-in image generation produced `dist/assets/saravoia-stained-glass-v2.png` from the gilded opening and rocky summit references. Full generation prompt is retained in `front-page-image-prompt.txt`. Live HTML supplies the title and entrance action. A small SVG bat crosses the landing page periodically and is disabled for reduced motion. All earlier supplied artwork remains retained.
