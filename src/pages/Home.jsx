import { Link } from "react-router-dom";
import { Brain, Zap, Target, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import "../styles/home.css";
// Features data
const FEATURES = [
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Advanced AI generates contextual, relevant questions tailored to your needs",
    color: "blue"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Create complete quizzes in seconds, not hours. Save time and focus on learning",
    color: "purple"
  },
  {
    icon: Target,
    title: "Customizable",
    description: "Adjust difficulty, length, and focus areas to match your exact requirements",
    color: "pink"
  }
];

// Use case badges data
const USE_CASES = [
  { emoji: "🎓", text: "Education", color: "blue" },
  { emoji: "💼", text: "Training", color: "purple" },
  { emoji: "🧠", text: "Self-Study", color: "pink" },
  { emoji: "📚", text: "Research", color: "green" }
];

// Animation variants for cleaner code
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export default function HomePage() {
  return (
    <div className="container"> 
      {/* Hero Section */}
      <section className="hero">
        {/* Badge */}
        <motion.div className="badge" 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.5 }} >
          <span className="badgeText">
            ✨ AI-Powered Quiz Generation
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          className="mainHeading"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Create Amazing Quizzes<br />in Seconds
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          className="subheading"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Generate personalized quizzes on any topic with our AI. Perfect for students, teachers, and lifelong learners.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/quiz" className="ctaLink">
            <button className="ctaButton">
              <Sparkles className="buttonIcon" aria-hidden="true" />
              Generate Your Quiz
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="featuresSection">
        <motion.h2 
          className="sectionHeading"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Bubbles?
        </motion.h2>

        {/* Feature Cards Grid */}
        <div className="featureGrid">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="featureCardWrapper"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className={`featureCard feature${feature.color}`}>
                  {/* Icon Circle with hover rotation */}
                  <motion.div 
                    className={`iconCircle icon${feature.color}`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="icon" aria-hidden="true" />
                  </motion.div>
                  
                  <h3 className="featureTitle">{feature.title}</h3>
                  <p className="featureDescription">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Use Cases Section */}
      <section 
        className="useCasesSection"
        aria-label="Use cases for Bubbles quiz application"
      >
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="useCasesContainer">
            {USE_CASES.map((item, index) => (
              <motion.span
                key={item.text}
                className={`useCaseBadge badge${item.color}`}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span aria-hidden="true">{item.emoji}</span> {item.text}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
