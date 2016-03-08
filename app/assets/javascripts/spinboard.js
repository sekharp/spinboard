$(document).ready(function() {
  getLinks();
  createLink();
  deleteLink();
  // editTitle();
  // editUrl();
});

function renderLink(link) {
  $("#latest-links").prepend(
    "<div class='link' data-id='link" +
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
    changeLinkStatus(link.id);
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

function deleteLink() {
  $('#latest-links').delegate('#delete-link', 'click', function() {
    var $link = $(this).closest('.link');

    $.ajax({
      type: 'DELETE',
      url: 'api/links/' + $link.attr('data-id') + '.json',
      success: function(response) {
        $link.remove();
      }
    });
  });
}

function changeLinkStatus(id) {
  $('#change-link-status' + id).on('click', function(){
    event.preventDefault();

    $.getJSON('/api/links/' + id, function(link){
      var status = link.read
      $.ajax({
        type: 'PUT',
        url: '/api/links/' + id + '.json',
        data: {
          link: {read: !status}
        },
        success: function(link) {
          $('#link-quality' + id).html("Read: " + !status)
          // if(!status === true) {
          //   $('#link' + id).append("</strike>"),
          //   $('#link' + id).prepend("<strike>");
          // }
        }
      });
    });
  });
}
