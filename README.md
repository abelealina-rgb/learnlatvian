# Your L&D Portfolio

A single-page portfolio site — no build tools, no npm, just one HTML file plus a couple of
images. This keeps it as simple as possible to edit and put on GitHub.

## What's in this folder

```
index.html                        the whole site
assets/profile-placeholder.svg    stand-in for your photo — replace this
assets/cv.pdf                     your résumé — add this yourself (see step 5)
README.md                         this file
```

## 1. Personalize the text

Open `index.html` in a text editor (VS Code is free and beginner-friendly:
https://code.visualstudio.com). Search for square brackets like `[Your city]` or
`[Project title]` — every one is a placeholder for your own words.

## 2. Add your photo

1. Save a photo of yourself as `profile.jpg` (or `.png`) inside the `assets` folder.
2. In `index.html`, find this line near the top of the Hero section:
   ```html
   <img class="hero-photo" src="assets/profile-placeholder.svg" alt="Photo of Jordan Reyes">
   ```
3. Change `assets/profile-placeholder.svg` to `assets/profile.jpg` (or whatever you named it),
   and update the `alt` text to your real name.

**Resize and compress it first.** A phone photo can easily be several MB, but the photo only
ever displays at a few hundred pixels wide on this page, so anything much bigger just slows
down the site for no visual benefit. Aim for:

- **Dimensions:** around 800×800px (it's cropped to a circle, so square is ideal)
- **File size:** under ~200 KB

Easiest free way to do both at once: go to https://squoosh.app, drop your photo in, resize it
to ~800px wide, and export as **WebP** or **JPEG** at ~80% quality — it'll show you the
resulting file size as you adjust. Then save that file as `assets/profile.jpg` (or
`profile.webp`, matching whatever extension you used in the `src` above).

## 3. Add your Miro board

This one's a live, scrollable/zoomable embed of your actual board (not a screenshot), so
people can explore it directly on the page.

1. In Miro: open your board → **Share** (top right) → **Embed board**.
2. Miro will give you either a direct link or a chunk of `<iframe>` code. Either works:
   - If you got a **link**, copy it as-is.
   - If you got **iframe code**, copy just the URL inside the `src="..."` part.
3. In `index.html`, find:
   ```html
   <iframe
     src="PASTE_YOUR_MIRO_EMBED_LINK_HERE"
   ```
4. Replace `PASTE_YOUR_MIRO_EMBED_LINK_HERE` with the link from step 2.
5. Also update the "Open board in a new tab" link right below it to the same link, as a
   fallback in case the embed doesn't load for a visitor.
6. Make sure the board's sharing setting allows anyone with the link to view it — otherwise
   visitors will just see a blank/blocked embed.

## 4. Embed your Figma prototype

1. In Figma: open the prototype → **Share** → make sure link access is set to
   "Anyone with the link can view" → **Copy link**.
2. In `index.html`, find:
   ```html
   <iframe
     src="https://www.figma.com/embed?embed_host=share&url=PASTE_YOUR_FIGMA_SHARE_LINK_HERE"
   ```
3. Replace `PASTE_YOUR_FIGMA_SHARE_LINK_HERE` with the link you copied (leave the rest of the
   `src` exactly as it is — that part turns any Figma share link into an embeddable one).
4. Also update the "Open prototype in a new tab" link right below it to the same URL, so
   there's a working fallback if the embed doesn't load for a visitor.

## 5. Add your résumé/CV

1. Save your résumé as a PDF named `cv.pdf` and put it in the `assets` folder.
2. That's it — the "Download PDF" link in the About section already points to
   `assets/cv.pdf`. Just remember to include that file when you upload to GitHub.
3. If you'd rather not offer a download at all, delete this pair of lines from
   `index.html` instead:
   ```html
   <dt>Résumé</dt>
   <dd><a href="assets/cv.pdf" target="_blank" rel="noopener">Download PDF</a></dd>
   ```

## 6. Set up the contact form (Formspree — free, no code)

1. Go to https://formspree.io and create a free account.
2. Create a new form and copy the **Form ID** it gives you (a short string like `abcd1234`).
3. In `index.html`, find:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Replace `YOUR_FORM_ID` with your real ID. That's it — messages people send through the
   form will now arrive in your email.
5. The email link (`you@example.com`) further down works as a backup — update it to your
   real email address too.

## 7. Put it on GitHub

1. Go to https://github.com and create a free account if you don't have one.
2. Click the **+** icon (top right) → **New repository**.
3. Name it exactly `your-username.github.io`, replacing `your-username` with your actual
   GitHub username — this exact naming pattern is what makes GitHub host it as a website.
4. Keep it **Public**, don't add a README from GitHub's side (you already have one), then
   **Create repository**.
5. On the next page, click **uploading an existing file**.
6. Drag in `index.html`, the whole `assets` folder, and this `README.md`, then
   **Commit changes**.

## 8. Turn on GitHub Pages

1. In your repository, click **Settings** → **Pages** (left sidebar).
2. Under "Build and deployment" → "Branch", choose `main` and folder `/ (root)`, then **Save**.
3. Wait about a minute — your site will be live at `https://your-username.github.io`.

## 9. Making changes later

Edit files on your computer, then in your GitHub repo click **Add file → Upload files** and
upload them again (GitHub overwrites the old versions). The live site updates within a
minute or two.

## About "vibe coding" tools like Lovable

Still not needed here. This site is plain HTML/CSS/JS, so there's no build step or hosting
service to configure — GitHub Pages serves the files directly. Tools like Lovable earn their
keep on projects with a backend, database, or login system; a portfolio site isn't one of
those, so the simple route ends up being less work, not more.
