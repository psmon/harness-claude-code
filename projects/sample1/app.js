const { useState } = React;

function Navbar() {
  return (
    <header className="w-full flex items-center justify-between px-20 py-5 bg-canvas sticky top-0 z-50 border-b border-transparent hover:border-border transition-colors">
      <span className="font-display text-gold text-2xl font-medium tracking-[3px]">
        PORTFOLIO
      </span>
      <nav className="flex items-center gap-8">
        <a href="#about" className="font-body text-sm font-medium text-cream hover:text-gold transition-colors">
          About
        </a>
        <a href="#work" className="font-body text-sm font-medium text-cream hover:text-gold transition-colors">
          Work
        </a>
        <a href="#contact" className="font-body text-sm font-medium text-cream hover:text-gold transition-colors">
          Contact
        </a>
        <a href="#contact" className="font-body text-sm font-semibold text-canvas bg-gold hover:bg-gold-deep px-6 py-2.5 rounded-pill transition-colors">
          Get Started
        </a>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="flex items-center gap-16 px-20 py-20">
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex items-center gap-2 bg-surface border border-border rounded-pill px-4 py-1.5 w-fit">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <span className="font-body text-[11px] font-medium text-muted tracking-[3px]">
            CREATIVE DEVELOPER
          </span>
        </div>
        <h1 className="font-display text-[64px] font-normal text-cream leading-[1.05]">
          Crafting Digital<br />Experiences with<br />Elegance
        </h1>
        <p className="font-body text-lg text-muted max-w-[480px] leading-relaxed">
          I design and build beautiful, modern web experiences that transform
          ideas into stunning digital realities.
        </p>
        <div className="flex items-center gap-4 mt-2">
          <a
            href="#work"
            className="font-body text-base font-semibold text-canvas bg-gradient-to-br from-gold to-gold-deep px-8 py-4 rounded-pill hover:opacity-90 transition-opacity"
          >
            View My Work
          </a>
          <a
            href="#about"
            className="font-body text-base font-medium text-cream border border-border px-8 py-4 rounded-pill hover:border-gold transition-colors"
          >
            About Me
          </a>
        </div>
      </div>
      <div className="w-[500px] h-[500px] rounded-pill border border-border overflow-hidden bg-surface flex items-center justify-center">
        <div className="w-full h-full bg-gradient-to-br from-gold/20 via-canvas to-gold-deep/30 flex items-center justify-center">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border-2 border-gold/30 animate-spin" style={{ animationDuration: '8s' }} />
            <div className="absolute inset-4 w-32 h-32 rounded-full border border-gold/50 animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }} />
            <div className="absolute inset-[35%] w-12 h-12 rounded-full bg-gold/40 blur-sm" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex-1 flex flex-col gap-5 bg-surface border border-border rounded-pill p-8 hover:border-gold/50 transition-colors">
      <span className="text-gold text-3xl">{icon}</span>
      <h3 className="font-display text-[22px] font-medium text-cream">{title}</h3>
      <p className="font-body text-sm text-muted leading-relaxed">{description}</p>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: '✦',
      title: 'UI/UX Design',
      description:
        'Creating intuitive and beautiful interfaces that users love. From wireframes to high-fidelity prototypes.',
    },
    {
      icon: '⟨⟩',
      title: 'Web Development',
      description:
        'Building fast, responsive, and accessible web applications with modern technologies and best practices.',
    },
    {
      icon: '◻',
      title: 'Mobile First',
      description:
        'Designing responsive experiences that look and work beautifully across all devices and screen sizes.',
    },
  ];

  return (
    <section id="work" className="flex flex-col items-center gap-12 px-20 py-20">
      <div className="flex flex-col items-center gap-4">
        <span className="font-body text-[11px] font-medium text-gold tracking-[3px]">
          WHAT I DO
        </span>
        <h2 className="font-display text-[42px] font-normal text-cream">
          Services &amp; Expertise
        </h2>
        <p className="font-body text-base text-muted">
          Bringing ideas to life through thoughtful design and clean code
        </p>
      </div>
      <div className="w-full flex gap-6">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-surface border-t border-border px-20 py-16 flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <span className="font-display text-gold text-2xl font-medium tracking-[3px]">
          PORTFOLIO
        </span>
        <div className="flex gap-8">
          <a href="#about" className="font-body text-[13px] text-muted hover:text-cream transition-colors">
            About
          </a>
          <a href="#work" className="font-body text-[13px] text-muted hover:text-cream transition-colors">
            Work
          </a>
          <a href="#contact" className="font-body text-[13px] text-muted hover:text-cream transition-colors">
            Contact
          </a>
        </div>
      </div>
      <hr className="border-border" />
      <div className="flex items-center justify-between">
        <span className="font-body text-xs text-dim">
          &copy; 2026 Portfolio. All rights reserved.
        </span>
        <span className="font-body text-xs text-dim">
          Made with React &amp; Tailwind CSS
        </span>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
