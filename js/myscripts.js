// Function to load profil from json
$(document).ready(function() {
	$.getJSON("jsons/profil.json", function(data){
		$("#myname").append(data.name);
		$("#mytitle").append(data.title);
		$("#img-profil").attr("src", data.image);
		$("#abstract").append(data.abstract);
		for (var i=0; i<data.keywords.length; i++){
			if (i<data.keywords.length-1){
				$("#keywords").append(data.keywords[i] + ', ');
			}else{
				$("#keywords").append(data.keywords[i] + '.');
			}
		}
		$("#address").append(data.contact.employer + '<br>' + data.contact.street + '<br>' + data.contact.city + '<br>');
		$("#email").append(data.contact.email);
		$("#phone").append(data.contact.phone);
		// External links if exist
		var idstring;
		$.each(data.links, function(key,val){
			idstring='#' + key;
			$(idstring+ ' a').attr("href", val);
			$(idstring).show();
		});
	});
});

// Function to load news from json
$(document).ready(function() {
    $.getJSON("jsons/news.json", function(data){
    	var numToshow=5;
    	var newsdict = data.news;
    	for (var i=0; i< newsdict.length; i++){
    		if (i<numToshow){
    			$("#list-news").append( "<li style=\"display: list-item;\"><b>" + newsdict[i].date + ":</b> " + newsdict[i].content + "</li>" );
    		}else{
    			$("#list-news").append( "<li style=\"display: none;\"><b>" + newsdict[i].date + ":</b> " + newsdict[i].content + "</li>" );
    		}
    		
    	}

    	// + or -
    	size_li = $("#list-news li").length;
    	x = numToshow;
    	$('#see-more').click(function () {
	        x= (x+1 <= size_li) ? x+5 : size_li;
	        $('#list-news li:lt('+x+')').show();
	    });
	    $('#see-less').click(function () {
	        x=(x-5<0) ? 5 : x-5;
	        x= (x<= 5) ? 5 : x;
	        $('#list-news li').not(':lt('+x+')').hide();
	    });
    });
});

// Function to load bio from json
$(document).ready(function(){
	$.getJSON("jsons/bio.json", function(data){
		// background
		for (var i=0; i<data.background.length; i++){
			employ_string='';
			for (e=0; e<data.background[i].employer.length; e++){
				if (e>0){
					if (e==(data.background[i].employer.length-1)){
						employ_string = employ_string + ' and ';
					}else{
						employ_string = employ_string + ', ';
					}
				}
				employ_string = employ_string + '<a href="' + data.background[i].employer_links[e] + '" target="_blank"> ' + data.background[i].employer[e] + '</a>';
			}
			$("#background").append('<li><B>' + data.background[i].date + ':</B> ' + data.background[i].position + ' at ' + employ_string + '</li>');
		}

		// education
		for (var i=0; i<data.education.length; i++){
			school_string='';
			for (e=0; e<data.education[i].school.length; e++){
				if (e>0){
					if (e==(data.education[i].school.length-1)){
						school_string = school_string + ' and ';
					}else{
						school_string = school_string + ', ';
					}
				}
				school_string = school_string + '<a href="' + data.education[i].school_links[e] + '" target="_blank"> ' + data.education[i].school[e] + '</a>';
			}
			$("#education").append('<li><B>' + data.education[i].date + ':</B> ' + data.education[i].degree + ' at ' + school_string + '</li>');
		}

		// responsabilities
		for (var i=0; i<data.responsabilities.length; i++){
			$("#responsabilities").append('<li>'+ data.responsabilities[i] + '</li>');
		}
	});
});

// Function to load projects from json
$(document).ready(function(){
	$.getJSON("jsons/projects.json", function(data){
		//current
		for (var i=0; i<data.current.length; i++){
			partner_string='';
			if (data.current[i].partners.length>0){
				partner_string = '<br>In collaboration with ';
				for (e=0; e<data.current[i].partners.length; e++){
					if (e>0){
						if (e==(data.current[i].partners.length-1)){
							partner_string = partner_string + ' and ';
						}else{
							partner_string = partner_string + ', ';
						}
					}
					partner_string = partner_string + '<a href="' + data.current[i].partners_links[e] + '" target="_blank">' + data.current[i].partners[e] + '</a>';
				}
			}
			if (data.current[i].link != ''){
				projet_string='<B><a href="' + data.current[i].link + '" target="_blank">' + data.current[i].name + '</a> (' + data.current[i].date + '):</B> ' + data.current[i].topic + '. ';
			}else{
				projet_string='<B><a href="#research">' + data.current[i].name + '</a> (' + data.current[i].date + '):</B> ' + data.current[i].topic + '. ';
			}
			funding_string='';
			if (data.current[i].fundings != ''){
				funding_string = ' <B>Fundings</B>: ' + data.current[i].fundings + '.'; 
			}
			$("#projects-current").append('<li>' + projet_string + partner_string + '.' + funding_string + '</li>');
		}

		// past
		for (var i=0; i<data.past.length; i++){
			partner_string='';
			if (data.past[i].partners.length>0){
        partner_string = '<br>In collaboration with ';
				for (e=0; e<data.past[i].partners.length; e++){
					if (e>0){
						if (e==(data.past[i].partners.length-1)){
							partner_string = partner_string + ' and ';
						}else{
							partner_string = partner_string + ', ';
						}
					}
					partner_string = partner_string + '<a href="' + data.past[i].partners_links[e] + '" target="_blank">' + data.past[i].partners[e] + '</a>';
				}
			}
			if (data.past[i].link != ''){
				projet_string='<B><a href="' + data.past[i].link + '" target="_blank">' + data.past[i].name + '</a> (' + data.past[i].date + '):</B> ' + data.past[i].topic + '. ';
			}else{
				projet_string='<B><a href="#research">' + data.past[i].name + '</a> (' + data.past[i].date + '):</B> ' + data.past[i].topic + '. ';
			}
			funding_string='';
			if (data.past[i].fundings != ''){
				funding_string = ' <B>Fundings</B>: ' + data.past[i].fundings + '.'; 
			}
			$("#projects-past").append('<li>' + projet_string + partner_string + funding_string + '. </li>');
		}
	});
});

