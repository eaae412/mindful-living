# Mindful Care Living — Website

The website for **Mindful Care Living Assisted Living INC**, Brooklyn Center, MN.

It is a simple website made of plain files. There is nothing to install, and you never need to "build" or "compile" anything. If you can edit a document, you can edit this site.

---

## What's in this folder

| File or folder | What it is |
|---|---|
| `index.html` | **Home** page |
| `about.html` | **About Us** page |
| `care.html` | **Care & Services** page |
| `amenities.html` | **Amenities & Daily Life** page |
| `gallery.html` | **Gallery** page |
| `contact.html` | **Contact** page (address, map, tour request form) |
| `images/` | All the photos and the logo |
| `css/styles.css` | Colors, fonts, and layout (you rarely need to touch this) |
| `js/main.js` | Small helpers: the phone menu, the photo viewer, and the tour form |

---

## 1. How to preview the website on your computer

1. On the GitHub page for this project, click the green **Code** button, then **Download ZIP**.
2. Find the downloaded file (usually in your *Downloads* folder) and double-click it to unzip it.
3. Open the unzipped folder and double-click **`index.html`**. The website opens in your web browser.
4. Click around — all the pages and buttons work.

> **Note:** Test the tour request form after the website is online (see steps 2 and 3). From a file on your own computer it may not send, and will show a message asking people to call instead. That is normal.

---

## 2. How to put the website online (free, with GitHub Pages)

1. On GitHub, open this project and click **Settings** (top of the page).
2. In the left menu, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose **main** and **/ (root)**, then click **Save**.
5. Wait about 2–5 minutes, then refresh the page. GitHub shows your website's address at the top (it will look like `https://eaae412.github.io/mindful-living/`).

**Using your own web address (for example `www.mindfulcareliving.com`):** in the same **Pages** settings, type your address in **Custom domain** and click **Save**. GitHub then explains the small change to make at the company where you bought your domain name. If you get stuck, the company that sold you the domain can help with the "DNS settings" step.

---

## 3. One-time setup: turning on the tour request form

The tour form sends requests to **contact@mindfulcareliving.com** using a free service called **FormSubmit** (formsubmit.co). No account is needed. Do this once, after the website is online:

1. Open your live website, go to the **Contact** page, and send yourself a test tour request.
2. Check the **contact@mindfulcareliving.com** inbox (and the spam folder) for an email from FormSubmit.
3. Click the **Activate Form** button in that email.

That's it. From then on, every tour request arrives in that inbox as an email. The form asks only for **name, phone, email, and preferred date**. It does **not** ask for any medical information.

---

## 4. How to change text

You can do this right on the GitHub website — no software needed.

1. On GitHub, click the page file you want to change (see the table at the top, e.g. `about.html` for the About Us page).
2. Click the **pencil icon** (✏️ "Edit this file") near the top right.
3. Press **Ctrl + F** (or **Cmd + F** on a Mac) and type a few words of the sentence you want to change, to find it.
4. Change **only the words**. Leave everything inside the angle brackets `< >` exactly as it is.

   For example, in this line:

   ```html
   <h1 id="hero-title">Care that feels like home.</h1>
   ```

   you would only change the words `Care that feels like home.`

5. Click the green **Commit changes…** button, then **Commit changes** again. If the site is online, the change appears in a few minutes.

**Helpful notes inside the files:** Lines that look like `<!-- EDIT: ... -->` or `<!-- PHOTO: ... -->` are notes to you. Visitors never see them.

**If something goes wrong:** don't worry — GitHub keeps every earlier version. Click **History** on the file to see and restore an older version.

---

## 5. How to change photos

Every photo on the site is currently a **placeholder** — a soft blue and green picture that says *"PLACEHOLDER PHOTO"* and shows the file name to replace.

**To replace a photo, upload your photo with the exact same file name.**

1. Get your photo ready:
   - Use a **wide (landscape) photo**, not a tall one. Around **1200 × 900 pixels** is ideal. Photos straight from a phone work too; they are trimmed to fit automatically.
   - Rename the file to match the placeholder **exactly**, for example `living-room.jpg` (all lowercase, ending in `.jpg`).
2. On GitHub, open the **`images`** folder.
3. Click **Add file → Upload files**, drag your photo in, and click **Commit changes**. Your photo replaces the placeholder everywhere it is used.

| File name | Where it appears |
|---|---|
| `home-front.jpg` | Home page (top), Gallery |
| `dining-together.jpg` | Home page (Welcome section) |
| `living-room.jpg` | Gallery |
| `backyard.jpg` | About Us, Gallery |
| `bedroom.jpg` | Care & Services (Assisted Living), Gallery |
| `caregiver-support.jpg` | Care & Services (24/7 Personal Care) |
| `transportation.jpg` | Care & Services (Daily Activities) |
| `medication.jpg` | Care & Services (Medication Management) |
| `activities.jpg` | Amenities & Daily Life (Activities), Gallery |
| `dining-area.jpg` | Amenities & Daily Life (Dining), Gallery |
| `kitchen.jpg` | Gallery |
| `bathroom.jpg` | Gallery |

**Photo descriptions (alt text):** each photo has a short description for people who use screen readers, written like `alt="The comfortable living room at Mindful Care Living"`. If your new photo shows something different, update those words (see *How to change text*).

**Important — residents' privacy:** before posting any photo that shows a resident, get their written permission (or their legal representative's). Photos of rooms, the outside of the home, and staff who agree to it are always safe choices.

**The logo** is `images/logo.png` (256 × 256 pixels, transparent background). To change it, upload a new square logo with the same name.

---

## 6. Things still to fill in

- [ ] **License / accreditation details.** Search for `[License` to find each spot:
  - the bottom (footer) of **every** page — all six page files
  - the "For referring professionals" box on the **Home** page (`index.html`)
  - the "Licensing & Accreditation" section on the **About Us** page (`about.html`)
- [ ] **Review the draft text** on the **Amenities & Daily Life** page (`amenities.html`). The *Activities* and *Dining* sections were written as a starting point. Please change them to match what you actually offer.
- [ ] **Replace the placeholder photos** (see section 5).
- [ ] **Activate the tour form** once the site is online (see section 3).

---

## 7. Other common changes

**Phone number or email address:** these appear on every page. Search each page file for the old number, e.g. `483-1978`, and change every match, including the `tel:+16124831978` links (the version phones use to dial). The email address also appears in `js/main.js` (near the top, labeled `TOUR_EMAIL`) — that is where tour requests are sent.

**Colors:** open `css/styles.css`. The colors are listed together at the very top, each with a note saying what it's used for.

---

## Accessibility features built in

- Large, easy-to-read text (Atkinson Hyperlegible, a font designed for readers with low vision) and strong color contrast
- Big, clearly labeled buttons; phone number at the top of every page with tap-to-call on phones
- Works with a keyboard alone, with a visible outline showing where you are, and a "Skip to main content" link
- Descriptions on every photo for screen readers
- Works on phones, tablets, and computers, and still works if JavaScript is turned off
