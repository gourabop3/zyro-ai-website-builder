"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Quote, Rocket, Sparkles, Timer, Wand2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const features = [
  {
    icon: <Wand2 className="w-8 h-8 text-primary" />, // Lucide-react icon
    title: "AI Website Builder",
    description:
      "Generate stunning, responsive websites instantly with AI. No coding required.",
  },
  {
    icon: <Timer className="w-8 h-8 text-primary" />,
    title: "Lightning Fast",
    description:
      "Launch your site in minutes, not days. Real-time editing and instant publishing.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-primary" />,
    title: "SEO & Performance",
    description:
      "Optimized for search engines and blazing fast load times out of the box.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: "Beautiful Templates",
    description:
      "Choose from a gallery of modern, customizable templates for any business.",
  },
];

const steps = [
  {
    icon: <Wand2 className="w-7 h-7 text-primary" />,
    title: "Describe Your Site",
    description: "Tell Zyro what you need. Our AI gets to work instantly.",
  },
  {
    icon: <Sparkles className="w-7 h-7 text-primary" />,
    title: "AI Generates Everything",
    description: "Content, images, layout—Zyro handles it all in seconds.",
  },
  {
    icon: <Rocket className="w-7 h-7 text-primary" />,
    title: "Launch & Grow",
    description:
      "Go live with one click. Update and scale as your business grows.",
  },
];

const testimonials = [
  {
    name: "Alex Kim",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Zyro let me launch my portfolio in under 10 minutes. The AI-generated content was spot on!",
  },
  {
    name: "Samantha Lee",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "I never thought building a website could be this easy. The templates are gorgeous and the process is seamless.",
  },
  {
    name: "Jordan Smith",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    review:
      "The AI suggestions saved me hours. My business site looks so professional now!",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur border-b border-muted-foreground/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2 md:py-3 relative">
          <a href="#" className="flex items-center gap-2 min-w-0">
            <Image src="/logo.svg" alt="Zyro Logo" width={32} height={32} />
            <span className="font-bold text-lg text-foreground whitespace-nowrap">
              Zyro
            </span>
          </a>
          <nav className="hidden md:flex gap-8 font-medium text-sm items-center">
            <a
              href="#features"
              className="hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="hover:text-primary transition-colors"
            >
              Testimonials
            </a>
            <button
              className="bg-primary text-primary-foreground px-5 py-2 rounded-full shadow hover:bg-primary/90 transition-colors"
              onClick={() => router.push("/workspaces")}
              type="button"
            >
              Get Started
            </button>
          </nav>
          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <svg
              className="w-6 h-6 text-foreground"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <div className="absolute top-full right-4 mt-2 w-48 bg-background border border-muted-foreground/10 rounded-lg shadow-lg flex flex-col md:hidden animate-fade-in z-40">
              <a
                href="#features"
                className="px-5 py-3 hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="px-5 py-3 hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="px-5 py-3 hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <button
                className="px-5 py-3 bg-primary text-primary-foreground rounded-b-lg hover:bg-primary/90 transition-colors text-left"
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push("/workspaces");
                }}
                type="button"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </header>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center justify-center py-20 px-4 text-center gap-8 bg-gradient-to-b from-background to-muted relative overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="z-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Build stunning websites in minutes{" "}
            <br className="hidden sm:block" /> with{" "}
            <span className="text-primary">AI</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-8">
            Zyro empowers anyone to create beautiful, high-converting
            websites—no design or coding skills required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/workspaces")}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold shadow-lg transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
              type="button"
            >
              Get Started
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#demo"
              className="border border-primary px-8 py-3 rounded-full font-semibold text-primary bg-background shadow-lg transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Try Demo
            </motion.a>
          </div>
        </motion.div>
        {/* AI Illustration Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-8 z-0"
        >
          <Image
            src="/logo.svg"
            alt="Zyro AI Illustration"
            width={220}
            height={220}
            className="mx-auto drop-shadow-xl animate-float"
            priority
          />
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto w-full" id="features">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Why Choose Zyro?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader className="flex flex-col items-center gap-2">
                  {feature.icon}
                  <CardTitle className="text-lg text-center mt-2">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="py-20 px-4 max-w-5xl mx-auto w-full"
        id="how-it-works"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
            >
              <Card className="h-full flex flex-col items-center py-8">
                <div className="mb-4">{step.icon}</div>
                <CardTitle className="text-lg text-center mb-2">
                  {step.title}
                </CardTitle>
                <CardDescription className="text-center">
                  {step.description}
                </CardDescription>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-20 px-4 max-w-4xl mx-auto w-full"
        id="testimonials"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
            >
              <Card className="h-full flex flex-col items-center py-8">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={56}
                  height={56}
                  className="rounded-full mb-4 border-2 border-primary object-cover"
                />
                <CardContent className="flex flex-col items-center">
                  <Quote className="w-5 h-5 text-muted-foreground mb-2" />
                  <p className="text-center text-base mb-4">{t.review}</p>
                  <span className="font-semibold text-primary text-sm">
                    {t.name}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 px-4 bg-primary text-primary-foreground text-center"
        id="get-started"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to build your dream website?
          </h2>
          <p className="text-lg mb-8">
            Join thousands of creators using Zyro to launch their ideas online.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/workspaces")}
            className="inline-block bg-background text-primary px-8 py-3 rounded-full font-semibold shadow-lg transition-colors hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-background/50"
            type="button"
          >
            Get Started Free
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-background text-muted-foreground text-sm mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Zyro Logo" width={32} height={32} />
            <span className="font-bold text-lg text-foreground">Zyro</span>
          </div>
          <nav className="flex gap-6 flex-wrap">
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              Blog
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </nav>
          <span className="text-xs">
            &copy; {new Date().getFullYear()} Zyro. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

// Tailwind animation for floating effect
// Add this to your globals.css:
// @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-12px); } 100% { transform: translateY(0); } }
// .animate-float { animation: float 3s ease-in-out infinite; }

// Add this to your globals.css:
// .animate-fade-in { animation: fadeIn 0.2s ease; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px);} to { opacity: 1; transform: translateY(0);} }
