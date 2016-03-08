$(document).ready(function() {
  getLinks();
  createLink();
});

function renderLink(link) {
  $("#latest-links").prepend(
    "<div class='link' data-id='" +
    link.id +
    "'><h6>Published on " +
    link.created_at +
    "</h6><p>" +
    "<b id='link-title' contentEditable='true'>" +
    link.title +
    "</b><p id='link-url' contentEditable='true'>" +
    link.url +
    "</p><p id='link-quality" +
    link.id +
    "'>Read: " +
    link.read +
    "<p><button id='change-link-status" +
    link.id +
    "' name='button-fetch' class='btn btn-default btn-xs'>Change Status</button>" +
    "</p>" +
    "<button id='delete-link' name='button-fetch' class='btn btn-default btn-xs'>Delete</button>" +
    "</div>"
  );
    // changeLinkStatus(link.id);
}

function getLinks() {
  $.getJSON('api/links.json')
    .then(function(links){
      $.each(links, function(index, link){
        renderLink(link);
    });
  });
}

function createLink() {
  $('#create-link').on('click', function(){
    var linkTitle  = $('#link-title').val();
    var linkurl   = $('#link-url').val();
    var linkParams = {
      link: {
        title: linkTitle,
        url: linkurl
      }
    };

    $('#link-title').val('');
    $('#link-url').val('');

    $.post("api/links.json", linkParams, $(this).serialize())
      .done(renderLink);
  });
}
