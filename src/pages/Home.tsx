import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Wallet, PieChart, CreditCard } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-[#0A0A0A] text-[#E5E5E5]">

      {/* HERO SECTION */}
      <section className="w-full flex-col justify-center gap-4 py-24 md:py-32 lg:py-40 flex items-center text-center px-4 relative flex-1 overflow-hidden">
        
        <div className="absolute inset-0 -z-10 h-full w-full bg-[#0A0A0A]">
          <div className="absolute left-[10%] top-[10%] h-[400px] w-[400px] rounded-full bg-[#D4AF37]/10 blur-3xl"></div>
          <div className="absolute right-[10%] bottom-[10%] h-[300px] w-[300px] rounded-full bg-[#B8902F]/10 blur-3xl" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 max-w-4xl relative z-10"
        >
          <div className="inline-flex items-center rounded-full bg-white/5 px-4 py-1.5 text-sm font-medium border border-[#D4AF37]/30 backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-[#D4AF37] animate-pulse mr-2"></span>
            Premium Expense Tracker
          </div>

          <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
            Track Your <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#B8902F] bg-clip-text text-transparent">
              Wealth
            </span>
          </h1>

          <p className="mx-auto max-w-[700px] text-[#A3A3A3] md:text-2xl leading-relaxed font-light">
            Take control of your finances with a sleek and powerful expense tracker. Monitor your spending, visualize trends, and grow your wealth with precision.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              to="/register"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#D4AF37] px-10 py-2.5 text-sm font-medium text-black shadow-lg transition-all hover:bg-[#B8902F] hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              to="/login"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-white/5 backdrop-blur px-10 py-2.5 text-sm font-medium shadow-sm transition-all hover:bg-[#D4AF37]/10"
            >
              View Dashboard
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full py-24 bg-[#111111] border-y border-[#D4AF37]/20">
        <div className="container px-4 md:px-8 mx-auto max-w-7xl">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">

            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-[#D4AF37]/20 shadow-lg hover:shadow-[#D4AF37]/20 p-8 rounded-3xl transition-all"
            >
              <div className="p-4 rounded-2xl bg-[#D4AF37]/10 w-fit mb-6">
                <Wallet className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Track Expenses</h3>
              <p className="text-[#A3A3A3] leading-relaxed">
                Easily log and organize your daily expenses with a clean and intuitive interface.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-[#D4AF37]/20 shadow-lg hover:shadow-[#D4AF37]/20 p-8 rounded-3xl transition-all"
            >
              <div className="p-4 rounded-2xl bg-[#B8902F]/10 w-fit mb-6">
                <PieChart className="h-8 w-8 text-[#B8902F]" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Spending Insights</h3>
              <p className="text-[#A3A3A3] leading-relaxed">
                Visualize your financial habits with powerful charts and gain meaningful insights.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0A] border border-[#D4AF37]/20 shadow-lg hover:shadow-[#D4AF37]/20 p-8 rounded-3xl transition-all"
            >
              <div className="p-4 rounded-2xl bg-[#D4AF37]/10 w-fit mb-6">
                <CreditCard className="h-8 w-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Budget Control</h3>
              <p className="text-[#A3A3A3] leading-relaxed">
                Set budgets, track spending limits, and stay on top of your financial goals.
              </p>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}