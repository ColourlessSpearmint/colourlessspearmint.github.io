---
title: Switching to Hugo
date: 2025-07-10
tags: [programming, webdev, personalwebsite]
description: I switched from using my custom Python SSG to using Hugo
---

Up until yesterday, The blog posts on this website were written in [Mint Flavoured Markdown](/blog/mfm) and rendered into [HTML](https://en.wikipedia.org/wiki/HTML) by a Python script I wrote that I simply called build.py. It complied with the MFM standard, and was very helpful in simplifying the process of writing new blog posts. The final version of build.py is archived [here](https://github.com/ColourlessSpearmint/colourlessspearmint.github.io/blob/b194fe064cbbc43dc714fbde7b27d47dfcad262f/build.py).

I spent nearly a month developing build.py, so the speed at which I completely abandoned it in favour of [Hugo](https://gohugo.io/) is noteworthy.

## Reasoning

Many of my [projects](/tags/projects) were developed in an effort to solve a problem or avoid a future problem. This switch to Hugo is not one of them. Build.py worked perfectly fine, I just felt like Hugo was better in basically every way.

### Performance

Hugo is unbelievably fast. As of today (July 10), a full Hugo build, rendering all 85 pages and 60 static files, takes 125 milliseconds. 

{{< figure src="/media/hugo-build-screenshot.webp" alt="My Hugo site takes 125 milliseconds to build 85 pages and 60 static files" >}}

To put that in perspective, let's imagine that I connected my laptop to a train horn and rigged Hugo such that the instant the site build started, it would trigger the train horn. Now let's imagine that you're standing 42.9 meters (one and a half basketball courts) away. Hugo would finish its build *before* the sound from the train horn reached you. And that's only counting the time for the sound wave to reach your location! In the time it would take for you to actually process the sound and react to it, Hugo could have built the site two and a half additional times.

And this is only for a *full* build. If I only re-build a single page, it takes as little as 9 milliseconds (I've seen it at 3ms a few times, but it averages closer to 9ms). To expand on the train horn analogy, if my laptop was at the foot of a king-sized bed while you were at the head, the Hugo build would complete *before* you went deaf. Hugo builds are, for all practical purposes, instantaneous. This means I can view changes in real time on my browser.

In contrast, build.py took a 2-3 seconds to build. You'd have to be standing at the tip of three Eiffel Towers balanced on top of each other in order for the build to complete before the sound reached you.

Hugo and build.py aren't even in the same league in terms of build speed. This is due entirely to Hugo being built in [Go](https://go.dev/) rather than [Python](https://www.python.org/). The specifics of why this makes such a differences are beyond the scope of this post, but here's a [neat article that explains it](https://pgrandinetti.github.io/compilers/page/why-some-programming-language-is-faster/) without too much jargon.

### Built-in Functionality

Hugo has a bunch of built-in features. For example, it natively handles [tags](/tags), which it calls [taxonomies](https://gohugo.io/content-management/taxonomies/) for some reason. Build.py had tags too, but it was a lot of work to implement this and added a lot of complexity. Hugo's taxonomies were also a lot of work to implement, but *I didn't have to do any of that work*, so it isn't relevant.