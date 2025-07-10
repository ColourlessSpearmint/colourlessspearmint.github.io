---
unlisted: true
title: Flood Fill Text
date: 2025-06-30
tags: [projects, programming, webdev, codepen]
description: a codepen to generate meme-y gif animations where individual characters of text flood fill outwards
link: https://codepen.io/ColourlessSpearmint/pen/YPXMvxg
link_name: CodePen
link_icon: codepen
---

A few weeks ago, a friend sent me this reaction GIF.

{{< figure src="/media/darthvadernooo.webm" alt="GIF an animated gif where a bunch of \"O\"s spiral out from an \"N\", overlayed on a clip of Darth Vader saying \"Nooooo\"" >}}

I'd never seen this GIF before, and the premise was pretty interesting. Rather than the text scrolling past or appearing letter-by-letter in a straight line like in many other reaction GIFs, this GIF has the text change direction, fork, and spiral as it appears. This was both amusing and interesting, and I spent the next few hours trying to recreate the effect with [CSS](https://en.wikipedia.org/wiki/CSS) animations. I had been [nerd sniped](https://xkcd.com/356/).

Anyways, I succeeded in making my own implementation of this effect. I recorded a GIF, sent it, and moved on with my life.

Except that's not what happened. For inexplicable reasons, I continued working on it, and eventually developed a full parameterized webpage. I still don't know why I spent so much time on this, but I figured I might as well publish it as a [CodePen](https://codepen.io).

{{< iframe src="https://codepen.io/ColourlessSpearmint/embed/YPXMvxg?default-tab=result" title="The flood fill text codepen" >}}

## Customization

The intended use case is for extremely short strings, usually a single letter. However, you can make the initial and repeating string be anything you like. For example, you can set the initial string to "HIY" and the repeating string to "A". The output will look something like "HIYAAAAAAAAAAA...". 

You can also set the horizontal offset of the initial string relative to the center cell. You can set the font, the grid size, and the colours.

## Usage

I looked into incorporating a way to natively record GIFs in the webpage, but from my initial experiments it seems like that's extremely difficult so I decided not to implement it. Instead the method for saving the animation to a GIF is much more convoluted. 

1. Go to the CodePen: <https://codepen.io/ColourlessSpearmint/full/YPXMvxg>
2. Customize the animation and tweak the parameters to your liking
3. Open a screen recording program (Windows Snipping Tool works for this. Press Win+Shift+S)
4. Record a few loops of the animation
5. Trim the recording to only a single loop (Windows Photos has a built-in video trimming tool)
6. Convert the recording from MP4 to GIF. If you're the kind of person who has [ffmpeg](https://ffmpeg.org/) installed, you probably already know how to do this. Otherwise, use a tool like [Cloud Convert](https://cloudconvert.com/mp4-to-gif)

## Conclusion

I hope you enjoyed this silly little blog post. I look forward to a future where all information is communicated via flood fill text animations.

~Ethan