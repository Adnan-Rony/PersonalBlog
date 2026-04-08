import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaGithub, FaLinkedinIn, FaTwitter, FaYoutube, FaGlobe,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaDownload,
  FaExternalLinkAlt, FaCalendarAlt,
} from "react-icons/fa";
import { Authcontext } from "../context/AuthProvider";
import { UseFetchResume } from "../Features/resume/resumeQuery";
import Seo from "../components/Seo";

// ─── Skeleton loader ──────────────────────────────────────────────────────────
const ResumeSkeleton = () => (
  <div className="max-w-5xl mx-auto px-4 py-12 animate-pulse">
    <div className="h-10 bg-gray-200 rounded w-1/3 mb-4" />
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-10" />
    {[...Array(4)].map((_, i) => (
      <div key={i} className="mb-10">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
        <div className="h-4 bg-gray-100 rounded w-full mb-2" />
        <div className="h-4 bg-gray-100 rounded w-5/6 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-4/6" />
      </div>
    ))}
  </div>
);

// ─── Section heading ──────────────────────────────────────────────────────────
const SectionTitle = ({ title }) => (
  <div className="flex items-center gap-3 mb-6">
    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    <div className="flex-1 h-px bg-gradient-to-r from-purple-300 to-transparent" />
  </div>
);

// ─── Timeline item (experience / education) ───────────────────────────────────
const TimelineItem = ({ title, subtitle, period, location, description, isLast }) => (
  <div className="flex gap-4">
    {/* Dot + line */}
    <div className="flex flex-col items-center">
      <div className="w-3 h-3 rounded-full bg-purple-500 mt-1.5 shrink-0" />
      {!isLast && <div className="w-0.5 bg-purple-100 flex-1 mt-1" />}
    </div>
    {/* Content */}
    <div className={`pb-8 ${isLast ? "" : ""}`}>
      <h3 className="font-semibold text-gray-900 text-base leading-tight">{title}</h3>
      <p className="text-purple-600 font-medium text-sm mt-0.5">{subtitle}</p>
      <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-500">
        {period && (
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="text-gray-400" /> {period}
          </span>
        )}
        {location && (
          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-gray-400" /> {location}
          </span>
        )}
      </div>
      {description && (
        <p className="mt-2.5 text-sm text-gray-600 leading-relaxed">{description}</p>
      )}
    </div>
  </div>
);

// ─── Skill badge ──────────────────────────────────────────────────────────────
const SkillBadge = ({ name }) => (
  <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-sm font-medium hover:bg-purple-100 transition-colors">
    {name}
  </span>
);

// ─── Project card ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-purple-200 transition-all group">
    {project.image && (
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-36 object-cover rounded-lg mb-4"
      />
    )}
    <h3 className="font-semibold text-gray-900 text-base mb-1.5 group-hover:text-purple-600 transition-colors">
      {project.title}
    </h3>
    <p className="text-sm text-gray-600 leading-relaxed mb-3">{project.description}</p>

    {project.techStack?.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.techStack.map((tech, i) => (
          <span
            key={i}
            className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    )}

    <div className="flex gap-3 mt-auto">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium text-purple-600 hover:text-purple-800 transition"
        >
          <FaExternalLinkAlt /> Live Demo
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition"
        >
          <FaGithub /> GitHub
        </a>
      )}
    </div>
  </div>
);

// ─── Certification card ───────────────────────────────────────────────────────
const CertCard = ({ cert }) => (
  <div className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-200 hover:shadow-sm transition-all">
    <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
      <span className="text-purple-600 font-bold text-sm">✓</span>
    </div>
    <div>
      <h4 className="font-semibold text-gray-900 text-sm">{cert.title}</h4>
      <p className="text-purple-600 text-xs mt-0.5">{cert.issuer}</p>
      {cert.date && <p className="text-gray-400 text-xs mt-0.5">{cert.date}</p>}
      {cert.url && (
        <a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-purple-500 hover:underline mt-1 inline-block"
        >
          View Certificate →
        </a>
      )}
    </div>
  </div>
);

// ─── Social icon link ─────────────────────────────────────────────────────────
const SocialLink = ({ href, icon: Icon, label }) => {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full bg-gray-100 hover:bg-purple-600 hover:text-white text-gray-600 flex items-center justify-center transition-all"
    >
      <Icon size={15} />
    </a>
  );
};

