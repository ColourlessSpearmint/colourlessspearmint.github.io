---
title: ASCII-Globe
date: 2025-01-18
tags: [projects, programming, cartography]
description: A text-based cartographic rendering engine that uses NASA satellite data
link: https://github.com/ColourlessSpearmint/ASCII-Globe
link_name: GitHub Repo
link_icon: github
---

Have you ever wanted to see what the Earth looks like in text form?

Well, allow me to introduce **ASCII-Globe**, a program I made that dynamically renders the Earth in [ASCII art](https://en.wikipedia.org/wiki/ASCII_art).

## Demo

{{< figure src="https://raw.githubusercontent.com/ColourlessSpearmint/ASCII-Globe/main/images/ascii_globe.gif" alt="A spinning globe rendered with text" >}}

Here's a flattened text version. Feel free to copy and paste it.

## Rendering

ASCII-Globe uses a bit of Python code I wrote that renders text onto a simulated 3D sphere.

It does this with the same [trigonometry that all rendering engines use](https://www.cs.trinity.edu/~jhowland/class.files.cs357.html/blender/blender-stuff/m3d.pdf), so I won't explain it in detail here.

ASCII-Globe also supports features such as rotation, tilt, scale, and a day-night cycle. It accomplishes the day-night cycle by switching between a day texture and a night texture, and the rest are achieved with more trigonometry.

## Texture Generation

ASCII-Globe works with any 202x80 character .txt file, but for the people who don't want to manually design a 16,160 character texture, it also comes with some image-to-txt code. The texture generator's default behavior (as described in the [documentation](https://github.com/ColourlessSpearmint/ASCII-Globe/blob/main/README.md)) is to download [this image](https://eoimages.gsfc.nasa.gov/media/imagerecords/74000/74218/world.200412.3x5400x2700.jpg) taken by NASA satellites and convert it into text. However, it'll work on any image; it doesn't even have to be a map.

## Animation

ASCII-Globe also comes with code to generate animated GIFs from a list of frames. It uses a [monospace font](https://en.wikipedia.org/wiki/Monospaced_font) like most ASCII art to maintain text column alignment. The default behavior is to render white text on a transparent background, but the code comes with lots of parameters to customize the output.

## Installation

If you want to use ASCII-Globe yourself, follow the [installation instructions](https://github.com/ColourlessSpearmint/ASCII-Globe/blob/main/README.md#installation) in the documentation.

## Conclusion

ASCII-Globe was a delightful project to develop, and coding it taught me a lot about graphics programming. I hope you find it useful, or at least amusing.

~Ethan
