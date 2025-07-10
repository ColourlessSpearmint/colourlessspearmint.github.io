---
title: Mint Flavoured Markdown
date: 2025-06-30
tags: [projects, programming, webdev, personalwebsite]
description: a specification of Mint Flavoured Markdown, a custom markdown flavour I developed for use in my custom SSG
---

{{< figure src="/media/mfm-banner.webp" alt="The Mint Flavoured Markdown logo, a capital 'M' covered in minty vegetation and adjacent to an arrow pointing down. Designed by Imagen 4, edited by Ethan Marks" >}}

***EDIT (2025-07-10):** I've decommissioned MFM from this site's build step. I'm using [Hugo](https://gohugo.io/) now. You can read more about my reasoning [here](/blog/hugoswitch).*

When I started designing and prototyping my [personal website](/blog/personalwebsite), I was very much inspired by [this blog post](https://leanrada.com/notes/vanilla-web-rewrite/) by [Lean Rada](https://leanrada.com/). Basically, it advocates for authoring blog content in pure [HTML](https://en.wikipedia.org/wiki/HTML), rather than using a [static site generator](https://en.wikipedia.org/wiki/Static_site_generator) like [Jekyll](https://en.wikipedia.org/wiki/Jekyll_(software)) that converts [Markdown](https://en.wikipedia.org/wiki/Markdown) into HTML.

This made a lot of sense to me, as I really didn't want to have to learn Jekyll (in fact, I wanted to [Hyde](https://en.wikipedia.org/wiki/Strange_Case_of_Dr_Jekyll_and_Mr_Hyde) from it entirely). So for a couple months, I authored each and every blog post in pure HTML.

As I quickly learned, the problem with this approach is that it's extremely verbose. Rather than just containing the words I wanted to say, each blog post's file had to contain a bunch of [boilerplate](https://en.wikipedia.org/wiki/Boilerplate_code) that was the same on every page, like where the site [favicon](https://en.wikipedia.org/wiki/Favicon) is located. It also meant that I had to do a bunch of things manually, like adding new blog posts to their aggregator page (There were three: Curios, Figments, and Elsewise. Nowadays I use [tags](/tag) for this). I dislike doing things manually (one of my early programming projects, when I was 11 years old, was a quadratic formula calculator that I built because I loved math but hated manual arithmetic), and it really bugged me that I couldn't automate the tedious blog-authoring tasks.

To solve this, On June 6th, I [made my own SSG](https://github.com/ColourlessSpearmint/colourlessspearmint.github.io/commit/81e2247227d1a9d3dddd4f9173da3d1602e9e405) that parsed Markdown into HTML. This was a much better solution, and it's allowed me to add a bunch more functionality to my site, like tags, by expanding the SSG over the past three weeks. 

The only problem was that a few of my blog posts used elements that didn't exist in Markdown, like image comparison sliders, videos, and poems. My solution was to just [embed HTML](https://css-tricks.com/embedded-content-in-markdown/) into the markdown files. This *worked*, but it felt like a messy compromise the kind of defeated the point of using Markdown in the first place. I decided that I should use another Markdown flavour (which is the technical term, by the way) that supported the features I wanted natively.

There are a few different flavours of Markdown. The default flavour is [CommonMark](https://commonmark.org/). Probably the most-used flavour is [Github Flavored Markdown](https://github.github.com/gfm/) (GFM). There's also [ExtraMark](https://github.com/vimtaai/extramark), [MultiMarkdown](https://fletcherpenney.net/multimarkdown/), and [lots of others](https://gist.github.com/vimtaai/99f8c89e7d3d02a362117284684baa0f). Neither of these have support for iframes or centered text, so I knew I had to make my own flavour.

## MFM

I present: **Mint Flavoured Markdown**. It's a superset of CommonMark, but with a few extra features specifically tailored to my use case. 

The name is obviously a reference to my username, ColourlessSpearmint. It would probably make more sense to call it "Spearmint Flavoured Markdown", but then it wouldn't be evocative of toothpaste, which is a critical feature in software design. Also it uses the British English spelling because I'm the one who developed it and I prefer that spelling and you can spell it however you like in *your* Markdown flavour.

I'm pretty sure that I'll be adding more features at some point in the future, so I'll be a responsible developer and use versioning. This blog post was first published on June 30, coinciding exactly with the release of MFM v1. I'll edit this post if I release a new version.

## MFM v1

### iFrames

[HTML Inline Frames](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe) (iFrames) can be declared in MFM by using double square brackets that contain the iFrame title, followed by single parenthesis that contains the iFrame src. It was inspired by Obsidian Flavored Markdown's [note embedding syntax](https://help.obsidian.md/embeds).

For example, the following Markdown...

```markdown
![[Test]](https://colourlessspearmint.github.io)
```

...parses into the following HTML.

```html
<iframe 
    scrolling="no" 
    title="Test" 
    src="https://colourlessspearmint.github.io" 
    frameborder="no" 
    loading="lazy" 
    allowtransparency="true" 
    allowfullscreen="true">
</iframe>
```

I suggest the following [regular expression](https://en.wikipedia.org/wiki/Regular_expression) for capturing the content of iFrame declarations.

```regex
r"!\[\[(.*?)\]\]\((.*?)\)"
```

### Media

MFM extends the default [Markdown image syntax](https://github.com/adam-p/markdown-here/wiki/markdown-cheatsheet#images) to include other forms of media, such as videos, animations, and YouTube videos.

#### Videos

If the file extension of the media src is an [MP4](https://en.wikipedia.org/wiki/MP4_file_format), [WebM](https://en.wikipedia.org/wiki/WebM), [Ogg](https://en.wikipedia.org/wiki/Ogg), or [QTFF](https://en.wikipedia.org/wiki/QuickTime_File_Format) (.mov), it will be treated as a video, rather than an image.

The default behavior is for it to be parsed into a video element that does not loop, is not muted, and requires user input to start playback. For example, the following Markdown...

```markdown
![Test](https://colourlessspearmint.github.io/media/example.webm)
```

...parses into the following HTML.

```html
<video 
    class="video" 
    src="https://colourlessspearmint.github.io/media/example.webm" 
    controls
    alt="Test">
</video>
```

#### Animations

The MFM animation syntax is an override of the video syntax. The difference is that the text in the square brackets is prefixed with "GIF ". The "GIF" prefix will be removed from the final alt text. It is then parsed into a video element that loops, is muted, and autoplays. For example, the following Markdown...

```markdown
![GIF Test](https://colourlessspearmint.github.io/media/example.webm)
```

...parses into the following HTML.

```html
<video 
    class="gif" 
    src="https://colourlessspearmint.github.io/media/example.webm" 
    autoplay
    loop
    muted
    playsinline
    alt="Test">
</video>
```

The usage of the term "GIF" is obviously derived from the [GIF image format](https://en.wikipedia.org/wiki/GIF), even though GIFs aren't in the list of supported video formats. GIFs are extremely bad at storing videos and are inferior in every way to [WebM AV1](https://en.wikipedia.org/wiki/AV1), so developers are discouraged for using them. "GIF" has just become the colloquial term for a short, looping, muted animation, so I decided to just roll with it and use that as the reserved syntax. MFM media animations are related only in spirit to GIF images.

#### YouTube

In MFM, a media element is parsed into a [YouTube embedded player](https://developers.google.com/youtube/player_parameters) via an iFrame if the address of the media src starts with "https://www.youtube.com" or similar. For example, the following Markdown...

```markdown
![Test](https://www.youtube.com/watch?v=hS_AXRRnIzM)
```

...parses into the following HTML.

```html
<iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/hS_AXRRnIzM" 
    frameborder="0" 
    allow="autoplay; encrypted-media" 
    allowfullscreen>
</iframe>
```

I suggest the following regular expression for for capturing the content of YouTube media declarations.

```regex
r"https?://(?:www\.)?(?:youtube\.com/watch\?v=|youtu\.be/)([\w-]+)"
```

### Double Blockquotes

The MFM double blockquotes syntax parses into a blockquote element with the class "centered-blockquote". Any consecutive lines that start with ">>" (two greater-than signs) are grouped together and rendered as a centered blockquote. Blank lines within the blockquote are used to separate stanzas, which are rendered as separate paragraph tags.

For example, the following Markdown...

```markdown
>> This is a centered blockquote.
>> It can span multiple lines.
>>
>> This is a new stanza.
```

...parses into the following HTML.

```html
<blockquote class='centered-blockquote'>
    <p>This is a centered blockquote.<br>
    It can span multiple lines.</p>
    <p>This is a new stanza.</p>
</blockquote>
```

Only lines that begin with ">>" (optionally preceded by whitespace) are included in the blockquote. The ">>" is removed, and any leading whitespace after it is also removed. The blockquote ends when a non-blockquote line is encountered.

The "centered-blockquote" class should be centered in the page while keeping the text aligned to the left. This is useful for poetry, song lyrics, etc. I suggest the following CSS rule to implement this.

```css
blockquote.centered-blockquote {
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
}
```

## Conclusion

Mint Flavored Markdown is my first custom specification, and it's already proven to be quite useful in making my blog posts more concise. I don't honestly expect anybody else to use MFM, but maybe some of its syntax could be of inspiration. It goes without saying that you can use and adapt MFM however you like.

~Ethan