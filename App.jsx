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

const apiKey = ""; // Provided by environment at runtime

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
    { id: 4, category: 'Instagram', title: 'Lifestyle Brand Feed', description: 'Grid planning and aesthetic curation for fashion VA.', color: 'bg-blue-100' },
    { id: 5, category: 'LinkedIn', title: 'B2B Outreach Assets', description: 'Professional infographics for lead generation.', color: 'bg-blue-50' },
    { id: 6, category: 'Ads', title: 'Customer Success Stories', description: 'Testimonial carousels for social proof.', color: 'bg-blue-100' },
  ];

  const filteredItems = filter === 'All' ? portfolioItems : portfolioItems.filter(item => item.category === filter);

  // Helper for API calls with exponential backoff
  const callGemini = async (prompt, systemInstruction = "") => {
    let retries = 0;
    const maxRetries = 5;
    while (retries <= maxRetries) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined
          })
        });
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
      } catch (err) {
        if (retries === maxRetries) throw err;
        const delay = Math.pow(2, retries) * 1000;
        await new Promise(res => setTimeout(res, delay));
        retries++;
      }
    }
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

  const handleSupportChat = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;
    const newMessage = { role: 'user', text: userMessage };
    setSupportChat([...supportChat, newMessage]);
    setUserMessage('');
    try {
      const aiResponse = await callGemini(
        userMessage,
        "You are simulating Keith Garces' AI Assistant. Respond as a professional, friendly, and efficient Customer Support VA specialized in Shopify and Gorgias. Be concise."
      );
      setSupportChat(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      setSupportChat(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting right now, but Keith would normally respond instantly!" }]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 scroll-smooth">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b sticky top-0 z-50">
        <div className="text-blue-600 font-bold text-xl">Keith Garces</div>
        
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
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight mb-6">
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
      <section id="services" className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <div className="mb-12 text-center lg:text-left">
                <h2 className="text-3xl font-bold mb-4">Services</h2>
                <p className="text-slate-500">Professional virtual assistance tailored to e-commerce and business operations.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
            <div className="bg-slate-900 rounded-3xl p-6 text-white flex flex-col h-[500px] shadow-2xl relative overflow-hidden lg:mt-24">
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

      {/* Experience Section */}
      <section id="experience" className="w-full py-20 bg-blue-50/40 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Experience & Results</h2>
            <p className="text-slate-500">Proven track record across multiple industries and high-volume environments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center md:text-left hover:shadow-md transition">
              <div className="text-blue-600 text-3xl font-bold mb-2">5+</div>
              <p className="font-bold text-slate-800 text-sm mb-2">Years of Experience</p>
              <p className="text-slate-500 text-sm leading-relaxed">In customer support across BPO industries</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center md:text-left hover:shadow-md transition">
              <div className="text-blue-600 text-3xl font-bold mb-2">3,000+</div>
              <p className="font-bold text-slate-800 text-sm mb-2">Customers Supported</p>
              <p className="text-slate-500 text-sm leading-relaxed">Across telco, retail, insurance, and automotive industries</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center md:text-left hover:shadow-md transition">
              <div className="text-blue-600 text-3xl font-bold mb-2">25+</div>
              <p className="font-bold text-slate-800 text-sm mb-2">Daily Interactions</p>
              <p className="text-slate-500 text-sm leading-relaxed">High-volume phone & email handling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="w-full py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Portfolio & Social Media</h2>
            <p className="text-slate-500">Check out my work or try my AI content brainstorming tool below!</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-16 max-w-3xl mx-auto">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Sparkles className="w-5 h-5" />
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
              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-slate-700 whitespace-pre-wrap leading-relaxed animate-in fade-in slide-in-from-bottom-2">
                {aiResult}
              </div>
            )}
          </div>

          <div className="flex justify-center space-x-4 mb-10 overflow-x-auto pb-2">
            {['All', 'Instagram', 'Facebook', 'Ads', 'LinkedIn'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all flex-shrink-0 ${
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
                <div className={`h-40 ${item.color} flex items-center justify-center p-8 transition-transform`}>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: <MessageSquare />, title: "Strong Communication", desc: "Expert in customer communication and expectation management" },
              { icon: <BarChart3 />, title: "KPI-Driven", desc: "Focused on measurable results and quality metrics" },
              { icon: <Clock />, title: "Calm Under Pressure", desc: "Reliable and efficient in high-volume, fast-paced environments" },
              { icon: <CheckCircle />, title: "Independent Worker", desc: "Trusted to work autonomously once trained on processes" }
            ].map((feature, i) => (
              <div key={i} className="bg-[#f8fbff] p-8 rounded-2xl border border-slate-100 shadow-sm flex items-start group hover:border-blue-200 transition-all">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-6 flex-shrink-0">
                  {React.cloneElement(feature.icon, { className: "w-5 h-5" })}
                </div>
                <div>
                  <p className="font-extrabold text-[#1a314d] text-[15px] mb-1.5 leading-tight">{feature.title}</p>
                  <p className="text-[#64748b] text-[12px] leading-relaxed font-normal">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 px-6 bg-slate-50/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Tools & Platforms</h2>
            <p className="text-slate-500 font-medium">Proficient with industry-standard platforms.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[
              { name: "Shopify", icon: <Zap /> },
              { name: "Gorgias", icon: <Monitor /> },
              { name: "Zendesk", icon: <Headphones /> },
              { name: "HubSpot", icon: <Users /> },
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
                <span className="text-[13px] font-bold text-slate-800 text-center">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-20 bg-blue-600">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to work with a reliable VA?</h2>
          <p className="text-white/80 text-lg mb-10">Let's talk about how I can support your business.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="mailto:imkeithgarces@gmail.com" className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-xl text-base font-semibold hover:bg-blue-50 transition">
              <Mail className="w-5 h-5 mr-2" />
              Send an Inquiry
            </a> 
            <a href="https://drive.google.com/drive/folders/1uZ17Dz4ZRX74g4vk6-XvufOFBepVSsFP?usp=sharing" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-white/10 transition">
              <ExternalLink className="w-5 h-5 mr-2" />
              My Projects 
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-slate-900 py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
             {[
               { icon: <Linkedin />, url: "https://www.linkedin.com/in/imkeithgarces/" },
               { icon: <Twitter />, url: "https://x.com/keithgarces_me" },
               { icon: <Facebook />, url: "https://www.facebook.com/keithhgarces/" },
               { icon: <MessageSquare />, url: "https://wa.me/639458742271" }
             ].map((social, i) => (
               <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 text-white rounded-xl hover:bg-blue-600 transition">
                 {React.cloneElement(social.icon, { className: "w-5 h-5" })}
               </a>
             ))}
          </div>
          <p className="text-white font-medium">Keith Garces</p>
          <p className="text-slate-400 text-sm mt-1">imkeithgarces@gmail.com</p>
          <p className="text-slate-500 text-xs mt-8">© {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
