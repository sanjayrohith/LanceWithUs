import { motion } from "framer-motion";
import projectEcommerce from "@/assets/project-ecommerce.jpeg";
import projectFitness from "@/assets/project-fitness.jpeg";
import projectDashboard from "@/assets/project-dashboard.jpeg";
import { useState } from "react";

const projects = [
  {
    title: "E-commerce Platform",
    description: "A modern online store with AI recommendations.",
    image: projectEcommerce,
    details: [
  "User-Friendly Design – Simple navigation, mobile responsiveness, and fast-loading pages for a smooth shopping experience.",
      "Secure Payment Integration – Multiple payment gateways with SSL encryption to build trust and ensure safe transactions.",
      "AI-Powered Recommendations – Personalized product suggestions to boost sales and customer engagement.",
      "Smart Product Management – Easy-to-manage inventory, categories, and real-time stock updates",
      "Optimized for mobile and desktop devices."
    ]
  },
  {
    title: "Fitness App",
    description: "A mobile app for tracking workouts and nutrition.",
    image: projectFitness,
    details: [
      "Track workouts, nutrition, and progress with interactive charts.",
      "Personalized fitness plans and goal setting.",
      "Integration with wearable devices for real-time data.",
      "Community features for sharing achievements.",
      "Motivational notifications and reminders."
    ]
  },
  {
    title: "Data Dashboard",
    description: "An interactive dashboard for data visualization.",
    image: projectDashboard,
    details: [
      "Customizable widgets for various data sources.",
      "Real-time analytics and reporting tools.",
      "Advanced filtering and search capabilities.",
      "Export data to multiple formats (CSV, PDF, etc.).",
      "Responsive design for desktop and tablet use."
    ]
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
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 2, boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}
              whileTap={{ scale: 0.97, rotate: -2 }}
              className="group rounded-lg overflow-hidden relative cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="aspect-video overflow-hidden"
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  initial={{ scale: 1.1, filter: "blur(4px)" }}
                  whileHover={{ scale: 1.15, filter: "blur(0px)" }}
                  animate={{ scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, type: 'spring' }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 transition-opacity duration-500"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center p-4"
                >
                  <motion.h3
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-bold text-foreground mb-2"
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-muted-foreground"
                  >
                    {project.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Modal Popup - Moved outside the map loop */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.7, y: 100, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, y: 100, opacity: 0, rotate: 8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="bg-background rounded-2xl shadow-2xl p-10 max-w-2xl w-full text-left relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <motion.div
                initial={{ x: 100, opacity: 0, rotate: 10 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute top-0 right-0 m-6"
              >
                <button
                  className="text-3xl text-muted-foreground hover:text-primary focus:outline-none"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  &times;
                </button>
              </motion.div>
              <motion.img
                src={selectedProject.image}
                alt={selectedProject.title}
                initial={{ scale: 1.2, opacity: 0, filter: "blur(8px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8, type: 'spring' }}
                whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                className="w-full h-64 object-cover rounded-xl mb-6 shadow-lg"
              />
              <motion.h3
                initial={{ x: -60, opacity: 0, rotate: -5 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-3xl font-extrabold text-primary mb-4"
              >
                {selectedProject.title}
              </motion.h3>
              <motion.p
                initial={{ x: 60, opacity: 0, rotate: 5 }}
                animate={{ x: 0, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg text-foreground mb-6"
              >
                {selectedProject.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="bg-muted rounded-lg p-6 shadow-inner"
              >
                <motion.h4
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="text-xl font-semibold mb-2 text-primary"
                >Project Details</motion.h4>
                <ul className="list-disc pl-6 text-muted-foreground text-base space-y-2">
                  {selectedProject.details && selectedProject.details.map((detail, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + idx * 0.1, duration: 0.3 }}
                    >
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};