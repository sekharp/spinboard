$(document).ready(function() {
  deleteLink();
  editTitle();
  editUrl();
  searchLinks();
  searchStatus();
  alphabetizeSort();
  changeLinkStatus();
});

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

function changeLinkStatus() {
  $.getJSON('api/links.json')
    .then(function(links){
      $.each(links, function(index, link){
        changeStatus(link.id);
    });
  });
}

function changeStatus(id) {
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
        }
      });
    });
  });
}

function editTitle() {
  $('#latest-links').delegate('#link-title', 'keydown', function(event) {
    if(event.which == 13 || event.keyCode == 13){
      var $title = event.currentTarget.textContent;
      var $id = $(this).closest('.link').attr('data-id');
      var params = {
        link: {
          title: $title,
        }
      };
      event.preventDefault();
      this.blur();
      $.ajax({
        type: 'PUT',
        url: '/api/links/' + $id + '.json',
        data: params,
        success: function(link){
        }
      });
    }
  });
}

function editUrl() {
  $('#latest-links').delegate('#link-url', 'keydown', function(event) {
    if(event.which == 13 || event.keyCode == 13){
      var $url = event.currentTarget.textContent;
      var $id = $(this).closest('.link').attr('data-id');
      var params = {
        link: {
          url: $url,
        }
      };
      event.preventDefault();
      this.blur();
      $.ajax({
        type: 'PUT',
        url: '/api/links/' + $id + '.json',
        data: params,
        success: function(link){
        }
      });
    }
  });
}

function searchLinks() {
  $("#filter").keyup(function(){
		var filter = $(this).val();
		$("#latest-links").children().each(function(){
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				$(this).fadeOut();
			} else {
				$(this).fadeIn();
			}
		});
	});
}

function searchStatus() {
  $("#status-filter").keyup(function(){
		var filter = $(this).val();
		$(".link-quality").each(function(){
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				$(this).parent().fadeOut();
			} else {
				$(this).parent().fadeIn();
			}
		});
	});
}

function alphabetizeSort() {
  $('#link-sort-list').on('click', function() {
    console.log($("#latest-links"))
  });
}
