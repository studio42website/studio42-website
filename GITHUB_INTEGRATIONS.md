# GitHub Integrations for Studio42 Website

## Animation & Visual Effects

### 1. **AOS (Animate on Scroll)**
- **GitHub:** https://github.com/michalsnik/aos
- **What:** Triggers animations when elements scroll into view
- **Use case:** Product cards fade in, text slides in on scroll
- **Install:** `npm install aos`
- **Setup:** 2 minutes
- **Quality:** ⭐⭐⭐⭐⭐ (Popular, well-maintained)

**Code example:**
```svelte
<script>
  import AOS from 'aos';
  import 'aos/dist/aos.css';

  onMount(() => {
    AOS.init();
  });
</script>

<div data-aos="fade-up" data-aos-duration="1000">
  Product content
</div>
```

---

### 2. **Framer Motion (Svelte binding)**
- **GitHub:** https://github.com/mattjennings/svelte-motion
- **What:** Smooth animations and transitions
- **Use case:** Hover effects, page transitions
- **Install:** `npm install svelte-motion`
- **Setup:** 5 minutes
- **Quality:** ⭐⭐⭐⭐⭐ (Industry standard)

---

### 3. **GSAP (GreenSock Animation Platform)**
- **GitHub:** https://github.com/greensock/GSAP
- **What:** Professional animation library
- **Use case:** Complex animations, timelines
- **Install:** `npm install gsap`
- **Setup:** 10 minutes
- **Quality:** ⭐⭐⭐⭐⭐ (Professional-grade)
- **Note:** Large file size, consider if needed

---

## Icons

### 1. **Heroicons (Tailwind)**
- **GitHub:** https://github.com/tailwindlabs/heroicons
- **What:** Beautiful, consistent SVG icons
- **Use case:** Navigation icons, social media, UI elements
- **Install:** `npm install heroicons`
- **Setup:** 2 minutes
- **Quality:** ⭐⭐⭐⭐⭐

**Code example:**
```svelte
<script>
  import { ShoppingCart, Menu, X } from 'heroicons-svelte/solid';
</script>

<ShoppingCart class="w-6 h-6" />
```

---

### 2. **Feather Icons**
- **GitHub:** https://github.com/feathericons/feather
- **What:** Minimal, clean SVG icons
- **Use case:** Minimalist design (fits Studio42 aesthetic!)
- **Install:** `npm install feather-icons`
- **Setup:** 3 minutes
- **Quality:** ⭐⭐⭐⭐⭐ (Lightweight)

---

## Forms & Input Handling

### 1. **Superforms**
- **GitHub:** https://github.com/ciscoheat/sveltekit-superforms
- **What:** Form validation and handling
- **Use case:** Newsletter signup, contact forms
- **Install:** `npm install superforms zod`
- **Setup:** 15 minutes
- **Quality:** ⭐⭐⭐⭐⭐ (SvelteKit-native)

---

## E-commerce

### 1. **Stripe (Official)**
- **GitHub:** https://github.com/stripe/stripe-js
- **What:** Payment processing
- **Use case:** Checkout, product purchases
- **Install:** `npm install @stripe/stripe-js`
- **Setup:** 20 minutes (requires Stripe account)
- **Quality:** ⭐⭐⭐⭐⭐ (Industry standard)

---

### 2. **Snipcart**
- **GitHub:** https://github.com/snipcart/snipcart-platform
- **What:** Embedded e-commerce platform
- **Use case:** Full cart, checkout, inventory
- **Install:** Embed script
- **Setup:** 10 minutes
- **Quality:** ⭐⭐⭐⭐ (Easy to use)

---

## Blog & Content

### 1. **MDsveX**
- **GitHub:** https://github.com/pngwn/MDsveX
- **What:** Write blog posts in Markdown, render as Svelte
- **Use case:** Blog posts with rich formatting
- **Install:** `npm install mdsvex`
- **Setup:** 15 minutes
- **Quality:** ⭐⭐⭐⭐⭐ (Powerful, flexible)

**Code example:**
```svelte
<!-- blog/my-post.md -->
# My Blog Post

This is a markdown blog post that renders as Svelte!
```

---

## Image Optimization

### 1. **Sharp (Image Processing)**
- **GitHub:** https://github.com/lovell/sharp
- **What:** Fast image resizing and optimization
- **Use case:** Generate responsive images
- **Install:** `npm install sharp`
- **Setup:** 5 minutes
- **Quality:** ⭐⭐⭐⭐⭐ (Fast, efficient)

---

### 2. **Image Kit (Cloud-based)**
- **GitHub:** https://github.com/imagekit-developer/imagekit-js
- **What:** Cloud image optimization and delivery
- **Use case:** Responsive images, lazy loading
- **Install:** `npm install imagekitio`
- **Setup:** 10 minutes (requires account)
- **Quality:** ⭐⭐⭐⭐ (Easy, scalable)

---

## Analytics

### 1. **Plausible**
- **GitHub:** https://github.com/plausible/plausible-js
- **What:** Privacy-focused analytics
- **Use case:** Track visitors, conversions
- **Install:** Embed script
- **Setup:** 5 minutes
- **Quality:** ⭐⭐⭐⭐⭐ (Privacy, lightweight)

---

### 2. **Fathom**
- **GitHub:** https://github.com/derrickreimer/fathom
- **What:** Lightweight analytics
- **Use case:** Simple visitor tracking
- **Install:** Embed script
- **Setup:** 3 minutes
- **Quality:** ⭐⭐⭐⭐ (Super lightweight)

---

## SEO & Meta Tags

### 1. **svelte-seo**
- **GitHub:** https://github.com/artiebits/svelte-seo
- **What:** Manage SEO meta tags
- **Use case:** OpenGraph, Twitter cards, structured data
- **Install:** `npm install svelte-seo`
- **Setup:** 5 minutes
- **Quality:** ⭐⭐⭐⭐

**Code example:**
```svelte
<script>
  import SEO from 'svelte-seo';
</script>

<SEO
  title="Studio42 - Handmade Lighting"
  description="Limited edition handmade lighting objects"
  image="https://studio42.art/og-image.jpg"
/>
```

---

## Recommended Install Order

**Phase 1 (This Week):**
1. Heroicons (icons) — 2 min
2. AOS (animations) — 2 min
3. svelte-seo (SEO) — 5 min

**Phase 2 (Next Week):**
4. Stripe (e-commerce) — 20 min
5. Superforms (forms) — 15 min

**Phase 3 (May):**
6. MDsveX (blog) — 15 min
7. Plausible (analytics) — 5 min
8. Sharp or ImageKit (images) — 10 min

---

## Installation Cheat Sheet

```bash
# Phase 1
npm install aos heroicons-svelte svelte-seo

# Phase 2
npm install @stripe/stripe-js superforms zod

# Phase 3
npm install mdsvex sharp plausible-js

# Optional
npm install gsap @snipcart/snipcart-sdk imagekitio
```

---

## Notes

- All of these are **npm-installable** or **embed-script**
- No vendor lock-in (most are open-source)
- Studio42 aesthetic: Focus on **minimalist, smooth animations** (AOS + Heroicons + Feather)
- Start with Phase 1, add others as needed
- Test on localhost before deploying

---

**Last Updated:** 2026-04-18 01:00 GMT+2
