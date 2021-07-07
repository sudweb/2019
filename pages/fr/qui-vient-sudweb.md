---
title: Qui vient à Sud Web 2019 ?
description: "Aperçu des participants de l’édition de Sud Web 2019"
permalink: /qui-vient-sudweb/
---
{% assign min = 1 %}
{% assign max = 16 %}
{% assign diff = max | minus: min %}
<section class="section">
  <div class="wrapper">
  <h1>{{ page.title }}</h1>
  <p>il·elle·s seront avec nous à Sudweb 2019 Toulouse. Plus on est de fous, plus on rit. Venez rire avec nous !</p>
  <div class="grid-2">
  {% for participants in site.data.participants %}
    {% assign randomNumber = "now" | date: "%N" | modulo: diff | plus: min %}
    {% if participants.public %}
    <div>
    {% if participants.twitter %}
    <figure class="conference-speaker-pic">
      <a title="Aller directement à l’intervention de {{ speaker.title }}" href="{{ speaker.url | relative_url }}">
      <img
          src="https://twitter.com/{{ participants.twitter }}/profile_image?size=mini"
          data-src="https://twitter.com/{{ participants.twitter }}/profile_image?size=bigger" class="person-avatar lozad fade"
          alt="{{ participants.forname }} - {{ participants.lastname }}" width="100" height="100">
      </a>
    </figure>
    {% else %}
    <figure class="conference-speaker-pic">
      <a title="Aller directement à l’intervention de {{ speaker.title }}" href="{{ speaker.url | relative_url }}">
      <img
          data-src="/2019/assets/images/merci/anonymous/{{ randomNumber }}.svg" class="person-avatar lozad fade"
          alt="{{ participants.forname }} - {{ participants.lastname }}" width="100" height="100">
      </a>
    </figure>
    {% endif %}
    <h3 class="conference-speaker-name" style="margin-bottom: 0.5em;">
        <a href="https://twitter.com/{{ participants.twitter }}">{{ participants.forname }} {{ participants.lastname }}</a><br>
        {% if participants.twitter %}<span class="text-xs">{{ participants.twitter }}</span>{% endif %}
      </h3>
    </div>
    {% endif %}
  {% endfor %}
  </div>
  </div>
</section>

<hr class="wrapper">
