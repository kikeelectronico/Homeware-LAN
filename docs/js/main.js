$(function() {
  'use strict';

  // Nav Menu
  $(".nav-toggle").click(function() {

    $(".full-page-container, .navigation-wrap").toggleClass("open");
    if ($(".full-page-container").hasClass("open")) {
      $(".nav-toggle").html('<i class="fa fa-times" aria-hidden="true"></i>');
    } else {
      $(".full-page-container, .navigation-wrap").removeClass("open");
      $(".nav-toggle").html('<i class="fa fa-bars" aria-hidden="true"></i>');
    };
    $(".overlay").toggleClass("show");

  });

  $(".overlay, .search-toggle").click(function() {
    $(".full-page-container, .navigation-wrap").removeClass("open");
    $(".overlay").removeClass("show");
    $(".nav-toggle").html('<i class="fa fa-bars" aria-hidden="true"></i>');
  });

  $(window).on("resize", function() {
    var e = $(this);
    if (e.width() >= 991) {
      $(".overlay").removeClass("show");
      $(".full-page-container").removeClass("open");
      $(".nav-toggle").html('<i class="fa fa-bars" aria-hidden="true"></i>');
    }
  });

  // Responsive Videos
  $('.page-content').fitVids({
    'customSelector': ['iframe[src*="ted.com"]']
  });

  // Medium's Image Zoom
  $('.page img, .post img').attr('data-action', 'zoom');
  $(".page a img, .post a img").removeAttr("data-action", "zoom");

  // Search Box
  $('.search-toggle').click(function() {
    $('.search-box').addClass('show');
    $('.navigation-wrap').removeClass('open');
  });
  $('.btn-close').click(function() {
    $('.search-box').removeClass('show');
  });

  // Simple Search Settings
  SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '/search.json',
    searchResultTemplate: '<li><a href="{url}">{title}</a></li>',
    noResultsText: 'No results found'
  })

  // Scroll To Top
  $('.top').click(function () {
    $('html, body').stop().animate({ scrollTop: 0 }, 'slow', 'swing');
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > $(window).height()) {
      $('.top').addClass("top-active");
    } else {
      $('.top').removeClass("top-active");
    };
  });

  // Post Thumbnail Animation
  $(".post-thumbnail").viewportChecker({
    classToAdd: "visible",
    classToRemove: "hidden",
    removeClassAfterAnimation: true,
    offset: 0
  });

  // Pagination
  $(".load-more").click(loadMorePosts);

  function loadMorePosts() {
    var _this = this;
    var $postsContainer = $(".wrapper");
    var nextPage = parseInt($postsContainer.attr("data-page")) + 1;
    var totalPages = parseInt($postsContainer.attr("data-totalPages"));

    $(this).addClass("is-loading").text("Loading...");

    $.get("/page/" + nextPage, function(data) {
      var htmlData = $.parseHTML(data);
      var $articles = $(htmlData).find("article");

      $postsContainer.attr("data-page", nextPage).append($articles);

        $(".post-thumbnail").viewportChecker({
          classToAdd: "visible",
          classToRemove: "hidden visible",
          removeClassAfterAnimation: true,
          offset: 0
        });

      if ($postsContainer.attr("data-totalPages") == nextPage) {
        $(".load-more").remove();
      }

      $(_this).removeClass("is-loading");
    });
  }

});