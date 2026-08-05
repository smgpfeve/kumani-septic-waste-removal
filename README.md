# Kumani Septic Waste Removal

Professional septic tank cleaning, pumping, and waste removal services in Kenya.

## Deployment

### Option 1: Netlify (Recommended)
1. Push this repository to GitHub
2. Go to [Netlify](https://netlify.com) and click "New site from Git"
3. Connect your GitHub repository
4. Netlify will automatically detect the `netlify.toml` configuration
5. Deploy! Your site will be live at `https://your-site.netlify.app`

### Option 2: GitHub Pages
1. Push to the `main` branch of your GitHub repository
2. Go to Settings > Pages in your GitHub repo
3. Select "Deploy from a branch" and choose `main`
4. Your site will be live at `https://username.github.io/kumani`

### Option 3: Vercel
1. Push to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Vercel will automatically detect the static site configuration
4. Deploy!

## Form Configuration

The contact form uses Formspree for backend processing:
- Form action: `https://formspree.io/f/mjblvkyw`
- To update the form endpoint, edit `index.html` line 346
- Replace `mjblvkyw` with your actual Formspree form ID

## Project Structure

```
kumani/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript functionality
├── netlify.toml        # Netlify configuration
├── robots.txt          # Search engine indexing rules
├── README.md           # This file
└── src/
    ├── icons/          # SVG icons for services and features
    ├── images/         # Image assets
    └── (other assets)
```

## SEO & Accessibility

- Structured data (JSON-LD) for local business
- Open Graph meta tags for social sharing
- Google Site Verification (add your code to index.html)
- All images have descriptive alt text
- Skip navigation link for keyboard users
- ARIA labels on interactive elements
- Proper heading hierarchy

## Security Headers

The site includes security meta tags in the HTML head:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Content-Security-Policy
- Referrer policy: no-referrer

## Performance Optimizations

- Preconnect to external domains (fonts, Formspree)
- Preload critical CSS and JavaScript
- Lazy loading for images
- Minified CSS and JavaScript

## License

© 2026 Kumani Septic Waste Removal. All rights reserved.