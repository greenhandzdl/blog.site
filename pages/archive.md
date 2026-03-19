---
layout: page
title: 归档
permalink: /archive/
---

<div class="archive-container">
  <h1>📚 文章归档</h1>

  <p class="archive-intro">共 {{ site.posts.size }} 篇文章</p>

  <!-- Sort Controls -->
  <div class="sort-controls">
    <label for="sort-order">排序方式：</label>
    <select id="sort-order" class="sort-select" onchange="sortArchive()">
      <option value="newest">时间最新</option>
      <option value="oldest">时间最旧</option>
    </select>
  </div>

  <!-- Year-based archive view -->
  <div id="archive-content" class="archive-by-year">
    <!-- Content will be dynamically sorted by JavaScript -->
  </div>
</div>

<script>
(function() {
  // Store all posts data
  const postsData = [
    {% for post in site.posts %}
    {
      url: "{{ post.url | relative_url }}",
      title: "{{ post.title | escape }}",
      date: "{{ post.date | date: '%Y-%m-%d' }}",
      dateDisplay: "{{ post.date | date: '%m月%d日' }}",
      year: "{{ post.date | date: '%Y' }}"
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];

  // Group posts by year
  function groupByYear(posts) {
    const grouped = {};
    posts.forEach(post => {
      if (!grouped[post.year]) {
        grouped[post.year] = [];
      }
      grouped[post.year].push(post);
    });
    return grouped;
  }

  // Render archive
  function renderArchive(sortOrder) {
    let sortedPosts = [...postsData];

    // Sort posts
    if (sortOrder === 'newest') {
      sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      sortedPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    // Group by year
    const grouped = groupByYear(sortedPosts);

    // Sort years
    const years = Object.keys(grouped).sort((a, b) => {
      return sortOrder === 'newest' ? b - a : a - b;
    });

    // Build HTML
    let html = '';
    years.forEach((year, index) => {
      const posts = grouped[year];
      const isOpen = index === 0 ? 'open' : '';
      html += `
        <details class="archive-year" ${isOpen}>
          <summary class="year-header">${year} 年 (${posts.length} 篇)</summary>
          <ul class="post-list">
            ${posts.map(post => `
              <li class="archive-post-item">
                <span class="post-date">${post.dateDisplay}</span>
                <a href="${post.url}" class="post-link">${post.title}</a>
              </li>
            `).join('')}
          </ul>
        </details>
      `;
    });

    document.getElementById('archive-content').innerHTML = html;
  }

  // Initial render
  renderArchive('newest');

  // Make sortArchive globally available
  window.sortArchive = function() {
    const sortOrder = document.getElementById('sort-order').value;
    renderArchive(sortOrder);
  };
})();
</script>

<style>
.sort-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--secondary);
  border-radius: 10px;
  border: 2px solid var(--border);
}

.sort-controls label {
  font-weight: 500;
  color: var(--text);
}

.sort-select {
  padding: 0.5em 1em;
  border: 2px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sort-select:hover {
  border-color: var(--primary);
  background: var(--bg);
}

.sort-select:focus {
  outline: none;
  border-color: var(--accent);
}
</style>