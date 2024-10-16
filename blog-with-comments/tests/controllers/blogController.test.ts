import { getBlogPosts, createBlogPost, createBlogPostComment } from '../../src/controllers/blogController';
import { blogPost } from '../../src/models/blogPost';

jest.mock('../../src/models/blog');
jest.mock('../../src/models/blogComment');

describe('blogController', () => {
  it('should handle GET requests to fetch blog posts', async () => {
    // Mock Blog.find() to return a list of blog posts

    // Mock HTTP request and response objects
    const req = { params: { id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getBlogPosts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
  });

  it('should handle POST requests to create a blog post', async () => {
    // Mock Blog.create() to create a new blog post

    // Mock HTTP request and response objects
    const req = { body: { title: 'New Blog Post', content: 'This is a new blog post.' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createBlogPost(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should handle POST requests to create a blog post comment', async () => {
    // Mock Blog.findByIdAndUpdate() to update an existing blog post with a new comment

    // Mock HTTP request and response objects
    const req = { params: { blogId: 1 }, body: { commentContent: 'New comment' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createBlogPostComment(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
  });
});