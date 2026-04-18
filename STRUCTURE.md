# Studio42 Website Structure

## Directory Layout

```
src/
├── routes/                 # Page routes (SvelteKit)
│   ├── +layout.svelte     # Root layout (header, footer, nav)
│   ├── +page.svelte       # Home page
│   ├── products/
│   │   ├── +page.svelte   # Products listing
│   │   └── [slug]/
│   │       └── +page.svelte # Product detail page
│   ├── blog/
│   │   ├── +page.svelte   # Blog listing
│   │   └── [slug]/
│   │       └── +page.svelte # Blog post (TBD)
│   ├── community/
│   │   └── +page.svelte   # Community/chat page
│   └── about/
│       └── +page.svelte   # About page
│
├── lib/
│   ├── components/        # Reusable components
│   │   ├── Header.svelte
│   │   ├── Footer.svelte
│   │   └── ProductCard.svelte
│   ├── stores.js          # Svelte stores (cart, theme, etc)
│   ├── utils/             # Utility functions (TBD)
│   └── assets/            # Icons, logos (TBD)
│
└── styles/
    └── global.css         # Global styles and CSS variables

assets/                    # Large assets (images, fonts)
├── images/
│   ├── products/
│   ├── blog/
│   └── ...
└── fonts/                 # Custom fonts (TBD)

static/                    # Static files
└── icons/                 # SVG icons (TBD)
```

## Current Features

✅ **Layout:** Header, Footer, Navigation  
✅ **Pages:** Home, Products, Blog, Community, About  
✅ **Components:** ProductCard, Header, Footer  
✅ **Styling:** Dark theme, responsive design, CSS variables  
✅ **Stores:** Cart, Products, Theme  

## Next Steps (GitHub Finds)

- [ ] **Animations:** Scroll animations (Svelte Animations, AOS, Framer Motion)
- [ ] **Icons:** SVG icon library (Feather, Heroicons, Tabler Icons)
- [ ] **Forms:** Form handling (SvelteKit form actions, Superforms)
- [ ] **Image Optimization:** Image lazy loading, srcset handling
- [ ] **E-commerce:** Stripe integration, cart checkout
- [ ] **Analytics:** Google Analytics or Plausible integration
- [ ] **SEO:** Meta tags, Open Graph, structured data
- [ ] **PWA:** Service workers for offline support
- [ ] **Blog:** MDsveX for markdown blog posts
- [ ] **Internationalization:** Multi-language support

## Recommended GitHub Packages

### Animations & Transitions
- **svelte-animation**: https://github.com/sveltejs/kit/tree/master/packages/adapter-auto
- **AOS (Animate on Scroll)**: https://github.com/michalsnik/aos
- **Framer Motion (Svelte)**: https://github.com/mattjennings/svelte-motion

### Icons
- **Heroicons**: https://github.com/tailwindlabs/heroicons
- **Feather Icons**: https://github.com/feathericons/feather
- **Tabler Icons**: https://github.com/tabler/tabler-icons

### E-commerce
- **Stripe**: https://github.com/stripe/stripe-js
- **Svelty Ecommerce Kit**: Custom or minimal setup

### Blog
- **MDsveX**: https://github.com/pngwn/MDsveX (Markdown in Svelte)

### Forms
- **Superforms**: https://github.com/ciscoheat/sveltekit-superforms
- **SvelteKit Form Actions**: Built-in (no install needed)

### Image Handling
- **Image Optimization**: Native SvelteKit or Imagekit

### Analytics
- **Plausible**: https://github.com/plausible/plausible-js
- **Fathom**: Lightweight alternative

### SEO
- **SvelteKit Meta Tags**: Built-in (use <svelte:head>)

## Development Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm build

# Preview production build
npm preview

# Format code
npm run format

# Lint
npm run lint
```

## Notes

- All pages are responsive (mobile-first approach)
- Dark theme applied globally
- Images should be added to `assets/images/`
- Fonts should be added to `assets/fonts/`
- Component props are documented in each file
