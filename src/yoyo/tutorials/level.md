---
pagination: 
  data: tutorialLevels
  size: 1
  alias: level
permalink: "/yoyo/tutorials/{{ level.slug }}/"
layout: "layouts/tutorial-level.njk"
navSection: "yoyo"
eleventyComputed: 
  title: "{{ level.title }} tutorials."
  pageTitle: "{{ level.title }} Yo-Yo Tutorials"
  description: "{{ level.title }} yo-yo tutorials from Mike Montgomery."
  eyebrow: "{{ level.title }} Yo-Yo Tutorials"
  intro: "These tutorials are shown in playlist order."
  breadcrumbs:
    - label: "Yo-Yo"
      url: "/yoyo/"
    - label: "Tutorials"
      url: "/yoyo/tutorials/"
---
