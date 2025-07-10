---
title: Scream Cipher Converter
date: 2025-06-06
tags: [programming, codepen, humor, cryptology, automation]
description: An online converter to and from the Scream Cipher, a cipher where each letter is represented by diacritical variations of 'A'
link: https://codepen.io/ColourlessSpearmint/full/XJbwKgo
link_name: CodePen
link_icon: codepen
---

{{< figure src="https://imgs.xkcd.com/comics/scream_cipher.png" alt="An xkcd comic describing a cipher where encrypted messages consist of only the letter 'A', with different diacritics applied to the 'A' to represent each plaintext letter of the alphabet" >}}

This is one of my favorite [xkcd](https://xkcd.com/) comics. It proposes the [Scream Cipher](https://xkcd.com/3054/), a creative, amusing, and not *completely* useless [cipher](https://en.wikipedia.org/wiki/Cipher).

The Scream Cipher works by assigning each letter of the alphabet to a unique [diacritical](https://en.wikipedia.org/wiki/Diacritic) variant of the letter A. For example, "THIS IS SOME EXAMPLE TEXT" becomes "ĀA̰ẢÃ ẢÃ ÃÅǍÁ ÁA̽AǍA̯ĂÁ ĀÁA̽Ā".

The punchline in the comic is that attempting to pronounce the encrypted text would sound like screaming ([AAAAAAAAAAA](https://xkcd.com/2957/)).

The Scream Cipher isn't great for actually making secret messages due to a lack of a key (although you could shift the diacritic dictionary with a 26-combination key to create a [Caesar Cipher](https://en.wikipedia.org/wiki/Caesar_cipher)), but it is a pretty good [obfuscation](https://en.wikipedia.org/wiki/Obfuscation) technique. If you hadn't heard of the Scream Cipher and you encountered Scream-encrypted text, you probably wouldn't even know that there was a secret message; you would just think it was something akin to [Zalgo text](https://en.wikipedia.org/wiki/Zalgo_text).

This is called a [Kerckhoffs-insecure](https://en.wikipedia.org/wiki/Kerckhoffs%27s_principle) cipher, and it's a demonstration of [Security through Obscurity](https://en.wikipedia.org/wiki/Security_through_obscurity). The crucial part of any encryption or security system is that you have something or know something that other people don't. Generally, this is a physical key or a secret password. With Kerckhoffs-insecurity, the special information is about how the system works. You can assume that a hacker knows how a password works, so you need to choose a strong password. If your encryption method is so obscure and stupid that nobody other than you knows how to use it, you don't need a password at all.

## Converter

{{< iframe src="https://codepen.io/ColourlessSpearmint/embed/XJbwKgo?default-tab=result" title="Scream Cipher Converter CodePen" >}}

Anyways, I made a [CodePen](https://codepen.io) to automate the process of ciphering in Scream Cipher.

## Usage

1. **Go to the Scream Cipher Converter CodePen**: <https://codepen.io/ColourlessSpearmint/full/XJbwKgo>
2. **Input Text**: Type or paste the text you want to convert. It can be either plaintext or encrypted text; the program will detect it automatically. The conversion happens automatically.
3. **Copy to Clipboard**: You can press the clipboard icon above the result area to copy the text to your clipboard.

## Implementation Details

For the sake of simplicity and thoroughness, my converter has a few quirks.

- All lowercase letters are treated as though they were uppercase.
- Non-letters characters (like numbers and punctuation) are left unmodified.
- An error is thrown if non-ASCII unicode characters (like emoji) are detected.

## Conclusion

ȀA̰ẢĂÁ ẢĀ ÅȦÀẢÅÄÃĂA̦ ẢÃÂ'Ā ÀÁȂA̦ A̯ȂAA̧ĀẢA̧AĂ, Ả A̮ẢÂA̱ ĀA̰Á ÃA̧ȂÁAǍ A̧ẢA̯A̰ÁȂ A̱ÁĂẢA̋A̰ĀA̮ÄĂ AÂA̱ ÁÂA̓ÅA̦ÁA̱ ǍAẠẢÂA̋ ĀA̰ẢÃ A̧ÅÂÀÁȂĀÁȂ. ĀA̰Á ÅÂĂA̦ ÄÃÁ A̧AÃÁ Ả A̧AÂ ĀA̰ẢÂẠ ÅA̮ ẢÃ ÃÁÂA̱ẢÂA̋ ĂÅȀ-ÃÁA̧ÄȂẢĀA̦ A̯ȂẢÀAĀÁ ǍÁÃÃAA̋ÁÃ ÅÀÁȂ A̧ÅǍǍÄÂẢA̧AĀẢÅÂ A̧A̰AÂÂÁĂÃ ȀA̰ÁȂÁ ÂÅȦÅA̱A̦ ÁĂÃÁ ȂÁAA̱Ã A̽ẠA̧A̱, ȦÄĀ ĀA̰AĀ'Ã A A̯ȂÁĀĀA̦ A̮ÄÂÂA̦ ÄÃÁ A̧AÃÁ.

~ÁĀA̰AÂ