---
title: Anagram Animator
date: 2025-04-18
tags: [projects, programming, language, colab]
description: A simple little Jupyter notebook to create anagram GIFs
link: https://colab.research.google.com/drive/1MqpogsUUTuzctVKgg8n8btD3WUuENPAK
link_name: Colab Notebook
link_icon: colab
---

An [Anagram](https://en.wikipedia.org/wiki/Anagram) is a word created by rearranging the letters of another word.

For example, my full name, 'Ethan Oliver Marks', is an anagram for 'Martin Kolver Shea'.

{{< figure src="/media/example_anagram.gif" alt="Ethan Oliver Marks ↔ Martin Kolver Shea" >}}

I generated the above animation using [Anagram Animator](https://colab.research.google.com/drive/1MqpogsUUTuzctVKgg8n8btD3WUuENPAK), a Colab Notebook I wrote in a few hours.

{{< figure src="/media/anagramcolab.webp" alt="A screenshot of Anagram Animator in Colab" >}}

## Usage

I made Anagram Animator because my friends were making anagrams of our names one day and I wanted to contribute by making visualizations. None of my friends are programmers, so I specifically designed the notebook to be as easy to use as possible.

These instructions are also in the notebook.

1. Come up with an anagram
2. Fill in the parameter form with your start and end words (must be anagrams; will get an error otherwise)
3. Run the cell by pressing the little circle in the top left corner
4. Press **Run Anyway** on the pop up box that appears
5. Please be patient while the code generates the GIF; it could take up to a minute
6. When it's finished, the code will automatically render and download the finished GIF

## How It Works

1. **Input Validation**: Make sure that the start and end words are valid anagrams
2. **Character Mapping**: Figure out where each character should move to
3. **Render Frames**: Render each frame of the animation by interpolating between the start and end positions of each character
4. **Compile Frames**: Compile each frame into a GIF
5. **Display and Download**: Display the finished GIF and download it to the user's device

## Conclusion

Other anagram animators exist--most notably the [Internet Anagram Server](https://wordsmith.org/anagram/animation.html)--but all the ones I looked at had some sort of major flaw (e.g. low frame rate, opaque backdrop, etc.) which was enough of a dealbreaker that I decided to write 300 lines of Python to make my own. Hope you enjoy it!

~Ethan
