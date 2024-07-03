const natural = require("natural");
const tokenizer = new natural.SentenceTokenizer();
const wordTokenizer = new natural.WordTokenizer();
const wordnet = new natural.WordNet();

const language = "EN";
const defaultCategory = "N";
const defaultCategoryCapitalized = "NNP";

var lexicon = new natural.Lexicon(
  language,
  defaultCategory,
  defaultCategoryCapitalized
);
var ruleSet = new natural.RuleSet("EN");
var posTagger = new natural.BrillPOSTagger(lexicon, ruleSet);

// Function to apply general humanization adjustments
function applyGenericHumanization(text) {
  // Adding contractions and informal language
  let newText = text
    .replace(/\bis not\b/g, "isn't")
    .replace(/\bcannot\b/g, "can't")
    .replace(/\bdo not\b/g, "don't")
    .replace(/\bwill not\b/g, "won't")
    .replace(/\bhas not\b/g, "hasn't")
    .replace(/\bhave not\b/g, "haven't")
    .replace(/\blet us\b/g, "let's")
    .replace(/\bit is\b/g, "it's")
    .replace(/\bhe is\b/g, "he's")
    .replace(/\bshe is\b/g, "she's")
    .replace(/\bthey are\b/g, "they're")
    .replace(/\bwe are\b/g, "we're")
    .replace(/\byou are\b/g, "you're")
    .replace(/\bare not\b/g, "aren't")
    .replace(/\bdid not\b/g, "didn't")
    .replace(/\bcould not\b/g, "couldn't")
    .replace(/\bwould not\b/g, "wouldn't");

  // Splitting and combining sentences to vary sentence length
  let sentences = newText.split(/([.?!])\s*(?=[A-Z])/g);
  newText = sentences
    .map((sentence, index) => {
      if (index % 2 === 1) return sentence; // Retain punctuation marks
      // Randomly combine sentences if there is a next sentence
      if (Math.random() > 0.5 && index + 2 < sentences.length) {
        return sentence + ", and " + sentences[index + 2].trim();
      } else if (Math.random() > 0.5 && index + 2 < sentences.length) {
        return sentence + ", but " + sentences[index + 2].trim();
      } else {
        return sentence;
      }
    })
    .join("");

  return newText;
}

