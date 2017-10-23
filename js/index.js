
var studentItems = $('.student-item');
var studentSearch = $('.search');
var pagination
var studentList = pages(studentItems);


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
showPages(0, studentList);


function searchList() {
    var searchTerm = $('#search').val();

        var filterStudents = studentItems.filter(function(i) {
        	var studentEmail = $(this).find('.email').text();
          var studentNames = $(this).find('h3').text();

        });
        if (filterStudents.length === 0 ) {
        	$('.page-header h2').text('No Results');
        } else {
        	$('.page-header h2').text('STUDENTS');
        }
        var paginated_students = pages(filterStudents);
        $('.pagination').remove();
        if (filterStudents.length >= 10) {
          appendButtons(paginated_students);
        }
     
}