// ─── Main Resume Page ─────────────────────────────────────────────────────────
const ResumePage = () => {
  const { user } = useContext(Authcontext);
  const { data, isLoading, isError } = UseFetchResume();

  if (isLoading) return <ResumeSkeleton />;

  if (isError || !data?.resume) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Resume Coming Soon</h2>
        <p className="text-gray-500 mb-6">
          The resume hasn't been added yet. Check back soon!
        </p>
        {user?.role === "admin" && (
          <Link
            to="/dashboard/admin"
            className="px-5 py-2.5 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition"
          >
            Add Resume from Dashboard →
          </Link>
        )}
      </div>
    );
  }

  const r = data.resume;
  const ownerName = r.owner?.name || "Developer";
  const ownerAvatar = r.owner?.profilePicture;

  return (
    <>
      <Seo title={`${ownerName} | Resume`} />

      <div className="bg-gray-50 min-h-screen">
        {/* ── Hero / Header ────────────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white">
          <div className="max-w-5xl mx-auto px-4 py-14 md:py-20">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

              {/* Avatar */}
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white/30 overflow-hidden shrink-0 shadow-xl">
                {ownerAvatar ? (
                  <img src={ownerAvatar} alt={ownerName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-white/20 flex items-center justify-center text-4xl font-bold">
                    {ownerName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl md:text-4xl font-bold mb-1">{ownerName}</h1>
                {r.headline && (
                  <p className="text-purple-200 text-lg font-medium mb-3">{r.headline}</p>
                )}
                {r.summary && (
                  <p className="text-purple-100 text-sm leading-relaxed max-w-2xl mb-5">
                    {r.summary}
                  </p>
                )}

                {/* Contact row */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-purple-100 mb-5">
                  {r.location && (
                    <span className="flex items-center gap-1.5">
                      <FaMapMarkerAlt /> {r.location}
                    </span>
                  )}
                  {r.email && (
                    <a href={`mailto:${r.email}`} className="flex items-center gap-1.5 hover:text-white">
                      <FaEnvelope /> {r.email}
                    </a>
                  )}
                  {r.phone && (
                    <span className="flex items-center gap-1.5">
                      <FaPhone /> {r.phone}
                    </span>
                  )}
                  {r.website && (
                    <a href={r.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white">
                      <FaGlobe /> Website
                    </a>
                  )}
                </div>

                {/* Social + Download */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <SocialLink href={r.socialLinks?.github}   icon={FaGithub}    label="GitHub" />
                  <SocialLink href={r.socialLinks?.linkedin} icon={FaLinkedinIn} label="LinkedIn" />
                  <SocialLink href={r.socialLinks?.twitter}  icon={FaTwitter}   label="Twitter" />
                  <SocialLink href={r.socialLinks?.youtube}  icon={FaYoutube}   label="YouTube" />

                  {r.pdfUrl && (
                    <a
                      href={r.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 flex items-center gap-2 px-5 py-2 bg-white text-purple-700 font-semibold rounded-full text-sm hover:bg-purple-50 transition-colors shadow"
                    >
                      <FaDownload /> Download PDF
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ─────────────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Left column ─────────────────────────────────────────────── */}
          <div className="lg:col-span-1 space-y-8">

            {/* Skills */}
            {r.skills?.length > 0 && (
              <section>
                <SectionTitle title="Skills" />
                <div className="space-y-5">
                  {r.skills.map((skillGroup, i) => (
                    <div key={i}>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        {skillGroup.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, j) => (
                          <SkillBadge key={j} name={skill} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {r.certifications?.length > 0 && (
              <section>
                <SectionTitle title="Certifications" />
                <div className="space-y-3">
                  {r.certifications.map((cert, i) => (
                    <CertCard key={i} cert={cert} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── Right column ─────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Experience */}
            {r.experience?.length > 0 && (
              <section>
                <SectionTitle title="Experience" />
                <div>
                  {r.experience.map((exp, i) => (
                    <TimelineItem
                      key={i}
                      title={exp.role}
                      subtitle={exp.company}
                      period={`${exp.startDate} — ${exp.current ? "Present" : exp.endDate}`}
                      location={exp.location}
                      description={exp.description}
                      isLast={i === r.experience.length - 1}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {r.education?.length > 0 && (
              <section>
                <SectionTitle title="Education" />
                <div>
                  {r.education.map((edu, i) => (
                    <TimelineItem
                      key={i}
                      title={edu.degree}
                      subtitle={edu.institution}
                      period={`${edu.startDate} — ${edu.current ? "Present" : edu.endDate}`}
                      location={edu.grade}
                      isLast={i === r.education.length - 1}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {r.projects?.length > 0 && (
              <section>
                <SectionTitle title="Projects" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {r.projects.map((project, i) => (
                    <ProjectCard key={i} project={project} />
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>

        {/* Admin edit shortcut */}
        {user?.role === "admin" && (
          <div className="max-w-5xl mx-auto px-4 pb-10 text-right">
            <Link
              to="/dashboard/admin"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-purple-600 border border-purple-300 rounded-full hover:bg-purple-50 transition"
            >
              ✏️ Edit Resume from Dashboard
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default ResumePage;
