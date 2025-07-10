---
title: Thoughts on Liquid Glass
date: 2025-06-14
tags: [tech, apple]
description: My thoughts on Apple's new Liquid Glass design
---

{{< figure src="/media/liquid_glass_banner.webp" alt="Various colourful abstract Liquid Glass blobs, using glassmorphic frosted glass transparency and resembling real glass" >}}

As part of [WWDC25](https://developer.apple.com/wwdc25/) on June 9, 2025, Apple unveiled their new [Liquid Glass](https://en.wikipedia.org/wiki/Liquid_Glass) material and incorporated it into the design of the iPhone, iPad, Mac, Apple Watch, Apple TV, and Apple Vision.

For context, I'm not a huge Apple fan: I'm writing this on a Windows laptop, listening to music from my Android phone. I don't dislike Apple, but I generally disapprove of the Apple ecosystem and don't think that it's right for me.

That being said, I absolutely love Liquid Glass. At no other point in time has my opinion of Apple been higher than when they showed off the new interface at the [WWDC25 keynote](https://developer.apple.com/videos/play/wwdc2025/101/). It's not a perfect design, and it has some disadvantages, but it is a bold design choice by Apple that I'm delighted by.

## Glassmorphism

Liquid Glass is just the Applelogism (A portmanteau of [Apple](https://en.wikipedia.org/wiki/Apple_Inc.) and [neologism](https://en.wiktionary.org/wiki/neologism) coined by me to describe Apple's tendency to take popular existing concepts and rebrand them under a really generic Apple-ey name; see also Microsoft Excel and Apple Numbers) for [Glassmorphism](https://hype4.academy/tools/glassmorphism-generator): a design philosophy that uses translucent blur effects to emulate [frosted glass](https://en.wikipedia.org/wiki/Frosted_glass).

{{< figure src="https://img.sysnettechsolutions.com/What-is-Windows-Vista-Nedir-01.webp" alt="Windows Aero's glassmorphic interface, featuring transparent blurred backgrounds" >}}

As [many](https://www.instagram.com/reel/DKvIXjChU0L/?hl=en) [other](https://www.pcmag.com/news/did-apple-liquid-glass-design-steal-from-windows-vista-wwdc-2025) [people](https://www.reddit.com/r/windows/comments/1l7eqia/apple_liquid_glass_be_like/) [have](https://www.engadget.com/computing/apples-liquid-glass-is-windows-vista-done-well-181954910.html) [pointed](https://www.windowscentral.com/apple/apple-liquid-glass-wwdc-sorry-imitation-of-windows-vista-aero) [out](https://www.reddit.com/r/MacOS/comments/1l8pvm7/is_it_just_me_or_liquid_glass_reminds_frutiger/), Apple absolutely did not invent glassmorphism. Frosted glass designs were first popularized by [Windows Aero](https://en.wikipedia.org/wiki/Windows_Aero) in 2007, and [lots](https://css.glass/) [of](https://tricks-glassmorphism.webflow.io/) [other](https://reflect.app/) [designers](https://hype4.academy/tools/glassmorphism-generator) [have](https://www.reflectorai.app/) [used](https://www.behance.net/gallery/113924121/Kit-UI-Glassmorphism-trend#) [it](https://leanrada.com/) [since](https://jetgirl.art/), including me!

This website (at least, as of the time of writing) features a glassmorphic header at the top of each page. The header has gone through quite a bit of iteration, but the frosted glass effect has been present from [the very first design](https://github.com/ColourlessSpearmint/colourlessspearmint.github.io/commit/e4d6dcd0c97ed13c39c4b96709b844a0465720f3#diff-9bef76ac5cd1246a53c15ea6cf7aea15d8af6c1fd0978867c27ba8fe9ae6b1f4), created on April 11, 2025. Glassmorphism is one of my favorite effects, so I was absolutely delighted that Apple decided to implement it in the form of Liquid Glass.

## Liquid Glass is Beautifully…

At its core, the only thing that Liquid Glass does is make the iPhone look prettier. It does a very good job of this.

### …Novel

{{< figure src="https://i.ytimg.com/vi/jGztGfRujSE/maxresdefault.jpg" alt="Liquid Glass promotional material with the text \"Introducing Liquid Glass\" in chromatic type, next to six colourful pieces of glass, visibly refracting light and demonstrating additive color mixing" >}}

Liquid Glass is unique. Despite Windows Vista featuring glassmorphism more than 18 years ago, current versions of Windows use [Fluent Design](https://en.wikipedia.org/wiki/Fluent_Design_System), which is the same boring [Flat design language](https://en.wikipedia.org/wiki/Flat_design) that pretty much every other interface uses. 

Liquid Glass is a splash of colour (or lack thereof) in a sea of bland minimalism.

### …Futuristic

{{< figure src="https://cdn.macstories.net/screenshot-02-04-2024-19-35-44-1707094523402.png" alt="Two VisionOS panels using Liquid Glass displaying information about the weather" >}}

Liquid Glass feels futuristic. See-through displays are featured so prominently in sci-fi settings like [Avatar](https://uxdesign.cc/why-all-of-hollywood-ui-looks-the-same-2ae1d3143350) that we tend to associate transparent displays with futuristic technology. A smart phone with Liquid Glass feels much closer to [Tony Stark's phone](https://i.pcmag.com/imagery/articles/017E1zlg5U6WhbK1R9iJKv0-21..v1619617955.png) than a smart phone without it.

{{< figure src="/media/android_ios18_ios26.webp" alt="Three smartphone screens display distinct aesthetics: Android 14 (left) features a clean, minimalist home screen with circular icons; iOS 18 (middle) shows a vibrant home screen with distinct, dark app icons; and iOS 26 (right) presents a futuristic home screen with transparent, frosted glass app icons." >}}

For example, consider the image above. On the left is a screenshot of [my phone](https://q1.cricketwireless.com/product/motorola-moto-g-5g-2023/) running [Android 14](https://www.android.com/android-14/), in the middle is a phone running [iOS 18](https://www.apple.com/ios/ios-18/), and on the right is a phone running [iOS 26](https://www.apple.com/newsroom/2025/06/apple-elevates-the-iphone-experience-with-ios-26/). Of these three, which one looks most like something you'd find in a sci-fi movie? The answer is unambiguously the phone on the right. However you feel about Liquid Glass, you can't deny that it looks straight out of Black Mirror. In a good way.

### …Animated

{{< figure src="/media/liquid_glass_coalescence.webm" alt="GIF Liquid Glass widgets morphing between a simple blob, a navigation bar, a context menu, and a browser control bar" >}}

Third, Liquid Glass is, well, *liquid*. It moves and behaves organically and realistically. For example, if two buttons made of Liquid Glass merge into one, they coalesce [like real blobs of liquid](https://youtu.be/Aq5ydeWWr4A) (the way the blobs merge reminds me of [object blending via ray marching](https://youtu.be/Cp5WWtMoeKg&t=198), although apparently Apple actually used [signed distance field interpolation](https://en.wikipedia.org/wiki/Signed_distance_function) for the [Fluid Morph](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass) effect, not [ray marching](https://en.wikipedia.org/wiki/Ray_marching)). Because Liquid Glass imitates real-life fluid dynamics that we understand intuitively, it feels responsive and dynamic in a way that is pleasing to use.

### …Light Bending

{{< figure src="https://pbs.twimg.com/media/GtPwHs4WcAAegfa?format=jpg&name=900x900" alt="A Liquid Glass overlay on a starry sky backdrop. The overlay is bending and refracting the light of a star into a rainbow, similarly to how a real-life prism behaves" >}}

Liquid Glass bends light like a prism. I find it difficult to describe how cool this is to me. 

I understand how Apple did this from a technical perspective. I understand their [colour dispersion](https://en.wikipedia.org/wiki/Dispersion_(optics)) and [luminal refraction](https://en.wikipedia.org/wiki/Refraction) techniques. This is still one of the most impressive and coolest interface effects I've ever seen. Even if Apple had just straight-up lifted Windows Aero without making any modifications (to be clear, they absolutely didn't do this) except for adding this prism effect, I would still think that Liquid Glass was awesome.

## Liquid Glass is Problematically…

Despite its aesthetic appeal, Liquid Glass does have a significant amount of problems that [the](https://techcrunch.com/2025/06/10/love-it-or-hate-it-apples-new-liquid-glass-design-is-getting-mixed-reviews/) [internet](https://www.reddit.com/r/ios/comments/1l7t62c/what_are_your_thoughts_about_liquid_glass_on_the/) [has](https://andrewzuo.com/apples-liquid-glass-is-a-usability-nightmare-f5cf7befa2a3?gi=55a699f9985b) [discussed](https://news.ycombinator.com/item?id=44235612) [in](https://www.dailymail.co.uk/sciencetech/article-14796859/Apple-fans-BLAST-iOS-26.html) [depth](https://medium.com/utopian/apples-liquid-glass-sucks-6647bae0279f).

### …Performant

Liquid Glass is composed of many different effects, but the most important is the [Gaussian blur](https://en.wikipedia.org/wiki/Gaussian_blur) that gives it that blurred frosted glass effect. 

For example, in the photo of [Apple Park](https://en.wikipedia.org/wiki/Apple_Park) below, the left half is unmodified while the right half has been filtered through a Gaussian blur.

{{< figure src="/media/applepark_gaussian_blur.webp" alt="A photo of Apple Park where the right half is heavily gaussian blurred" >}}

From a technical perspective, a Gaussian blur is a method of making each pixel have an influence on the pixels around it, which causes the colours to average out into a blurry definitionless blob. What this means is that the computer needs to perform a mathematical function dozens or hundreds (eyeballing it, Liquid Glass has a blur radius of 6 pixels, meaning it has pi*6^2 ≈ 113 pixels around it) of times for every single pixel, of which there are millions (iPhone 16 has a 2556x1179 screen, so 3,013,524 total pixels), and you need to do this once per frame, of which there are ideally 60 per second on the iPhone 16. This adds up to a huge amount of computation, and it doesn't help that the [2D Gaussian function](https://en.wikipedia.org/wiki/Gaussian_function#Two-dimensional_Gaussian_function) isn't exactly simple.

In other words, Liquid Glass absolutely requires a powerful processor, which in turn requires a lot of electricity. In my opinion, a lot of the concerns about Liquid Glass are being overstated, but this one is definitely not. From programming my site header, I know firsthand how taxing Gaussian blurs are; incorporating a bunch of *layered* glassmorphic panels is a performance nightmare that will and already is causing problematic battery drain on devices that really ought not to be running out of battery (e.g. watches), especially not on something as trivial as the interface.

Apple has cleverly alleviated some (but not all) of their performance woes by inventing their own [patented](https://patents.google.com/patent/US7397964B2/en) [black-magic approximate gaussian blur](https://developer.apple.com/documentation/metalperformanceshaders/mpsimagegaussianblur) that, first, is miraculous and deserves more praise than it gets; second, significantly speeds up compute time via aforementioned black magic; and third, is highly optimized for Apple Silicon GPUs.

Even with Apple's optimization, Liquid Glass still uses a significant chunk of an iPhone 16's graphical processing power, and there truly isn't anything that could possibly be done to fix that. Gaussian blurs are inherently computationally expensive by their very nature.

### …Readable

Something you almost never notice is that, no matter the format, the text you read always contrasts with its background. This site uses a dark theme, so the text is white. Paper books are made of white paper, so the text is dark. Contrast is one of the most important qualities of a usable design: without enough contrast, our brains' visual system has to expend extra effort to detect the edges of each letter, something not ideal in an activity like reading where you have to parse hundreds of tiny glyphs almost instantly in order to allow sufficient time for your brain to actually process what it's read. If you want people to be able to read text, you have to make sure that the text contrasts with its background. So why in the world would you make the background transparent!?

This isn't a problem for subtle transparency (for example, the background behind my site text is actually only 70% opaque), but Liquid Glass is almost completely transparent. If the content behind the Liquid Glass is the same colour as the text on the Liquid Glass, this means that the meager opacity provided by the Liquid Glass doesn't give enough contrast to the text to make it legible. 

{{< figure src="https://preview.redd.it/apples-liquid-glass-with-a-white-background-new-find-the-v0-1n1r4io5026f1.jpeg?width=640&crop=smart&auto=webp&s=da5f097e22749a3a59d4732e27199e7c1478e867" alt="iOS 26 Screenshot featuring a translucent Liquid Glass overlay on a white background. Very poorly contrasting text can been seen below, 'Dark Mode On', 'Night Shift Off', and 'True Tone Off'" >}}

For example, try to read the text at the bottom of the iOS 26 screenshot above. Can you read it at all? How long did it take you? Text should be instantly readable, and 3% contrast between text and background is not even close to enough.

Apple claims that Liquid Glass dynamically adapts to the content behind it, but this clearly isn't quite working yet. It's important to remember that iOS 26 is still in a public beta and these concerns will probably be addressed before it's fully released, but as it stands this is a huge usability issue that needs to be addressed sooner rather than later.

## Conclusion

{{< figure src="https://platform.theverge.com/wp-content/uploads/sites/2/2025/06/liquidglassmain2.jpg?quality=90&strip=all&crop=0,0,100,100" alt="Four Apple devices: A Macbook, an iPad, an iPhone, and an Apple Watch, all lined up in a row and using a glassmorphic Liquid Glass interface with frosted glass buttons and widgets" >}}

I'm still delighted by Liquid Glass. It has its share of critical flaws, but it still remains a stunningly sleek modern design. It's unique, futuristic, reactive, and *bends light like a prism*. Apple still needs to fix the adaptive text and also invent [computronium](https://en.wikipedia.org/wiki/Computronium) to solve their readability and performance issues, but I'm sure they're working on it.

Compared to Google's new design language, [Material 3 Expressive](https://design.google/library/expressive-material-design-google-research), I think that Liquid Glass looks far cooler. I still prefer the playful utility of Google's design philosophy, but Liquid Glass has an undeniable appeal that fits Apple's philosophy of 'you live in the future now; things just work'.

This has been my longest blog post by far, and I've really enjoyed writing and researching it. It's been interesting to experience firsthand the amount of effort that goes into writing a technical blog.

I hope you found this post interesting!

~Ethan