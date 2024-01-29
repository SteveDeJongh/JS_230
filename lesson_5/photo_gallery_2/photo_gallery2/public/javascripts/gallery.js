document.addEventListener('DOMContentLoaded', e => {
  let templates = {};
  let photos;

  document.querySelectorAll("script[type='text/x-handlebars']").forEach(tmpl => {
    templates[tmpl["id"]] = Handlebars.compile(tmpl["innerHTML"]);
  });

  document.querySelectorAll("[data-type=partial]").forEach(tmpl => {
    Handlebars.registerPartial(tmpl["id"], tmpl["innerHTML"]);
  })

  fetch("/photos")
    .then(response => response.json())
    .then(json => {
      photos = json;
      renderPhotos();
      renderPhotoInformation(photos[0].id);
      getCommentsFor(photos[0].id);
      slideshow.init();
  });

  function renderPhotos() {
    let slides = document.querySelector('#slides');
    slides.insertAdjacentHTML('beforeend', templates.photos({photos: photos}));
  }

  function renderPhotoInformation(idx) {
    let photo = photos.filter(function(item) {
      return item.id === idx;
    })[0];
    let header = document.querySelector('section > header');
    header.innerHTML = "";
    header.insertAdjacentHTML('beforeend', templates.photo_information(photo));
  }

  function getCommentsFor(id) {
    fetch(`/comments?photo_id=${id}`)
      .then(response => response.json())
      .then(comment_json => {
        let comment_list = document.querySelector('#comments > ul');
        comment_list.innerHTML = "";
        comment_list.insertAdjacentHTML('beforeend', templates.photo_comments({comments: comment_json}));
    });
  };

  let form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(form);
    let currentSlideID =  slideshow.currentSlide.getAttribute('data-id');
    data.set('photo_id', currentSlideID);
    let queryString = new URLSearchParams([...data]);
    // let queryString = [];
    // for (const [k, v] of data) {
    //   queryString.push(k + '=' + v);
    // };
    // queryString = queryString.join('&');
    fetch('/comments/new', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: queryString,
    })
    .then(response => response.json())
    .then(json => {
      let commentsList = document.querySelector('#comments > ul');
      commentsList.insertAdjacentHTML('beforeend', templates.photo_comment(json));
      form.reset();
    })
  });

  document.querySelector('section > header').addEventListener('click', function(e) {
    e.preventDefault();
    let button = e.target;
    let buttonType = button.getAttribute("data-property");
    if (buttonType) {
      let href = button.getAttribute('href');
      let dataId = button.getAttribute('data-id');
      let text = button.textContent;

      fetch(href, {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: 'photo_id=' + dataId,
      })
      .then(response => response.json())
      .then(json => {
        button.textContent = text.replace(/\d+/, json.total);
        fetch("/photos")
          .then(response => response.json())
          .then(json => photos = json);
      });
    }
  });

  const slideshow = {
    prevslide: function(e) {
      e.preventDefault();
      let prev = this.currentSlide.previousElementSibling;
      if (!prev) {
        prev = this.lastSlide;
      }
      this.fadeOut(this.currentSlide);
      this.fadeIn(prev);
      this.renderPhotoContent(prev.getAttribute("data-id"));
      this.currentSlide = prev;
    },

    nextSlide: function(e) {
      e.preventDefault();
      let next = this.currentSlide.nextElementSibling;
      if (!next) {
        next = this.firstSlide;
      }
      this.fadeOut(this.currentSlide);
      this.fadeIn(next);
      this.renderPhotoContent(next.getAttribute("data-id"));
      this.currentSlide = next;
    },

    fadeOut: function(slide) {
      slide.classList.add('hide');
      slide.classList.remove('show');
    },

    fadeIn: function(slide) {
      slide.classList.add('show');
      slide.classList.remove('hide');
    },

    renderPhotoContent: function(idx) {
      renderPhotoInformation(Number(idx));
      getCommentsFor(idx);
    },

    bind: function() {
      let prevButton = this.slideshow.querySelector('a.prev');
      let nextButton = this.slideshow.querySelector('a.next');
      prevButton.addEventListener('click', (e) => { this.prevslide(e) });
      nextButton.addEventListener('click', (e) => { this.nextSlide(e) });
    },

    init: function() {
      this.slideshow = document.querySelector('#slideshow');
      let slides = this.slideshow.querySelectorAll('figure');
      this.firstSlide = slides[0];
      this.lastSlide = slides[slides.length - 1];
      this.currentSlide = this.firstSlide;
      this.bind();
    },
  };
})