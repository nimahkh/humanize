/**
 * A dictionary of common English contractions and their expanded forms.
 * @type {Object.<string, string>}
 */
export const contractions = {
  "are not": "aren't",
  cannot: "can't",
  "could not": "couldn't",
  "did not": "didn't",
  "do not": "don't",
  "does not": "doesn't",
  "had not": "hadn't",
  "has not": "hasn't",
  "have not": "haven't",
  "he is": "he's",
  "he will": "he'll",
  "he would": "he'd",
  "he had": "he'd",
  "he has": "he's",
  "i am": "I'm",
  "i have": "I've",
  "i will": "I'll",
  "i would": "I'd",
  "i had": "I'd",
  "i has": "I've",
  "is not": "isn't",
  "it is": "it's",
  "let us": "let's",
  "must not": "mustn't",
  "shall not": "shan't",
  "she is": "she's",
  "she will": "she'll",
  "she would": "she'd",
  "she had": "she'd",
  "she has": "she's",
  "should not": "shouldn't",
  "that is": "that's",
  "there is": "there's",
  "they are": "they're",
  "they have": "they've",
  "they will": "they'll",
  "they would": "they'd",
  "they had": "they'd",
  "they has": "they've",
  "we are": "we're",
  "we have": "we've",
  "we will": "we'll",
  "we would": "we'd",
  "we had": "we'd",
  "we has": "we've",
  "were not": "weren't",
  "will not": "won't",
  "would not": "wouldn't",
  "you are": "you're",
  "you have": "you've",
  "you will": "you'll",
  "you would": "you'd",
  "you had": "you'd",
  "you has": "you've",
  "was not": "wasn't",
  "it has": "it's",
  "who is": "who's",
  "who will": "who'll",
  "who would": "who'd",
  "who had": "who'd",
  "who has": "who's",
  "what is": "what's",
  "what will": "what'll",
  "what would": "what'd",
  "what had": "what'd",
  "what has": "what's",
  "where is": "where's",
  "where will": "where'll",
  "where would": "where'd",
  "where had": "where'd",
  "where has": "where's",
  "when is": "when's",
  "when will": "when'll",
  "when would": "when'd",
  "when had": "when'd",
  "when has": "when's",
  "why is": "why's",
  "why will": "why'll",
  "why would": "why'd",
  "why had": "why'd",
  "why has": "why's",
  "how is": "how's",
  "how will": "how'll",
  "how would": "how'd",
  "how had": "how'd",
  "how has": "how's",
};

/**
 * A dictionary of common English contractions and their formal forms.
 * @type {Object.<string, string|string[]>}
 */
export const formalizations = {
  "aren't": "are not",
  "can't": "cannot",
  "couldn't": "could not",
  "didn't": "did not",
  "doesn't": "does not",
  "don't": "do not",
  "hadn't": "had not",
  "hasn't": "has not",
  "haven't": "have not",
  "he's": "he is",
  "he'll": "he will",
  "he'd": ["he would", "he had"],
  "I'm": "I am",
  "I've": "I have",
  "I'll": "I will",
  "I'd": ["I would", "I had"],
  "isn't": "is not",
  "it's": ["it is", "it has"],
  "let's": "let us",
  "mustn't": "must not",
  "shan't": "shall not",
  "she's": "she is",
  "she'll": "she will",
  "she'd": ["she would", "she had"],
  "shouldn't": "should not",
  "that's": "that is",
  "there's": "there is",
  "they're": "they are",
  "they've": "they have",
  "they'll": "they will",
  "they'd": ["they would", "they had"],
  "we're": "we are",
  "we've": "we have",
  "we'll": "we will",
  "we'd": ["we would", "we had"],
  "weren't": "were not",
  "won't": "will not",
  "wouldn't": "would not",
  "you're": "you are",
  "you've": "you have",
  "you'll": "you will",
  "you'd": ["you would", "you had"],
  "wasn't": "was not",
  "who's": ["who is", "who has"],
  "who'll": "who will",
  "who'd": ["who would", "who had"],
  "what's": ["what is", "what has"],
  "what'll": "what will",
  "what'd": ["what would", "what had"],
  "where's": ["where is", "where has"],
  "where'll": "where will",
  "where'd": ["where would", "where had"],
  "when's": ["when is", "when has"],
  "when'll": "when will",
  "when'd": ["when would", "when had"],
  "why's": ["why is", "why has"],
  "why'll": "why will",
  "why'd": ["why would", "why had"],
  "how's": ["how is", "how has"],
  "how'll": "how will",
  "how'd": ["how would", "how had"],
};

/**
 * Formalizes a word using the provided dictionary.
 * If the word has multiple formal forms, the first one is used.
 *
 * @param {string} word - The word to formalize.
 * @param {Object.<string, string|string[]>} dict - The dictionary containing formalizations.
 * @returns {string} The formalized word.
 */
function formalizeWord(word, dict) {
  return Array.isArray(dict[word]) ? dict[word][0] : dict[word];
}

/**
 * Applies the specified tone to the given text by replacing words based on the provided dictionary.
 *
 * @param {string} text - The input text to modify.
 * @param {string} tone - The desired tone ("formal" or "informal").
 * @returns {string} The modified text with the specified tone applied.
 */
export function applyTone(text, tone) {
  const dictionary = tone === "formal" ? formalizations : contractions;
  let newText = text;
  for (const [key, value] of Object.entries(dictionary)) {
    const regex = new RegExp(`\\b${key}\\b`, "gi");
    newText = newText.replace(
      regex,
      tone === "formal" ? formalizeWord(key, dictionary) : value
    );
  }
  return newText;
}
