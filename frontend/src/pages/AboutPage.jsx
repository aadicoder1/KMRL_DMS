import React, { useState } from "react";
import { Star, Palette, Layers } from "lucide-react";

const AboutPage = () => {
  const [hoveredMember, setHoveredMember] = useState(null);

  const teamMembers = [
    {
      name: "Aaditya Kumar Sahu",
      role: "Backend Developer & Database Architect",
      image: "https://instagram.fdel11-3.fna.fbcdn.net/v/t51.82787-19/587281862_17926101060175343_3282379438184383616_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fdel11-3.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2gFaALmuKEh9-3eFwEHPJJOUl1--cBFXHmx3Q_mZTdT2MniDISnWETXcxilZDLQiuxWSYbXIeaceQS7_m5Xu-lZ5&_nc_ohc=bTvgeocLvFkQ7kNvwE85JTO&_nc_gid=WEp8fQO6W42ppOnU_pWDfg&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_Af2HDlx9h8HQWkOQJVIVFh8eM9gf0SgovUmx-tF-hc6uCw&oe=69DD8E2F&_nc_sid=7d3ac5",
      description: "Passionate about problem-solving and building efficient software solutions. Eager to expand skills into full-stack development, cloud technologies, and DevOps.",
      skills: ["React.js", "Python", "FastAPI", "API Integration", "Team Leadership"],
      achievements: [
        "Led 3 successful projects",
        "Solved 100+ DSA questions",
        "Participated in multiple hackathons",
      ],
    },
    {
      name: "Rudranshi Mittal",
      role: "UI/UX Design Lead & Product Designer",
      image: "https://img.freepik.com/free-photo/closeup-happy-pretty-indian-business-woman_1262-2258.jpg",
      description: "Crafting intuitive and beautiful user interfaces with a focus on user-centered design principles. Expert in creating design systems that scale.",
      skills: ["UI/UX Design", "Design Systems", "User Research", "Prototyping", "Visual Design"],
      achievements: [
        "Designed the full KMRL DMS UI",
        "Created reusable component library",
        "Led user research sessions",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FA] p-6">
      {/* Hero */}
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0066B3] mb-4">
          Meet Our Team
        </h1>
        <p className="text-[#5A7184] text-lg">
          The people behind KMRL Document Management System
        </p>
      </section>

      {/* Team Cards */}
      <section className="max-w-5xl mx-auto pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#004F8C] mb-2">The Dream Team</h2>
          <p className="text-[#5A7184]">
            Each member brings unique expertise and passion to create something extraordinary together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all"
              onMouseEnter={() => setHoveredMember(idx)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#E8F2FB]"
                />
                <div>
                  <h3 className="text-lg font-bold text-[#004F8C]">{member.name}</h3>
                  <p className="text-sm text-[#0066B3]">{member.role}</p>
                </div>
              </div>

              <p className="text-[#5A7184] text-sm mb-4">{member.description}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-[#E8F2FB] text-[#004F8C] rounded-full text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Achievements overlay on hover */}
              {hoveredMember === idx && (
                <div className="absolute inset-0 bg-[#0066B3]/95 p-8 rounded-2xl flex flex-col justify-center text-white">
                  <h4 className="font-semibold text-lg mb-3">Key Achievements</h4>
                  <ul className="space-y-2">
                    {member.achievements.map((ach, aidx) => (
                      <li key={aidx} className="flex items-center gap-2 text-sm">
                        <Star className="w-3 h-3 flex-shrink-0" />
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;