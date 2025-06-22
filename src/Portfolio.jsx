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
  Calendar,
  Phone,
} from "lucide-react"
import { Button } from "./components/ui/button"
import { Card, CardContent } from "./components/ui/card"
import { Badge } from "./components/ui/badge"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Function to handle resume download
  const handleResumeDownload = () => {
    const link = document.createElement("a")
    link.href = "/Hassan_Ezzouhir_CV.pdf"
    link.download = "Hassan_Ezzouhir_CV.pdf"
    link.click()
  }

  // const handleResumeView = () => {
  //   window.open("https://drive.google.com/file/d/YOUR_GOOGLE_DRIVE_FILE_ID/view", "_blank")
  // }

  const skills = [
    { name: "React", level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "JavaScript", level: 90, color: "from-yellow-500 to-orange-500" },
    { name: "Node.js", level: 85, color: "from-green-500 to-emerald-500" },
    { name: "Python", level: 80, color: "from-blue-600 to-purple-600" },
    { name: "MongoDB", level: 75, color: "from-green-600 to-teal-600" },
    { name: "MySQL", level: 70, color: "from-blue-700 to-indigo-700" },
    { name: "Laravel", level: 90, color: "from-red-700 to-orange-700" },
    { name: "PHP", level: 90, color: "from-purple-700 to-purple-700" },
  ]

  const projects = [
    {
      title: "Art Palette Matcher",
      description:
        "A tool for artists and designers that extracts dominant colors from uploaded images and generates a matching or complementary color palette.",
      image: "/art.png",
      tech: ["React", "CSS3", "HTML5"],
      github: "https://github.com/github.com/palette-matcher",
      live: "https://Hassanezz11.github.io/palette-matcher",
    },
    {
      title: "Collaboration Whiteboard",
      description:
        "A web-based drawing and note board where multiple users can draw, add sticky notes, move items, and collaborate in real time. Use WebSockets for syncing across users and implement drag-and-drop features.",
      image: "/collab-whiteboard.png",
      tech: ["React", "Socket", "Express", "HTML5", "Zustand"],
      github: "https://github.com/Hassanezz11/collab-whiteboard",
      live: "https://hassanezz11.github.io/collab-whiteboard/",
    },
    {
      title: "Typing Speed Challenge",
      description:
        "A fast-paced browser game that tests your typing speed and accuracy in a fun and interactive way. The player has 60 seconds to type as many randomly generated words as possible, with real-time feedback, score tracking, and a final performance summary. Designed with smooth UI transitions, responsive layout, and local state persistence, this game runs entirely on the frontend with no backend dependency. It also features WPM calculation, live timer, and visual cues for correct and incorrect typing.",
      image: "/typing-game.png",
      tech: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      github: "https://github.com/Hassanezz11/typing-speed-game",
      live: "https://typingame-hassanezz.vercel.app/",
    },
  ]

  const experiences = [
    // {
    //   title: "Senior Full Stack Developer",
    //   company: "Tech Solutions Inc.",
    //   period: "2022 - Present",
    //   description:
    //     "Led development of multiple web applications, mentored junior developers, and implemented best practices for code quality and performance.",
    // },
    // {
    //   title: "Frontend Developer",
    //   company: "Digital Agency Co.",
    //   period: "2020 - 2022",
    //   description:
    //     "Developed responsive web applications using React and modern JavaScript frameworks. Collaborated with design teams to create pixel-perfect implementations.",
    // },
    // {
    //   title: "Junior Developer",
    //   company: "StartUp Ventures",
    //   period: "2019 - 2020",
    //   description:
    //     "Built and maintained web applications, learned modern development practices, and contributed to open-source projects.",
    // },
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              HEzz
            </div>
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 hover:text-purple-400 hover:scale-105 ${
                    activeSection === item ? "text-purple-400" : "text-white/70"
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
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fadeInScale">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Hassan
              </span>
              <br />
              <span className="text-white">Ezzouhir</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto animate-fadeInUp">
              Full Stack Developer crafting exceptional digital experiences with modern technologies and creative
              solutions
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fadeInUp">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>

              <div className="relative group">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 bg-transparent"
                  onClick={handleResumeDownload}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>

                {/* <div className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-sm border border-white/10 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                  <button
                    onClick={handleResumeDownload}
                    className="w-full px-4 py-2 text-left text-white hover:bg-purple-500/20 rounded-t-lg transition-colors duration-200"
                  >
                    📄 Download PDF
                  </button>
                  <button
                    onClick={handleResumeView}
                    className="w-full px-4 py-2 text-left text-white hover:bg-purple-500/20 transition-colors duration-200"
                  >
                    👁️ View Online
                  </button>
                  <a
                    href="mailto:hassan@example.com?subject=Resume Request"
                    className="block w-full px-4 py-2 text-left text-white hover:bg-purple-500/20 rounded-b-lg transition-colors duration-200"
                  >
                    📧 Email Me
                  </a>
                </div> */}
              </div>
            </div>

            <div className="flex justify-center space-x-6 animate-fadeInUp">
              {[
                { icon: Github, href: "https://github.com/Hassanezz11" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/hassan-ezzouhir-5222a121a/" },
                { icon: Mail, href: "mailto:hassan.ezz319@gmail.com" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-purple-500/20 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <div className="relative">
                <div className="w-80 h-80 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-6xl font-bold">
                    HE
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 animate-slideInRight">
              <p className="text-lg text-white/80 leading-relaxed">
                I'm a passionate Full Stack Developer with over 4 years of experience creating digital solutions that
                make a difference. I specialize in modern web technologies and love turning complex problems into
                simple, beautiful designs.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or
                sharing knowledge with the developer community.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                {[
                  { icon: Code, title: "Clean Code", desc: "Writing maintainable, scalable code" },
                  { icon: Zap, title: "Performance", desc: "Optimized for speed and efficiency" },
                  { icon: Palette, title: "Design", desc: "Beautiful, user-centered interfaces" },
                  { icon: Users, title: "Collaboration", desc: "Strong team player and mentor" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:scale-105 transition-all duration-300 hover:bg-white/10"
                  >
                    <item.icon className="w-8 h-8 text-purple-400 mb-2" />
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-white/60">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Skills & Expertise
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-300 animate-slideInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                  <span className="text-purple-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full animate-progressBar`}
                    style={{
                      width: `${skill.level}%`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-8"></div>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="group hover:-translate-y-2 transition-all duration-300 animate-slideInUp"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden hover:border-purple-400/50 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-black/50 border-white/20 text-white hover:bg-white hover:text-black"
                        onClick={() => window.open(project.github, "_blank")}
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-black/50 border-white/20 text-white hover:bg-white hover:text-black"
                        onClick={() => window.open(project.live, "_blank")}
                        title="View Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                    <p className="text-white/70 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-purple-400/50 text-purple-400 bg-transparent"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-8"></div>
          </div> */}

          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative mb-12 last:mb-0 animate-slideInUp"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mr-4"></div>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent"></div>
                </div>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 ml-8 hover:border-purple-400/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <div className="flex items-center text-purple-400 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.period}
                      </div>
                    </div>
                    <div className="flex items-center mb-3">
                      <MapPin className="w-4 h-4 text-cyan-400 mr-2" />
                      <span className="text-cyan-400 font-medium">{exp.company}</span>
                    </div>
                    <p className="text-white/70">{exp.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPROVED MOBILE-FRIENDLY CONTACT SECTION */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-8"></div>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto px-4">
              Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
            </p>
          </div>

          <div className="max-w-4xl mx-auto animate-fadeInUp">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-4 sm:p-6 lg:p-8">
              <CardContent className="space-y-8">
                {/* Contact Methods - Mobile Optimized */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "hassan.ezz319@gmail.com",
                      href: "mailto:hassan.ezz319@gmail.com",
                      color: "text-blue-400",
                      bgColor: "bg-blue-500/10",
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      value: "+212 0714774158",
                      href: "tel:+212714774158",
                      color: "text-green-400",
                      bgColor: "bg-green-500/10",
                    },
                    {
                      icon: Github,
                      label: "GitHub",
                      value: "@Hassanezz11",
                      href: "https://github.com/Hassanezz11",
                      color: "text-purple-400",
                      bgColor: "bg-purple-500/10",
                    },
                    {
                      icon: Linkedin,
                      label: "LinkedIn",
                      value: "Hassan Ezzouhir",
                      href: "https://www.linkedin.com/in/hassan-ezzouhir-5222a121a/",
                      color: "text-cyan-400",
                      bgColor: "bg-cyan-500/10",
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      value: "Morocco, Marrakech",
                      href: "https://maps.app.goo.gl/SQrWcMtbZPCaTANj6",
                      color: "text-orange-400",
                      bgColor: "bg-orange-500/10",
                    },
                    {
                      icon: Download,
                      label: "Resume",
                      value: "Download CV",
                      href: "/Hassan_Ezzouhir_CV.pdf",
                      color: "text-pink-400",
                      bgColor: "bg-pink-500/10",
                      onClick: handleResumeDownload,
                    },
                  ].map((contact, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105"
                    >
                      {contact.onClick ? (
                        <button
                          onClick={contact.onClick}
                          className="w-full p-4 sm:p-6 text-left focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-xl"
                        >
                          <div className="flex flex-col items-center text-center space-y-3">
                            <div
                              className={`p-3 rounded-full ${contact.bgColor} ${contact.color} transition-all duration-300 group-hover:scale-110`}
                            >
                              <contact.icon className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="block text-xs sm:text-sm text-white/60 font-medium">
                                {contact.label}
                              </span>
                              <span className={`block text-sm sm:text-base font-semibold ${contact.color} mt-1`}>
                                {contact.value}
                              </span>
                            </div>
                          </div>
                        </button>
                      ) : (
                        <a
                          href={contact.href}
                          target={contact.href.startsWith("http") ? "_blank" : "_self"}
                          rel={contact.href.startsWith("http") ? "noopener noreferrer" : ""}
                          className="block p-4 sm:p-6 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-xl"
                        >
                          <div className="flex flex-col items-center text-center space-y-3">
                            <div
                              className={`p-3 rounded-full ${contact.bgColor} ${contact.color} transition-all duration-300 group-hover:scale-110`}
                            >
                              <contact.icon className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="block text-xs sm:text-sm text-white/60 font-medium">
                                {contact.label}
                              </span>
                              <span
                                className={`block text-sm sm:text-base font-semibold ${contact.color} mt-1 break-all`}
                              >
                                {contact.value}
                              </span>
                            </div>
                          </div>
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                    onClick={() => window.open("mailto:hassan@example.com?subject=Let's Work Together!", "_blank")}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                  {/* <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 bg-transparent"
                    onClick={() => window.open("https://calendly.com/hassan-ezzouhir", "_blank")}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Call
                  </Button> */}
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white/60">© 2024 Hassan Ezzouhir. Crafted with ❤️ and React.js</p>
        </div>
      </footer>
    </div>
  )
}
