
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Helmet } from 'react-helmet';

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart, and checkout functionality.",
    tags: ["React", "TypeScript", "Node.js", "MongoDB"],
    link: "#"
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "A responsive portfolio website showcasing projects and skills.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    link: "#"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A task management application with drag-and-drop functionality.",
    tags: ["React", "TypeScript", "Firebase"],
    link: "#"
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description: "A weather dashboard displaying current weather and forecasts for multiple locations.",
    tags: ["React", "Redux", "OpenWeather API"],
    link: "#"
  }
];

const Projects = () => {
  return (
    <>
      <Helmet>
        <title>Projects - ModernApp</title>
      </Helmet>
      <section className="container py-12 md:py-24 lg:py-32">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Projects</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Check out some of our recent work and ongoing projects.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <a href={project.link}>View Project</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
