---
title: Llamafile
date: 2025-06-24
tags: [curios, programming, ai]
description: An explanation of llamafile, a file type that lets you run LLMs from a single file 
link: github.com/Mozilla-Ocho/llamafile
link_name: GitHub Repo
link_icon: github
---

{{< figure src="https://cdn-uploads.huggingface.co/production/uploads/64a523ba1ed90082dafde3d3/kJrkxofwOp-89uYFe0EBb.png" alt="llamafile banner" >}}

Last week, I stumbled upon [llamafile](https://github.com/Mozilla-Ocho/llamafile). It's a file format developed by [Mozilla](https://www.mozilla.org/en-US/) that stores the weights and code of [LLMs](https://en.wikipedia.org/wiki/Large_language_model) as pre-compiled [binary machine code](https://en.wikipedia.org/wiki/Binary_code). What this means is that you can run a llamafile on *any* computer without installing *anything* else.

Actually, I need to qualify the "run on any computer" statement a bit. Llamafiles can run on any computer running [Windows](https://en.wikipedia.org/wiki/Microsoft_Windows), [MacOS](https://en.wikipedia.org/wiki/MacOS), [Linux](https://en.wikipedia.org/wiki/Linux), [FreeBSD](https://en.wikipedia.org/wiki/FreeBSD), [NetBSD](https://en.wikipedia.org/wiki/NetBSD), or [OpenBSD](https://en.wikipedia.org/wiki/OpenBSD). The computer needs to have a [64-bit AMD processor](https://en.wikipedia.org/wiki/AMD), an [Intel processor newer than 2006](https://en.wikipedia.org/wiki/List_of_Intel_processors), a [64-bit ARM processor](https://en.wikipedia.org/wiki/ARM_architecture_family), or an [Apple Silicon](https://en.wikipedia.org/wiki/Apple_silicon) processor. You'll also need a non-trivial amount of RAM: 4 gigabtyes at minimum. These requirements are very lax, and your computer probably meets those specifications if it was manufactured less than a decade ago.

{{< figure src="/media/llamafile_demo.webm" alt="A video demonstration of the Gemma 3 llamafile running on the Nvidia 1650 in my Windows 11 laptop. It runs at 34.46 tokens per second, and gives complete answers including bullet points and comparison tables" >}}

I *don't* need to qualify the "without installing anything" statement, though. You really can just download a llamafile and run it. Above is a demonstration with a freshly-downloaded llamafile of a [distilled](https://developers.google.com/machine-learning/glossary#distillation) and [quantized](https://developers.google.com/machine-learning/glossary#quantization) version of [Google Gemma 3](https://deepmind.google/models/gemma/gemma-3/) running on my Windows 11 laptop.

If you want to try it yourself, you can read the [official usage guide](https://github.com/Mozilla-Ocho/llamafile?tab=readme-ov-file#quickstart) or follow the my Windows-specific steps below.

1. Download the llamafile: [google_gemma-3-1b-it-Q6_K.llamafile](https://huggingface.co/Mozilla/gemma-3-1b-it-llamafile/resolve/main/google_gemma-3-1b-it-Q6_K.llamafile?download=true)
2. Rename the file to add ".exe" to the end (this makes the llamafile runnable on Windows)
3. Run the llamafile by double-clicking
4. Allow it past your antivirus; as long as you acquired the llamafile from a reputable source, it should be safe
5. Type a message in the terminal window that opens up
6. Wait for the LLM to respond

As you can see, it gives complete, coherent answers. You can run any [open-weight](https://github.com/Open-Weights/Definition) LLM, including [Deepseek R1](https://huggingface.co/deepseek-ai/DeepSeek-R1), provided you have enough computing power (700 gigabytes of RAM, in the case of Deepseek), but tiny models (like the Gemma model I'm using) also exist that can run on basically anything. They aren't very smart (because the distillation and quantization process is basically an AI [lobotomy](https://en.wikipedia.org/wiki/Lobotomy)), so they'll make even more mistakes than normal LLMs.

The useful part of llamafiles is that they run completely locally: all processing happens on *your* computer. This means that it's completely free (minus the electricity to run your computer) and isn't dependent on some data center in Silicon Valley. No matter what happens to the outside world, as long as your computer still has power, you will be able to run a llamafile. You can turn on airplane mode, physically remove the antenna module, put it in a faraday cage, and shut down the World Wide Web, and a llamafile will still work.

## Example Use Case

If you have a menial task that requires the adaptability and language understanding of an LLM but doesn't necessitate the intelligence of a powerful one, you can use tiny llamafiles like the lobotomized Gemma model I demoed earlier. For example, inspired by [this Simon Willison blog post](https://til.simonwillison.net/llms/claude-hacker-news-themes), I threw together a PowerShell script that fetches [HN](https://news.ycombinator.com/) article comments and feeds them to a llamafile for summarization.

```powershell
# This script fetches a Hacker News article, processes it,
# and then uses a llamafile to summarize the comments.

param(
    # Defines a mandatory string parameter named StoryId.
    # This parameter will hold the Hacker News story ID.
    [Parameter(Mandatory=$true)]
    [string]$StoryId
)

# Specifies the full path to the llamafile executable.
$llamafile = "C:\Users\ethan\source\llamafile\google_gemma-3-1b-it-Q6_K.llamafile.exe"

# Defines a recursive function to extract all 'text' properties from a
# hierarchical structure of Hacker News comments.
# HN comments can have nested 'children' (replies), so recursion is needed
# to traverse the entire comment tree.
function Get-HnCommentText($comments) {
    foreach ($comment in $comments) {
        # If the current comment object has a 'text' property and it's not null,
        # output its value. This will be collected by the calling expression.
        if ($null -ne $comment.text) { 
            $comment.text 
        }
        
        # If the current comment object has children (replies),
        # recursively call this function extract their text.
        if ($null -ne $comment.children) { 
            Get-HnCommentText -comments $comment.children
        }
    }
}

# Retrieve all comments for the Hacker News story with a REST method.
$commentText = Get-HnCommentText (Invoke-RestMethod `
    "https://hn.algolia.com/api/v1/items/$StoryId").children | Out-String

# Constructs the prompt string for the AI model using a here-string.
$prompt = @"
$commentText

Summarize the themes of the opinions expressed here, including direct quotes.
"@

# Executes the llamafile.
# The '&' operator is used to run an executable stored in a variable.
# '-p $prompt' passes the constructed prompt string to the llamafile executable
& $llamafile -p $prompt
```

## Advantages

### Offline Usage

Llamafiles provide access to an LLM when you don't have internet. For example, if you're driving to a national park on a completely empty nothing-for-kilometers-in-every-direction stretch of road without any cell service, you can just prompt a llamafile if you have a question.

### Data Privacy

Llamafiles can process sensitive data without it leaving your device. Maybe you don't want OpenAI to have access to your medical records, but also can't be bothered to read them yourself. Feed the PDFs to a llamafile and ask it to search for anything important.

### Archiving

Llamafiles provide a way to archive LLMs in case they stop being hosted. Imagine, for a moment, that a leading AI provider releases a model with state-of-the-art performance that everyone loves, and then they suddenly decide to stop hosting it for reasons they refuse to elaborate on. I can't think of any time this has happened before (this is sarcasm; I'm still bitter about [Gemini 03-25](https://discuss.ai.google.dev/t/urgent-feedback-call-for-correction-a-serious-breach-of-developer-trust-and-stability-update-google-formally-responds-8-days-later/82399)), but it's conceivable that you might want to archive an LLM in such a way that it can never be taken away. Llamafiles are a great way to do that (provided the model is open-weight; otherwise you're just out of luck).

### Small Environmental Impact

One of the main concerns around the AI boom is the resource consumption of all the computing power used for AI training and inference. Over the past few years, AI inference has gotten cheaper and less computationally demanding due to efficient custom TPUs. However, as models grow ever larger and use ever more training data, AI training has gotten exponentially more expensive. The precise impact of hosted LLMs is difficult to measure, but it's definitely not insignificant. On the contrary, running a llamafile consume only slightly more electricity than your computer does during normal operation. If you've read this far, loading and rendering this webpage almost certainly used more electricity than generating a few hundred tokens with a tiny llamafile.

## Disadvantages

### Lobotomy make LLM not work good

Any llamafile that can run on consumer hardware is going to be really stupid. There are some impressively intelligent yet compact llamafiles ([Qwen](https://qwen.ai/) distills are usually pretty good), but they still won't be able to even approach the intelligence of full hosted models. There's a reason my HN summarizer prompts the llamafile to use quotes: otherwise it'll just make stuff up. It's always good practice to double-check claims made by LLMs, but I cannot emphasize enough how important fact checking is for distilled and quantized models. It *will* make things up.

### Slow Generation Speed

Hosted LLMs are capable of generating at truly ridiculous speeds that consumer llamafiles can't possibly match, no matter how much we distill and quantize it it. The Gemma model from my demonstration runs at 30-40 tokens per second on my Nvidia 1650, which is still quite fast, but is much slower than a hosted LLM.

## Llamafile vs Ollama

Llamafiles aren't the only way to run LLMs locally. [Ollama](https://ollama.com/), [llama.cpp](https://github.com/ggml-org/llama.cpp), [LM studio](https://lmstudio.ai/), [Google AI Edge Gallery](https://ai.google.dev/edge), and many others all serve similar functions. What makes llamafiles special is the zero-installation gimmick. Having to install things puts people off of running LLMs locally. A llamafile can be run without any setup, which makes it far more accessible to people who don't have time to configure [CUDA](https://en.wikipedia.org/wiki/CUDA) and just want a self-hosted chatbot.

## Conclusion

Recently, a few large tech companies have expressed an interest in tiny locally-hosted LLMs. Google released [AI Edge Gallery](https://ai.google.dev/edge), and Apple released [Foundation Models](https://developer.apple.com/documentation/foundationmodels). Both of these use tiny LLMs optimized for running on mobile processors. I'm just speculating here, but this might be an indicator that Google and Apple are starting to get sick of having to host AI inference for all of their AI-powered products and are trying to foist the computation onto consumer devices by making their models open-weight. This sounds like a mutually beneficial arrangement to me, and it's convenient that we already have a file format for storing LLMs in a single file: llamafile.

Thanks for reading!

~Ethan