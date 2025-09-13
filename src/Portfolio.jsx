"use client"

import { useState, useEffect } from "react"
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Zap,
  Users,
  Download,
  MapPin,
  Phone,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  FlaskRoundIcon,
  FileCog2Icon,
  FileCheck,
} from "lucide-react"
import { Button } from "./components/ui/button"
import { Card, CardContent } from "./components/ui/card"
import { Badge } from "./components/ui/badge"

// Custom hook for scroll-based animations
const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollY
}

// Custom hook for intersection observer
const useInView = (threshold = 0.1) => {
  const [ref, setRef] = useState(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold })

    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, threshold])

  return [setRef, inView]
}

// Skill Progress Component
const SkillProgress = ({ skill, delay = 0, inView }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setProgress(skill.level)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [inView, skill.level, delay])

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="font-medium text-white">{skill.name}</span>
        <span className="text-sm text-purple-400 font-semibold">{progress}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

// Project Card Component
const ProjectCard = ({ project, index }) => {
  return (
    <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 group">
      <div className="relative overflow-hidden">
        <img
          src={project.image || "/placeholder.svg?height=200&width=400"}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
          <Button
            size="sm"
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-black"
            onClick={() => window.open(project.github, "_blank")}
          >
            <Github className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-black"
            onClick={() => window.open(project.live, "_blank")}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="border-purple-500/30 text-purple-400 bg-purple-500/10 text-xs"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const scrollY = useScrollAnimation()

  // Intersection observers
  const [heroRef, heroInView] = useInView(0.3)
  const [aboutRef, aboutInView] = useInView(0.3)
  const [skillsRef, skillsInView] = useInView(0.3)
  const [projectsRef, projectsInView] = useInView(0.2)
  const [contactRef, contactInView] = useInView(0.3)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleResumeDownload = () => {
    const link = document.createElement("a")
    link.href = "/Hassan_Ezzouhir_CV.pdf"
    link.download = "Hassan_Ezzouhir_CV.pdf"
    link.click()
  }

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const skills = [
    { name: "React", level: 75, color: "from-blue-500 to-cyan-500" },
    { name: "JavaScript", level: 80, color: "from-yellow-500 to-orange-500" },
    { name: "Laravel", level: 85, color: "from-red-600 to-orange-600" },
    { name: "PHP", level: 75, color: "from-purple-600 to-purple-700" },
    { name: "Node.js", level: 70, color: "from-green-500 to-emerald-500" },
    { name: "Python", level: 55, color: "from-blue-600 to-purple-600" },
    { name: "MongoDB", level: 80, color: "from-green-600 to-teal-600" },
    { name: "MySQL", level: 90, color: "from-blue-700 to-indigo-700" },
    { name: "WordPress", level: 65, color: "from-blue-600 to-purple-600" },
    { name: "Supabase", level: 50, color: "from-green-500 to-emerald-500" },
  ]

  const projects = [
    {
      title: "Art Palette Matcher",
      description:
        "A tool for artists and designers that extracts dominant colors from uploaded images and generates matching color palettes using color theory principles.",
      image: "/art.png",
      tech: ["React", "CSS3", "HTML5"],
      github: "https://github.com/Hassanezz11/palette-matcher",
      live: "https://Hassanezz11.github.io/palette-matcher",
    },
    {
      title: "Collaboration Whiteboard",
      description:
        "A real-time collaborative drawing board where multiple users can draw, add notes, and work together. Built with WebSockets for real-time synchronization.",
      image: "/collab-whiteboard.png",
      tech: ["React", "Socket.io", "Express", "HTML5 Canvas", "Zustand"],
      github: "https://github.com/Hassanezz11/collab-whiteboard",
      live: "https://hassanezz11.github.io/collab-whiteboard/",
    },
    {
      title: "Typing Speed Challenge",
      description:
      "A typing speed test game with real-time feedback, WPM calculation, and performance tracking. Features smooth animations and responsive design.",
      image: "/typing-game.png",
      tech: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      github: "https://github.com/Hassanezz11/typing-speed-game",
      live: "https://typingame-hassanezz.vercel.app/",
    },
    {
      title: "E-commerce Website",
      description:
        "A full-featured, custom-built e-commerce website. Developed from the ground up using Laravel, it features a secure Stripe payment gateway, a dynamic shopping cart, and a clean, user-friendly admin panel for managing products",
      image: "/hhsa.png",
      tech: ["Laravel", "MySql", "Blade", "HTML5", "Tailwind CSS"],
      github: "https://github.com/Hassanezz11/e-commerce-website",
      live: "https://soukwany.com/",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              <img src="/logo.png" alt="my logo" width={60} height={50} />
            </div>
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-200 hover:text-purple-400 ${
                    activeSection === item ? "text-purple-400" : "text-gray-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div
            className={`transition-all duration-1000 ${
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
                Welcome to my portfolio
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Hassan</span>
              <br />
              <span className="text-white">Ezzouhir</span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Digital Development Graduate & Aspiring Full Stack Developer passionate about building real-world web solutions using modern technologies like Laravel and React.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 rounded-lg transition-all duration-300"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 rounded-lg transition-all duration-300 bg-transparent"
                onClick={handleResumeDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </div>

            <div className="flex justify-center space-x-6">
              {[
                { icon: Github, href: "https://github.com/Hassanezz11" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/hassan-ezzouhir-5222a121a/" },
                { icon: Mail, href: "mailto:ezz.hassan508@gmail.com" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-gray-800 hover:bg-purple-600 transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 bg-gray-800/30">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              aboutInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 delay-200 ${
                aboutInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative">
                <div className="w-80 h-80 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-gray-700 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-6xl font-bold">
                    <img src="/logo.png" alt="my logo" width={300} height={50} />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`space-y-6 transition-all duration-1000 delay-400 ${
                aboutInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I’m Hassan Ezzouhir, a 3rd-year Computer Science Engineering student and ISTA Digital Development graduate. Passionate about full-stack web development, I create clean, efficient, and user-friendly websites using technologies like React, Next.js, Laravel, Node.js, MySQL, and MongoDB.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Based in Morocco, Marrakech, I'm constantly learning new technologies and working on personal projects
                to improve my skills. I believe in writing clean, maintainable code and creating user-friendly
                applications.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { icon: Code, title: "Clean Code", desc: "Writing readable, maintainable solutions" },
                  { icon: Zap, title: "Fast Learning", desc: "Quick to adapt to new technologies" },
                  { icon: Palette, title: "UI/UX Focus", desc: "Creating intuitive user experiences" },
                  { icon: Users, title: "Team Player", desc: "Collaborative and communicative" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <item.icon className="w-6 h-6 text-purple-400 mb-2" />
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              skillsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-4"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Technologies I've learned through my studies and personal projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`p-6 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 transition-all duration-1000 ${
                  skillsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <SkillProgress skill={skill} delay={index * 200} inView={skillsInView} />
              </div>
            ))}
          </div>

          <div
            className={`mt-12 text-center transition-all duration-1000 delay-500 ${
              skillsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-xl font-semibold text-white mb-6">Also familiar with</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {["Git", "Docker", "REST APIs", "Tailwind CSS", "Bootstrap", "Sass", "Webpack"].map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="border-gray-600 text-gray-300 bg-gray-800/30 hover:border-purple-500/50 hover:text-purple-400 transition-colors duration-300"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-20 bg-gray-800/30">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              projectsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-4"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Personal projects I've built to practice and showcase my skills
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`transition-all duration-1000 ${
                  projectsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>

          <div
            className={`text-center mt-12 transition-all duration-1000 delay-600 ${
              projectsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              variant="outline"
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-6 py-3 rounded-lg transition-all duration-300 bg-transparent"
              onClick={() => window.open("https://github.com/Hassanezz11", "_blank")}
            >
              <Github className="w-4 h-4 mr-2" />
              View More on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Education & Experience */}
      {/* <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Education & Experience
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">Computer Science Student</h3>
                      <p className="text-purple-400 mb-2">University Studies</p>
                      <div className="flex items-center text-gray-400 text-sm mb-3">
                        <Calendar className="w-4 h-4 mr-1" />
                        2022 - Present (2 years)
                      </div>
                      <p className="text-gray-300">
                        Currently pursuing my degree in Computer Science, focusing on software development, algorithms,
                        and modern web technologies.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">Web Development Intern</h3>
                      <p className="text-green-400 mb-2">Tech Company</p>
                      <div className="flex items-center text-gray-400 text-sm mb-3">
                        <Calendar className="w-4 h-4 mr-1" />1 Month Internship
                      </div>
                      <p className="text-gray-300">
                        Gained hands-on experience in web development, working with React, PHP, and database management.
                        Collaborated with senior developers and learned industry best practices.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 bg-gray-800/30">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-4"></div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and interesting projects
            </p>
          </div>

          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${
              contactInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "ezz.hassan508@gmail.com",
                      href: "mailto:ezz.hassan508@gmail.com",
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      value: "+212 714774158",
                      href: "tel:+212714774158",
                    },
                    {
                      icon: FileCheck,
                      label: "Fiverr",
                      value: "Hassan Ezzouhir",
                      href: "https://www.fiverr.com/ezzouhirhassan?public_mode=true",
                    },
                    {
                      icon: Github,
                      label: "GitHub",
                      value: "@Hassanezz11",
                      href: "https://github.com/Hassanezz11",
                    },
                    {
                      icon: Linkedin,
                      label: "LinkedIn",
                      value: "Hassan Ezzouhir",
                      href: "https://www.linkedin.com/in/hassan-ezzouhir-5222a121a/",
                    },
                    {
                      icon: Download,
                      label: "Resume",
                      value: "Download CV",
                      onClick: handleResumeDownload,
                    },
                  ].map((contact, index) => (
                    <div
                      key={index}
                      className="group p-4 rounded-lg bg-gray-700/30 border border-gray-600 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
                    >
                      {contact.onClick ? (
                        <button onClick={contact.onClick} className="w-full text-left">
                          <div className="flex flex-col items-center text-center space-y-3">
                            <div className="p-3 rounded-lg bg-purple-600/20 text-purple-400 group-hover:bg-purple-600/30 transition-colors duration-300">
                              <contact.icon className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="block text-sm text-gray-400 mb-1">{contact.label}</span>
                              <span className="block text-white font-medium">{contact.value}</span>
                            </div>
                          </div>
                        </button>
                      ) : (
                        <a
                          href={contact.href}
                          target={contact.href?.startsWith("http") ? "_blank" : "_self"}
                          rel={contact.href?.startsWith("http") ? "noopener noreferrer" : ""}
                          className="block"
                        >
                          <div className="flex flex-col items-center text-center space-y-3">
                            <div className="p-3 rounded-lg bg-purple-600/20 text-purple-400 group-hover:bg-purple-600/30 transition-colors duration-300">
                              <contact.icon className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="block text-sm text-gray-400 mb-1">{contact.label}</span>
                              <span className="block text-white font-medium break-all">{contact.value}</span>
                            </div>
                          </div>
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8 pt-8 border-t border-gray-700">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 rounded-lg transition-all duration-300"
                    onClick={() => window.open("mailto:ezz.hassan508@gmail.com?subject=Let's work together!", "_blank")}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            {[
              { icon: Github, href: "https://github.com/Hassanezz11" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/hassan-ezzouhir-5222a121a/" },
              { icon: Mail, href: "mailto:ezz.hassan508@gmail.com" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 hover:bg-purple-600 transition-colors duration-300"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <p className="text-gray-400">© 2025 Hassan Ezzouhir. Built with React.js</p>
        </div>
      </footer>
    </div>
  )
}
