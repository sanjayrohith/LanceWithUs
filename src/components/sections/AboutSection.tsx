import { motion } from "framer-motion";
import teamAlex from "@/assets/team-alex.jpg";
import teamSamantha from "@/assets/team-samantha.jpg";
import teamMike from "@/assets/team-mike.jpg";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Lead Developer",
    color: "border-primary/50",
    roleColor: "text-primary",
    description: "The architect of our digital dreams. Fueled by coffee and a passion for clean code.",
    image: teamAlex,
  },
  {
    name: "Samantha Lee",
    role: "UI/UX Designer",
    color: "border-accent/50",
    roleColor: "text-accent",
    description: "Pixel-perfect visionary who makes our solutions not just functional, but beautiful.",
    image: teamSamantha,
  },
  {
    name: "Mike Chen",
    role: "AI & ML Specialist",
    color: "border-stellar-pink/50",
    roleColor: "text-stellar-pink",
    description: "Our resident genius, teaching machines to think so you don't have to.",
    image: teamMike,
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            From <span className="text-primary">Classrooms</span> to{" "}
            <span className="text-accent">Clients</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our journey as student freelancers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass-card rounded-2xl p-6 text-center group cursor-pointer"
            >
              <div className="relative mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className={`w-24 h-24 rounded-full mx-auto border-4 ${member.color} transform group-hover:scale-110 transition-transform duration-300 object-cover`}
                />
                <div className="absolute inset-0 w-24 h-24 rounded-full mx-auto bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">
                {member.name}
              </h3>
              <p className={`${member.roleColor} font-semibold mb-3`}>
                {member.role}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};