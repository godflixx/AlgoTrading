
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Helmet } from 'react-helmet';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found - ModernApp</title>
      </Helmet>
      <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 md:px-6 py-12">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-7xl font-bold text-primary">404</h1>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Page Not Found</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
              Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
