// ==UserScript==
// @name         Youtube Functions
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Prints data to console, so you don't have to copy and paste for an hour.
// @author       Peter Holyoke
// @match        https://www.youtube.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// @grant        none
// ==/UserScript==

//"use strict";
(function() {
  "use strict";

  // Add subtle hint to searchbar and instructions.
  $('#masthead-search-term').attr("placeholder", "Open the dev console (F12 / Ctrl+Shift+I)");
  console.log(
  `Instructions:\n
1.) YouTube Page must be in list view NOT gridview, otherwise it won't work.\n
2.) Copy and paste from the developer console. It will paste sequentially into excel.\n\n
Feel free to add or remove features.\n
Some stuff I thought of but didn't get around to:\n
- Could remove or parse html entities that show up.
- Allow it to work with grid view.
- Add button to hide toolbar.`
  );

  // Add element .button-container to page.
  $('#yt-masthead-container').after('<div class="button-container"></div>');

  // Do css and add buttons to it.
  $('.button-container').
  css(
  {
    "background":"rgb(230, 33, 23)",
    "padding": "1em",
    "margin-top": "0px",
    "margin-bottom": "0px",
    "box-shadow": "0 1px 2px rgba(0,0,0,.1)",
    "position": "relative",
    "z-index": "99999"
  }).
  append('<button class="urls">Urls</button>').
  append('<button class="titles">Titles</button>').
  append('<button class="views">Views</button>').
  append('<button class="lengths">Lengths</button>').
  append('<button class="clear">Clear</button>').
  append('<button class="bottom">Bottom</button>');

  $('#appbar-guide-menu').css({
      "z-index":"0",
      "margin-top": "8em"
  });

  $('.bottom').css("float", "right");

  // Scroll to bottom on click for long pages.
  $('.bottom').click(function() {
     $('html, body').animate({
         scrollTop: $(document).height()-$(window).height()},
         1400,
         "easeOutQuint"
     );
  });

  // Add classes from youtube onto these buttons so they fit in.
  $('.button-container button').each(function() {
     $(this).addClass("yt-uix-button  sub-menu-back-button yt-uix-sessionlink yt-uix-button-default yt-uix-button-size-default yt-uix-button-empty");
  });

  // Events to make buttons work.
  $('.clear').click(function() {console.clear();});
  $('.urls').click(function() {
      var urls = JSON.parse(getUrls());
      val = [];
      r = '';

      $(urls).each(function(k, v) { val.push(v); });
      $(val).each(function(k, v) { r += v+'\n'; });
      console.clear();
      console.log(r);
  });

  $('.views').click(function() {
      var views = JSON.parse(getViews());
      val = [];
      r = '';

      $(views).each(function(k, v) { val.push(v); });
      $(val).each(function(k, v) { r += v+'\n'; });
      console.clear();
      console.log(r);
  });

  $('.lengths').click(function() {
      var len = JSON.parse(getLengths());
      val = [];
      r = '';

      $(len).each(function(k, v) { val.push(v); });
      $(val).each(function(k, v) { r += v+'\n'; });
      console.clear();
      console.log(r);
  });

  $('.titles').click(function() {
      var len = JSON.parse(getTitles());
      val = [];
      r = '';

      $(len).each(function(k, v) { val.push(v); });
      $(val).each(function(k, v) { r += v+'\n'; });
      console.clear();
      console.log(r);
  });


})();

// Methods
function getUrls() {
  var urls = [];
  $('#browse-items-primary > li > div.feed-item-dismissable > div > div > div > div.yt-lockup-dismissable > div.yt-lockup-content > h3 > a').each(function() {
      urls.push("http://www.youtube.com"+$(this).attr('href'));
  });

  return JSON.stringify(urls);
}

function getViews() {
  var views = [];
  $('#browse-items-primary > li > div.feed-item-dismissable > div > div > div > div.yt-lockup-dismissable > div.yt-lockup-content > div.yt-lockup-meta > ul > li:nth-child(2)').each(function() {
      views.push($(this).html().replace(' views',''));
  });

  return JSON.stringify(views);
}

function getLengths() {
  var len = [];
  $('#browse-items-primary > li > div.feed-item-dismissable > div > div > div > div.yt-lockup-dismissable > div.yt-lockup-thumbnail > span > span.video-time > span').each(function(k, v) {
      len.push($(v).html());
  });

  return JSON.stringify(len);
}

function getTitles() {
  var len = [];
  $('#browse-items-primary > li > div.feed-item-dismissable > div > div > div > div.yt-lockup-dismissable > div.yt-lockup-content > h3 > a').each(function(k, v) {
      len.push($(v).html());
  });

  return JSON.stringify(len);
}

