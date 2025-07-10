---
title: Text Scramble Animation
date: 2025-06-29
tags: [programming, webdev, codepen]
description: A demonstration of my text scrambling JavaScript animation
link: https://codepen.io/ColourlessSpearmint/pen/jEPRNXG
link_name: CodePen
link_icon: codepen
---

Earlier today, [Brad Woods Digital Garden](https://garden.bradwoods.io/) made it to the [front page of HN](https://news.ycombinator.com/item?id=44393920). I had never heard of this website before, so I clicked on the link and explored it. As it turns out, it's the web development blog of [Brad Woods](https://bradwoods.io/). It's also one of the most detailed and high-effort webpages I've seen in quite a while, and the [blog content](https://garden.bradwoods.io/notes/svg/scroll-driven-draw-animation) is high-quality and very interesting. But what really stood out to me was how most of the text on the page initially appears scrambled, and then gets "solved" in a quirky scramble animation.

{{< figure src="/media/bradwoods_scramble.webm" alt="GIF text scramble entrance animations of Brad Woods' website" >}}

This effect is *awesome*, and I wanted to see how it would look on my website. I initially planned to just steal Woods' animation by nabbing the code from my Firefox cache, but [he's minified and obfuscated](https://garden.bradwoods.io/_next/static/chunks/7843-1c596a964b00992a.js) it in a way that would take more effort to unravel than I'm willing to expend.

## My Implementation

So instead I just reverse engineered it. I wanted it to be a [CSS keyframe animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations) that I could call within a class, but this kind of content manipulation isn't really doable in CSS. Instead I used the "[animationstart](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationstart_event)" event in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript). Here's the full JavaScript function I came up with. It's un-obfuscated because that's how *normal* developers publish code.

```javascript
(function () {
    document.addEventListener('animationstart', function (e) {
        if (e.animationName === 'scramble-text' && e.target instanceof HTMLElement) {
            const element = e.target;
            const originalText = element.textContent;
            if (!originalText) return;

            const SCRAMBLE_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
            const REVEAL_DELAY = 10;
            const SOLVE_DELAY = 60;
            const SCRAMBLE_SPEED = 50;
            const HIDDEN_CHAR = '\u2007';

            let charStates = Array.from(originalText).map(char => ({
                final: char,
                state: 'hidden',
            }));

            element.textContent = Array(originalText.length + 1).join(HIDDEN_CHAR);

            const totalRevealTime = (charStates.length - 1) * REVEAL_DELAY;
            const totalAnimationDuration = totalRevealTime + ((charStates.length - 1) * SOLVE_DELAY);
            const startTime = performance.now();

            charStates.forEach((charState, i) => {
                setTimeout(() => {
                    charState.state = (charState.final.trim() === '') ? 'solved' : 'scrambled';
                }, i * REVEAL_DELAY);
                setTimeout(() => {
                    charState.state = 'solved';
                }, totalRevealTime + (i * SOLVE_DELAY));
            });

            let lastScrambleUpdate = 0;
            let prevOutput = [];

            const update = (currentTime) => {
                const elapsed = currentTime - startTime;

                if (elapsed >= totalAnimationDuration + SOLVE_DELAY) {
                    element.textContent = originalText;
                    return;
                }

                const scrambleIntervalPassed = (currentTime - lastScrambleUpdate) >= SCRAMBLE_SPEED;

                let currentOutput = [];
                for (let i = 0; i < charStates.length; i++) {
                    const charState = charStates[i];
                    switch (charState.state) {
                        case 'hidden':
                            currentOutput[i] = HIDDEN_CHAR;
                            break;
                        case 'scrambled':
                            currentOutput[i] = scrambleIntervalPassed
                                ? SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
                                : prevOutput[i];
                            break;
                        case 'solved':
                            currentOutput[i] = charState.final;
                            break;
                    }
                }

                if (scrambleIntervalPassed) {
                    lastScrambleUpdate = currentTime;
                }

                element.textContent = currentOutput.join('');
                prevOutput = currentOutput;

                requestAnimationFrame(update);
            };

            requestAnimationFrame(update);
        }
    }, { passive: true });
})();
```

You use it by defining a CSS keyframe named scramble-text that doesn't do anything substantial, and the function will hijack that keyframe and add the text scramble animation. Here's an example implementation in CSS.

```css
.scramble-me {
    animation: scramble-text 1s;
}

@keyframes scramble-text {
    from {
        opacity: 0.99;
    }

    to {
        opacity: 1;
    }
}
```

## Demo

I realize that you, dear reader, probably aren't invested enough to actually test out my code, so I've made a little demo with [CodePen](https://codepen.io).

{{< iframe src="https://codepen.io/ColourlessSpearmint/embed/jEPRNXG?default-tab=result" title="Scramble Text Demo" >}}

## Conclusion

I love this effect. I added it to the "Ahoy!" heading on my [home page](/), and I think it looks really cool. Feel free to use my code however you like.

~Ethan