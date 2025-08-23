import { motion } from "framer-motion";
import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectFitness from "@/assets/project-fitness.jpg";
import projectDashboard from "@/assets/project-dashboard.jpg";
import { useState } from "react";

const projects = [
  {
    title: "E-commerce Platform",
    description: "A modern online store with AI recommendations.",
    image: projectEcommerce,
  },
  {
    title: "Fitness App",
    description: "A mobile app for tracking workouts and nutrition.",
    image: projectFitness,
  },
  {
    title: "Data Dashboard",
    description: "An interactive dashboard for data visualization.",
    image: projectDashboard,
  },
];

export const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null);
  const closeModal = () => setSelectedProject(null);
  
  return (
    <section id="portfolio" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Our <span className="text-primary">Creations</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A glimpse into our recent projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group rounded-lg overflow-hidden relative cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 transition-opacity duration-500"
              >
                <div className="text-center p-4">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Modal Popup - Moved outside the map loop */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="bg-background rounded-xl shadow-xl p-8 max-w-md w-full text-center relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-2xl text-muted-foreground hover:text-primary"
                onClick={closeModal}
                aria-label="Close"
              >
                &times;
              </button>
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-40 object-cover rounded-lg mb-4" 
              />
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {selectedProject.description}
              </p>
              <p className="text-sm text-muted-foreground">
                More details about this project will go here.
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};