'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Code, 
  Database, 
  Globe, 
  Github, 
  Linkedin, 
  Mail, 
  Download,
  Zap,
  Cpu,
  Monitor,
  Server
} from 'lucide-react';
import Container from '@/components/Container';
import { siteConfig } from '@/config/site';

// Cyberpunk color palette
const colors = {
  neonCyan: '#00FFFF',
  neonMagenta: '#FF00FF',
  neonGreen: '#00FF00',
  neonPink: '#FF1493',
  neonBlue: '#0080FF',
  darkBg: '#0a0a0a',
  darkCard: '#1a1a1a',
};

// Skills data with cyberpunk categories
const skillCategories = [
  {
    name: 'FRONTEND_SYSTEMS',
    icon: Monitor,
    color: colors.neonCyan,
    skills: [
      { name: 'React.js', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Vue.js', level: 85 },
    ]
  },
  {
    name: 'BACKEND_CORE',
    icon: Server,
    color: colors.neonMagenta,
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'MongoDB', level: 82 },
      { name: 'Redis', level: 80 },
    ]
  },
  {
    name: 'DEVOPS_MATRIX',
    icon: Cpu,
    color: colors.neonGreen,
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'Vercel', level: 90 },
      { name: 'GitHub Actions', level: 85 },
      { name: 'Linux', level: 82 },
    ]
  }
];

// Glitch text effect component
const GlitchText = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`relative ${className} ${isGlitching ? 'animate-pulse' : ''}`}
      style={{
        textShadow: isGlitching 
          ? `2px 0 ${colors.neonMagenta}, -2px 0 ${colors.neonCyan}` 
          : 'none'
      }}
    >
      {children}
    </span>
  );
};

// Skill bar component with neon effect
const SkillBar = ({ skill, color, delay }: { skill: { name: string; level: number }; color: string; delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-mono text-gray-300">{skill.name}</span>
        <span className="text-xs font-mono" style={{ color }}>{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: delay + 0.2 }}
          className="h-full rounded-full relative"
          style={{ 
            background: `linear-gradient(90deg, ${color}40, ${color})`,
            boxShadow: `0 0 10px ${color}80`
          }}
        >
          <div 
            className="absolute inset-0 rounded-full animate-pulse"
            style={{ backgroundColor: color, opacity: 0.3 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function ProfilePageClient() {
  const [terminalText, setTerminalText] = useState('');
  const [currentCommand, setCurrentCommand] = useState(0);
  
  const commands = [
    'whoami',
    'cat /dev/skills',
    'ls -la /projects',
    'ping github.com',
    'sudo make coffee'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCommand((prev) => (prev + 1) % commands.length);
      setTerminalText('');
      
      const command = commands[currentCommand];
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < command.length) {
          setTerminalText(command.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 100);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentCommand]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(${colors.neonCyan}40 1px, transparent 1px),
              linear-gradient(90deg, ${colors.neonCyan}40 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ 
              backgroundColor: [colors.neonCyan, colors.neonMagenta, colors.neonGreen][i % 3],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <Container>
        <div className="py-12 relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-32 h-32 mx-auto mb-6 rounded-full border-4 overflow-hidden relative"
                style={{ 
                  borderColor: colors.neonCyan,
                  boxShadow: `0 0 30px ${colors.neonCyan}60`
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <Terminal className="w-16 h-16" style={{ color: colors.neonCyan }} />
                </div>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-4 font-mono">
                <GlitchText className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  CHEN_KUN.EXE
                </GlitchText>
              </h1>
              
              <div className="text-xl md:text-2xl font-mono mb-6" style={{ color: colors.neonGreen }}>
                <span className="opacity-60">&gt; </span>
                FULL_STACK_DEVELOPER
              </div>
              
              <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Crafting digital experiences in the intersection of creativity and technology. 
                Specialized in building scalable web applications with modern frameworks and cloud infrastructure.
              </p>
            </div>

            {/* Terminal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="max-w-md mx-auto bg-gray-900 rounded-lg border border-gray-700 overflow-hidden"
              style={{ boxShadow: `0 0 20px ${colors.neonMagenta}30` }}
            >
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-400 ml-2">terminal</span>
              </div>
              <div className="p-4 font-mono text-sm">
                <div className="flex items-center">
                  <span style={{ color: colors.neonGreen }}>user@matrix:~$ </span>
                  <span className="ml-2">{terminalText}</span>
                  <span className="animate-pulse ml-1">|</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold font-mono text-center mb-12">
              <span style={{ color: colors.neonMagenta }}>&lt;</span>
              SKILL_MATRIX
              <span style={{ color: colors.neonMagenta }}>/&gt;</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {skillCategories.map((category, categoryIndex) => {
                const IconComponent = category.icon;
                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
                    className="bg-gray-900 rounded-lg p-6 border border-gray-700 hover:border-opacity-60 transition-all duration-300"
                    style={{ 
                      borderColor: category.color + '40',
                      boxShadow: `0 0 20px ${category.color}20`
                    }}
                  >
                    <div className="flex items-center mb-6">
                      <IconComponent 
                        className="w-6 h-6 mr-3" 
                        style={{ color: category.color }}
                      />
                      <h3 className="font-mono text-lg font-bold" style={{ color: category.color }}>
                        {category.name}
                      </h3>
                    </div>
                    
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBar
                        key={skill.name}
                        skill={skill}
                        color={category.color}
                        delay={categoryIndex * 0.2 + skillIndex * 0.1}
                      />
                    ))}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold font-mono mb-12">
              <span style={{ color: colors.neonCyan }}>[</span>
              CONNECT_TO_NETWORK
              <span style={{ color: colors.neonCyan }}>]</span>
            </h2>
            
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: Github, label: 'GitHub', href: siteConfig.social.github, color: colors.neonCyan },
                { icon: Linkedin, label: 'LinkedIn', href: siteConfig.social.linkedin, color: colors.neonMagenta },
                { icon: Mail, label: 'Email', href: `mailto:${siteConfig.social.email}`, color: colors.neonGreen },
                { icon: Globe, label: 'Website', href: siteConfig.siteUrl, color: colors.neonPink },
              ].map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex flex-col items-center p-6 bg-gray-900 rounded-lg border border-gray-700 hover:border-opacity-60 transition-all duration-300"
                    style={{ 
                      borderColor: social.color + '40',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 30px ${social.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <IconComponent 
                      className="w-8 h-8 mb-2 group-hover:animate-pulse" 
                      style={{ color: social.color }}
                    />
                    <span className="text-sm font-mono text-gray-400 group-hover:text-white transition-colors">
                      {social.label}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
}