// Function to load students from json
$(document).ready(function(){
	$.getJSON("jsons/students.json", function(data){
		//phd
		for (var i=0; i<data.phd.length; i++){
			partner_string='';
			if (data.phd[i].partners.length>0){
				if (data.phd[i].hasOwnProperty('enterprise')){
					enterprise_string = '<br>In collaboration with <a href="' + data.phd[i].enterprise_link + '" target="_blank">' + data.phd[i].enterprise + '</a>, ';
					partner_string = enterprise_string + 'co-advised with ';
				}
				else{
					partner_string = '<br>Co-advised with ';
				}
				for (e=0; e<data.phd[i].partners.length; e++){
					if (e>0){
						if (e==(data.phd[i].partners.length-1)){
							partner_string = partner_string + ' and ';
						}else{
							partner_string = partner_string + ', ';
						}
					}
					partner_string = partner_string + '<a href="' + data.phd[i].partners_links[e] + '" target="_blank">' + data.phd[i].partners[e] + '</a>';
				}
			}
			if (data.phd[i].link != ''){
				student_string='<B><a href="' + data.phd[i].link + '" target="_blank">' + data.phd[i].name + '</a></B>' + ' <B>(' + data.phd[i].date + '):</B> ' + data.phd[i].topic + '. ';
			}else{
				student_string='<B><a href="#research">' + data.phd[i].name + '</a></B>' + ' <B>(' + data.phd[i].date + '):</B> ' + data.phd[i].topic + '. ';
			}
			$("#students-phd").append('<li>' + student_string + partner_string + '</li>');
		}
    for (var i = 0; i < data.master.length; i++) {
      partner_string = '<br>Co-supervised with ';
      for (e = 0; e < data.master[i].partners.length; e++) {
        if (e > 0) {
          if (e == (data.master[i].partners.length - 1)) {
            partner_string = partner_string + ' and ';
          } else {
            partner_string = partner_string + ', ';
          }
        }
        partner_string = partner_string + '<a href="' + data.master[i].partners_links[e] + '" target="_blank">' + data.master[i].partners[e] + '</a>';
      }
      if (data.master[i].link != '') {
        student_string = '<B><a href="' + data.master[i].link + '" target="_blank">' + data.master[i].name + '</a></B>' + ' <B>(' + data.master[i].date + '):</B> ' + data.master[i].topic;
      } else {
        student_string = '<B><a href="#research">' + data.master[i].name + '</a></B>' + ' <B>(' + data.master[i].date + '):</B>' + data.master[i].topic;
      }
      $("#students-master").append('<li>' + student_string + partner_string + '.</li>');
    }
	});
});

// Function to load services from json
$(document).ready(function () {
  $.getJSON("jsons/services.json", function (data) {
    $("#reviewerJournals").append(data.reviewerJournals);
  });
});
$(document).ready(function () {
  $.getJSON("jsons/services.json", function (data) {
    $("#reviewerConferences").append(data.reviewerConferences);
  });
});
$(document).ready(function () {
  $.getJSON("jsons/services.json", function (data) {
    $("#programcomittee").append(data.programcomittee);
  });
});
$(document).ready(function () {
  $.getJSON("jsons/services.json", function (data) {
    $("#organizingcomittee").append(data.organizingcomittee);
  });
});

// Function to load teaching from json
$(document).ready(function(){
	$.getJSON("jsons/teaching.json", function(data){
		// institutions
		for (var i=0; i<data.institutions.length; i++){
			school_string=data.institutions[i].school;
			if (data.institutions[i].link != ''){
				school_string = '<a href="' + data.institutions[i].link + '" target="blank_">' + school_string + '</a>';
			}
			if (data.institutions[i].info != ''){
				school_string = school_string + ' (' + data.institutions[i].info + ')';
			}
			$("#institutions").append('<li><B>' + data.institutions[i].date + ':</B> ' + school_string + ', ' + data.institutions[i].department + '.</li>');
		}

		// courses
		for (var i=0; i<data.courses.length; i++){
			index_list = (i % 3) +1;
			list_id = '#courses' + index_list;
			$(list_id).append('<li>' + data.courses[i] + '</li>');
		}
	});
});


