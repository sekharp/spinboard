$(document).ready(function() {
  // getLinks();
  deleteLink();
  editTitle();
  editUrl();
  searchLinks();
  searchStatus();
  alphabetizeSort();
});

// function renderLink(link) {
//   $("#latest-links").prepend(
//     "<div class='link' data-id='" +
//     link.id +
//     "'><h6>Published on " +
//     link.created_at +
//     "</h6><p>" +
//     "<b id='link-title' contentEditable='true'>" +
//     link.title +
//     "</b><p id='link-url' contentEditable='true'>" +
//     link.url +
//     "</p><p class='link-quality' id='link-quality" +
//     link.id +
//     "'>Read: " +
//     link.read +
//     "<p><button id='change-link-status" +
//     link.id +
//     "' name='button-fetch' class='btn btn-default btn-xs'>Change Status</button>" +
//     "</p>" +
//     "<button id='delete-link' name='button-fetch' class='btn btn-default btn-xs'>Delete</button>" +
//     "</div>"
//   );
//     changeLinkStatus(link.id);
// }

// function getLinks() {
//   $.getJSON('api/links.json')
//     .then(function(links){
//       $.each(links, function(index, link){
//         renderLink(link);
//         if(link.read === true) {
//           $("[data-id=" + link.id + "]").wrap("<strike></strike>");
//         // } else {
//         //   $('#link' + link.id).unwrap();
//         }
//     });
//   });
// }

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
