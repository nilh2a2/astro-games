# On-Page SEO Audit Report

**Project:** Astro Games Website
**Date:** 2026-01-30
**Audited By:** Claude Code

## Executive Summary

This audit identifies 8 critical on-page SEO issues that need to be addressed to improve search engine visibility and rankings. The most impactful issues are incorrect schema markup, missing structured data for games, and the absence of a robots.txt file.

**Priority Levels:**
- 🔴 **Critical** - Major impact on SEO, should be fixed immediately
- 🟡 **Important** - Moderate impact, should be addressed soon
- 🟢 **Minor** - Low impact, can be addressed later

---

## Issues Identified

### 1. Missing robots.txt File 🔴 CRITICAL

**Location:** `/public/robots.txt` (does not exist)

**Background:**
The robots.txt file is a standard used by websites to communicate with web crawlers and search engine bots. It tells search engines which pages or sections of your site should or shouldn't be crawled and indexed.

**Current State:**
No robots.txt file exists in the `/public/` directory. This means search engines have no explicit guidance on crawling behavior.

**Why This Matters:**
- Without robots.txt, you cannot control which pages search engines crawl
- You cannot specify the location of your sitemap
- You cannot prevent crawling of resource-heavy pages (like search results)
- Missing robots.txt can be seen as unprofessional by search engines

**Impact on SEO:**
- Medium-High: While not having robots.txt won't prevent indexing, it limits your control over crawl budget and prevents you from guiding search engines to your sitemap

**Recommended Fix:**
Create `/public/robots.txt` with the following content:

```txt
User-agent: *
Allow: /

# Disallow search results and pagefind resources
Disallow: /search
Disallow: /pagefind/

# Sitemap location
Sitemap: https://yourdomain.com/sitemap-index.xml
```

---

### 2. Incorrect Schema Markup (BlogPosting for All Pages) 🔴 CRITICAL

**Location:** `src/layouts/Layout.astro:34-48`

**Background:**
Schema.org structured data (JSON-LD) helps search engines understand the content and context of your pages. Different types of content should use different schema types. Using the wrong schema type confuses search engines and prevents your content from appearing in rich results.

**Current State:**
```javascript
const structuredData = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",  // ❌ Wrong for a games website
  headline: `${title}`,
  // ...
};
```

This "BlogPosting" schema is applied to ALL pages (homepage, game pages, category pages, static pages).

**Why This Matters:**
- **BlogPosting** is for blog articles, not games or game listings
- Search engines expect game pages to use **VideoGame** or **Game** schema
- Homepage should use **WebSite** schema
- Category pages should use **CollectionPage** schema
- Incorrect schema prevents rich results (game ratings, prices, platforms)
- Google may ignore or penalize incorrect structured data

**Impact on SEO:**
- High: Prevents game pages from appearing in game-specific search results and rich snippets
- Reduces click-through rates by not showing game metadata in search results

**Recommended Fix:**
Make schema markup dynamic based on page type:

1. **For game pages** - Use VideoGame schema with properties:
   - name, description, genre, gamePlatform
   - aggregateRating (if you have ratings)
   - playMode (SinglePlayer/MultiPlayer)

2. **For homepage** - Use WebSite schema with:
   - name, url, description
   - potentialAction (SearchAction for search functionality)

3. **For category pages** - Use CollectionPage schema

4. **For static pages** - Use WebPage or Article schema

---

### 3. Missing Structured Data for Games 🔴 CRITICAL

**Location:** `src/layouts/GameDetails.astro` (no structured data implementation)

**Background:**
Google and other search engines have specific rich result features for games. To qualify for these features, you must implement proper VideoGame schema markup with all required and recommended properties.

**Current State:**
Game detail pages inherit the incorrect "BlogPosting" schema from Layout.astro and have no game-specific structured data.

**Why This Matters:**
- Games are a specific content type that search engines treat specially
- Without proper schema, your games won't appear in:
  - Google's game search results
  - Rich snippets with ratings and metadata
  - Game carousels and featured results
- Competitors with proper schema will outrank you

**Impact on SEO:**
- Very High: This is the single biggest missed opportunity for a games website
- Directly affects visibility in game-related searches
- Reduces organic traffic from game-specific queries

**Recommended Fix:**
Add VideoGame schema to `GameDetails.astro`:

