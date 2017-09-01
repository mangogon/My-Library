$(function(){
    var message = $("<div/>",{class:"alert alert-success"});
    message.html("Hello <b>Vasylyna</b>!");
    $("#message").html(message);
    
    var results_source = $("#results-template").html();
    var results_template = Handlebars.compile(results_source);
    
    var detail_source=$("#detail-template").html()
    var detail_template= Handlebars.compile(detail_source);
    
    function doSearch(ev){

        var term = $("#term").val().toUpperCase();
        var results=[];
        for(var i in library){
            var book=library[i];
            if (book.title.toUpperCase().indexOf(term) >=0){
                results.push(book);
            }
        }
        var context = {results:results, number:results.length, plural:results.length !=1};
        var rendered_template = results_template(context);
        
        $("#results").html(rendered_template);
        $("#detail").html("");
        
        $("#results a").click(function(e){
            e.preventDefault();
            var linc_id=$(this).attr("id");
            var book_id=linc_id.split("-")[1];
            var book = getBookById(book_id);
            
            book.url = "http://www.google.com/search?q=" + encodeURI(book.title);
            rendered_template = detail_template(book);
            $("#detail").html(rendered_template);
            
            //$("#book-title").html(book.title);
            //$("#book-author").html(book.title);
            //$("#book-year").html(book.year);
        })
    }
    $("#search-btn").click(doSearch);
    $("#term").keyup(doSearch);
    
    function getBookById(id){
        for(var i in library){
            if (library[i].id ==id)
                return library[i];
                }
        return{};
    }
    
})