const { useState, useEffect } = React;

const STORAGE_KEY = 'board-posts';

function loadPosts() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : getSamplePosts();
  } catch { return getSamplePosts(); }
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function getSamplePosts() {
  return [
    { id: 1, title: 'Welcome to the Board', author: 'Admin', content: 'This is a simple bulletin board built with React and Tailwind CSS. All data is stored in your browser\'s localStorage.', date: '2026-03-23', views: 42 },
    { id: 2, title: 'How to use this board', author: 'Admin', content: 'Click "New Post" to write a new post. Click on any post title to read it. You can delete posts from the detail view.', date: '2026-03-23', views: 28 },
    { id: 3, title: 'Design Philosophy', author: 'Designer', content: 'This board follows the Monochrome Type style guide — bold typography with extreme weight contrast, strict black/white/zinc palette, and functional minimalism.', date: '2026-03-23', views: 15 },
  ];
}

function Header({ onNavigate, currentView }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-border-subtle">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <button onClick={() => onNavigate('list')} className="font-display text-2xl md:text-3xl font-black tracking-tight text-text-primary">
          Board
        </button>
        {currentView === 'list' && (
          <button
            onClick={() => onNavigate('write')}
            className="font-display text-sm font-bold bg-dark text-white px-5 py-2.5 rounded-card hover:bg-muted transition-colors"
          >
            New Post
          </button>
        )}
      </div>
    </header>
  );
}

function PostList({ posts, onSelect }) {
  return (
    <div className="flex flex-col">
      <div className="hidden md:flex items-center px-4 md:px-6 py-3 border-b border-border-strong bg-card rounded-t-card">
        <span className="w-12 text-center font-display text-xs font-bold text-text-tertiary tracking-widest uppercase">No</span>
        <span className="flex-1 font-display text-xs font-bold text-text-tertiary tracking-widest uppercase ml-4">Title</span>
        <span className="w-24 text-center font-display text-xs font-bold text-text-tertiary tracking-widest uppercase">Author</span>
        <span className="w-24 text-center font-display text-xs font-bold text-text-tertiary tracking-widest uppercase">Date</span>
        <span className="w-16 text-center font-display text-xs font-bold text-text-tertiary tracking-widest uppercase">Views</span>
      </div>
      {posts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-display text-2xl font-extrabold text-text-disabled">No posts yet</p>
          <p className="font-body text-sm text-text-tertiary mt-2">Write the first post!</p>
        </div>
      ) : (
        posts.map((post, idx) => (
          <button
            key={post.id}
            onClick={() => onSelect(post)}
            className="flex flex-col md:flex-row md:items-center px-4 md:px-6 py-4 border-b border-border-subtle hover:bg-card transition-colors text-left w-full"
          >
            <span className="hidden md:block w-12 text-center font-display text-sm font-semibold text-text-tertiary">
              {posts.length - idx}
            </span>
            <div className="flex-1 md:ml-4">
              <span className="font-display text-base font-bold text-text-primary leading-tight">
                {post.title}
              </span>
              <div className="flex items-center gap-3 mt-1 md:hidden">
                <span className="font-body text-xs text-text-tertiary">{post.author}</span>
                <span className="font-body text-xs text-text-disabled">{post.date}</span>
                <span className="font-body text-xs text-text-tertiary">Views {post.views}</span>
              </div>
            </div>
            <span className="hidden md:block w-24 text-center font-body text-sm text-text-secondary">{post.author}</span>
            <span className="hidden md:block w-24 text-center font-body text-sm text-text-tertiary">{post.date}</span>
            <span className="hidden md:block w-16 text-center font-body text-sm text-text-tertiary">{post.views}</span>
          </button>
        ))
      )}
    </div>
  );
}

function PostDetail({ post, onBack, onDelete }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-border-strong pb-6">
        <h1 className="font-display text-2xl md:text-4xl font-black text-text-primary tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <span className="font-display text-sm font-semibold text-text-primary">{post.author}</span>
          <span className="font-body text-sm text-text-tertiary">{post.date}</span>
          <span className="font-body text-sm text-text-tertiary">Views {post.views}</span>
        </div>
      </div>
      <div className="font-body text-base text-text-secondary leading-relaxed whitespace-pre-wrap min-h-[120px]">
        {post.content}
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
        <button
          onClick={onBack}
          className="font-display text-sm font-bold border border-border-strong px-5 py-2.5 rounded-card hover:bg-card transition-colors"
        >
          Back to List
        </button>
        <button
          onClick={() => onDelete(post.id)}
          className="font-display text-sm font-bold text-text-tertiary hover:text-red-500 px-5 py-2.5 rounded-card hover:bg-red-50 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function WriteForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({
      title: title.trim(),
      author: author.trim() || 'Anonymous',
      content: content.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <h2 className="font-display text-2xl md:text-4xl font-black text-text-primary tracking-tight">
        New Post
      </h2>
      <div className="flex flex-col gap-1.5">
        <label className="font-display text-xs font-bold text-text-tertiary tracking-widest uppercase">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="font-body text-base px-4 py-3 border border-border-strong rounded-card bg-white focus:outline-none focus:border-dark transition-colors"
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="font-display text-xs font-bold text-text-tertiary tracking-widest uppercase">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Anonymous"
          className="font-body text-base px-4 py-3 border border-border-strong rounded-card bg-white focus:outline-none focus:border-dark transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="font-display text-xs font-bold text-text-tertiary tracking-widest uppercase">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content here..."
          rows={8}
          className="font-body text-base px-4 py-3 border border-border-strong rounded-card bg-white focus:outline-none focus:border-dark transition-colors resize-none"
          required
        />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="font-display text-sm font-bold bg-dark text-white px-6 py-3 rounded-card hover:bg-muted transition-colors"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="font-display text-sm font-bold border border-border-strong px-6 py-3 rounded-card hover:bg-card transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border-subtle mt-12">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <span className="font-display text-sm font-bold text-text-disabled">Board</span>
        <span className="font-body text-xs text-text-disabled">Made with React & Tailwind CSS</span>
      </div>
    </footer>
  );
}

function App() {
  const [posts, setPosts] = useState(() => loadPosts());
  const [view, setView] = useState('list');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => { savePosts(posts); }, [posts]);

  const handleSelect = (post) => {
    const updated = posts.map(p => p.id === post.id ? { ...p, views: p.views + 1 } : p);
    setPosts(updated);
    setSelectedPost({ ...post, views: post.views + 1 });
    setView('detail');
  };

  const handleWrite = ({ title, author, content }) => {
    const newPost = {
      id: Date.now(),
      title,
      author,
      content,
      date: new Date().toISOString().slice(0, 10),
      views: 0,
    };
    setPosts([newPost, ...posts]);
    setView('list');
  };

  const handleDelete = (id) => {
    setPosts(posts.filter(p => p.id !== id));
    setView('list');
  };

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Header onNavigate={setView} currentView={view} />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-6 py-6 md:py-10">
        {view === 'list' && (
          <PostList posts={posts} onSelect={handleSelect} />
        )}
        {view === 'detail' && selectedPost && (
          <PostDetail post={selectedPost} onBack={() => setView('list')} onDelete={handleDelete} />
        )}
        {view === 'write' && (
          <WriteForm onSubmit={handleWrite} onCancel={() => setView('list')} />
        )}
      </main>
      <Footer />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
