import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import DOMPurify from 'dompurify';
import {
  UseFetchBlogById,
  UseLikeBlog,
  UseUnlikeBlog,
} from '../Features/blog/blogQuery';
import { UseCurrentUser } from '../Features/users/userQuery.js';
import { UseFollowUser, UseUnfollowUser } from '../Features/users/userQuery.js';
import Seo from '../components/Seo.jsx';
import CommentForm from '../components/blog/CommentForm.jsx';
import CommentItem from '../components/blog/CommentItem.jsx';
import SingleBlogSkeleton from '../components/loader/SingleBlogSkeleton.jsx';
import { postcomment } from '../Features/blog/blogAPI.js';
import { extractHeadingsFromHTML } from '../utils/extractHeadings.js';
import img from '../assets/user-profile-icon-free-vector.jpg';
import RecommndedBlogs from '../components/blog/RecommndedBlogs.jsx';

const SingleBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: blog, isLoading, isError, refetch } = UseFetchBlogById(id);
  const { data: user } = UseCurrentUser();

  const [inputData, setInputData] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const { mutate: likeBlog, isPending: liking } = UseLikeBlog();
  const { mutate: unlikeBlog, isPending: unliking } = UseUnlikeBlog();

  const [isFollowing, setIsFollowing] = useState(false);
  const { mutate: followUser } = UseFollowUser();
  const { mutate: unfollowUser } = UseUnfollowUser();

  useEffect(() => {
    if (blog && user?.user) {
      const userId = user.user._id.toString();
      const authorId = blog.author._id.toString();

      setLiked(blog.likes.map((id) => id.toString()).includes(userId));
      setLikeCount(blog.likes.length);

      const followingIds = user.user.following?.map((id) => id.toString()) || [];
      setIsFollowing(followingIds.includes(authorId));
    }
  }, [blog, user]);

  const handleLikeToggle = () => {
    if (!user?.user) return navigate('/login');
    if (liked) {
      unlikeBlog(
        { id },
        {
          onSuccess: () => {
            setLiked(false);
            setLikeCount((prev) => prev - 1);
            queryClient.invalidateQueries({ queryKey: ['blog', id] });
          },
        }
      );
    } else {
      likeBlog(
        { id },
        {
          onSuccess: () => {
            setLiked(true);
            setLikeCount((prev) => prev + 1);
            queryClient.invalidateQueries({ queryKey: ['blog', id] });
          },
        }
      );
    }
  };

  const handleFollowToggle = () => {
    if (!user?.user) return navigate('/login');

    const authorId = blog.author._id.toString();

    if (isFollowing) {
      unfollowUser(
        { id: authorId },
        {
          onSuccess: () => {
            setIsFollowing(false);
            queryClient.invalidateQueries({ queryKey: ['user'] });
          },
        }
      );
    } else {
      followUser(
        { id: authorId },
        {
          onSuccess: () => {
            setIsFollowing(true);
            queryClient.invalidateQueries({ queryKey: ['user'] });
          },
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.user) return navigate('/login');
    if (!inputData.trim()) return;

    try {
      setSubmitting(true);
      await postcomment(id, inputData);
      setInputData('');
      await refetch();
      queryClient.invalidateQueries({ queryKey: ['blog', id] });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <SingleBlogSkeleton />;
  if (isError) return <p className="text-center mt-10">Blog not found.</p>;

  const sanitizedContent = DOMPurify.sanitize(blog.content);
  const { toc, htmlWithIds } = extractHeadingsFromHTML(sanitizedContent);

  return (
    <div>
      <Seo title="DevThought | Blog Details" />
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Main blog */}
        <div className="bg-white lg:col-span-2 px-4 py-8 rounded-xl shadow-sm">
          <div className="my-4 space-y-3">
            <h1 className="lg:text-3xl font-bold mb-2">{blog.title}</h1>
            <p className="text-sm text-blue-400">
              Posted on {new Date(blog.createdAt).toLocaleDateString()}
            </p>

            <div className="flex items-center gap-4 mt-3">
              <button
                onClick={handleLikeToggle}
                disabled={liking || unliking}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {liked ? '❤️ Liked' : '🤍 Like'} ({likeCount})
              </button>

              {/* {user?.user?._id.toString() !== blog.author._id.toString() && (
                <button
                  onClick={handleFollowToggle}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    isFollowing
                      ? 'bg-gray-200 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  {isFollowing ? 'Unfollow' : 'Follow'} {blog.author.name}
                </button>
              )} */}
            </div>
          </div>

          <div className="my-4 pt-4">
            <img
              className="w-full object-cover rounded-2xl"
              src={blog.image}
              alt="Blog Banner"
            />
          </div>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlWithIds }}
          />

          <hr className="my-10 border-gray-200" />

          {/* Comments */}
          <div>
            <p className="text-2xl font-semibold">Responses ({blog.comments.length})</p>
            <div className="flex items-center gap-2 my-4">
              <img
                src={blog.author?.image || img}
                className="rounded-full w-10 h-10"
                alt="avatar"
              />
              <div>
                <h1>{user?.user?.name || 'Anonymous User'}</h1>
              </div>
            </div>
            <CommentForm
              inputData={inputData}
              onChange={(e) => setInputData(e.target.value)}
              onSubmit={handleSubmit}
              submitting={submitting}
              disabled={!user?.user}
            />
            <hr className="my-10 border-gray-200" />
            {blog.comments
              ?.slice()
              .reverse()
              .map((comment, i) => (
                <CommentItem key={i} comment={comment} />
              ))}
          </div>

          <hr className="my-10 border-gray-200" />

          <RecommndedBlogs blogId={id} key={id} />
        </div>

        {/* Right: Table of contents */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-2">Table Of Contents</h2>
              <ul className="list-disc list-inside space-y-2 text-sm">
                {toc.map(({ id, text }) => (
                  <li key={id}>
                    <a href={`#${id}`} className="hover:underline">
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
