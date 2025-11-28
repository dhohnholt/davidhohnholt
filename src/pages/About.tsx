import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Download, Award, Users, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/ui/breadcrumb";

export default function About() {
  const stats = [
    { icon: <Award className="h-6 w-6" />, value: "50+", label: "Projects Completed" },
    { icon: <Users className="h-6 w-6" />, value: "30+", label: "Happy Clients" },
    { icon: <Coffee className="h-6 w-6" />, value: "500+", label: "Cups of Coffee" },
  ];

  const skills = [
    "Digital Content Creation",
    "Photography & Videography",
    "Marketing Strategy",
    "Web Development",
    "Social Media Management",
    "Brand Design",
    "SEO Optimization",
    "Data Analysis",
  ];

  return (
    <>
      <Helmet>
        <title>About - David Hohnholt</title>
        <meta
          name="description"
          content="Learn more about David Hohnholt's background, experience, and passion for digital content creation and marketing."
        />
      </Helmet>

      <div className="pt-16">
        {/* ✅ Reusable Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            crumbs={[
              { label: "Home", href: "/" },
              { label: "About" },
            ]}
          />
        </div>

        {/* ✅ Hero Section */}
        <section className="py-20 bg-gradient-to-br from-white to-[#f8f8f5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  About Me
                </h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  I’m an educator, photographer, videographer, and web app developer who loves creating meaningful and engaging content. With a background in teaching and a natural curiosity for technology, I’ve blended my passion for storytelling and problem-solving to craft visuals, videos, and digital experiences that connect with people.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Whether it’s capturing a powerful image, producing videos that bring stories to life, or developing functional, user-friendly web applications, I’m passionate about helping people share their stories and build their vision. My work is shaped by my years as an educator, where clear communication, collaboration, and inspiring others have always been at the heart of what I do.
                </p>
                <Button
                  size="lg"
                  className="bg-[#014040] hover:bg-[#012020] text-white"
                  onClick={() => window.open("/david-hohnholt-resume.pdf", "_blank")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#014040] to-[#012020] p-1">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                    <img
                      src="https://scontent-dfw5-2.xx.fbcdn.net/v/t39.30808-6/463740844_9227325993948993_2650393387534757087_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=LUmj7B7mVk0Q7kNvwGn08Xl&_nc_oc=AdmNYUOboFSk7d7P-OzKEm9ZnetPl0r9sZKkK2cwjK45vrHyZ-bPR-_SiA4p-khPFA3Oz-xXqeO6LXveNwBeaJ5S&_nc_zt=23&_nc_ht=scontent-dfw5-2.xx&_nc_gid=e8XkjViiOJdiE3HTm2feTg&oh=00_AfTjxAlA4a91RKnyt_trp_Qp9S5iOoXhIYCzCk9TPPZBMg&oe=688B02F8"
                      alt="David Hohnholt"
                      className="w-full h-full object-cover rounded-2xl shadow-md"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ✅ Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 mx-auto mb-4 bg-[#014040] text-white rounded-full flex items-center justify-center">
                        {stat.icon}
                      </div>
                      <div className="text-3xl font-bold text-[#014040] mb-2">{stat.value}</div>
                      <div className="text-gray-600">{stat.label}</div>
                      <Badge className="mt-2 bg-gray-100 text-gray-600 text-xs">Proven Track Record</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ✅ Skills Section */}
        <section className="py-20 bg-[#f8f8f5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A diverse skill set built through years of hands-on experience and continuous learning
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3"
            >
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-white text-gray-700 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {skill}
                </Badge>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ✅ Philosophy Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">My Philosophy</h2>
              <blockquote className="text-xl text-gray-600 italic leading-relaxed">
                "Great content isn't just about looking good—it's about connecting with people, solving problems, and
                creating meaningful experiences that drive real results."
              </blockquote>
              <p className="text-lg text-gray-700 mt-8 leading-relaxed">
                I believe every project is an opportunity to learn something new and push creative boundaries. Whether
                it's a marketing campaign, a web application, or a photography project, I approach each challenge with
                curiosity, attention to detail, and a commitment to excellence.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}