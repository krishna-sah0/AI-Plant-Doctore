import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../../types';
import {
  MessageSquareCode,
  Send,
  Sparkles,
  Leaf,
  Bot,
  User,
  Trash2,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface AiBotanistChatSectionProps {
  initialPrompt?: string;
  onShowToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    role: 'bot',
    text: `Hello plant parent! 🌿 I am your AI Botanist & Certified Horticultural Consultant.\n\nAsk me anything regarding:\n• Diagnosing strange spots, yellowing, or drooping leaves\n• Organic pest eradication (spider mites, fungus gnats, mealybugs)\n• Repotting timelines, soil recipes, and root rot salvage\n• Light level calibration and seasonal watering advice\n\nHow can I help your houseplants thrive today?`,
    timestamp: 'Just now',
  },
];

const SUGGESTED_QUESTIONS = [
  'Why are my Monstera leaves turning yellow?',
  'How do I eradicate fungus gnats naturally?',
  'What is the best soil mix for Aroids?',
  'Why is my Fiddle Leaf Fig dropping lower leaves?',
  'How do I save a plant with root rot?',
  'How much light does a Snake Plant actually need?',
];

export const AiBotanistChatSection: React.FC<AiBotanistChatSectionProps> = ({
  initialPrompt,
  onShowToast,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateBotanicalResponse = (userQuery: string): string => {
    const q = userQuery.toLowerCase();

    if (q.includes('yellow') || q.includes('chlorosis')) {
      return `🌿 **Analysis on Yellowing Leaves (Chlorosis):**\n\nYellowing leaves are the plant's #1 distress signal. Here is how to diagnose the exact cause:\n\n1. **Bottom leaves yellowing + soggy soil**: Classic **Overwatering / Root Hypoxia**. The roots cannot breathe and are suffocating. Let the soil dry out 50% down before watering again.\n2. **Crispy yellow edges + bone dry soil**: **Underwatering or low humidity**. Submerge the pot in a water basin for 20 minutes.\n3. **Pale overall yellowing + slow growth**: **Nitrogen Deficiency**. Feed with a balanced liquid 20-20-20 fertilizer at half-strength during the next watering.\n4. **Yellow spots with fine webbing**: **Spider Mites**. Wash foliage in the shower and spray with organic cold-pressed Neem oil!`;
    }

    if (q.includes('gnat') || q.includes('bugs') || q.includes('pest') || q.includes('mite') || q.includes('fly')) {
      return `🪲 **Botanical Pest Eradication Protocol:**\n\nFor **Fungus Gnats**:\n• **Dry out topsoil**: Gnats lay eggs in the top 1-2 inches of damp soil. Allow the top 2 inches to dry completely between waterings.\n• **Mosquito Bits / BTI Tea**: Steep Bacillus thuringiensis israelensis (BTI) in your watering can. It naturally destroys gnat larvae without harming roots or pets.\n• **Yellow Sticky Traps**: Place horizontally near soil level to catch breeding adults.\n\nFor **Spider Mites & Mealybugs**:\n• Wipe leaves with 70% Isopropyl alcohol on a cotton ball for mealybugs.\n• Spray undersides of foliage every 4 days with cold-pressed Neem oil & castile soap emulsion.`;
    }

    if (q.includes('root rot') || q.includes('mushy') || q.includes('salvage') || q.includes('save')) {
      return `🚨 **Emergency Root Rot Rescue Procedure:**\n\n1. **Unpot Immediately**: Gently remove the plant from its container and rinse old soggy substrate off the roots with lukewarm water.\n2. **Surgical Debridement**: With sterilized scissors, prune away all black, brown, slimy, or foul-smelling roots until only firm white/tan root tissue remains.\n3. **Hydrogen Peroxide Bath**: Submerge remaining healthy root mass in a solution of 1 part 3% Hydrogen Peroxide to 4 parts water for 5 minutes. This kills fungal spores and injects oxygen into the root cells.\n4. **Repot in Clean Chunky Mix**: Pot into a porous terracotta container with fresh aroid bark mix. Do NOT water for 5–7 days!`;
    }

    if (q.includes('fiddle') || q.includes('lyrata')) {
      return `🌳 **Fiddle Leaf Fig (Ficus Lyrata) Care Masterclass:**\n\n• **Lighting**: Ficus lyrata requires **high light intensity** (1,500 – 2,500+ Lux). Place directly in front of an East or South-facing window.\n• **Draft Sensitivity**: Never place near AC vents, heaters, or frequently opened exterior doors.\n• **Watering Rhythm**: Drench thoroughly until water runs out the drainage holes, but only when the top 2–3 inches of soil are dry to the touch.\n• **Leaf Drop**: Usually triggered by sudden relocation or lack of adequate sunlight. Keep it in one permanent spot!`;
    }

    if (q.includes('soil') || q.includes('repot') || q.includes('mix')) {
      return `🪴 **Universal Tropical Aroid Potting Formula:**\n\nStandard bagged potting soil is often too dense and suffocates roots indoors. Mix this chunky blend:\n\n• **40% Chunky Orchid Pine Bark** (Creates essential oxygen pockets)\n• **30% Coarse Perlite / Pumice** (Ensures rapid drainage)\n• **20% Coco Coir / Peat Fiber** (Holds gentle ambient moisture)\n• **10% Worm Castings & Horticultural Charcoal** (Provides slow-release organics and prevents sour soil odors).\n\nAlways choose a container with functional drainage holes!`;
    }

    return `🌱 **Botanical Guidance:**\n\nThank you for your question regarding houseplant care! To ensure vigorous cellular health and root vitality:\n\n1. **Light is Food**: Ensure your plant receives appropriate foot-candles for its species. Move it closer to unobstructed natural daylight if growth is slow or leggy.\n2. **Check Before Watering**: Never water on a fixed calendar schedule. Always insert a wooden chopstick or finger 2 inches into the substrate to verify actual moisture.\n3. **Airflow & Cleanliness**: Dust leaves monthly with a damp cloth to maximize photosynthetic efficiency and deter foliar pests.\n\nWould you like specific care parameters (Light, Water, Soil mix) for a particular plant species?`;
  };

  const handleSendMessage = async (customText?: string) => {
    const text = customText || inputText;
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customText) setInputText('');
    setIsTyping(true);

    // Simulate realistic AI botanical processing
    await new Promise((r) => setTimeout(r, 800));

    const responseText = generateBotanicalResponse(text);
    const botMessage: ChatMessage = {
      id: `msg-${Date.now() + 1}`,
      role: 'bot',
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleClearHistory = () => {
    setMessages(INITIAL_MESSAGES);
    onShowToast('Chat Cleared', 'Botanical consultation session reset.', 'info');
  };

  const copyMessage = (text: string) => {
    navigator.clipboard?.writeText(text);
    onShowToast('Copied to Clipboard', 'Botanical guidance response copied.', 'info');
  };

  return (
    <section id="ai-chat" className="py-16 sm:py-20 bg-stone-950 text-white border-b border-stone-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-widest">
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <span>24/7 Virtual Botanist</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-display text-white">
            AI Plant Doctor Consultation
          </h2>
          <p className="text-sm text-stone-300 max-w-xl mx-auto">
            Get instant expert guidance for pest infestations, yellowing leaves, repotting advice, and custom plant revival schedules.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-stone-900 rounded-3xl border border-stone-800 shadow-2xl overflow-hidden flex flex-col h-[600px]">
          {/* Chat Header Bar */}
          <div className="p-4 bg-stone-950/90 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Dr. Chlorophyll</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h3>
                <p className="text-[10px] text-stone-400">Certified Botanical AI Specialist</p>
              </div>
            </div>

            <button
              onClick={handleClearHistory}
              className="p-2 text-stone-400 hover:text-rose-400 rounded-lg hover:bg-stone-900 transition-colors"
              title="Clear Consultation History"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => {
              const isBot = msg.role === 'bot';

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-600/40 flex items-center justify-center text-emerald-400 shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 relative group ${
                      isBot
                        ? 'bg-stone-950 border border-stone-800 text-stone-200 shadow-md'
                        : 'bg-emerald-600 text-white font-medium rounded-br-none shadow-md'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>

                    <div className="flex items-center justify-between pt-1 text-[10px] opacity-70">
                      <span>{msg.timestamp}</span>
                      {isBot && (
                        <button
                          onClick={() => copyMessage(msg.text)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-emerald-400"
                          title="Copy message"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {!isBot && (
                    <div className="w-8 h-8 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-600/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-stone-950 border border-stone-800 rounded-2xl px-4 py-3 text-xs text-stone-400 flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[11px] ml-1">Dr. Chlorophyll is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-3 bg-stone-950/70 border-t border-stone-800 overflow-x-auto whitespace-nowrap space-x-2">
            <span className="text-[10px] uppercase font-bold text-stone-500 mr-1 inline-block">
              Suggested:
            </span>
            {SUGGESTED_QUESTIONS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="inline-block px-3 py-1 rounded-lg bg-stone-900 hover:bg-emerald-950 hover:text-emerald-300 border border-stone-800 text-[11px] text-stone-300 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 sm:p-4 bg-stone-950 border-t border-stone-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a question about plant health, fertilizer, light, or pests..."
              className="flex-1 p-3 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 disabled:bg-stone-800 disabled:text-stone-600 disabled:cursor-not-allowed text-stone-950 font-bold transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
