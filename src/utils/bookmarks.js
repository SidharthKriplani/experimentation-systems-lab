const KEY = 'pal-bookmarks-v1';

// bookmark item: { room, id, title, difficulty, tags, savedAt }

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // silently fail if storage is unavailable
  }
}

export function getBookmarks() {
  return load();
}

export function isBookmarked(room, id) {
  try {
    const bookmarks = load();
    return bookmarks.some(b => b.room === room && b.id === id);
  } catch {
    return false;
  }
}

export function addBookmark(room, id, title, difficulty, tags) {
  try {
    const bookmarks = load();
    const alreadyExists = bookmarks.some(b => b.room === room && b.id === id);
    if (alreadyExists) return;
    bookmarks.push({ room, id, title, difficulty, tags, savedAt: new Date().toISOString() });
    save(bookmarks);
  } catch {
    // silently fail
  }
}

export function removeBookmark(room, id) {
  try {
    const bookmarks = load();
    const updated = bookmarks.filter(b => !(b.room === room && b.id === id));
    save(updated);
  } catch {
    // silently fail
  }
}

export function toggleBookmark(room, id, title, difficulty, tags) {
  try {
    if (isBookmarked(room, id)) {
      removeBookmark(room, id);
    } else {
      addBookmark(room, id, title, difficulty, tags);
    }
  } catch {
    // silently fail
  }
}

export function clearBookmarks() {
  try {
    save([]);
  } catch {
    // silently fail
  }
}
