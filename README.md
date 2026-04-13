# Sourabh Joshi — Portfolio

A modern, animated personal portfolio built with React + Vite + Framer Motion.

Steps to Run and Upload:

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```

## 📸 Adding Your Photo

1. Put your photo file (e.g. `photo.jpg`) inside the **`/public`** folder
2. Open `src/components/Hero.jsx`
3. Find this line:
   ```jsx
   src="/photo.jpg" or "/photo.png" or jpeg, whatever
   ```
4. Change it to match your filename — done!

> **Tip:** Use a photo with a plain/removed background (PNG with transparency) for best results, similar to the reference design.

---

## 🛠 Tech Stack

| Technology      | Version  | Purpose                        |
|----------------|----------|--------------------------------|
| React           | 18       | UI framework                   |
| Vite            | 5        | Build tool & dev server        |
| Framer Motion   | 11       | Animations & transitions       |
| Google Fonts    | —        | Syne + Outfit typefaces        |

---

## 📁 Project Structure

```
sourabh-portfolio/
├── public/
│   ├── favicon.svg
│   └── photo.jpg          ← Add your photo here
├── src/
│   ├── components/
│   │   ├── Nav.jsx        ← Sticky navigation bar
│   │   ├── Hero.jsx       ← Landing section with animated photo
│   │   ├── About.jsx      ← About me + stats
│   │   ├── Projects.jsx   ← 2-column project cards
│   │   ├── Skills.jsx     ← Icon grid + progress bars
│   │   ├── Contact.jsx    ← Contact info + CTA card
│   │   └── Footer.jsx     ← Footer
│   ├── data.js            ← All content (projects, skills, etc.)
│   ├── App.jsx            ← Root component
│   ├── main.jsx           ← Entry point
│   └── index.css          ← Global styles
├── index.html
├── vite.config.js
└── package.json
```

---

## ✏️ Customization

All your personal content lives in **`src/data.js`**:

- **`PROJECTS`** — Add/edit your projects (title, description, image, tags, accent color)
- **`SKILLS_GRID`** — Icon grid skills
- **`SKILL_BARS`** — Progress bar skills with proficiency %

To update contact info, edit **`src/components/Contact.jsx`** and **`src/components/About.jsx`**.

---

## 🌐 Deployment

### Vercel (recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# drag & drop the /dist folder to netlify.com
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d dist"
npm run build && npm run deploy
```

---

Made with ❤️ by Sourabh Joshi
