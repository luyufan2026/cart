/* One month of repeated phrases.
   Totals are not stored here. script.js adds dailyOccurrences. */

const phrases = [
  { id: 1, phrase: "What does this mean?", category: "schoolWork", note: "Usually said when I do not understand an assignment, a sentence, a concept, or something someone has sent me." },
  { id: 2, phrase: "For real?", category: "inner", note: "A quick reaction to something surprising, unbelievable, absurd, or unexpectedly funny." },
  { id: 3, phrase: "Fuck.", category: "inner", note: "A general-purpose reaction used for surprise, frustration, disbelief, excitement, or amusement." },
  { id: 4, phrase: "Wanna smoke?", category: "smoking", note: "Usually used casually when hanging out, taking a break, or asking someone to step outside with me." },
  { id: 5, phrase: "What's the assignment?", category: "schoolWork", note: "Usually appears when I am trying to understand what exactly needs to be submitted for class." },
  { id: 6, phrase: "I'm gonna play games.", category: "entertainment", note: "Usually said when I want to stop thinking about work and switch into a different mental space." },
  { id: 7, phrase: "Put on some Pink Floyd.", category: "entertainment", note: "Usually said when I want the room to feel slower, calmer, stranger, or more detached from everyday life." },
  { id: 8, phrase: "I swear I'm quitting smoking.", category: "smoking", note: "Often said with complete sincerity, even when I may end up smoking again later." },
  { id: 9, phrase: "I'm gonna be late again.", category: "dailyLife", note: "Usually appears before class, appointments, meetings, or plans when I realize I am running behind." },
  { id: 10, phrase: "I'm going back to China.", category: "dailyLife", note: "Usually appears when I feel tired of New York, miss home, or start thinking about leaving for a while." },
  { id: 11, phrase: "Is this world real?", category: "inner", note: "Usually appears during moments when reality feels distant, strange, artificial, or difficult to trust." },
  { id: 12, phrase: "Leaving now.", category: "dailyLife", note: "A practical phrase I use right before going somewhere, often while I am still not actually out the door." },
  { id: 13, phrase: "I miss you.", category: "relationships", note: "Usually said when I want someone physically or emotionally closer to me." },
  { id: 14, phrase: "When are you coming to see me?", category: "relationships", note: "Usually directed toward someone I want to see, especially when I do not want to make the first move in person." },
  { id: 15, phrase: "Where's my money?", category: "schoolWork", note: "Usually said when checking transfers, rent money, payments, balances, or wondering where money has gone." },
  { id: 16, phrase: "No signal.", category: "dailyLife", note: "Usually appears on the subway, in elevators, underground spaces, or whenever my phone connection suddenly disappears." },
  { id: 17, phrase: "I forgot my lighter.", category: "smoking", note: "Usually said after already going outside and realizing I have cigarettes but nothing to light them with." },
  { id: 18, phrase: "Where's my blue passport?", category: "dailyLife", note: "Usually appears when I am packing, traveling, looking for documents, or suddenly worrying that something important is missing." },
  { id: 19, phrase: "Help me send an email.", category: "schoolWork", note: "Usually appears when I need to contact a professor, school office, service provider, or someone I do not want to write to myself." },
  { id: 20, phrase: "Is this person fucking stupid?", category: "inner", note: "Usually appears after someone does something confusing, unreasonable, annoying, or completely incomprehensible." },
  { id: 21, phrase: "Have fun first, think later.", category: "inner", note: "A phrase that represents choosing immediate experience before overthinking consequences." }
];

const dailyOccurrences = [];

function say(date, phraseId, count) {
  dailyOccurrences.push({ date, phraseId, count });
}

/* School / work. Phrase 1 sums to 48. Phrase 5 sums to 26. Phrase 19 sums to 12. Phrase 15 sums to 10. */
say("2026-09-05", 1, 2); say("2026-09-06", 1, 3); say("2026-09-07", 1, 8); say("2026-09-08", 1, 5);
say("2026-09-09", 1, 6); say("2026-09-10", 1, 4); say("2026-09-11", 1, 3); say("2026-09-12", 1, 2);
say("2026-09-14", 1, 2); say("2026-09-16", 1, 2); say("2026-09-18", 1, 2); say("2026-09-21", 1, 3);
say("2026-09-23", 1, 1); say("2026-09-25", 1, 2); say("2026-09-28", 1, 1); say("2026-10-01", 1, 1); say("2026-10-03", 1, 1);

say("2026-09-06", 5, 2); say("2026-09-07", 5, 4); say("2026-09-08", 5, 3); say("2026-09-09", 5, 3);
say("2026-09-10", 5, 2); say("2026-09-11", 5, 2); say("2026-09-14", 5, 2); say("2026-09-16", 5, 2);
say("2026-09-21", 5, 2); say("2026-09-23", 5, 2); say("2026-09-28", 5, 1); say("2026-10-03", 5, 1);

say("2026-09-06", 19, 1); say("2026-09-09", 19, 2); say("2026-09-18", 19, 1); say("2026-09-23", 19, 1);
say("2026-09-25", 19, 1); say("2026-10-01", 19, 1); say("2026-10-03", 19, 4); say("2026-10-05", 19, 1);

say("2026-09-25", 15, 1); say("2026-09-27", 15, 1); say("2026-09-28", 15, 3); say("2026-09-29", 15, 2);
say("2026-09-30", 15, 1); say("2026-10-02", 15, 1); say("2026-10-04", 15, 1);

/* Daily life. 9=17, 12=13, 16=7, 10=9, 18=6. */
say("2026-09-05", 9, 2); say("2026-09-08", 9, 2); say("2026-09-09", 9, 1); say("2026-09-11", 9, 2);
say("2026-09-15", 9, 2); say("2026-09-17", 9, 1); say("2026-09-22", 9, 2); say("2026-09-24", 9, 2);
say("2026-09-29", 9, 2); say("2026-10-02", 9, 1);