// Functions to apply different tones
function applyFormalTone(text) {
  return text
    .replace(/\bisn't\b/g, "is not")
    .replace(/\bcan't\b/g, "cannot")
    .replace(/\bdon't\b/g, "do not")
    .replace(/\bwon't\b/g, "will not")
    .replace(/\bhasn't\b/g, "has not")
    .replace(/\bhaven't\b/g, "have not")
    .replace(/\blet's\b/g, "let us")
    .replace(/\bit's\b/g, "it is")
    .replace(/\bhe's\b/g, "he is")
    .replace(/\bshe's\b/g, "she is")
    .replace(/\bthey're\b/g, "they are")
    .replace(/\bwe're\b/g, "we are")
    .replace(/\byou're\b/g, "you are")
    .replace(/\baren't\b/g, "are not")
    .replace(/\bdidn't\b/g, "did not")
    .replace(/\bcouldn't\b/g, "could not")
    .replace(/\bwouldn't\b/g, "would not")
    .replace(/\bi'm\b/gi, "I am")
    .replace(/\bwe've\b/gi, "we have")
    .replace(/\bthey've\b/gi, "they have")
    .replace(/\bI'll\b/g, "I will")
    .replace(/\bI've\b/g, "I have")
    .replace(/\bI'm\b/g, "I am")
    .replace(/\byou're\b/g, "you are")
    .replace(/\bthere's\b/g, "there is")
    .replace(/\bwhere's\b/g, "where is")
    .replace(/\bwho's\b/g, "who is")
    .replace(/\bwhat's\b/g, "what is")
    .replace(/\bhow's\b/g, "how is")
    .replace(/\bwe'll\b/g, "we will")
    .replace(/\bthey'll\b/g, "they will")
    .replace(/\bI'd\b/g, "I would")
    .replace(/\bthey'd\b/g, "they would");
}

function applyCasualTone(text) {
  return text
    .replace(/\bi am\b/g, "I'm")
    .replace(/\byou are\b/g, "you're")
    .replace(/\bwe are\b/g, "we're")
    .replace(/\bthey are\b/g, "they're")
    .replace(/\bit is\b/g, "it's")
    .replace(/\bhe is\b/g, "he's")
    .replace(/\bshe is\b/g, "she's")
    .replace(/\bi have\b/g, "I've")
    .replace(/\byou have\b/g, "you've")
    .replace(/\bwe have\b/g, "we've")
    .replace(/\bthey have\b/g, "they've")
    .replace(/\bi will\b/g, "I'll")
    .replace(/\byou will\b/g, "you'll")
    .replace(/\bwe will\b/g, "we'll")
    .replace(/\bthey will\b/g, "they'll")
    .replace(/\bi would\b/g, "I'd")
    .replace(/\byou would\b/g, "you'd")
    .replace(/\bwe would\b/g, "we'd")
    .replace(/\bthey would\b/g, "they'd")
    .replace(/\bdo not\b/g, "don't")
    .replace(/\bcannot\b/g, "can't")
    .replace(/\bwill not\b/g, "won't")
    .replace(/\bhave not\b/g, "haven't")
    .replace(/\bhas not\b/g, "hasn't")
    .replace(/\bdid not\b/g, "didn't")
    .replace(/\bcould not\b/g, "couldn't")
    .replace(/\bwould not\b/g, "wouldn't");
}

function applyEnthusiasticTone(text) {
  return text
    .replace(/\bI am\b/g, "I'm so")
    .replace(/\bvery\b/g, "incredibly")
    .replace(/\bgreat\b/g, "fantastic")
    .replace(/\bgood\b/g, "amazing")
    .replace(/\bhappy\b/g, "thrilled")
    .replace(/\bexcited\b/g, "super excited")
    .replace(/\blove\b/g, "absolutely love")
    .replace(/\breally\b/g, "truly")
    .replace(/\bamazing\b/g, "spectacular")
    .replace(/\bwonderful\b/g, "wonderful!")
    .replace(/\bfantastic\b/g, "fantastic!")
    .replace(/\bexcellent\b/g, "excellent!")
    .replace(/\bgreat\b/g, "great!")
    .replace(/\bawesome\b/g, "awesome!")
    .replace(/\bstunning\b/g, "stunning!")
    .replace(/!/g, "!!!");
}

function applyAuthoritativeTone(text) {
  return text
    .replace(/\bI think\b/g, "I am confident")
    .replace(/\bmaybe\b/g, "definitely")
    .replace(/\bperhaps\b/g, "certainly")
    .replace(/\bI feel\b/g, "I believe")
    .replace(/\bI guess\b/g, "I am sure")
    .replace(/\bI hope\b/g, "I expect")
    .replace(/\bI suppose\b/g, "I know")
    .replace(/\bI might\b/g, "I will")
    .replace(/\bshould\b/g, "must")
    .replace(/\bcan\b/g, "will")
    .replace(/\bcould\b/g, "will");
}
function humanizeText(sentences, tone) {
  return new Promise((resolve) => {
    let processedSentences = [];
    sentences.forEach((sentence, sentenceIndex) => {
      let words = wordTokenizer.tokenize(sentence);
      let taggedWords = posTagger.tag(words);

      let humanizedWords = [];

      let processWord = (index) => {
        if (index >= taggedWords.taggedWords.length) {
          processedSentences.push(humanizedWords.join(" "));
          if (processedSentences.length === sentences.length) {
            let joinedText = processedSentences.join(". ");
            let humanizedText = applyGenericHumanization(joinedText);
            switch (tone) {
              case "formal":
                humanizedText = applyFormalTone(humanizedText);
                break;
              case "casual":
                humanizedText = applyCasualTone(humanizedText);
                break;
              case "enthusiastic":
                humanizedText = applyEnthusiasticTone(humanizedText);
                break;
              case "authoritative":
                humanizedText = applyAuthoritativeTone(humanizedText);
                break;
            }
            resolve(humanizedText);
          }
          return;
        }

        let taggedWord = taggedWords.taggedWords[index];
        let word = taggedWord.token;

        humanizedWords.push(word);
        processWord(index + 1);
      };

      processWord(0);
    });
  });
}

const text = `Dream work is the practice of exploring and interpreting dreams to gain insight into the subconscious mind. This process has roots in various cultural, spiritual, and psychological traditions. In modern psychology, dream work is often associated with the theories of Sigmund Freud and Carl Jung, who believed that dreams reveal hidden aspects of the psyche.

Freud viewed dreams as a form of wish fulfillment, where repressed desires and unresolved conflicts find expression. He introduced the idea of analyzing the manifest content (the literal storyline of the dream) and the latent content (the hidden psychological meaning). By examining symbols, emotions, and recurring themes, Freud believed that individuals could uncover unconscious thoughts and feelings.

Jung, on the other hand, saw dreams as a bridge to the collective unconscious, a repository of shared human experiences and archetypes. He believed that dreams could provide guidance and wisdom, facilitating personal growth and self-discovery. Jungian dream analysis focuses on identifying archetypal symbols and integrating them into the conscious mind to achieve individuation, the process of becoming one's true self.

In contemporary dream work, various techniques are employed, including dream journaling, lucid dreaming, and group dream sharing. Dream journaling involves recording dreams upon waking to capture details that might otherwise be forgotten. Lucid dreaming, where individuals become aware they are dreaming and can potentially control the dream narrative, is another tool for exploring the subconscious. Group dream sharing allows for diverse interpretations and communal support in understanding dreams.

Dream work is not limited to psychological practices; it is also a feature of many spiritual and indigenous traditions, where dreams are seen as messages from the divine or the spirit world. Whether approached from a psychological, spiritual, or cultural perspective, dream work remains a powerful method for gaining insight into the hidden dimensions of the human experience.`;
sentences = tokenizer.tokenize(text);
humanizeText(sentences, "formal").then((humanizedText) => {
  console.log(humanizedText);
});
