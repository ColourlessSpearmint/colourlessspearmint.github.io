---
title: Early AI
date: 2025-05-11
tags: [ai, history, tech]
description: A personal history and overview of early chatbots and the evolution of artificial intelligence.
---

You might have noticed this new thing all the multi-billion dollar tech companies are doing called AI.

But how did we get here?

## Story Time

It's early April, 2022. 11-year-old me is fascinated by the concept of [Artificial Super Intelligence](https://en.wikipedia.org/wiki/Superintelligence). I read about Roko's Basilisk (link intentionally omitted; don't Google it, trust me), watched the Black Mirror episode with the time-dilated slave cookies, started reading [Superintelligence](https://en.wikipedia.org/wiki/Superintelligence:_Paths,_Dangers,_Strategies), etc.

On April 29, at the height of my fascination and existential dread, Google Deepmind publishes [Flamingo](https://arxiv.org/abs/2204.14198), an image description AI that uses Google's new [Transformer architecture](https://research.google/blog/transformer-a-novel-neural-network-architecture-for-language-understanding/) they originally developed to improve Google Translate. The architecture is so powerful that Flamingo outperforms the state-of-the-art systems despite using three orders of magnitude less computing power and training data. I recognize the significance of this and spend weeks reading articles about it. I ramble about Flamingo and how 'advances in machine learning will revolutionize technology' to my all friends until they collectively decide that I'm crazy.

On November 30, a startup called OpenAI [releases ChatGPT](https://openai.com/index/chatgpt/), a chatbot based on a first-of-its-kind LLM that uses Google's Transformer architecture. ChatGPT takes the world by storm as tens of millions of people have the same "this is a computer; there isn't a human on the other side" moment as they ask ChatGPT to convert its last response to a limerick. I smugly read news articles about how 'advances in machine learning have revolutionized technology' aloud to my friends.

Fast forward to 2025 where students are using AI to pass law school and Google is [using AI to communicate with dolphins](https://blog.google/technology/ai/dolphingemma/).

I got into AI about 7 months before the rest of the world did. This foresight made me seem prophetic, but I hadn't been in the field long enough to understand how far chatbots had come. In December of 2024, I decided to remedy that and went on a quest to learn as much as I could about early chatbots.

## [ELIZA](https://en.wikipedia.org/wiki/ELIZA) (1966)

ELIZA is widely considered to be the first chatbot. It was developed by Joseph Weizenbaum as an experiment in natural language processing. ELIZA was designed to be a Rogerian Psychotherapist, which in a nutshell means it mostly just echoes whatever the patient says but in question form (e.g. "I am having an uaygwdkiajwhbd day" gets the response "why are you having an uaygwdkiajwhbd day?").

Behind the scenes, ELIZA was a fairly rudimentary pattern-matching algorithm with a medium-sized list of responses. This is the simplest form of chatbot and the first solution most people think of; I independently invented it when I was 10 years old when I made [my own pattern-matching chatbot in Scratch](/media/aurumassistant.webp).

Despite its basic implementation, ELIZA proved to be quite convincing. Even when Weizenbaum explained ELIZA's protocolic reasoning, many users insisted that it was intelligent and understood what they were telling it. Reportedly, Weizenbaum's secretary insisted that he leave the room so that she could speak privately with ELIZA. The word Weizenbaum chose to describe people's reaction to his program was "delusion".

If you'd like to try it out, I made an [ELIZA emulator](https://colourlessspearmint.github.io/blog/eliza) that runs on modern computers.

## [PARRY](https://en.wikipedia.org/wiki/PARRY) (1972)

PARRY was the successor to ELIZA. It was developed by Kenneth Colby. Whereas ELIZA imitated a therapist, PARRY imitated a schizophrenic patient of a therapist; its name comes from 'paranoid'.

PARRY used the same architecture as ELIZA (pattern-matching), but it used a more advanced implementation and had a larger list. This made it even more convincing than ELIZA. PARRY was one of the first programs to be remotely successful at the [Turing Test](https://en.wikipedia.org/wiki/Turing_test). A committee of 33 psychiatrists were tasked with differentiating text produced by instances of PARRY and actual humans. The committee were correct 48% of the time, which means they would have had better success rates by randomly guessing.

On September 18, 1972, PARRY and ELIZA had a conversation. PARRY ranted about gambling and the mafia, and ELIZA repeated the same few substanceless and generic questions ("Why are such questions on your mind?"). The full transcript is available [here](https://datatracker.ietf.org/doc/html/rfc439).

## [ALICE](https://en.wikipedia.org/wiki/Artificial_Linguistic_Internet_Computer_Entity) (1995)

ALICE was another ELIZA-inspired chatbot. It was developed by Richard Wallace. ALICE's main advancement is that it used a custom programming language to store responses. This allowed Wallace to program over 40,000 responses. A list of all responses is available [here](https://github.com/drwallace/aiml-en-us-foundation-alice).

## [Jabberwacky](https://en.wikipedia.org/wiki/Jabberwacky) (1997)

Jabberwacky, developed by Rollo Carpenter, was one of the first chatbots to implement basic machine learning. Rather than having a list of responses pre-programmed into it, Jabberwacky stored a corpus of all previous interactions. When a user asked Jabberwacky a question, it would analyze the query for keywords and then select the response from its corpus that matched the greatest number of those keywords. Then user would rate Jabberwacky's response. If the rating was positive, Jabberwacky would remember that and prioritize that response when the keywords come up again, and vice versa for a negative rating. This revolutionized chatbots and spurred massive public interest in Jabberwacky. This influx of users gave it even more data and made it even better.

## [Cleverbot](https://en.wikipedia.org/wiki/Cleverbot) (2008)

Cleverbot was the successor of Jabberwacky. It copied Jabberwacky's corpus so it didn't have to start from scratch, but it used a much more advanced algorithm for parsing user inputs and retrieving responses. It also focused on keeping the rest of the conversation history in context, rather than treating every response like an entirely new query. Cleverbot got an even larger public response than Jabberwacky, giving it even more training data. The website is still up [here](https://www.cleverbot.com/).

ELIZA, PARRY, and ALICE were all programmed to deflect questions when they didn't have an answer. Jabberwacky and Cleverbot never developed this functionality; this means that, rather than smoothly dodging questions, it tends to give confidently incorrect and absurd answers.

For example, when I was testing Cleverbot for the first time, it tried to convince me that *my* name was Cleverbot. I played along, and then regretted it. Cleverbot is weird.

{{< figure src="/media/cleverbot.webp" alt="My first conversation with Cleverbot (Cleverbot in blue)" >}}

## [Siri](https://en.wikipedia.org/wiki/Siri) (2010)

Now we're getting into familiar territory. The original Siri was developed by Apple in 2010.

Unlike the chatbots we've discussed previously, Siri uses speech to interface with the user (sidenote: Siri's speech generation uses concatenative synthesis, meaning it just joins together audio clips. The voice actors who recorded these audio clips were unaware that their voice would be used in a text-to-speech model). However, it's just converting the user's speech into text; the actual language processing still uses the same pattern recognition technique as all the previous chatbots.

In fact, Siri's pattern recognition is less sophisticated than Jabberwacky's because it uses a pre-programmed list of responses rather than an ever-evolving corpus. This was an intentional decision by Apple because their goal was to create a digital assistant rather than a general-purpose chatbot. This limited scope allowed Apple to focus on hand-crafting responses for a digital assistant.

Siri's chatbot has changed a lot since its launch (last year they gave up and just [swapped in an LLM](https://en.wikipedia.org/wiki/Siri#Apple_Intelligence)), but the starting bot was quite capable for the time. It could [use tools](https://en.wikipedia.org/wiki/Siri#Features_and_options), like sending text messages or making phone calls. This is something that modern AIs (ChatGPT, Gemini, Claude) have only recently [become competent at](https://modelcontextprotocol.io).

## [Google Assistant](https://en.wikipedia.org/wiki/Google_Assistant) (2016)

Following the massive success of Siri, Google launched Google Assistant. Siri is to Google Assistant what ALICE was to Jabberwacky. Using Google Search's existing natural language processing, Google Assistant went beyond simple pattern-matching and used a variant of the neural network used by Google Search. This meant that Google didn't have to pre-program a list of responses and Google Assistant evolved its language capabilities over time. Like Siri, Google Assistant was able to use tools, which made it a powerful digital assistant.

## [ChatGPT](https://en.wikipedia.org/wiki/ChatGPT) (2022)

And now we've arrived at the current paradigm of chatbots. ChatGPT was developed by OpenAI by fine-tuning GPT-3, an LLM based on Google's Transformer architecture. This was a completely different approach than anything before it, and it blew all other chatbots out of the water in terms of versatility. It still struggled with accuracy, but that's gotten much better over time as ChatGPT learned to use tools like [Search](https://openai.com/index/introducing-chatgpt-search/).

## Conclusion

So, there you have it. Chatbots have come really far. Although cutting edge LLMs are *definitely* not perfect, they are orders of magnitude better than what we started with.

Cleverbot was more entertaining, though.

~Ethan
