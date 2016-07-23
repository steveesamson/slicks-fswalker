var walker = require("../dist/fswalker");
walker.walk('../**/*.js', function(e, list){
    if(e) return console.error(e);
    console.log(list);
});