```javascript
const gameStructuredData = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": title,
  "description": description,
  "genre": category,
  "gamePlatform": "Web Browser",
  "playMode": "SinglePlayer", // or MultiPlayer based on game
  "url": canonicalURL,
  "image": coverImg || thumbnail,
  "datePublished": pubDatetime?.toISOString(),
  "dateModified": modDatetime?.toISOString(),
  "aggregateRating": rating ? {
    "@type": "AggregateRating",
    "ratingValue": rating,
    "bestRating": 5,
    "worstRating": 0
  } : undefined,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
};
```

---

### 4. No H1 Tag on Homepage 🔴 CRITICAL

**Location:** `src/pages/index.astro`

**Background:**
Every page should have exactly one H1 tag that describes the main topic of the page. The H1 is one of the most important on-page SEO signals, telling search engines what the page is about.

**Current State:**
The homepage has no H1 tag. It jumps straight to H2 tags for sections like "Popular Games", "New Games", etc.

```astro
<!-- Hero Section -->
<section id="hero" class:list={["py-6"]}>
  <p class="text-lg text-skin-base/90">  <!-- ❌ No H1 -->
    {getUiText("pages.home.heroText")}
  </p>
</section>

<!-- Popular Games -->
<section id="popular" class="py-8">
  <h2 class="text-2xl font-bold">  <!-- ❌ Starts with H2 -->
    {getUiText("pages.home.popularGames")}
  </h2>
</section>
```

**Why This Matters:**
- H1 is the most important heading tag for SEO
- Search engines use H1 to understand page topic and relevance
- Missing H1 is a red flag in SEO audits
- Proper heading hierarchy (H1 → H2 → H3) improves accessibility and SEO

**Impact on SEO:**
- High: Homepage is your most important page for brand searches
- Affects how search engines understand and rank your homepage
- Impacts accessibility scores (which Google considers)

**Recommended Fix:**
Add an H1 tag to the hero section:

```astro
<section id="hero" class:list={["py-6"]}>
  <h1 class="text-4xl font-bold mb-4">
    {getUiText("pages.home.title")} <!-- e.g., "Play Free Online Games" -->
  </h1>
  <p class="text-lg text-skin-base/90">
    {getUiText("pages.home.heroText")}
  </p>
</section>
```

Update `content/ui/en.json` to include:
```json
{
  "pages": {
    "home": {
      "title": "Play Free Online Games - Unblocked Games",
      "heroText": "..."
    }
  }
}
```

---

### 5. Missing og:type Meta Tags 🟡 IMPORTANT

**Location:** `src/layouts/Layout.astro:77-106`

**Background:**
Open Graph (OG) tags control how your pages appear when shared on social media platforms (Facebook, Twitter, LinkedIn, etc.). The `og:type` property tells social platforms what type of content they're displaying.

**Current State:**
The Layout.astro file includes og:title, og:description, og:url, and og:image, but is missing `og:type`.

**Why This Matters:**
- Without `og:type`, social platforms may misinterpret your content
- Different content types display differently on social media
- Proper og:type improves social sharing appearance and engagement
- Facebook's Open Graph debugger will flag this as an issue

**Impact on SEO:**
- Medium: Primarily affects social media sharing, not direct search rankings
- Indirectly affects SEO through social signals and traffic

**Recommended Fix:**
Add dynamic og:type based on page type:

```astro
<!-- Open Graph / Facebook -->
<meta property="og:type" content={ogType || "website"} />
<meta property="og:title" content={title} />
<!-- ... rest of OG tags ... -->
```

Pass `ogType` as a prop:
- Homepage: `"website"`
- Game pages: `"article"` or `"game"` (if supported)
- Category pages: `"website"`
- Static pages: `"article"`

---

### 6. Breadcrumb Missing Schema Markup 🟡 IMPORTANT

**Location:** `src/layouts/GameDetails.astro:73-82`

**Background:**
Breadcrumbs help users understand their location in your site hierarchy. When properly marked up with BreadcrumbList schema, they can appear in search results, improving click-through rates and user experience.

**Current State:**
Visual breadcrumbs exist but lack structured data:

```astro
<nav class="mb-6 flex items-center gap-2 text-sm">
  <a href="/">Home</a>
  <span>/</span>
  <a href={getCategoryPath(category)}>{category}</a>
  <span>/</span>
  <span>{title}</span>
</nav>
```

**Why This Matters:**
- Google can display breadcrumbs in search results (replacing URL)
- Breadcrumb rich results improve CTR by showing page hierarchy
- Helps search engines understand site structure
- Improves user experience in search results

**Impact on SEO:**
- Medium: Improves search result appearance and CTR
- Helps with site architecture understanding

