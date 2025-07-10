---
title: Thessa
date: 2025-05-21
tags: [projects, programming, webdev, ai]
description: An AI-powered thesaurus that uses the Gemini API
link: https://colourlessspearmint.github.io/thessa.html
link_name: Thessa Webpage
link_icon: link
---

{{< figure src="/media/thessascreenshot.webp" alt="A screenshot of the Thessa interface showing synonyms for the word 'screenshot'" >}}

A while ago, I [configured my instance of ChatGPT](https://help.openai.com/en/articles/8096356-custom-instructions-for-chatgpt) to "respond with a [Dale-Chall readability level](https://en.wikipedia.org/wiki/Dale%E2%80%93Chall_readability_formula) of 9.1". This is a precise way of telling it to 'use big words'.

I was taken aback by how well ChatGPT obliged. It even started using words I didn't know, and I found myself having to keep a dictionary open on another monitor in order to understand what it was saying. I learned a huge amount of new words this way, and it contributed significantly to my interest in language. Whenever I needed a word that I didn't have, I would ask ChatGPT. More often than not, it would respond with some delightful [archaism](https://en.wiktionary.org/wiki/archaism) I would add to my vocabulary.

When I switched from ChatGPT to [Google AI Studio](https://aistudio.google.com), I wrote a system prompt that would make Gemini enumerate a list of synonyms for a given word. I used it as a custom thesaurus.

Yesterday (May 21, 2025), I decided to make a web interface for my custom-instructed Gemini. I named it **Thessa**, derived from 'thesaurus'.

## Usage

1. **Go to Thessa webpage**: [https://colourlessspearmint.github.io/thessa.html](https://colourlessspearmint.github.io/thessa.html)
2. **Set Gemini API key**: Thessa requires an API key to function. You can acquire an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3. **Input a Word**: This is the word that Thessa wil synonymize. Any word will do.
4. **Press the Generate Button**: Thessa will take your word, construct a prompt, and send it to Gemini.
5. **Examine Synonyms**: Thessa will generate 8 synonyms for your perusal, with the eighth being in Bulgarian.
6. **Get the Definition**: You can click on a synonym to have Thessa define it for you.
7. **Copy to Clipboard**: You can double click on a synonym to copy it to your clipboard.

## Gemini API

To retrieve the list of synonyms, Thessa sends queries to the [Gemini API](https://ai.google.dev/gemini-api), a web service for third-parties (like me; I don't work at Google) to access the Gemini LLM. Once the user provides the word to synonymize, Thessa constructs a prompt, sends it to Gemini, and processes the response.

The prompt template used to generate synonyms is below.

```txt
Provide a list of diverse English synonyms for "${word}", limited to a maximum of 8. 
Include some common synonyms as well as rare, esoteric ones. 
The 8th and final synonym should be in Bulgarian. 
"${word}" cannot be in your list of synonyms. 
No repeats. 
Capitalize the first letter of each synonym. 
Newline separated. 
Each line should ONLY include the synonym. 
NEVER anything other than the synonym on the line. 
NEVER include parenthesis. 
Your response should only include the list without any introductory or concluding text. 
If none, say "No synonyms found for ${word}."
```

### API Key

Google places some restrictions on access to the Gemini API. They very generously offer 30 free requests every minute per API key. I *could* just hardcode my personal API key into Thessa. This way, all users would use my API key. I'm not going to do that because it would be a bad idea. First, it would mean that all users would be collectively limited to 30 requests per minute: if someone else was using Thessa at the same time you were, they could run my key out of requests and prevent you from accessing Thessa until my key resets. Second, there are bots and scrapers that clone random GitHub repos searching for hardcoded API keys. Once they inevitably stumble upon my key, they would steal it and run it out of requests.

My solution is to have each user generate their own free API key. I wish I didn't have to do this, but it was pretty much the only way I could publish Thessa. Thessa stores your API key in [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). This means that you only have to enter your key once and Thessa will request it from storage on each page load. Information stored in Local Storage is secure and never leaves your device.

## Conclusion

Thessa was my first project that uses the Gemini API. I think it's one of my most polished projects yet, and I'm quite proud of how it turned out. I designed Thessa for myself (which is why it includes Bulgarian cognates), but I hope that you find it useful too.

~Ethan
