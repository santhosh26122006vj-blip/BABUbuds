# BABUbuds X1 — Image Guide & Gemini Prompts

13 image slots total. Generate each with Gemini, then drop the file into the matching spot in `index.html` (just replace the empty `""` inside `url("")` or `src=""`).

Style anchor to repeat in every prompt if Gemini drifts: **dark, moody, premium studio lighting, black/graphite/charcoal background, metallic silver and warm champagne-gold accents, cinematic, minimal, high-end product photography, no text, no logos.**

---

## HERO BACKGROUNDS (5 images)
**Location:** `index.html`, inside `.hero__bg` divs, `style="background-image:url('')"`
**Aspect ratio:** 16:9 or wider (1920×1080 or larger — these are full-screen backgrounds)

### HERO 01
> Ultra-premium wireless over-ear headphones floating in a dark charcoal studio, dramatic single-source rim lighting from the top left, subtle champagne-gold reflections on the metal headband, deep black background fading to near-invisible, cinematic product photography, shallow depth of field, 8k, no text.

### HERO 02
> Close-up macro shot of a headphone ear cushion in matte black memory foam, soft directional studio light catching the texture, dark graphite background, warm gold accent light on the edge, ultra premium audio brand aesthetic, cinematic, no text.

### HERO 03
> Wide cinematic shot of premium wireless headphones resting on a dark reflective black surface, moody low-key lighting, faint smoke or atmospheric haze in the background, single warm gold spotlight, luxury tech product photography, no text.

### HERO 04
> Dramatic side-profile shot of over-ear headphones suspended in dark space, metallic silver hinge and headband catching a cool rim light, deep black gradient background, minimal and futuristic, high-end audio brand campaign photography, no text.

### HERO 05
> Abstract close-up of a headphone driver/speaker grille glowing faintly with warm gold light, dark charcoal and black background, fine metallic texture visible, cinematic macro photography, premium tech aesthetic, no text.

---

## PRODUCT — MAIN SHOT
**Location:** `index.html`, `id="productImage"` (Meet BABUbuds X1 section)
**Aspect ratio:** 16:10, centered, clean

> Full front-facing hero product shot of premium over-ear wireless headphones, centered, floating on a dark graphite-to-black gradient background, soft studio lighting from above, subtle champagne-gold highlight along the headband and ear cups, ultra clean and symmetrical, high-end Apple/Bose-style product photography, sharp focus, no text, no logo, no hands.

*(This image needs open, uncluttered space around the driver, ear cup, and headband areas — hotspots will point to those regions.)*

---

## COMFORT — DETAIL SHOT
**Location:** `index.html`, `.comfort__image` (Designed to disappear section)
**Aspect ratio:** 4:5, portrait

> Close-up three-quarter shot of a headphone ear cushion and headband padding, emphasizing soft memory foam texture and premium stitched material, worn at a slight angle to show ergonomic curve, warm soft studio lighting, dark charcoal background, tactile and inviting, luxury audio product photography, no text, no people.

---

## GALLERY (6 images)
**Location:** `index.html`, `.gallery__item` figures, in order top to bottom
**Aspect ratios:** mixed — noted per image below

### Gallery 1 — Tall
> Full vertical shot of premium headphones standing upright on a dark reflective pedestal, dramatic top-down light, long soft reflection below, minimal black studio background, luxury tech editorial photography, no text.

### Gallery 2
> Overhead flat-lay shot of headphones folded flat next to their charging cable, dark slate surface, soft diffused lighting, minimalist composition, premium tech product photography, no text.

### Gallery 3
> Extreme close-up of the touch control surface on the ear cup, showing subtle brushed-metal texture and a faint fingertip touch, dark moody lighting with a thin gold highlight, macro product photography, no text.

### Gallery 4 — Wide
> Wide horizontal lifestyle-adjacent shot of headphones resting on a dark wooden or stone surface beside a phone and laptop, softly blurred, warm ambient side light, premium tech lifestyle photography, no text, no visible brand logos on the phone/laptop.

### Gallery 5
> Side profile close-up of the hinge and adjustable headband mechanism, cool silver metallic finish, dark background, precise studio lighting emphasizing engineering detail, no text.

### Gallery 6 — Tall
> Dramatic vertical shot of headphones being lifted by an unseen force (floating), motion-blurred dark particles around it, deep black background with a single warm gold light source, cinematic and futuristic, no text, no people.

---

## Tips for generating with Gemini
- Generate at the highest resolution Gemini offers, then compress with an image tool if file size matters for the site.
- Keep the *same lighting mood* (dark + gold/silver accent) across all 13 so the site feels like one coherent shoot.
- If a background isn't dark/black enough, add: "pure black background, no visible floor or horizon line" to the prompt.
- Avoid asking Gemini for on-image text — none of these slots need text baked into the picture.
