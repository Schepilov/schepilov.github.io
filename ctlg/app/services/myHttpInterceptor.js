app.factory("myHttpInterceptor",["$q","$rootScope",function(a,b){return b.httpHandler={responseError:function(a,b,c,d){console.error(a,b,c,d)}},{request:function(a){return 0===a.url.indexOf("app")&&(a.url=a.url),a},responseError:function(c){return b.httpHandler.responseError(c.data,c.status,c.headers,c.config),a.reject(c)}}}]);