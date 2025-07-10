---
title: Personal Website
date: 2025-05-14
tags: [projects, programming, webdev, personalwebsite]
description: The website you're reading right now
link: https://github.com/ColourlessSpearmint/colourlessspearmint.github.io
link_name: GitHub Repo
link_icon: github
---

My personal website is my home on the web.

{{< figure src="/index.html" alt="homepage" >}}

I made this site because I want to have an online presence, but I don't want to use social media (e.g. [Instagram](https://www.instagram.com/), [Twitter](https://twitter.com/)), nor do I want to use someone else's premade blogging platform (e.g. [Blogger](https://www.blogger.com), [Tumblr](https://www.tumblr.com/), [Wordpress](https://wordpress.com/)).

My solution was to code an entire site from scratch.

## Tech

This site is completely static and is written entirely in pure vanilla HTML, CSS, and JavaScript. It uses a few unavoidable premade libraries and services, but it's completely free from major frameworks (e.g. [React](https://react.dev/), [Vue.js](https://vuejs.org/), [Angular](https://angular.io/)).

### External Libraries

- [vanilla-tilt.js](https://micku7zu.github.io/vanilla-tilt.js/): Used to make the cards on the home page.
- [quicklink](https://github.com/GoogleChromeLabs/quicklink): Used to improve loading times.

### GitHub Pages

This site is hosted on [GitHub Pages](https://pages.github.com/). I chose GitHub Pages because it's free, seems reputable, and I was already going to use GitHub for source control.

{{< figure src="/media/ghpages.webp" alt="My Github Pages deployment workflow" >}}

### Build

Each blog post is stored as a [Mint Flavoured Markdown](/blog/mfm) document, and is built into HTML by my custom [static site generator](https://en.wikipedia.org/wiki/Static_site_generator). [My SSG](https://github.com/ColourlessSpearmint/colourlessspearmint.github.io/blob/main/build.py) searches the blog_src directory for markdown files, reads the file contents, and applies it to a template to create the final HTML files that are sent to your browser. It also dynamically updates other pages (like the [tag aggregators](/tag)) with links to each blog post. I also wrote a [pre-commit hook](https://git-scm.com/book/ms/v2/Customizing-Git-Git-Hooks) that runs build.py before each commit, ensuring I don't forget.

### Web Components

For extremely repetitive elements that are exactly the same on every page, I utilize custom [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components). To use the example of the site header, I have a bit of JavaScript code that searches for <ethan-header\> elements and replaces them with the actual header content. This allows me to de-clutter the HTML and also provides a [single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth) for the header. Here's the code.

```javascript
customElements.define(
    "ethan-header",
    class EthanHeader extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.innerHTML = `
            <header>
                <a href="/" class="title-container" tabindex="0" aria-label="Home">
                    <span class="title-item">Ethan</span>
                    <span class="title-item"> Marks</span>
                </a>
                <nav>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/blog">Blog</a>
                    <a href="/tag/projects">Projects</a>
                </nav>
            </header>
            `;
        }
    }
);
```

I chose to use [Light DOM](https://meyerweb.com/eric/thoughts/2023/11/01/blinded-by-the-light-dom/) over [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) for simplicity and performance, and so that I could seperate the CSS styles from the HTML structure.

## Style Guide

I had a moderately specific vision for what I wanted my website to look like, and I think I accomplished that well with my site's CSS styles. The primary stylesheet, [common.css](https://github.com/ColourlessSpearmint/colourlessspearmint.github.io/blob/main/common.css), contains 1215 lines of code. [The auxilary stylesheets](https://github.com/ColourlessSpearmint/colourlessspearmint.github.io/blob/main/static/) add another 2040 lines. I utilized [nestled CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting) to create reusable and readable styles.

### Color Palette

- **Primary**: <span style="color: #ffffff; text-shadow: -1px -1px 0 #000000, 1px -1px 0 #000000, -1px 1px 0 #000000, 1px 1px 0 #000000;">#ffffff</span>: White
- **Backdrop**: <span style="color: #121212; text-shadow: -1px -1px 0 #3c3c3c, 1px -1px 0 #3c3c3c, -1px 1px 0 #3c3c3c, 1px 1px 0 #3c3c3c;">#121212</span>: Black
- **Accent**: <span style="color: #8fdfd4;">#8fdfd4</span>: Spearmint Teal

### Typography

- **Primary Font**: I perused the *entire* [Google Fonts](https://fonts.google.com/) catalogue to find a [neo-grotesque](https://fonts.google.com/knowledge/glossary/grotesque_neo_grotesque) font that I liked the look of and that supported both [Latin](https://en.wikipedia.org/wiki/Latin_script) and [Cyrillic](https://en.wikipedia.org/wiki/Cyrillic_script) glyphs. I finally settled on [Nunito](https://fonts.google.com/specimen/Nunito), and it's the default font that most text on the site uses.
- **Secondary Font**: For the headings, I used [Sen](https://fonts.google.com/specimen/Sen). There are many subtle differences between Sen and Nunito, but the most noticable is the lack of rounded strokes. Sen looks sharper and more angular than Nunito.

### Special Effects

- **Blur**: I love [glassmorphic](https://css.glass/) blur effects, but due to performance concerns, I've only used it in the header and footer. If some mathematician figures out how to cheaply perform a [gaussian blur](https://en.wikipedia.org/wiki/Gaussian_blur) over a large sample space, I want to be the first to know so I can add a subtle blur to the main panel without tanking performance.
- **Tilt**: If you hover over the cards on my home page, they'll respond to the mouse by tilting in 3D. I used [vanilla-tilt.js](https://micku7zu.github.io/vanilla-tilt.js/) for this.

## Lighthouse

As of [June 9, 2025](https://pagespeed.web.dev/analysis/https-colourlessspearmint-github-io/uxk33xj1o8?form_factor=desktop), the site earns an average [Lighthouse](https://developer.chrome.com/docs/lighthouse) score of 99.75.

{{< figure src="/media/lighthouse.webp" alt="A Lighthouse analytic page showing 99 performance, 100 accessibility, 100 best practices, 100 SEO" >}}

It's very close to a perfect score, but I lost one point in performance because of the 520 milliseconds (half a second) it takes to download the font.

## Privacy

This site does not use cookies, trackers, analytics, or any external telemetry tools. This is partially because I care about your privacy, but mostly because I don't care about your personal information and harvesting it sounds complicated. Your data remains yours because I don't want it and can't figure out how to get it.

## Accessibility

This site is designed to be accessible to as many users as possible. I've done my best to follow best practices regarding meta tags, semantic markup, keyboard navigation, and alt text. Also, before each [git push](https://git-scm.com/docs/git-push) I test every single page in Firefox's [Responsive Design Mode](https://firefox-source-docs.mozilla.org/devtools-user/responsive_design_mode/) to ensure that the site remains functional on different devices and screens.

## Conclusion

My personal website is one of my favorite projects I've ever made. It's aesthetically pleasing, serves a purpose, was fun to make, and forced me to learn new programming concepts.

I'm proud of my little corner on the web, and I hope you enjoy it as much as I do. Thanks for reading.

~Ethan
