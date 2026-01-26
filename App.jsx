import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  ExternalLink, 
  CheckCircle, 
  ShoppingCart, 
  Headphones, 
  Settings, 
  Shield, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Globe,
  Instagram,
  Layout, 
  MessageSquare,
  Users,
  Zap,
  MousePointer2,
  FileText, 
  Sparkles,
  Send,
  Loader2,
  Briefcase,
  Monitor,
  UserPlus,
  Clock,
  Lightbulb,
  BarChart3
} from 'lucide-react';

const apiKey = "AIzaSyCc90MRgdkSEQE-gPiBPI0VMBATbNSRvzY"; // Provided by environment

const App = () => {
  const [filter, setFilter] = useState('All');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [supportChat, setSupportChat] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  const portfolioItems = [
    { id: 1, category: 'Instagram', title: 'Product Launch Graphics', description: 'Social media strategy for an e-commerce brand launch.', color: 'bg-blue-50' },
    { id: 2, category: 'Facebook', title: 'Community Engagement', description: 'Curated posts for a tech support community group.', color: 'bg-blue-100' },
    { id: 3, category: 'Ads', title: 'Shopify Sales Campaign', description: 'High-converting ad copy and creative designs.', color: 'bg-blue-50' },
    { id: 4, category: 'Instagram', title: 'Lifestyle Brand Feed', description: 'Grid planning and aesthetic curation', color: 'bg-blue-100', image: 'lifestyle feed/2.png', gallery: ['lifestyle feed/1.png'] },
    { id: 5, category: 'LinkedIn', title: 'Infographics', description: 'Infographics for certain target market.', color: 'bg-blue-50', image: 'infographics/Tips to save money.png', gallery: ['infographics/Tips to save money.png', 'infographics/Crypto Infographics.png'] },
    { id: 6, category: 'Ads', title: 'Customer Success Stories', description: 'Testimonial carousels for social proof.', color: 'bg-blue-100', image: 'Customer Sucess Stories/Feedback.png', gallery: ['Customer Sucess Stories/Feedback.png', 'Customer Sucess Stories/Feedback2.png', 'Customer Sucess Stories/Feedback3.png'] },
    { id: 7, category: 'LinkedIn', title: 'Calendar Management', description: 'Schedule and calendar coordination services.', color: 'bg-blue-50' },
    { id: 8, category: 'LinkedIn', title: 'Data Entry', description: 'Accurate and efficient data management services.', color: 'bg-blue-100' },
    { id: 9, category: 'LinkedIn', title: 'Customer Service Works', description: 'Professional customer support and service solutions.', color: 'bg-blue-50' },
  ];

  const filteredItems = filter === 'All' ? portfolioItems : portfolioItems.filter(item => item.category === filter);

  const generateMockCaption = (topic) => {
    const captions = [
      `✨ Introducing our newest ${topic}! 🎉 Game-changer alert 🚀 Limited time offer - grab yours before they're gone! #NewRelease #MustHave`,
      `Your ${topic} just got an upgrade ⚡️ Quality you can trust, price you'll love 💯 Shop now and save big! 💰 #SmartShopping`,
      `Say hello to the future of ${topic} 👋 We're obsessed and you will be too! 🔥 Available now at [link] #Innovation #TrendingNow`,
      `${topic} but make it PREMIUM ✨ Designed for excellence, built for you 💪 Don't miss out - link in bio! 👆 #Exclusive`,
      `This ${topic} is a GAME CHANGER 🎯 See why thousands are switching ⭐️ Join the movement today! 🚀 #GameChanger #BestChoice`
    ];
    return captions[Math.floor(Math.random() * captions.length)];
  };

  const callGemini = async (prompt, systemInstruction = "") => {
    const topic = prompt.replace('Generate a creative social media caption for: ', '');
    return generateMockCaption(topic);
  };

  const handleGenerateCaption = async () => {
    if (!aiPrompt) return;
    setIsAiLoading(true);
    try {
      const result = await callGemini(
        `Generate a creative social media caption for: ${aiPrompt}`,
        "You are an expert Social Media Manager and Virtual Assistant. Create catchy, professional captions with emojis."
      );
      setAiResult(result);
    } catch (error) {
      setAiResult("Failed to generate. Please try again.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const generateAssistantResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Check if user is providing an order number (4-10 digits)
    const orderNumberMatch = userMessage.match(/\b\d{4,10}\b/);
    if (orderNumberMatch) {
      const orderNum = orderNumberMatch[0];
      // If context was cancellation/refund, provide next step
      if (message.includes('cancel') || message.includes('refund') || message.includes('return')) {
        return `Got it! Order #${orderNum} - thank you. To process your cancellation/refund, could you please tell me: 1) What's the reason for cancellation/return, and 2) If it's a return, are the items still in original condition? I'll get this sorted for you right away!`;
      }
      // If context was tracking, provide tracking response
      if (message.includes('track') || message.includes('where') || message.includes('status') || message.includes('arrive')) {
        return `Perfect! Order #${orderNum} - let me check that for you. Your package is being prepared for shipment. I'll keep you updated on the status and expected delivery date. Is there anything else you'd like to know about this order?`;
      }
      // Generic order number response
      return `Got it! I have your order #${orderNum}. How can I help you with this order? Are you looking to track it, make changes, or have a question about it?`;
    }
    
    // Shopify Orders & E-commerce
    if (message.includes('shopify order') || message.includes('order management') || message.includes('how do you handle orders')) {
      return "I can help you with your order! 📦 Are you looking to: 1) Track your order status, 2) Make changes to your order, 3) Cancel or modify it, or 4) Have another question? Please provide your order number and let me know what you need. I'll take care of it right away!";
    }
    if (message.includes('customer inquir') || message.includes('handle inquiry') || message.includes('customer question') || message.includes('how do you manage') || message.includes('handle customers')) {
      return "Hi there! 👋 I'm here to help with any questions or concerns you have. Please tell me: What's your issue or question about? Include your order number if it's related to a specific order. I'll listen carefully and get you the solution you need. What can I assist you with?";
    }
    if (message.includes('refund') || message.includes('return') || message.includes('cancellation') || message.includes('cancel order')) {
      return "I can help you with that! 😊 To process your cancellation/refund, I'll need: 1) Your order number, 2) The reason for cancellation/return, and 3) If it's a return, do you still have the items in original condition? Once you provide these details, I'll get this resolved quickly for you. What's your order number?";
    }
    if (message.includes('inventory') || message.includes('stock') || message.includes('tracking')) {
      return "I can help you track your shipment! 📋 To get you the most accurate information, please provide your order number. I'll check the current status and give you an update on when your package will arrive. What's your order number?";
    }
    
    // Services & Expertise
    if (message.includes('customer support') || message.includes('support')) {
      return "Welcome! 👋 I'm here to support you. What can I help you with today? Whether it's about an order, product question, issue, or anything else - I'm ready to assist. Tell me what's on your mind!";
    }
    if (message.includes('shopify') && !message.includes('order')) {
      return "Keith has extensive Shopify expertise: order management, product listing updates, inventory tracking, store optimization, and customer support. He's worked with automotive and fashion brands, managing high-volume operations smoothly. He's fluent in Shopify workflows!";
    }
    if (message.includes('gorgias') || message.includes('zendesk') || message.includes('hubspot')) {
      return "Keith is proficient with all major support platforms - Gorgias, Zendesk, HubSpot, and more. He can streamline your customer communication workflows immediately. He sets up automations, manages ticket flows, and ensures zero inquiries fall through the cracks.";
    }
    if (message.includes('data') || message.includes('admin') || message.includes('sheet') || message.includes('spreadsheet')) {
      return "Keith handles data entry, CRM updates, Google Sheets management, and documentation. He's organized, detail-oriented, and follows processes precisely. Perfect for maintaining customer databases, tracking metrics, and keeping operations running smoothly.";
    }
    if (message.includes('technical') || message.includes('integration') || message.includes('automation')) {
      return "Keith has technical support experience including troubleshooting, system setup, API integration, and Zapier automation. He bridges business and tech seamlessly, setting up workflows that save hours every week.";
    }
    
    // Experience & Background
    if (message.includes('experience') || message.includes('background') || message.includes('years')) {
      return "Keith has 5+ years in customer support across telco, retail, insurance, and automotive industries. He's supported 3,000+ customers and managed high-volume environments handling 25+ phone inquiries and 40+ emails daily. His background spans multiple industries = adaptable excellence.";
    }
    if (message.includes('why hire') || message.includes('qualities') || message.includes('skilled')) {
      return "Keith brings: Strong communication, detail-oriented mindset, calm under pressure, independent work ethic, and a psychology background supporting empathy. He's reliable and efficient. Clients say he's a game-changer for their operations.";
    }
    
    // Tools & Platforms
    if (message.includes('tools') || message.includes('software') || message.includes('platform')) {
      return "Keith masters: Shopify, Gorgias, Zendesk, HubSpot, Google Workspace, Notion, Canva, Zapier, MS Office, and ChatGPT. He learns new tools quickly and can adapt to your tech stack immediately.";
    }
    
    // Hiring & Contact
    if (message.includes('hire') || message.includes('work with') || message.includes('available')) {
      return "Ready to work together? Email Keith at imkeithgarces@gmail.com. He's available for full-time, part-time, or project-based work. Response time: lightning fast! You can also check his LinkedIn at linkedin.com/in/imkeithgarces.";
    }
    if (message.includes('email') || message.includes('contact') || message.includes('reach')) {
      return "You can reach Keith at imkeithgarces@gmail.com or connect via LinkedIn at linkedin.com/in/imkeithgarces. WhatsApp also available at +63 945-874-2271. He responds quickly!";
    }
    
    // Catch-all for general questions
    if (message.includes('what') || message.includes('how') || message.includes('can you') || message.includes('do you')) {
      return "Keith is a skilled Virtual Assistant specializing in e-commerce support and customer service. He expertly handles Shopify orders, manages 40+ daily customer inquiries via Gorgias/Zendesk, processes refunds smoothly, and coordinates shipments. Ask about his Shopify expertise, customer support skills, experience, or how to hire him!";
    }
    
    // Default response
    return "Keith is a skilled Virtual Assistant specializing in e-commerce support and customer service. Ask about Shopify order handling, customer inquiry management, available tools, or how to hire him!";
  };

  const handleSupportChat = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;
    const newMessage = { role: 'user', text: userMessage };
    setSupportChat([...supportChat, newMessage]);
    setUserMessage('');
    const aiResponse = generateAssistantResponse(userMessage);
    setSupportChat(prev => [...prev, { role: 'ai', text: aiResponse }]);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b sticky top-0 z-50">
        <div className="text-blue-600 font-bold text-xl">Keith Garces</div>
        
        {/* Updated Nav Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#services" className="text-slate-600 hover:text-blue-600 transition-colors">Services</a> 
          <a href="#experience" className="text-slate-600 hover:text-blue-600 transition-colors">Experience</a> 
          <a href="#why-hire" className="text-slate-600 hover:text-blue-600 transition-colors">Why Hire Me</a> 
          <a href="#tools" className="text-slate-600 hover:text-blue-600 transition-colors">Tools</a> 
          <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors">Contact</a>      
        </div>

        <a href="#contact" className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
          Hire Me
        </a>
      </nav>

      {/* Hero Section */}
      <header className="w-full bg-gradient-to-b from-blue-50 to-white py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 id="headline" className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight mb-6" style={{ fontSize: '40px' }}>
            Reliable E-commerce & Customer Support Virtual Assistant
          </h1>
          <p className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto">
            Helping e-commerce businesses manage customer support and daily operations with precision and modern AI tools.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left">
            {[
              { icon: <Mail className="w-5 h-5" />, text: "High-volume email & chat support" },
              { icon: <ShoppingCart className="w-5 h-5" />, text: "Shopify & order management expertise" },
              { icon: <Shield className="w-5 h-5" />, text: "Detail-oriented, reliable, and calm under pressure" },
              { icon: <Users className="w-5 h-5" />, text: "Experienced with SOPs and hands-off collaboration" }
            ].map((item, i) => (
              <div key={i} className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600 mr-4">{item.icon}</div>
                <span className="text-base font-medium text-slate-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="bg-white py-20 px-6 w-full flex justify-center">
        <div className="w-full max-w-7xl flex flex-col items-center">
          <div className="mb-12 text-center w-full">
            <h2 className="text-3xl font-bold mb-4">Services</h2>
            <p className="text-slate-500">Professional virtual assistance tailored to e-commerce and business operations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
                {[
                  { 
                    title: "Customer Support", 
                    icon: <UserPlus className="w-6 h-6" />, 
                    list: ["Email & chat support (Gorgias, Zendesk)", "Inquiry resolution and troubleshooting", "Customer relationship management", "Handling high-volume inquiries professionally"] 
                  },
                  { 
                    title: "E-commerce VA Support", 
                    icon: <ShoppingCart className="w-6 h-6" />, 
                    list: ["Order creation, cancellations, swaps, refunds", "Tracking shipments & supplier coordination", "Product listing updates", "Inventory tracking"] 
                  },
                  { 
                    title: "Admin & Data Support", 
                    icon: <FileText className="w-6 h-6" />, 
                    list: ["Data entry & research", "CRM updates (HubSpot)", "Google Sheets & documentation", "Process support and task coordination"] 
                  },
                  { 
                    title: "Technical Support", 
                    icon: <Settings className="w-6 h-6" />, 
                    list: ["Desktop or network troubleshooting & setup", "Integration assistance & automation", "System monitoring & optimization", "API integration and troubleshooting"] 
                  }
                ].map((service, i) => (
                  <div key={i} className="p-6 bg-[#f8fbff] rounded-2xl border border-slate-100 hover:border-blue-200 transition-all shadow-sm">
                    <div className="w-12 h-12 bg-[#007bff] text-white rounded-xl flex items-center justify-center mb-6">
                      {service.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-4 text-slate-800 leading-tight h-12 flex items-center">{service.title}</h3>
                    <ul className="space-y-3">
                      {service.list.map((item, j) => (
                        <li key={j} className="text-[14px] text-slate-600 flex items-start leading-relaxed">
                          <CheckCircle className="w-3.5 h-3.5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistant Chat Simulation */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white flex flex-col h-[500px] shadow-2xl relative overflow-hidden lg:mt-24 w-full mt-12">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
               <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Keith's AI Assistant</p>
                    <p className="text-[10px] text-slate-400">Available to help 24/7</p>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto space-y-4 mb-4 text-sm scrollbar-hide">
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none inline-block max-w-[85%]">
                    Hi! I'm Keith's automated assistant. Ask me anything about how Keith handles Shopify orders or customer inquiries!
                  </div>
                  {supportChat.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-3 rounded-2xl max-w-[85%] ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
               </div>

               <form onSubmit={handleSupportChat} className="relative">
                  <input 
                    type="text" 
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type a support question..." 
                    className="w-full bg-slate-800 border-none rounded-xl py-3 px-4 pr-12 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                  />
                  <button type="submit" className="absolute right-2 top-2 p-1.5 bg-blue-600 rounded-lg hover:bg-blue-500 transition">
                    <Send className="w-4 h-4" />
                  </button>
               </form>
               <p className="text-[10px] text-slate-500 text-center mt-4 uppercase tracking-widest font-bold">✨ Powered by Gemini API</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Results Section */}
      <section id="experience" className="w-full py-20 bg-blue-50/40 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Experience & Results</h2>
            <p className="text-slate-500">Proven track record across multiple industries and high-volume environments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center md:text-left">
              <div className="text-blue-600 text-3xl font-bold mb-2">5+</div>
              <p className="font-bold text-slate-800 text-sm mb-2">Years of Experience</p>
              <p className="text-slate-500 text-sm leading-relaxed">In customer support across BPO industries</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center md:text-left">
              <div className="text-blue-600 text-3xl font-bold mb-2">3,000+</div>
              <p className="font-bold text-slate-800 text-sm mb-2">Customers Supported</p>
              <p className="text-slate-500 text-sm leading-relaxed">Across telco, retail, insurance, and automotive industries</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center md:text-left">
              <div className="text-blue-600 text-3xl font-bold mb-2">25+</div>
              <p className="font-bold text-slate-800 text-sm mb-2">Daily Phone & Email Inquiries</p>
              <p className="text-slate-500 text-sm leading-relaxed">Handled professionally in telco customer support</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center md:text-left">
              <div className="text-blue-600 text-3xl font-bold mb-2">40+</div>
              <p className="font-bold text-slate-800 text-sm mb-2">Daily Email & Chat Inquiries</p>
              <p className="text-slate-500 text-sm leading-relaxed">Managed for e-commerce automotive brand</p>
            </div>
            <div className="md:col-span-3 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex items-start">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 mr-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div>
                <p className="font-bold text-slate-800 text-sm mb-2">Comprehensive Issue Resolution</p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Experienced in resolving order issues, refunds, escalations, and logistics coordination with professionalism and efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="w-full py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">My Portfolio</h2>
            <p className="text-slate-500">Check out my work or try my AI content brainstorming tool below!</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-16 max-w-3xl mx-auto">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <span className="sparkle-icon">✨</span>
              </div>
              <h3 className="text-xl font-bold">Social Caption Generator</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6">Test my ability to create professional copy. Enter a product or topic below.</p>
            <div className="flex flex-col md:flex-row gap-3">
              <input 
                type="text" 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. New eco-friendly water bottle launch" 
                className="flex-1 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition"
              />
              <button 
                onClick={handleGenerateCaption}
                disabled={isAiLoading}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center min-w-[160px]"
              >
                {isAiLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Generate ✨"}
              </button>
            </div>
            {aiResult && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                {aiResult}
              </div>
            )}
          </div>

          <div className="flex justify-center space-x-4 mb-10 overflow-x-auto pb-2">
            {['All', 'Instagram', 'Facebook', 'Ads', 'LinkedIn'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === cat ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100">
                <div className={`h-40 ${item.color} flex items-center justify-center p-8 transition-transform group-hover:scale-105`}>
                   <div className="w-full h-full border-2 border-dashed border-blue-200 rounded-lg flex flex-col items-center justify-center text-blue-300">
                      <Layout className="w-8 h-8 mb-2" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{item.category}</span>
                   </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hire Me Section */}
      <section id="why-hire" className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Hire Me</h2>
            <p className="text-slate-500 font-medium">Professional qualities that ensure reliable, high-quality support</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#f8fbff] p-8 rounded-2xl border border-slate-100 shadow-sm flex items-start group hover:border-blue-200 transition-all">
               <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-6 flex-shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-[#1a314d] text-[15px] mb-1.5 leading-tight">Strong Communication</p>
                <p className="text-[#64748b] text-[12px] leading-relaxed font-normal">
                  Expert in customer communication and expectation management
                </p>
              </div>
            </div>
            
            <div className="bg-[#f8fbff] p-8 rounded-2xl border border-slate-100 shadow-sm flex items-start group hover:border-blue-200 transition-all">
               <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-6 flex-shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-[#1a314d] text-[15px] mb-1.5 leading-tight">Detail-Oriented & KPI-Driven</p>
                <p className="text-[#64748b] text-[12px] leading-relaxed font-normal">
                  Focused on measurable results and quality metrics
                </p>
              </div>
            </div>

            <div className="bg-[#f8fbff] p-8 rounded-2xl border border-slate-100 shadow-sm flex items-start group hover:border-blue-200 transition-all">
               <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-6 flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-[#1a314d] text-[15px] mb-1.5 leading-tight">Calm Under Pressure</p>
                <p className="text-[#64748b] text-[12px] leading-relaxed font-normal">
                  Reliable and efficient in high-volume, fast-paced environments
                </p>
              </div>
            </div>

            <div className="bg-[#f8fbff] p-8 rounded-2xl border border-slate-100 shadow-sm flex items-start group hover:border-blue-200 transition-all">
               <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-6 flex-shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-[#1a314d] text-[15px] mb-1.5 leading-tight">Independent Worker</p>
                <p className="text-[#64748b] text-[12px] leading-relaxed font-normal">
                  Trusted to work autonomously once trained on processes
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#f8fbff] p-8 rounded-2xl border border-slate-100 shadow-sm flex items-start group hover:border-blue-200 transition-all">
             <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-6 flex-shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-[#1a314d] text-[15px] mb-1.5 leading-tight">Psychology Background</p>
              <p className="text-[#64748b] text-[12px] leading-relaxed font-normal">
                Educational foundation supporting strong communication, empathy, and problem-solving abilities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 px-6" style={{ backgroundColor: 'rgb(232 244 255 / 0.4)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Tools & Platforms</h2>
            <p className="text-slate-500 font-medium">Proficient with industry-standard tools and platforms.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[
              { name: "Shopify", icon: <Zap /> },
              { name: "Gorgias", icon: <Monitor /> },
              { name: "Zendesk", icon: <Headphones /> },
              { name: "HubSpot", icon: <Users /> },
              { name: "Google Workspace", icon: <Zap /> },
              { name: "Notion", icon: <FileText /> },
              { name: "Canva", icon: <Layout /> },
              { name: "Zapier", icon: <Sparkles /> },
              { name: "MS Office", icon: <Briefcase /> },
              { name: "ChatGPT", icon: <MessageSquare /> }
            ].map((tool, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl flex flex-col items-center border border-slate-100 hover:border-blue-200 shadow-sm transition group">
                <div className="w-12 h-12 bg-blue-50 rounded-xl mb-4 flex items-center justify-center text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  {React.cloneElement(tool.icon, { className: "w-6 h-6" })}
                </div>
                <span className="text-[13px] font-bold text-slate-800 leading-[1.2] max-w-[80px] text-center">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="w-full py-20 bg-[#007bff]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to work with a reliable VA?</h2>
          <p className="text-white/80 text-lg mb-10">Let's talk about how I can support your business.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="mailto:imkeithgarces@gmail.com" className="inline-flex items-center justify-center bg-white text-[#007bff] px-8 py-4 rounded-xl text-base font-semibold hover:bg-blue-50 transition-colors">
              <Mail className="w-5 h-5 mr-2" />
              Send an Inquiry
            </a> 
            <a href="mailto:imkeithgarces@gmail.com?subject=Hiring%20Inquiry" className="inline-flex items-center justify-center bg-[#0056b3] text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-[#1a314d] transition-colors border-2 border-white/20">
              <Briefcase className="w-5 h-5 mr-2" />
              Hire Me 
            </a> 
            <a href="https://drive.google.com/drive/folders/1uZ17Dz4ZRX74g4vk6-XvufOFBepVSsFP?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white text-[#007bff] px-8 py-4 rounded-xl text-base font-semibold hover:bg-blue-50 transition-colors">
              <ExternalLink className="w-5 h-5 mr-2" />
              My Projects 
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="w-full bg-[#1a314d] py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
             <a href="https://www.linkedin.com/in/imkeithgarces/" target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                <Linkedin className="w-5 h-5" />
             </a>
             <a href="https://x.com/keithgarces_me" target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                <Twitter className="w-5 h-5" />
             </a>
             <a href="https://www.facebook.com/keithhgarces/" target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                <Facebook className="w-5 h-5" />
             </a>
             <a href="https://wa.me/639458742271" target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                <MessageSquare className="w-5 h-5" />
             </a>
          </div>
          <p className="text-white/90 font-medium">Keith Garces</p>
          <a href="mailto:imkeithgarces@gmail.com" className="text-white/70 hover:text-white transition-colors text-sm">imkeithgarces@gmail.com</a>
        </div>
      </footer>
    </div>
  );
};

export default App;