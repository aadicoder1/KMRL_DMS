import React, { useState } from "react";
import {
  Code,
  Database,
  Cpu,
  Palette,
  Layers,
  Zap,
  Github,
  Linkedin,
  Mail,
  Star,
  Award,
  Coffee,
  Users,
  Target,
  Lightbulb,
  Heart,
} from "lucide-react";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("team");
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      name: "Aaditya Kumar Sahu",
      role: "Backend Developer & Database Architect",
      team: "Backend",
      image:
        "https://instagram.fdel11-3.fna.fbcdn.net/v/t51.82787-19/587281862_17926101060175343_3282379438184383616_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2gFaALmuKEh9-3eFwEHPJJOUl1--cBFXHmx3Q_mZTdT2MniDISnWETXcxilZDLQiuxWSYbXIeaceQS7_m5Xu-lZ5&_nc_ohc=bTvgeocLvFkQ7kNvwE85JTO&_nc_gid=WEp8fQO6W42ppOnU_pWDfg&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_Af2HDlx9h8HQWkOQJVIVFh8eM9gf0SgovUmx-tF-hc6uCw&oe=69DD8E2F&_nc_sid=7d3ac5tps://media.licdn.com/dms/image/v2/D4E03AQHpgOh4Z74zEA/profile-displayphoto-crop_800_800/B4EZrMdB.AIwAI-/0/1764366755220?e=1777507200&v=beta&t=H-Vixiv88AuGvLdRyO8WUtyRHr2nMcjS6BmbgPqtQuwhttps://media.licdn.com/dms/image/v2/D4D03AQHnN4nwaclN8g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1701354014775?e=1761782400&v=beta&t=2ma8veJ28ZaQM5JWMsO30cFzJ3S3Azj-89HQwGHD2A8",
      description:
        "Passionate about problem-solving and building efficient software solutions and I'm eager to expand my skills into full-stack development, cloud technologies, and DevOps. Im also actively sharpening my problem-solving and algorithm skills through Java and DSA practice.",
      skills: [
        "React.js",
        "Python",
        "API Integration",
        "FastAPI",
        "Team Leadership",
      ],
      icon: Layers,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      achievements: [
        "Led 3 successful projects",
        "Solved over 100+ DSA question on various platforms",
        "Participated in many contests and hackathons ",
      ],
    },
    {
      name: "Rudranshi Mittal",
      role: "UI/UX Design Lead & Product Designer",
      team: "Frontend",
      image:
        "https://img.freepik.com/free-photo/closeup-happy-pretty-indian-business-woman_1262-2258.jpg",
      description:
        "Crafting intuitive and beautiful user interfaces with a focus on user-centered design principles. Expert in creating design systems that scale.",
      skills: [
        "UI/UX Design",
        "Design Systems",
        "User Research",
        "Prototyping",
        "Visual Design",
      ],
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
      achievements: [
        "1",
        "2",
        "3",
      ],
    },
    
  ];

  const stats = [
    { label: "Projects Completed", value: "3", icon: Award },
    { label: "Lines of Code", value: "10K+", icon: Code },
  ];

  const values = [
    {
      title: "Innovation",
      description: "We embrace creative solutions.",
      icon: Lightbulb,
    },
    {
      title: "Collaboration",
      description: "Teamwork and diverse perspectives.",
      icon: Users,
    },
    {
      title: "Learning",
      description: "Continuous skill improvement.",
      icon: Star,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 rounded-2xl mt-10 text-green-200">
      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center">
        <h1 className="text-5xl md:text-6xl text-green-600 font-bold mb-6">
          Meet Our Team
        </h1>
        

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-6 flex flex-col items-center transition hover:scale-105"
            >
              <stat.icon className="h-8 w-8 mb-2 text-green-400" />
              <div className="text-2xl font-bold text-green-500">
                {stat.value}
              </div>
              <div className="text-green-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 px-6 flex justify-center gap-4">
        {["team", "values", "story"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-full font-medium transition ${
              activeTab === tab
                ? "bg-blue-700/90  text-cyan-200 shadow-lg"
                : " text-cyan-500 hover:bg-blue/50"
            }`}
          >
            {tab === "team"
              ? "Our Team"
              : tab === "values"
              ? "Our Values"
              : "Our Story"}
          </button>
        ))}
      </section>

      {/* Team Section */}
      {activeTab === "team" && (
        <section className="px-6 pb-20 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-green-700 font-bold mb-4">
              The Dream Team
            </h2>
            <p className="text-green-500 max-w-8xl mx-auto">
              Each member brings unique expertise and passion to create
              something extraordinary together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="relative backdrop-blur-sm bg-green/3  bg-white/75 rounded-3xl p-8 transition hover:shadow-2xl hover:scale-105"
                onMouseEnter={() => setHoveredMember(idx)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                {/* Avatar */}
                <div className="w-20 h-20 bg-white/20 flex items-center justify-center mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    srcset=""
                    className="rounded-full"
                  />
                </div>

                <h3 className="text-xl font-bold mb-1 text-green-700">
                  {member.name}
                </h3>
                <p className="text-green-500 mb-4">{member.role}</p>
                <p className="text-green-500 text-sm mb-4">
                  {member.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-green-200 text-green-700 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Achievements */}
                {hoveredMember === idx && (
                  <div className="absolute inset-0 bg-green-700/90 p-6 rounded-3xl flex flex-col justify-center text-white transition-opacity transition-all">
                    <h4 className="font-semibold mb-2">Key Achievements</h4>
                    <ul className="text-sm space-y-1">
                      {member.achievements.map((ach, aidx) => (
                        <li key={aidx} className="flex items-center">
                          <Star className="h-3 w-3 mr-2" /> {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Values Section */}
      {activeTab === "values" && (
        <section className="px-6 pb-20 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-green-600">
              Our Core Values
            </h2>
            <p className="text-green-500 max-w-8xl mx-auto">
              The principles that guide our work and shape our team culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="backdrop-blur-sm bg-green/30 border border-green-400 rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 transition"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                  <v.icon className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-green-500">
                  {v.title}
                </h3>
                <p className="text-green-500">{v.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      
    </div>
  );
};

export default AboutPage;
