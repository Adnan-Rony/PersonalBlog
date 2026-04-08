import mongoose from "mongoose";

// ─── Sub-schemas ──────────────────────────────────────────────────────────────

const experienceSchema = new mongoose.Schema({
  company:     { type: String, required: true, trim: true },
  role:        { type: String, required: true, trim: true },
  location:    { type: String, default: '', trim: true },
  startDate:   { type: String, required: true },  // e.g. "Jan 2022"
  endDate:     { type: String, default: 'Present' }, // "Present" or "Dec 2023"
  current:     { type: Boolean, default: false },
  description: { type: String, default: '' },
}, { _id: true });

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true, trim: true },
  degree:      { type: String, required: true, trim: true }, // e.g. "B.Sc. Computer Science"
  startDate:   { type: String, required: true },
  endDate:     { type: String, default: 'Present' },
  current:     { type: Boolean, default: false },
  grade:       { type: String, default: '' },       // e.g. "CGPA 3.8"
}, { _id: true });

const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  description: { type: String, required: true },
  techStack:   { type: [String], default: [] },     // ["React", "Node.js", ...]
  liveUrl:     { type: String, default: '' },
  githubUrl:   { type: String, default: '' },
  image:       { type: String, default: '' },
}, { _id: true });

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true, trim: true }, // e.g. "Frontend", "Tools"
  items:    { type: [String], default: [] },              // ["React", "CSS", ...]
}, { _id: true });

const certificationSchema = new mongoose.Schema({
  title:    { type: String, required: true, trim: true },
  issuer:   { type: String, required: true, trim: true },
  date:     { type: String, default: '' },   // e.g. "March 2024"
  url:      { type: String, default: '' },   // link to certificate
}, { _id: true });

// ─── Main Resume Schema ───────────────────────────────────────────────────────
const resumeSchema = new mongoose.Schema({
  // Only one resume per site — owned by the admin
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },

  headline:  { type: String, default: '', trim: true }, // "Full Stack Developer & Technical Writer"
  summary:   { type: String, default: '' },             // short bio paragraph
  location:  { type: String, default: '', trim: true }, // "Dhaka, Bangladesh"
  email:     { type: String, default: '', trim: true },
  phone:     { type: String, default: '', trim: true },
  website:   { type: String, default: '' },

  socialLinks: {
    github:   { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter:  { type: String, default: '' },
    youtube:  { type: String, default: '' },
  },

  pdfUrl: { type: String, default: '' }, // link to downloadable PDF resume

  skills:         { type: [skillSchema],         default: [] },
  experience:     { type: [experienceSchema],     default: [] },
  education:      { type: [educationSchema],      default: [] },
  projects:       { type: [projectSchema],        default: [] },
  certifications: { type: [certificationSchema],  default: [] },

}, {
  timestamps: true, // adds createdAt and updatedAt automatically
});

export default mongoose.model('Resume', resumeSchema);
