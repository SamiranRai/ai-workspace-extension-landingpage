// All copy and links live here. Edit this file, not the components.
export const CONFIG = {
  name: "AI Workspace",
  ctaUrl: "https://chromewebstore.google.com/", // TODO: your Chrome Web Store listing
  dealUrl: "https://appsumo.com/", // TODO: your AppSumo page
  bugEmail: "support@yourdomain.com", // TODO
  platforms: [
    { name: "ChatGPT", color: "#10a37f" },
    { name: "Claude", color: "#d97757" },
    { name: "Gemini", color: "#4285f4" },
    { name: "Grok", color: "#8e8e93" },
  ],
};

export const FEATURES = [
  {
    id: "search",
    label: "01 · Search",
    img: "results",
    title: "Which AI was that answer in?",
    bullets: [
      "Searches every message, not just chat titles",
      "Matches are highlighted and grouped by conversation",
      "Finds it in seconds, however many chats you have",
    ],
    caption:
      "One search: 35 messages found in 14 conversations, across ChatGPT and Claude.",
  },
  {
    id: "scope",
    label: "02 · Local and global",
    img: "picker",
    flip: true,
    title: "Search where you are. Or everywhere.",
    bullets: [
      "Local: only the AI you’re using right now",
      "Global: every connected AI at once",
      "Switch with one dropdown",
    ],
    caption: "Pick one AI, or select them all.",
  },
  {
    id: "folders",
    label: "Next · Folders",
    soon: true,
    title: "Hundreds of chats, no structure?",
    bullets: [
      "Folders and subfolders for chats from every AI",
      "Lives in each AI’s own sidebar, nothing new to open",
      "One workspace instead of separate chat lists",
    ],
    caption:
      "Where this is going: your AIs working together, without the copy-paste.",
  },
];

export const AUDIENCE = [
  { who: "Developers", line: "Last month’s fix for that same error." },
  {
    who: "Researchers and students",
    line: "The explanation that finally made it click.",
  },
  {
    who: "Writers and marketers",
    line: "The draft you liked before you rewrote it.",
  },
  {
    who: "Consultants and freelancers",
    line: "What you worked out for a client in March.",
  },
  { who: "Founders", line: "The plan you sketched with AI at 2 a.m." },
  {
    who: "Anyone using more than one AI",
    line: "Wait, was that Claude or Gemini?",
  },
];

export const FAQ = [
  [
    "Which AIs does it work with?",
    "ChatGPT, Claude, Gemini and Grok. More platforms are planned.",
  ],
  [
    "Does it upload my chats?",
    "No. The search index is built and stored on your device.",
  ],
  [
    "Does it work in Edge or Brave?",
    "It runs in Chromium browsers, so Chrome and Edge are supported.",
  ],
  ["What does it cost?", "A one-time payment on AppSumo. No subscription."],
  [
    "It’s a beta. What if I find a bug?",
    "Use Report a bug in the extension popup. We read every report and fix fast.",
  ],
  [
    "When do folders arrive?",
    "Folders are next on the roadmap. We’ll announce them inside the extension.",
  ],
];
