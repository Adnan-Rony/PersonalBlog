import ResumeModel from '../models/Resume.model.js';
import UserModel from '../models/User.model.js';


// ─── GET /resume  (public) ────────────────────────────────────────────────────
// Anyone can view the resume — no auth required
export const getResume = async (req, res) => {
  try {
    const resume = await ResumeModel.findOne()
      .populate('owner', 'name email profilePicture');

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    res.status(200).json({ success: true, resume });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching resume', error: err.message });
  }
};


// ─── POST /resume  (admin only) ───────────────────────────────────────────────
// Creates the resume for the first time
export const createResume = async (req, res) => {
  try {
    const existing = await ResumeModel.findOne({ owner: req.user.id });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Resume already exists. Use PUT /resume to update it.',
      });
    }

    const {
      headline, summary, location, email, phone, website,
      socialLinks, pdfUrl,
      skills, experience, education, projects, certifications,
    } = req.body;

    const resume = new ResumeModel({
      owner: req.user.id,
      headline, summary, location, email, phone, website,
      socialLinks, pdfUrl,
      skills:         skills         || [],
      experience:     experience     || [],
      education:      education      || [],
      projects:       projects       || [],
      certifications: certifications || [],
    });

    await resume.save();
    res.status(201).json({ success: true, message: 'Resume created successfully', resume });
  } catch (err) {
    console.error('Error creating resume:', err);
    res.status(500).json({ success: false, message: 'Error creating resume', error: err.message });
  }
};


// ─── PUT /resume  (admin only) ────────────────────────────────────────────────
// Full update — replaces all provided fields
export const updateResume = async (req, res) => {
  try {
    const {
      headline, summary, location, email, phone, website,
      socialLinks, pdfUrl,
      skills, experience, education, projects, certifications,
    } = req.body;

    // Find by owner (admin's user ID)
    let resume = await ResumeModel.findOne({ owner: req.user.id });

    if (!resume) {
      // Auto-create if it doesn't exist yet
      resume = new ResumeModel({ owner: req.user.id });
    }

    // Only update fields that were sent in the request
    if (headline  !== undefined) resume.headline  = headline;
    if (summary   !== undefined) resume.summary   = summary;
    if (location  !== undefined) resume.location  = location;
    if (email     !== undefined) resume.email     = email;
    if (phone     !== undefined) resume.phone     = phone;
    if (website   !== undefined) resume.website   = website;
    if (pdfUrl    !== undefined) resume.pdfUrl    = pdfUrl;

    if (socialLinks) {
      resume.socialLinks = { ...resume.socialLinks.toObject?.() ?? resume.socialLinks, ...socialLinks };
    }

    if (skills         !== undefined) resume.skills         = skills;
    if (experience     !== undefined) resume.experience     = experience;
    if (education      !== undefined) resume.education      = education;
    if (projects       !== undefined) resume.projects       = projects;
    if (certifications !== undefined) resume.certifications = certifications;

    await resume.save();
    res.status(200).json({ success: true, message: 'Resume updated successfully', resume });
  } catch (err) {
    console.error('Error updating resume:', err);
    res.status(500).json({ success: false, message: 'Error updating resume', error: err.message });
  }
};


// ─── PATCH /resume/section  (admin only) ─────────────────────────────────────
// Update only one section at a time (e.g. just skills, or just experience)
// Body: { section: "skills", data: [...] }
export const updateResumeSection = async (req, res) => {
  const { section, data } = req.body;

  const allowedSections = ['skills', 'experience', 'education', 'projects', 'certifications'];

  if (!section || !allowedSections.includes(section)) {
    return res.status(400).json({
      success: false,
      message: `Invalid section. Must be one of: ${allowedSections.join(', ')}`,
    });
  }

  if (!Array.isArray(data)) {
    return res.status(400).json({ success: false, message: 'data must be an array' });
  }

  try {
    let resume = await ResumeModel.findOne({ owner: req.user.id });

    if (!resume) {
      resume = new ResumeModel({ owner: req.user.id });
    }

    resume[section] = data;
    await resume.save();

    res.status(200).json({
      success: true,
      message: `${section} updated successfully`,
      [section]: resume[section],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating section', error: err.message });
  }
};


// ─── PATCH /resume/pdf  (admin only) ─────────────────────────────────────────
// Just update the PDF download link
export const updatePdfLink = async (req, res) => {
  const { pdfUrl } = req.body;

  if (!pdfUrl || pdfUrl.trim() === '') {
    return res.status(400).json({ success: false, message: 'pdfUrl is required' });
  }

  try {
    let resume = await ResumeModel.findOne({ owner: req.user.id });

    if (!resume) {
      resume = new ResumeModel({ owner: req.user.id });
    }

    resume.pdfUrl = pdfUrl.trim();
    await resume.save();

    res.status(200).json({ success: true, message: 'PDF link updated', pdfUrl: resume.pdfUrl });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating PDF link', error: err.message });
  }
};


// ─── DELETE /resume  (admin only) ─────────────────────────────────────────────
export const deleteResume = async (req, res) => {
  try {
    const deleted = await ResumeModel.findOneAndDelete({ owner: req.user.id });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'No resume found to delete' });
    }

    res.status(200).json({ success: true, message: 'Resume deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting resume', error: err.message });
  }
};