// Function to load demos from json
$(document).ready(function(){
	$.getJSON("jsons/demos.json", function(data){
		for (var i=0; i<data.demos.length; i++){
			$("#demos-content").append('<div"><h4 class="vertical-title-bar">' + data.demos[i].title + '</h4></div>');
			$("#demos-content").append('<p class="text-justify">' + data.demos[i].description + '</p>');
			div_demo = 'row_demo' + i;
			$("#demos-content").append('<div id="' + div_demo + '" class="row justify-content-center align-items-center"></div');
			$('#'+div_demo).append('<div class="col-md-5"><iframe loading="lazy" width="420" height="315" src="' + data.demos[i].video_src + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>');
			if (data.demos[i].img_legend  != '') {
				$('#'+div_demo).append('<div class="col-md-5"><img width="400rem" src="' + data.demos[i].img_legend + '"></div>');
			}
			$("#demos-content").append('<br><br>');
		}
	});
});

// Function to retrieve publications from HAL
function getPublications(){
  const AUTHOR = "Ayoub-Karine";
  const HAL_API_URL = 'https://api.archives-ouvertes.fr/search/' +
    '?q=auth_t:("'+AUTHOR+'")'+ 
    '&fl=docType_s,authFullName_s,title_s,citationRef_s,label_s,label_bibtex,seeAlso_s' +
    '&sort=producedDate_s desc';
  fetch(HAL_API_URL)
    .then(publis => publis.json()) 
    .then(function(data){
      showJournals(data.response);
      showConferences(data.response);
      showThesis(data.response);
    })
    .catch(error => console.log("Erreur !"));
}
function showJournals(data){
  content = "<ol>";
  for (let i = 0; i < data.numFound; i++) {
    if (data.docs[i].docType_s=="ART"){
      let id ="int_journals";
      content += "<li>"; 
      for (let author of data.docs[i].authFullName_s)
        content += author + ', ';
      content += ' <b>' + data.docs[i].title_s + '</b>. ';
      content += '<span class="reference">' + data.docs[i].citationRef_s + ' </span>';
      content += ' <a href=" + data.docs[i].label_bibtex + "';
      content += ' class="badge badge-secondary" download>bibtex</a>';
      if(data.docs[i].seeAlso_s!=""){
        content += ' <a href=' + data.docs[i].seeAlso_s + '"';
        content += ' class="badge badge-secondary" download>code</a>';
        }
      content += "</li>";
    }
  }
  content += "</ol>"
  $("#int_journals").append(content);
}
function showConferences(data) {
  content = "<ol>";
  for (let i = 0; i < data.numFound; i++) {
    if (data.docs[i].docType_s == "COMM") {
      content += "<li>";
      for (let author of data.docs[i].authFullName_s)
        content += author + ', ';
      content += ' <b>' + data.docs[i].title_s + '</b>. ';
      content += '<span class="reference">' + data.docs[i].citationRef_s + ' </span>';
      content += ' <a href="data:application/octet-stream,' + data.docs[i].label_bibtex + '"';
      content += ' class="badge badge-secondary" download>bibtex</a>';
      console.log(data.docs[i].seeAlso_s);
      console.log("test");
      if(data.docs[i].seeAlso_s!=""){
        content += ' <a href=' + data.docs[i].seeAlso_s + '"';
        content += ' class="badge badge-secondary" download>code</a>';
        }
      content += "</li>";
    }
  }
  content += "</ol>"
  $("#confs").append(content);
}
function showThesis(data) {
  content = "<ol>";
  for (let i = 0; i < data.numFound; i++) {
    if (data.docs[i].docType_s == "THESE") {
      content += "<li>";
      for (let author of data.docs[i].authFullName_s)
        content += author + ', ';
      content += ' <b>' + data.docs[i].title_s + '</b>. ';
      content += '<span class="reference">' + data.docs[i].citationRef_s + ' </span>';
      content += ' <a href="data:application/octet-stream,' + data.docs[i].label_bibtex + '"';
      content += ' class="badge badge-secondary" download>bibtex</a>';
      content += "</li>";
    }
  }
  content += "</ol>"
  $("#dissertations").append(content);
}
getPublications();


// Function for smooth scroll on links
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});


// Function for load a highlited info if necessary
$(document).ready(function(){
  $.getJSON("jsons/highlight.json", function(data){
   	if (data.news.length>0){
   		link_string = '';
   		if (data.news[0].link != ''){
   			link_string = ' <a href="' + data.news[0].link + '" target="blank_">' + data.news[0].link_text + '</a>';
   		}
   		$("#highlight_news").append('<div class="alert alert-success" role="alert"><B>' + data.news[0].date + ' - ' + data.news[0].title + ':</B> ' + data.news[0].description + '.' + link_string + '</div>');
   	}
   });
});
