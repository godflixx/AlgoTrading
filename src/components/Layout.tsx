
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { 
      name: 'GitHub',
      href: 'https://github.com',
      icon: <Github className="h-5 w-5" />
    },
    { 
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: <Linkedin className="h-5 w-5" />
    },
    { 
      name: 'Email',
      href: 'mailto:hello@example.com',
      icon: <Mail className="h-5 w-5" />
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        scrolled ? "bg-background/95 backdrop-blur shadow-sm" : "bg-transparent"
      )}>
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">AlgoTrade</span>
            </Link>
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <Link to={item.href}>
                      <NavigationMenuLink 
                        className={cn(
                          navigationMenuTriggerStyle(),
                          location.pathname === item.href 
                            ? "bg-accent text-accent-foreground" 
                            : "text-foreground/70 hover:text-foreground"
                        )}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground/70 hover:text-foreground">
                    Trading
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/dashboard"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Trading Dashboard
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Access your full trading dashboard with real-time market data and analytics
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link
                          to="/dashboard"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Market Overview</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Get a broad view of market conditions and major indices
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dashboard"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Stock Analysis</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Detailed technical and fundamental analysis tools
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon}
                  <span className="sr-only">{item.name}</span>
                </a>
              ))}
            </div>
            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link to="/login">Login</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-background pt-16">
          <div className="container grid gap-6 py-6">
            <nav className="grid gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-lg font-semibold",
                    location.pathname === item.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="py-2">
                <div className="text-lg font-semibold text-muted-foreground flex items-center">
                  Trading Options <ChevronDown className="ml-2 h-4 w-4" />
                </div>
                <div className="pl-4 mt-2 space-y-2">
                  <Link
                    to="/dashboard"
                    className="block py-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block py-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Market Overview
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block py-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Stock Analysis
                  </Link>
                </div>
              </div>
            </nav>
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="p-2 text-muted-foreground hover:text-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.icon}
                    <span className="sr-only">{item.name}</span>
                  </a>
                ))}
              </div>
              <Button asChild>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-muted/50">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <span className="font-bold text-xl">AlgoTrade</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs">
                Advanced algorithmic trading platform for stock analysis and trading. Get real-time market data and make informed decisions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Trading</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Market Overview
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Stock Analysis
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Portfolio
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} AlgoTrade. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon}
                  <span className="sr-only">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
