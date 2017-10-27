
var studentItems = $('.student-item');
var studentSearch = $('.search');
var pagination = '<div class="pagination"><ul></ul></div>';
var studentList = pages(studentItems);
var listOfStudents = $('.student-list');


//10 results per page
function pages(list) {
	//array.splice(début, nbASupprimer[, élem1[, élem2[, ...]]])
	var allList = list.slice();
	var studentPerPage = [];
	while (allList.length) {
		//array.splice(de l'etudiant indice 0 à l'etudiant indice 10)
		studentPerPage.push(allList.splice(0,10));
	}
	return studentPerPage;

}

function pagination(listLength) {
  var pagesNeeded = Math.ceil((listOfStudents/10));   //divide length of student list by 10 (round up to nearest interger)
  return pagesNeeded;
}


function appendButtons(pageList) {
	$('.page').append(pagination);
	var numPages = pageList.length;
	for (var i = 1; i <= numPages; i++) {
		var buttons = '<li><a href="#">' + i + '</a></li>';
		$('.pagination ul').append(buttons);
	}
	$('.pagination ul li a').first().addClass('active');


	 $(".pagination ul li a").on("click", function(e) {
	    var pageSelection = parseInt($(this)[0].text) - 1;
	    showPages(pageSelection, pageList);
	    $(".pagination ul li a").removeClass();
	    $(this).addClass("active");

	  });
}







//filtersearch student
$('.page-header.cf').append(studentSearch);
$('.search').find('button').on('click', searchList);
$('.search').find('input').keyup(searchList);


function showPages(pageNumber, pageList) {
  $(".student-list li").hide();
  $.each(pageList, function(index, page){
      if (pageNumber === index) {
        $.each(page, function(i, listItem){
          $(listItem).fadeIn('fast');
        });
      }
  });

}

function searchList() {
  var searchTerm = $('#search').val().toLowerCase().trim();;
  var filteredStudents = studentItems.filter(function() {
    var studentEmail = $(this).find('.email').text();
    var studentNames = $(this).find('h3').text();

		if (searchTerm === 0) {
			showPages(0, studentList);
			appendButtons(studentList);
		}

    if (studentNames.indexOf(searchTerm) > -1 || studentEmail.indexOf(searchTerm) > -1) {
      return true;
      }
      return false;
      }
		);

    if (filteredStudents.length === 0 ) {
			//var message = ("Not found!");
			//$(".student-list").hide();
			//$("message").show();
      $('.page-header h2').text('No Results');
		}
    var paginated_students = pages(filteredStudents);
    $('.pagination').remove();
		if (filteredStudents.length >= 10) {
      appendButtons(paginated_students);
    }
    showPages(0, paginated_students);
			return paginated_students;
} // End: searchList


showPages(0, studentList);
appendButtons(studentList);