**Recommended Fix:**
Add BreadcrumbList schema to game pages:

```javascript
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `${Astro.url.origin}/`
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": category,
      "item": `${Astro.url.origin}${getCategoryPath(category)}`
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": title,
      "item": canonicalURL
    }
  ]
};
```

---

### 7. Category Pages Need SEO Optimization Review 🟡 IMPORTANT

**Location:** `src/pages/category/[category]/index.astro` (not yet examined)

**Background:**
Category pages are important landing pages for organic search traffic. They should be optimized with unique titles, descriptions, and proper heading structure.

**Current State:**
Not yet examined in detail, but likely needs:
- Unique meta descriptions per category
- H1 tags with category names
- Introductory text explaining the category
- Proper schema markup (CollectionPage)

**Why This Matters:**
- Category pages often rank for "[category] games" queries
- They're important hub pages for internal linking
- Well-optimized category pages can drive significant organic traffic

**Impact on SEO:**
- Medium-High: Category pages are key landing pages for organic search

**Recommended Fix:**
1. Examine category page implementation
2. Ensure each category has:
   - Unique H1: "{Category} Games - Play Free Online"
   - Unique meta description with category keywords
   - 100-200 words of introductory content
   - CollectionPage schema markup
   - Pagination with rel="next" and rel="prev" if applicable

---

### 8. Thin Content in Game Markdown Files 🟢 MINOR

**Location:** `content/games/*.md` (example: `moto-x3m.md`)

**Background:**
"Thin content" refers to pages with little substantive content. Search engines prefer pages with comprehensive, valuable content. Game pages with only 2-3 short paragraphs may be flagged as thin content.

**Current State:**
Sample game file (moto-x3m.md) contains:
- 1 sentence description (repeated from frontmatter)
- 1 short "How to Play" section (2 sentences)
- Total: ~30 words of content

**Why This Matters:**
- Google's quality guidelines penalize thin content
- More content = more keywords = better rankings
- Comprehensive game pages provide better user experience
- Thin content pages may not rank well or get indexed

**Impact on SEO:**
- Low-Medium: Affects individual game page rankings
- Cumulative effect if all game pages have thin content

**Recommended Fix:**
Expand game markdown files to include:

1. **Detailed description** (100-150 words)
   - What makes this game unique
   - Gameplay mechanics
   - Target audience

2. **How to Play** (100+ words)
   - Detailed controls
   - Game objectives
   - Tips and strategies

3. **Features** (bullet list)
   - Key game features
   - Graphics/sound highlights
   - Difficulty levels

4. **Tips & Tricks** (optional, 50-100 words)
   - Advanced strategies
   - Hidden features
   - Speed run tips

**Target:** 300-500 words per game page minimum

---

## Priority Implementation Order

### Phase 1: Critical Fixes (Week 1)
1. ✅ Create robots.txt file
2. ✅ Fix schema markup (make dynamic based on page type)
3. ✅ Add VideoGame schema to game pages
4. ✅ Add H1 to homepage

### Phase 2: Important Fixes (Week 2)
5. ✅ Add og:type meta tags
6. ✅ Add breadcrumb schema markup
7. ✅ Audit and optimize category pages

### Phase 3: Content Enhancement (Ongoing)
8. ✅ Expand game content (prioritize popular/high-traffic games first)

---

## Additional Recommendations

### Not Yet Audited (Future Considerations):

1. **XML Sitemap Quality**
   - Verify sitemap includes all important pages
   - Check for proper priority and changefreq values
   - Ensure images are included in sitemap

2. **Page Load Speed**
   - Audit Core Web Vitals (LCP, FID, CLS)
   - Optimize images (already using AVIF/WebP - good!)
   - Check JavaScript bundle size

3. **Internal Linking**
   - Audit internal link structure
   - Ensure important pages have sufficient internal links
   - Check for orphaned pages

4. **Mobile Optimization**
   - Verify mobile-friendly design
   - Check tap target sizes
   - Test game iframe responsiveness

5. **Meta Description Optimization**
   - Ensure all pages have unique meta descriptions
   - Keep descriptions 150-160 characters
   - Include target keywords naturally

---

## Conclusion

The most critical issues are related to structured data and schema markup. Fixing issues #2 and #3 (schema markup) should be the top priority, as they have the highest impact on search visibility for a games website. The missing robots.txt (#1) and H1 tag (#4) are also quick wins that should be addressed immediately.

Once these critical issues are resolved, the site will be in a much stronger position for organic search visibility and will be eligible for game-specific rich results in search engines.
