import { humanizeInputText } from "@nimahkh/ai-humanizer/dist/index.js";

// Example usage
const text = `In the annals of human history, the concept of time has always fascinated philosophers, scientists, and laypeople alike. The relentless march of time, marked by the steady ticking of a clock, governs our lives in ways both profound and mundane. From the early sundials of ancient civilizations to the atomic clocks of the modern era, humanity's quest to measure and understand time reflects our deeper desire to make sense of our existence.

In the realm of physics, time is a dimension, a continuous sequence of events that occur in apparently irreversible succession from the past through the present to the future. Einstein's theory of relativity revolutionized our understanding of time, suggesting that time is not absolute but relative and can be affected by speed and gravity. This notion that time can stretch and compress, bend and warp, challenged the traditional Newtonian view and opened up new vistas in our understanding of the universe.

Philosophically, time raises intriguing questions about the nature of reality and our place within it. Is time a fundamental structure of the universe, or is it merely a human construct, a way to impose order on the chaos of our experiences? The concept of time travel, long a staple of science fiction, teases our imaginations with the possibilities of altering the past and shaping the future.

On a more practical level, time governs our daily routines and shapes our societal structures. The division of time into years, months, days, and hours organizes our work, our leisure, and our rituals. The synchronization of time across the globe through coordinated time zones facilitates international trade, travel, and communication, creating a connected world where events in one part of the world can have immediate repercussions in another.

Yet, despite our advancements in measuring and manipulating time, it remains an enigma. The subjective experience of time—how it can fly when we are joyful and drag when we are in sorrow—reminds us that time is not just a scientific abstraction but a deeply personal phenomenon. In our pursuit to master time, we continue to grapple with its mysteries, striving to understand the fleeting moments that make up the tapestry of our lives.`;

humanizeInputText(text, "formal", "EN").then((humanizedText) => {
  console.log(humanizedText);
});
