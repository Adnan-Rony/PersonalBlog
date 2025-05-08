import BlogModel from "../models/Blog.model.js";
import UserModel from "../models/User.model.js";

export const createBlog = async (req, res) => {
  const { title, content, categories, tags } = req.body;
  const image = req.file ? req.file.filename : null;
      
  try {
    // 🧑‍💼 Find the user by MongoDB _id (from JWT)
    const user = await UserModel.findById(req.user.id); // assumes token contains { id: user._id }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 📝 Create the blog post
    const blog = new BlogModel({
      title,
      content,
      author: user._id,
      categories,
      tags,

      image, // image path from multer
    });

    await blog.save();

    res.status(201).json({
      message: 'Blog created successfully',
      blog,
    });

  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find()
    .populate('author', 'name email') // populate author with name and email
    .populate({
      path: 'comments',
      select: 'content author createdAt' ,
      populate: {
        path: 'author',
        select: 'name' // only include the comment author's name
      }
    }) 
      .sort({ createdAt: -1 });         // newest blogs first (optional)

    res.status(200).json(blogs);

  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      message: 'Error fetching blogs',
      error: error.message,
    });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, categories, tags } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this blog" });
    }

    // Update blog fields if new values are provided
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.categories = categories || blog.categories;
    blog.tags = tags || blog.tags;
    
    if (image) {
      blog.image = image;  // Update the image if provided
    }

    await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      blog
    });

  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getUserBlogs=async (req,res)=>{
  try {
    const userid=req.user.id;
    const blogs=await BlogModel.find({author:userid}).populate("author","name email")
    .populate({
      path: 'comments',
      select: 'content author createdAt' ,
      populate: {
        path: 'author',
        select: 'name' // only include the comment author's name
      }
    })

    res.status(200).json(blogs)
  } catch(err){
    res.status(500).json({message:"internal server down"})
  }
}

export const deleteUserBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const blogId = req.params.id;

    // Find the blog first
    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if the logged-in user is the author
    if (blog.author.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized: Not your blog' });
    }

    // Delete the blog
    await BlogModel.findByIdAndDelete(blogId);

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;  // Get the blog ID from the URL params
    const blog = await BlogModel.findById(id)
      .populate("author", "name email")  // Populate author details
      .populate({
        path: 'comments',
        select: 'content author createdAt',
        populate: {
          path: 'author',
          select: 'name'  // Populate comment author's name
        }
      });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

export const updateUserBlog = async (req, res) => {
  const { id } = req.params;  // Get the blog ID from the URL parameters
  const { title, content, categories, tags } = req.body;  // Extract new values from the request body
  const image = req.file ? req.file.filename : null;  // Handle image file if present

  try {
    const blog = await BlogModel.findById(id);  // Find the blog by ID

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this blog" });
    }

    // Update the blog fields with the new values (if provided)
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.categories = categories || blog.categories;
    blog.tags = tags || blog.tags;
    if (image) {
      blog.image = image;  // Update the image if a new one is uploaded
    }

    await blog.save();  // Save the updated blog to the database

    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findById(id)
    .populate('author', 'name email')
    .populate({
      path: 'comments',
      select: 'content author createdAt' ,
      populate: {
        path: 'author',
        select: 'name' // only include the comment author's name
      }
    }) 
    

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Error fetching blog', error: error.message });
  }
}


export const getBlogsByCategory = async (req, res) => {
  const { category } = req.params;

  if (!category || category.trim() === "") {
    return res.status(400).json({ message: "Category is required" });
  }

  try {
    const blogs = await BlogModel.find({ categories: category });

    if (!blogs.length) {
      return res.status(404).json({ message: "No blogs found for this category" });
    }

    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs", error: err.message });
  }
};

export const getBlogsAllCategories = async (req, res) => {
  try{
    const blogs=await BlogModel.find().select('categories');
    const allCategoriesSet=new Set();
    blogs.forEach(blog=>{
      blog.categories?.forEach(category=>allCategoriesSet.add(category))
      
    })
    const uniqueCategories=Array.from(allCategoriesSet);
    res.status(200).json(uniqueCategories);
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
}

export const getBlogsByTag = async (req, res) => {
  const { tag } = req.params;
  if (!tag || tag.trim() === "") {
    return res.status(400).json({ message: "Tag is required" });
  }


  try {
    const blogs = await BlogModel.find({ tags: tag });

    if (!blogs.length) {
      return res.status(404).json({ message: "No blogs found for this tag" });
    }
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs', error: err.message });
  }
}

export const getBlogAllTags = async (req, res) => {
  try {
    const blogs = await BlogModel.find().select('tags');

    const allTagsSet = new Set();
    blogs.forEach(blog => {
      blog.tags?.forEach(tag => allTagsSet.add(tag));
    });

    const uniqueTags = Array.from(allTagsSet);
    res.status(200).json(uniqueTags);
    
  } catch (error) {
    console.error('Error fetching tags:', error.message);
    res.status(500).json({ message: 'Error fetching tags', error: error.message });
  }
};

  
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // ✅ Get logged-in user
    const user = await UserModel.findById(req.user.id);

    // 🛡️ Only the author or an admin can delete
    if (blog.author.toString() !== req.user.id && user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to delete this blog' });
    }

    await BlogModel.findByIdAndDelete(id);

    res.status(200).json({ message: 'Blog deleted successfully' });

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting blog', error: error.message });
  }
};


export const updateBlogStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate status
  const validStatuses = ['published', 'pending', 'rejected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const blog = await BlogModel.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const user = await UserModel.findById(req.user.id);

    // Only author or admin can update status
    if (blog.author.toString() !== req.user.id && user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to change status' });
    }

    blog.status = status;
    await blog.save();

    res.status(200).json({ message: 'Blog status updated', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
};



// Search blog posts by title or content
export const searchBlogs = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    // Search for blogs with matching title or content
    const blogs = await BlogModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}