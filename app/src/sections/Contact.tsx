import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'neomvubu1@gmail.com',
    href: 'mailto:neomvubu1@gmail.com',
    color: '#81b64c',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/NeoOnyedire',
    href: 'https://github.com/NeoOnyedire',
    color: '#b58863',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/neo-onyedire-107b272a9',
    href: 'https://www.linkedin.com/in/neo-onyedire-107b272a9/',
    color: '#6b8cae',
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success("Message sent successfully! I'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-chess-pattern opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#81b64c]/10 border border-[#81b64c]/30 rounded-full text-[#81b64c] text-sm font-medium mb-4">
            <Mail className="w-4 h-4" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let&apos;s Make a <span className="gradient-text">Move</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Whether you want to discuss a project, collaborate on something exciting,
            or just chat about chess and code — I&apos;m always open to new connections.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

              <div className="space-y-4">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group w-full min-w-0"
                    >
                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>

                      {/* Text — flex-1 + min-w-0 so it can shrink */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400">{item.label}</p>
                        <p className="text-sm text-white font-medium truncate group-hover:text-[#81b64c] transition-colors">
                          {item.value}
                        </p>
                      </div>

                      {/* Copy button — flex-shrink-0 so it never disappears */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleCopy(item.value, item.label);
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                        aria-label={`Copy ${item.label}`}
                      >
                        {copiedField === item.label ? (
                          <Check className="w-4 h-4 text-[#81b64c]" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-[#81b64c] rounded-full animate-pulse flex-shrink-0" />
                <span className="text-[#81b64c] font-semibold">Available for opportunities</span>
              </div>
              <p className="text-gray-400 text-sm">
                I&apos;m currently looking for internships and collaboration opportunities.
                If you have an interesting project, let&apos;s talk!
              </p>
            </motion.div>

            {/* Chess Piece Decoration — smaller on mobile to prevent overflow */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-center gap-6 text-4xl md:text-6xl opacity-20"
            >
              <span className="animate-float">♔</span>
              <span className="animate-float" style={{ animationDelay: '0.5s' }}>♕</span>
              <span className="animate-float" style={{ animationDelay: '1s' }}>♖</span>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#81b64c] focus:ring-[#81b64c]/20 w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#81b64c] focus:ring-[#81b64c]/20 w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project or just say hi..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-[#81b64c] focus:ring-[#81b64c]/20 resize-none w-full"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-chess flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
