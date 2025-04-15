
import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - ModernApp</title>
      </Helmet>
      <section className="container py-12 md:py-24 lg:py-32">
        <div className="mx-auto max-w-3xl space-y-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Us</h1>
          <p className="text-xl text-muted-foreground">
            We're a dedicated team passionate about building modern web applications.
          </p>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="leading-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
              nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl 
              sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam 
              nisl, eget aliquam nisl nisl sit amet nisl.
            </p>
            <h2 className="text-2xl font-bold">Our Values</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Excellence in everything we do</li>
              <li>Customer satisfaction is our priority</li>
              <li>Innovation and continuous improvement</li>
              <li>Integrity and transparency</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
