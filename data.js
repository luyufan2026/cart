/* Temporary demo counts.
   Replace count values with real statistics.
   Every chart, total, and phrase panel reads this array.
   The original field is an internal reference and is never shown. */

const phrases = [
  {
    id: 1,
    phrase: "What does this mean?",
    original: "啥意思",
    count: 48,
    category: "School",
    note: "Usually said when I do not understand an assignment, a sentence, a concept, or something someone has sent me."
  },
  {
    id: 2,
    phrase: "For real?",
    original: "真假的",
    count: 31,
    category: "Emotion",
    note: "A quick reaction to something surprising, unbelievable, absurd, or unexpectedly funny."
  },
  {
    id: 3,
    phrase: "Fuck.",
    original: "我操",
    count: 57,
    category: "Emotion",
    note: "A general-purpose reaction used for surprise, frustration, disbelief, excitement, or amusement."
  },
  {
    id: 4,
    phrase: "Wanna smoke?",
    original: "抽烟吗",
    count: 12,
    category: "Smoking",
    note: "Usually used casually when hanging out, taking a break, or asking someone to step outside with me."
  },
  {
    id: 5,
    phrase: "What's the assignment?",
    original: "作业是啥",
    count: 26,
    category: "School",
    note: "Usually appears when I am trying to understand what exactly needs to be submitted for class."
  },
  {
    id: 6,
    phrase: "I'm gonna play games.",
    original: "我要打游戏了",
    count: 18,
    category: "Entertainment",
    note: "Usually said when I want to stop thinking about work and switch into a different mental space."
  },
  {
    id: 7,
    phrase: "Put on some Pink Floyd.",
    original: "放首 Pink Floyd",
    count: 15,
    category: "Entertainment",
    note: "Usually said when I want the room to feel slower, calmer, stranger, or more detached from everyday life."
  },
  {
    id: 8,
    phrase: "I swear I'm quitting smoking.",
    original: "我真戒烟了",
    count: 14,
    category: "Smoking",
    note: "Often said with complete sincerity, even when I may end up smoking again later."
  },
  {
    id: 9,
    phrase: "I'm gonna be late again.",
    original: "我又要迟到了",
    count: 17,
    category: "Daily Life",
    note: "Usually appears before class, appointments, meetings, or plans when I realize I am running behind."
  },
  {
    id: 10,
    phrase: "I'm going back to China.",
    original: "我要回中国",
    count: 9,
    category: "Daily Life",
    note: "Usually appears when I feel tired of New York, miss home, or start thinking about leaving for a while."
  },
  {
    id: 11,
    phrase: "Is this world real?",
    original: "这世界是真的吗",
    count: 8,
    category: "Existential",
    note: "Usually appears during moments when reality feels distant, strange, artificial, or difficult to trust."
  },
  {
    id: 12,
    phrase: "Leaving now.",
    original: "马上出门",
    count: 13,
    category: "Daily Life",
    note: "A practical phrase I use right before going somewhere, often while I am still not actually out the door."
  },
  {
    id: 13,
    phrase: "I miss you.",
    original: "我想你了",
    count: 16,
    category: "Relationships",
    note: "Usually said when I want someone physically or emotionally closer to me."
  },
  {
    id: 14,
    phrase: "When are you coming to see me?",
    original: "你啥时候来找我",
    count: 11,
    category: "Relationships",
    note: "Usually directed toward someone I want to see, especially when I do not want to make the first move in person."
  },
  {
    id: 15,
    phrase: "Where's my money?",
    original: "我钱呢",
    count: 10,
    category: "Money",
    note: "Usually said when checking transfers, rent money, payments, balances, or wondering where money has gone."
  },
  {
    id: 16,
    phrase: "No signal.",
    original: "没信号了",
    count: 7,
    category: "Daily Life",
    note: "Usually appears on the subway, in elevators, underground spaces, or whenever my phone connection suddenly disappears."
  },
  {
    id: 17,
    phrase: "I forgot my lighter.",
    original: "忘带火机了",
    count: 9,
    category: "Smoking",
    note: "Usually said after already going outside and realizing I have cigarettes but nothing to light them with."
  },
  {
    id: 18,
    phrase: "Where's my blue passport?",
    original: "我的蓝色护照呢",
    count: 6,
    category: "Travel",
    note: "Usually appears when I am packing, traveling, looking for documents, or suddenly worrying that something important is missing."
  },
  {
    id: 19,
    phrase: "Help me send an email.",
    original: "帮我发个邮件",
    count: 12,
    category: "School",
    note: "Usually appears when I need to contact a professor, school office, service provider, or someone I do not want to write to myself."
  },
  {
    id: 20,
    phrase: "Is this person fucking stupid?",
    original: "这人傻逼吗",
    count: 14,
    category: "Emotion",
    note: "Usually appears after someone does something confusing, unreasonable, annoying, or completely incomprehensible."
  },
  {
    id: 21,
    phrase: "Have fun first, think later.",
    original: "先爽了再说",
    count: 11,
    category: "Attitude",
    note: "A phrase that represents choosing immediate experience before overthinking consequences."
  }
];
