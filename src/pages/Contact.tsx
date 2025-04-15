
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from 'react-helmet';
import { toast } from "@/components/ui/sonner";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would send the form data to your backend
    toast.success("Message sent successfully! We'll get back to you soon.");
  };

  return (
    <>
      <Helmet>
        <title>Contact - ModernApp</title>
      </Helmet>
      <section className="container py-12 md:py-24 lg:py-32">
        <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
            <p className="text-muted-foreground">
              Have a question or want to work together? Fill out the form and we'll get back to you as soon as possible.
            </p>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">Our Office</h2>
              <p className="text-muted-foreground">123 Main Street</p>
              <p className="text-muted-foreground">San Francisco, CA 94105</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">Email</h2>
              <p className="text-muted-foreground">contact@example.com</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">Phone</h2>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                We'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    rows={5}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">Send Message</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Contact;
