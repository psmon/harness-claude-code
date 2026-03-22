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
    { id: 1, title: 'Welcome to the Board', author: 'Admin', content: 'This is a simple bulletin board built with React and Tailwind CSS. All data is stored in your browser\'s localStorage.\n\nFeel free to create, read, and delete posts. Everything runs in your browser — no server needed.', date: '2026-03-23', views: 42 },
    { id: 2, title: 'How to use this board', author: 'Admin', content: 'Click "New Post" to write a new post. Click on any post title to read it. You can delete posts from the detail view.\n\nAll data persists in localStorage across browser sessions.', date: '2026-03-23', views: 28 },
    { id: 3, title: 'Design Philosophy', author: 'Designer', content: 'This board follows the Dark Classy style guide — layered dark surfaces, warm orange accents, editorial serif headlines, and monospace data presentation.\n\nThe tri-font system uses Instrument Serif for titles, Inter for UI, and DM Mono for numbers.', date: '2026-03-23', views: 15 },
  ];
}

function Header({ onNavigate, currentView }) {
  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-sm border-b border-border-dark">
      <div className="max-w-4xl mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
        <button onClick={() => onNavigate('list')} className="font-mono text-lg md:text-xl font-semibold text-text-primary tracking-[4px]">
          Board
        </button>
        {currentView === 'list' && (
          <button
            onClick={() => onNavigate('write')}
            className="font-body text-[13px] font-medium bg-accent text-white px-5 py-2.5 rounded-btn hover:bg-accent-light transition-colors"
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
    <div className="rounded-card overflow-hidden bg-surface">
      <div className="hidden md:flex items-center h-11 px-5 bg-recessed border-b border-border-dark">
        <span className="w-12 text-center font-body text-[11px] font-semibold text-text-muted tracking-[0.5px] uppercase">No</span>
        <span className="flex-1 font-body text-[11px] font-semibold text-text-muted tracking-[0.5px] uppercase ml-4">Title</span>
        <span className="w-24 text-center font-body text-[11px] font-semibold text-text-muted tracking-[0.5px] uppercase">Author</span>
        <span className="w-28 text-center font-body text-[11px] font-semibold text-text-muted tracking-[0.5px] uppercase">Date</span>
        <span className="w-16 text-center font-body text-[11px] font-semibold text-text-muted tracking-[0.5px] uppercase">Views</span>
      </div>
      {posts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-serif text-3xl text-text-disabled italic">No posts yet</p>
          <p className="font-body text-sm text-text-muted mt-3">Write the first post!</p>
        </div>
      ) : (
        posts.map((post, idx) => (
          <button
            key={post.id}
            onClick={() => onSelect(post)}
            className="flex flex-col md:flex-row md:items-center w-full px-4 md:px-5 py-4 md:py-0 md:h-14 border-b border-border-dark last:border-b-0 hover:bg-elevated transition-colors text-left group"
          >
            <span className="hidden md:block w-12 text-center font-mono text-[13px] font-medium text-text-muted">
              {posts.length - idx}
            </span>
            <div className="flex-1 md:ml-4">
              <span className="font-body text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                {post.title}
              </span>
              <div className="flex items-center gap-3 mt-1.5 md:hidden">
                <span className="font-body text-xs text-text-secondary">{post.author}</span>
                <span className="font-body text-xs text-text-tertiary">{post.date}</span>
                <span className="font-mono text-xs text-text-tertiary">{post.views} views</span>
              </div>
            </div>
            <span className="hidden md:block w-24 text-center font-body text-[13px] text-text-secondary">{post.author}</span>
            <span className="hidden md:block w-28 text-center font-body text-[13px] text-text-tertiary">{post.date}</span>
            <span className="hidden md:block w-16 text-center font-mono text-[13px] font-medium text-text-tertiary">{post.views}</span>
          </button>
        ))
      )}
    </div>
  );
}

function PostDetail({ post, onBack, onDelete }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="pb-6 border-b border-border-el">
        <h1 className="font-serif text-3xl md:text-[38px] text-text-primary leading-tight" style={{ letterSpacing: '-1px' }}>
          {post.title}
        </h1>
        <div className="flex items-center gap-4 mt-5">
          <span className="font-body text-sm font-semibold text-text-primary">{post.author}</span>
          <span className="font-body text-sm text-text-tertiary">{post.date}</span>
          <span className="font-mono text-sm text-text-muted bg-accent-tint px-2.5 py-0.5 rounded-pill">{post.views} views</span>
        </div>
      </div>
      <div className="font-body text-[15px] text-text-secondary leading-relaxed whitespace-pre-wrap min-h-[140px]">
        {post.content}
      </div>
      <div className="flex items-center gap-3 pt-6 border-t border-border-dark">
        <button
          onClick={onBack}
          className="font-body text-[13px] font-medium border border-border-el text-text-secondary px-5 py-2.5 rounded-btn hover:bg-elevated hover:text-text-primary transition-colors"
        >
          Back to List
        </button>
        <button
          onClick={() => onDelete(post.id)}
          className="font-body text-[13px] font-medium text-text-muted hover:text-error hover:bg-error/10 px-5 py-2.5 rounded-btn transition-colors"
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
      <h2 className="font-serif text-3xl md:text-[38px] text-text-primary" style={{ letterSpacing: '-1px' }}>
        New Post
      </h2>
      <div className="flex flex-col gap-2">
        <label className="font-body text-[11px] font-semibold text-text-muted tracking-[0.5px] uppercase">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="font-body text-sm px-4 py-3 border border-border-el rounded-btn bg-surface text-text-primary placeholder-text-disabled focus:outline-none focus:border-accent transition-colors"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-body text-[11px] font-semibold text-text-muted tracking-[0.5px] uppercase">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Anonymous"
          className="font-body text-sm px-4 py-3 border border-border-el rounded-btn bg-surface text-text-primary placeholder-text-disabled focus:outline-none focus:border-accent transition-colors"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-body text-[11px] font-semibold text-text-muted tracking-[0.5px] uppercase">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content here..."
          rows={8}
          className="font-body text-sm px-4 py-3 border border-border-el rounded-btn bg-surface text-text-primary placeholder-text-disabled focus:outline-none focus:border-accent transition-colors resize-none"
          required
        />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="font-body text-[13px] font-medium bg-accent text-white px-6 py-3 rounded-btn hover:bg-accent-light transition-colors"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="font-body text-[13px] font-medium border border-border-el text-text-secondary px-6 py-3 rounded-btn hover:bg-elevated transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border-dark mt-auto">
      <div className="max-w-4xl mx-auto px-4 md:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <span className="font-mono text-sm font-medium text-text-disabled tracking-[4px]">Board</span>
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
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-10 py-8 md:py-10">
        {view === 'list' && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <h1 className="font-serif text-3xl md:text-[38px] text-text-primary" style={{ letterSpacing: '-1px' }}>
                All Posts
              </h1>
              <span className="font-body text-[11px] font-medium text-accent bg-accent-tint px-2.5 py-1 rounded-pill">
                {posts.length} posts
              </span>
            </div>
            <PostList posts={posts} onSelect={handleSelect} />
          </div>
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
