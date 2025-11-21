import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const socialLinks = [
  { icon: Mail, label: 'Email', href: 'mailto:karanmarathe32.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'www.linkedin.com/in/karan-marathe' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/karanmarathe07' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section 
      id="contact" 
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32 relative z-20"
      style={{ 
        background: '#f7f7f7',
        clipPath: 'none',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-bold mb-6 sm:mb-8"
          style={{ 
            color: 'rgb(28, 28, 28)',
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            lineHeight: 1.1,
          }}
        >
          Let's Build Something Amazing
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12 sm:mb-16"
          style={{ 
            color: 'rgb(28, 28, 28)', 
            opacity: 0.7,
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          }}
        >
          Got a project in mind? Let's talk about how we can bring it to life.
        </motion.p>

        {/* Social Links - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16"
        >
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.12, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                className="magnetic p-3 sm:p-4 rounded-full group"
                style={{
                  background: 'rgba(255, 255, 255, 0.18)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                }}
                aria-label={social.label}
              >
                <Icon 
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-colors" 
                  style={{ color: 'rgb(28, 28, 28)', opacity: 0.7 }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                />
              </motion.a>
            );
          })}
        </motion.div>

        {/* CTA Button - Responsive */}
        <motion.a
          href="mailto:karan@example.com"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block magnetic px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-full font-medium border-2 border-black text-black bg-transparent hover:bg-black hover:text-white transition-all duration-200 ease-out"
          style={{
            fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
          }}
        >
          Get In Touch
        </motion.a>

        {/* Footer - Responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-24 sm:mt-32"
          style={{ 
            color: 'rgb(28, 28, 28)', 
            opacity: 0.4,
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
          }}
        >
          © {new Date().getFullYear()} Karan Marathe. All rights reserved.
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
