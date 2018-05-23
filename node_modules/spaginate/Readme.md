
# spaginate



## Install

```bash
npm install -S spaginate
```


## API

```js
var paginate = require('express-paginate');
```

### paginate

This creates a new instance of `express-paginate`.






#### Arguments

* `limit` a Number to limit results returned per page (defaults to `10`)
* `maxLimit` a Number to restrict the number of results returned to per page (defaults to `50`) &ndash; through this, users will not be able to override this limit (e.g. they can't pass `?limit=10000` and crash your server)
pagew  string for page argument in url (defaults to page)
url mention url or defaults(req.url)
onclick if you want a javascript function to be executed on pages and not href , if not mentioned url would proceed

sample

{{}} shall be replaced with page number


//// inner page where query is being held
var mongoosePaginate = require('mongoose-paginate');
	require('../models/song');
	
	Song.paginate(params,{page:current_page,limit:10,sort:{_id:-1} ,select:'movieyear moviename _id'}).then(function (cursor)
		{
			
			// if(!error)
			 {
				pageobj=spage.page({totpages:cursor.pages,current_page:current_page,limit:10,onclick:"showp('{{}}')"},req); 
				 
			 }
			 cursor.pagination={};
			 cursor.pagination.pages=pageobj.pages;
			 cursor.pagination.next=pageobj.next,
			 cursor.pagination.prev=pageobj.prev,
			
			 res.json(cursor);
		},function (err){});
	
	
	
}


div( ng-showd="pagination.pages")
   ul.pagination
          li(ng-if='pagination.prev')
              a(href='{{pagination.prev}}')
                Previous
          li(ng-repeat="page in pagination.pages")
                   a.pn( ng-if="page.onc && page.show" href='javascript:void(0);' ng-click="pagec(page)")
                      {{page.number}}
                   a(ng-if="!page.onc && page.show" href="{{page.url}}")
                       {{page.number}}
                   span(ng-if="!page.show")
                       {{page.number}}                 
          li(ng-if='pagination.next')
              a(href='{{pagination.next}}')
                Next