title: [ greenhandzdl's  blog ]
description: [ 2025年之后发布的文章 ]
show_downloads: true
google_analytics:
remote_theme: pages-themes/leap-day@v0.2.0
plugins:
- jekyll-remote-theme # add this line to the plugins list if you already have one


nav:
- name: Home
  link: /
  
<nav>
  {% for item in site.nav %}
    <a href="{{ item.link }}" 
      {% if page.url == item.link %} style="color: red;" {% endif %}
    >
      {{ item.name }}
    </a>
  {% endfor %}
</nav>