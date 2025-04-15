
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, LineChart, Pie, Shield, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: <TrendingUp className="h-10 w-10 text-primary" />,
    title: "Real-Time Analytics",
    description: "Get instant insights with our powerful analytics dashboard. Monitor market movements as they happen."
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: "Technical Analysis",
    description: "Advanced charting tools and indicators to help you make data-driven trading decisions."
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Secure & Reliable",
    description: "Your data and trades are protected with enterprise-grade security measures at all times."
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Lightning Fast",
    description: "Execute trades with speed and precision. Our platform is optimized for performance and low latency."
  }
];

const testimonials = [
  {
    quote: "AlgoTrade has completely transformed how I approach the market. The real-time analytics have given me an edge I never had before.",
    author: "Priya Sharma",
    title: "Professional Trader"
  },
  {
    quote: "The technical analysis tools are exceptional. I've been able to spot patterns I would have missed otherwise.",
    author: "Rajiv Mehta",
    title: "Investment Analyst"
  },
  {
    quote: "As a day trader, speed matters. AlgoTrade's execution is lightning fast and has improved my win rate substantially.",
    author: "Ananya Patel",
    title: "Day Trader"
  }
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>AlgoTrade - Advanced Stock Trading Platform</title>
        <meta name="description" content="Real-time analytics and advanced trading tools for the modern trader. Get market insights, analyze stocks, and trade with confidence." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/10 -z-10"></div>
        <div className="container px-4 py-20 md:py-32 lg:py-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight">
                <span className="text-primary">Algorithmic</span> Trading for the Modern Investor
              </h1>
              <p className="text-xl text-muted-foreground max-w-md">
                Make data-driven decisions with our advanced trading platform. Real-time market data, powerful analytics, and intelligent insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg">
                  <Link to="/dashboard">
                    Try Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-30"></div>
              <div className="bg-card rounded-xl overflow-hidden shadow-xl border relative">
                <img 
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80" 
                  alt="Trading dashboard" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Counter Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">2.5M+</p>
              <p className="text-sm text-muted-foreground mt-2">Trades Executed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">50K+</p>
              <p className="text-sm text-muted-foreground mt-2">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">99.9%</p>
              <p className="text-sm text-muted-foreground mt-2">Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">₹5B+</p>
              <p className="text-sm text-muted-foreground mt-2">Daily Volume</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Powerful Trading Features
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Everything you need to analyze the market and make informed trading decisions.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="flex flex-col border-none shadow-md hover:shadow-lg transition-all"
              >
                <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Preview Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Comprehensive Trading Dashboard
              </h2>
              <p className="text-muted-foreground">
                Our intuitive dashboard gives you a complete view of the market. Track stocks, analyze trends, and execute trades all from one place.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Real-time price updates and market data</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Interactive charts with multiple timeframes</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Custom watchlists and alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>One-click trading execution</span>
                </li>
              </ul>
              <Button asChild>
                <Link to="/dashboard">
                  Explore Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-card shadow-2xl rounded-xl overflow-hidden border">
                <img 
                  src="https://images.unsplash.com/photo-1642790551116-18712dd680dd?auto=format&fit=crop&w=800&q=80" 
                  alt="AlgoTrade Dashboard" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground">
              Thousands of traders rely on AlgoTrade every day to make better trading decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card shadow-md">
                <CardContent className="p-6 space-y-4">
                  <div className="text-4xl text-primary">"</div>
                  <p className="italic text-muted-foreground">
                    {testimonial.quote}
                  </p>
                  <div className="pt-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to elevate your trading strategy?
            </h2>
            <p className="text-primary-foreground/90 md:text-xl max-w-[700px]">
              Join thousands of traders who have transformed their approach to the market with AlgoTrade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button asChild size="lg" variant="secondary">
                <Link to="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
