$(document).ready(function(){
	
	
	getTeams();
	
});
function sortit()
{    $( ".draggable" ).draggable({
	stop:function(event ,ui)
	{
		return false;
		
	}
	
	
	
});
    $( ".droppable" ).droppable();
	
	 $(".sortable").sortable({connectToSortable: ".sortable"});
	
}
var tids=[];
var jids=[];
function getJ()
{
	$.ajax({url:'/judges/',
	dataType: 'json',
	success:function(json)
	{
		console.log(json);
		arr=json;
		 if(arr.length<1)
			 return;
		// $('#teams').html("<ul class='sortable'></ul>");
		var htm='';
		$.each(arr,function(index,val){
			
			htm+='<div class="col-md-4">';
			//console.log(index);
			console.log(val);
			//console.log(val['id']);
			//console.log(val['name']);
			teamid=val['id'];
			teamname=val['name'];
			ndo='<div id="judge_'+teamid+'" class="droppable ui-widget-header judge "><p>Judge'+teamname+'</p><ul class="sortable"></ul></div/>';
			htm+= ndo;
			htm +='</div>';
			
		});
		$('#judges').html(htm);
		//alert(htm);
		sortit();
		
	},
	
	});
	
	
}
function getSave()
{
	for(i=0;i<tids.length;i++)
	{
		//n='team
		
		
		
	}
	
	
}
function getTeams()
{
	
	$.ajax({url:'/teams/',
	dataType: 'json',
	success:function(json)
	{
		console.log(json);
		arr=json;
		 if(arr.length<1)
			 return;
		 $('#teams').html("<ul class='sortable'></ul>");
		$.each(arr,function(index,val){
			
			//console.log(index);
			console.log(val);
			//console.log(val['id']);
			//console.log(val['name']);
			teamid=val['id'];
			tids.push(teamid);
			teamname=val['name'];
			ndo='<li id="team_'+teamid+'" class=" draggable">'+teamname+'</li>';
			$('#teams ul').append(ndo);
			
		});
		//sortit();
		getJ();
		
	},
	
	});
		
		

	
	
}