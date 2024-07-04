import { applyTone, contractions } from "./dictionaries.js";
import natural from "natural";

const tokenizer = new natural.SentenceTokenizerNew();
/**
 * Replaces formal words with contractions in the text.
 *
 * @param {string} text - The input text to process.
 * @returns {string} - The text with contractions applied.
 */
const replaceContractions = (text) => {
  return Object.entries(contractions).reduce((acc, [key, value]) => {
    const regex = new RegExp(`\\b${key}\\b`, "gi");
    return acc.replace(regex, value);
  }, text);
};

/**
 * Splits and combines sentences to vary sentence length.
 *
 * @param {string} text - The input text to process.
 * @returns {string} - The text with varied sentence lengths.
 */
const varySentenceLength = (text) => {
  const sentences = text.split(/([.?!])\s*(?=[A-Z])/g);
  const combinedSentences = [];

  for (let i = 0; i < sentences.length; i += 2) {
    let sentence = sentences[i];
    if (i + 1 < sentences.length) {
      sentence += sentences[i + 1];
    }
    if (Math.random() > 0.5 && i + 2 < sentences.length) {
      sentence += ", and " + sentences[i + 2].trim();
      i += 2;
    }
    combinedSentences.push(sentence);
  }

  return combinedSentences.join(" ");
};

/**
 * Applies generic humanization adjustments to the text by replacing formal words with contractions
 * and varying sentence length.
 *
 * @param {string} text - The input text to humanize.
 * @returns {string} - The humanized text.
 */
const applyGenericHumanization = (text) => {
  let newText = replaceContractions(text);
  newText = varySentenceLength(newText);
  return newText;
};

/**
 * Processes a sentence by tokenizing and tagging it, then returning the humanized version.
 *
 * @param {string} sentence - The sentence to process.
 * @param {object} posTagger - The POS tagger for the desired language.
 * @param {object} wordTokenizer - The word tokenizer for the desired language.
 * @returns {string} - The processed sentence.
 */
const processSentence = (sentence, posTagger, wordTokenizer) => {
  const words = wordTokenizer.tokenize(sentence);
  const taggedWords = posTagger.tag(words).taggedWords;
  const humanizedWords = taggedWords.map((taggedWord) => taggedWord.token);
  return humanizedWords.join(" ");
};

/**
 * Humanizes an array of sentences by applying generic humanization and tone-specific transformations.
 *
 * @param {string[]} sentences - An array of sentences to humanize.
 * @param {string} tone - The desired tone for the text (e.g., "formal", "casual").
 * @param {string} language - The language for the text (e.g., "EN", "FR").
 * @returns {Promise<string>} - A promise that resolves to the humanized text.
 */
const humanizeText = (sentences, tone, language) => {
  const defaultCategory = "N";
  const defaultCategoryCapitalized = "NNP";

  const lexicon = new natural.Lexicon(
    language,
    defaultCategory,
    defaultCategoryCapitalized
  );
  const ruleSet = new natural.RuleSet(language);
  const posTagger = new natural.BrillPOSTagger(lexicon, ruleSet);
  const wordTokenizer = new natural.WordTokenizer();

  return new Promise((resolve) => {
    const processedSentences = sentences.map((sentence) =>
      processSentence(sentence, posTagger, wordTokenizer)
    );
    let joinedText = processedSentences.join(". ");
    let humanizedText = applyTone(joinedText, tone);
    humanizedText = applyGenericHumanization(humanizedText);
    resolve(humanizedText);
  });
};

const text = `In the annals of human history, the concept of time has always fascinated philosophers, scientists, and laypeople alike. The relentless march of time, marked by the steady ticking of a clock, governs our lives in ways both profound and mundane. From the early sundials of ancient civilizations to the atomic clocks of the modern era, humanity's quest to measure and understand time reflects our deeper desire to make sense of our existence.

In the realm of physics, time is a dimension, a continuous sequence of events that occur in apparently irreversible succession from the past through the present to the future. Einstein's theory of relativity revolutionized our understanding of time, suggesting that time is not absolute but relative and can be affected by speed and gravity. This notion that time can stretch and compress, bend and warp, challenged the traditional Newtonian view and opened up new vistas in our understanding of the universe.

Philosophically, time raises intriguing questions about the nature of reality and our place within it. Is time a fundamental structure of the universe, or is it merely a human construct, a way to impose order on the chaos of our experiences? The concept of time travel, long a staple of science fiction, teases our imaginations with the possibilities of altering the past and shaping the future.

On a more practical level, time governs our daily routines and shapes our societal structures. The division of time into years, months, days, and hours organizes our work, our leisure, and our rituals. The synchronization of time across the globe through coordinated time zones facilitates international trade, travel, and communication, creating a connected world where events in one part of the world can have immediate repercussions in another.

Yet, despite our advancements in measuring and manipulating time, it remains an enigma. The subjective experience of time—how it can fly when we are joyful and drag when we are in sorrow—reminds us that time is not just a scientific abstraction but a deeply personal phenomenon. In our pursuit to master time, we continue to grapple with its mysteries, striving to understand the fleeting moments that make up the tapestry of our lives.`;

/**
 * Tokenizes input text and humanizes it based on the specified tone and language.
 *
 * @param {string} text - The input text to be humanized.
 * @param {string} tone - The desired tone for the text (e.g., "formal", "casual").
 * @param {string} language - The language for the text (e.g., "EN", "FR").
 * @returns {Promise<string>} - A promise that resolves to the humanized text.
 */
export const humanizeInputText = (text, tone, language) => {
  const sentences = tokenizer.tokenize(text);
  return humanizeText(sentences, tone, language);
};
