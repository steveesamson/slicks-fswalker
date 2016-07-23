# slicks-fswalker
This module helps to recursively list file system by various methods; it allows wildcards, globs and file names.
##Installation

```cli
    npm install slicks-fswalker
```
## Usage, Node only

### Recursive

```javascript
    var walker = require('slicks-fswalker');
    walker.walk("../**/*.js", function(e, ls){
        if(e) return console.log(e);
        console.log(ls);
    });
```

### Non Recursive

```javascript
    var walker = require('slicks-fswalker');
    walker.walk("../*.js", function(e, ls){
        if(e) return console.log(e);
        console.log(ls);
    });
```

### Specific File

```javascript
    var walker = require('slicks-fswalker');
    walker.walk("../some_dir/somefile.json", function(e, ls){
        if(e) return console.log(e);
        console.log(ls);
    });
    
```

## Enjoy!

