var editing = false;
var id;
$(function()
{
	fetch('api/init')
  	.then((response) => {
    return response.json();
  	})
  	.then((data) => {
  		for(id in data.task)
  		{
  			var liProp = "";
  			if(data.task[id].done == true || data.task[id].done == 'True' || data.task[id].done == 'true')
  				liProp = "class = 'completed'";
  			liProp += "id="+id;
			$("ul").append("<li "+liProp+"><span><i class='fa fa-trash'></i></span> " + data.task[id].taskTitle + "<span><i class='fa fa-edit'></i></span></li>");
  		}
  	});
});

$("ul").on("click" , "li" , function(){
	let id = $(this).attr('id');
	$.post("/api/changestatus",{'id':id},function(id)
	{
		// doubt : toggle class here or where it is done?
	});
	$(this).toggleClass("completed");
});

$("ul").on("click" , "span:first-child" , function(event){
	$(this).parent().fadeOut(500, function(){
		let id = $(this).attr('id');
		$.post("/api/deletetodo",{'id':id},function(result)
		{

		});
		$(this).remove();
	});
	event.stopPropagation();
});

$("ul").on("click" , "span:nth-child(2)" , function(event){
	editing = true;
	var $parent = $(this).parent();
    $("#todotext").val($parent.text()).focus();
    $parent.fadeOut(500,function()
    {
    	id = $(this).attr('id');
    	$(this).remove();
    });
	event.stopPropagation();
});

$("input[type='text']").keypress(function(event){
	if(event.which === 13 && !editing)
	{
		var todoText = $(this).val();
		if(todoText)
		{
			$(this).val("");
			//code to add todo in database
			$.post("/api/addtodo",{'done':false,'taskTitle':todoText},function(id)
			{
				let liProp = "id="+id;
				$("ul").append("<li "+liProp+"><span><i class='fa fa-trash'></i></span> " + todoText + "<span><i class='fa fa-edit'></i></span></li>");
				console.log("added with id: "+id);
			});
		}
	}
	if(event.which === 13 && editing)
	{
		var todoText = $(this).val();
		if(todoText)
		{
			$(this).val("");
			//code to add todo in database
			$.post("/api/edittodo",{'id':id,'taskTitle':todoText},function(id)
			{
				let liProp = "id="+id;
				$("ul").append("<li "+liProp+"><span><i class='fa fa-trash'></i></span> " + todoText + "<span><i class='fa fa-edit'></i></span></li>");
				console.log("added with id: "+id);
			});
		}
	}
});

$("#addbutton").on("click",function(event)
{
	editing = false;
	$("#todotext").focus();
});