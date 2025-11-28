import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Camera, Monitor, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function Home() {
  const highlights = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: 'Digital Projects',
      description: 'Interactive web applications and digital experiences that engage and inspire.',
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: 'Photography',
      description: 'Capturing moments and telling stories through compelling visual narratives.',
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Marketing Campaigns',
      description: 'Strategic campaigns that drive engagement and deliver measurable results.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>David Hohnholt - Educator • Photographer • Videographer • Web App Developer</title>
        <meta name="description" content="David Hohnholt blends creativity, technology, and education to create engaging digital content and successful marketing campaigns." />
        <meta name="keywords" content="David Hohnholt, digital content, marketing, photography, web development" />
      </Helmet>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#f8f8f5] pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              David Hohnholt
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-[#014040] mb-8 font-medium">
              Educator • Photographer • Videographer • Web App Developer
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Crafting digital experiences, visual stories, and educational tools that connect with people.
            </p>
            <Link to="/portfolio">
              <Button size="lg" className="bg-[#014040] hover:bg-[#012020] text-white px-8 py-3 text-lg">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What I Do Best
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Combining technical expertise with creative vision to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#014040] text-white rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-center leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#f8f8f5]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Work Together?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's collaborate on your next project and bring your vision to life with creativity and expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/portfolio">
                <Button variant="outline" size="lg" className="border-[#014040] text-[#014040] hover:bg-[#014040] hover:text-white">
                  View Portfolio
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" className="bg-[#014040] hover:bg-[#012020] text-white">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}