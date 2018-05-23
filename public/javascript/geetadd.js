




var sapp=angular.module('app',['geet.services']).controller('songc',function($http,$scope,geetFactory)
       {
    	 // $scope.error.moviename='';
    	 
   $scope.song={};
   $scope.errflag=false;
   $scope.sflag=false;
   var par='song';
 $scope.init=function()
 {//$scope.form.$submitted=false;
	
	  if(edit==undefined)
	  {
		  $scope.edit=0;
		  console.log("edit undfeined")
		  return;
	  }
	  if(edit==1 )
	  {
		  $scope.edit=1;
		  $scope.songid=songid;
		  geetFactory.getRecord(songid).then(function succ(data){
			    $scope.song.translation=data.translation;
			  $scope.song.moviename=data.moviename;
			  $scope.song.mukhda=data.mukhda;
			  $scope.song.movieyear=data.movieyear;
			  $scope.song.level=data.level;
			  $scope.song.mask=data.mask;
			  $scope.song.reserve=data.reserve;
			  $scope.song.anagram=data.anagram;
		  });
	  }
	 
 },
    	  $scope.save=function()
    	 
    	  {
			   
			  
			  $scope.errflag=false;
    	
    		 $scope.gform[par].$invalid=true;
    		  if($scope.gform.$invalid)
    			  {
    			  
    			 return;
    			  
    			  }
				   if($scope.edit)
					   url='/geet/update?id='+$scope.songid;
					   else
    		 url='/geet/save';
    		  $http.put(url,$scope.song).then(function success(response){
    			  
    			 d=response.data;
    			 console.log(d);
    			 if(d.errors)
    				 {
    				 $scope.errflag=true;
    				$scope.errors=d.errors;
    					 
    				
    				 }
					  if(d.sflag)
					  {
						  alert(d.msg);
						  
						  $scope.song.mukhda='';
						  
					  }
    			  
    		  },function fail(response){});
    		  
    		  
    	  },
    $scope.init();
       }	

	   );
       
  