say("2026-09-05", 12, 1); say("2026-09-08", 12, 2); say("2026-09-11", 12, 1); say("2026-09-15", 12, 2);
say("2026-09-17", 12, 2); say("2026-09-22", 12, 1); say("2026-09-24", 12, 2); say("2026-09-29", 12, 1); say("2026-10-05", 12, 1);

say("2026-09-11", 16, 1); say("2026-09-17", 16, 2); say("2026-09-24", 16, 1); say("2026-09-28", 16, 2); say("2026-10-04", 16, 1);

say("2026-09-26", 10, 1); say("2026-09-27", 10, 1); say("2026-09-28", 10, 3); say("2026-09-29", 10, 2);
say("2026-09-30", 10, 1); say("2026-10-01", 10, 1);

say("2026-09-27", 18, 1); say("2026-09-28", 18, 2); say("2026-09-29", 18, 1); say("2026-09-30", 18, 1); say("2026-10-01", 18, 1);

/* Smoking. 4=12, 8=14, 17=9. Heavy around Sep 14. */
say("2026-09-12", 4, 1); say("2026-09-13", 4, 2); say("2026-09-14", 4, 4); say("2026-09-15", 4, 2);
say("2026-09-16", 4, 1); say("2026-09-20", 4, 1); say("2026-09-27", 4, 1);

say("2026-09-12", 8, 2); say("2026-09-13", 8, 2); say("2026-09-14", 8, 3); say("2026-09-15", 8, 2);
say("2026-09-16", 8, 1); say("2026-09-18", 8, 1); say("2026-09-22", 8, 1); say("2026-09-27", 8, 2);

say("2026-09-13", 17, 1); say("2026-09-14", 17, 2); say("2026-09-15", 17, 2); say("2026-09-16", 17, 1);
say("2026-09-20", 17, 1); say("2026-09-22", 17, 1); say("2026-09-27", 17, 1);

/* Relationships. 13=16, 14=11. Peak Sep 21. */
say("2026-09-18", 13, 1); say("2026-09-19", 13, 2); say("2026-09-20", 13, 2); say("2026-09-21", 13, 5);
say("2026-09-22", 13, 3); say("2026-09-23", 13, 2); say("2026-09-25", 13, 1);

say("2026-09-19", 14, 1); say("2026-09-20", 14, 2); say("2026-09-21", 14, 3); say("2026-09-22", 14, 2);
say("2026-09-23", 14, 2); say("2026-09-26", 14, 1);

/* Entertainment. 6=18, 7=15, 21=11. */
say("2026-09-06", 6, 1); say("2026-09-10", 6, 2); say("2026-09-13", 6, 2); say("2026-09-17", 6, 2);
say("2026-09-19", 6, 1); say("2026-09-24", 6, 2); say("2026-09-26", 6, 2); say("2026-09-30", 6, 2);
say("2026-10-02", 6, 2); say("2026-10-04", 6, 2);

say("2026-09-06", 7, 1); say("2026-09-10", 7, 2); say("2026-09-13", 7, 1); say("2026-09-17", 7, 2);
say("2026-09-19", 7, 2); say("2026-09-24", 7, 2); say("2026-09-26", 7, 1); say("2026-09-30", 7, 2);
say("2026-10-02", 7, 1); say("2026-10-04", 7, 1);

say("2026-09-10", 21, 1); say("2026-09-13", 21, 2); say("2026-09-19", 21, 2); say("2026-09-24", 21, 2);
say("2026-09-26", 21, 1); say("2026-09-30", 21, 2); say("2026-10-04", 21, 1);

/* Emotion / inner world. 2=31, 3=57, 11=8, 20=14. */
say("2026-09-07", 2, 2); say("2026-09-08", 2, 2); say("2026-09-09", 2, 2); say("2026-09-10", 2, 2);
say("2026-09-12", 2, 3); say("2026-09-14", 2, 2); say("2026-09-16", 2, 2); say("2026-09-18", 2, 2);
say("2026-09-19", 2, 2); say("2026-09-21", 2, 4); say("2026-09-22", 2, 2); say("2026-09-24", 2, 2);
say("2026-09-26", 2, 2); say("2026-09-28", 2, 2);

say("2026-09-06", 3, 2); say("2026-09-07", 3, 3); say("2026-09-08", 3, 2); say("2026-09-10", 3, 2);
say("2026-09-12", 3, 4); say("2026-09-13", 3, 2); say("2026-09-14", 3, 3); say("2026-09-15", 3, 2);
say("2026-09-16", 3, 4); say("2026-09-17", 3, 2); say("2026-09-18", 3, 2); say("2026-09-19", 3, 3);
say("2026-09-20", 3, 2); say("2026-09-21", 3, 6); say("2026-09-22", 3, 3); say("2026-09-23", 3, 2);
say("2026-09-24", 3, 2); say("2026-09-26", 3, 3); say("2026-09-27", 3, 2); say("2026-09-28", 3, 2);
say("2026-09-30", 3, 2); say("2026-10-01", 3, 2);

say("2026-09-16", 11, 1); say("2026-09-21", 11, 2); say("2026-09-22", 11, 1); say("2026-09-25", 11, 1);
say("2026-10-01", 11, 1); say("2026-10-05", 11, 2);

say("2026-09-09", 20, 2); say("2026-09-12", 20, 2); say("2026-09-16", 20, 2); say("2026-09-21", 20, 3);
say("2026-09-23", 20, 1); say("2026-09-27", 20, 2); say("2026-10-03", 20, 2);
