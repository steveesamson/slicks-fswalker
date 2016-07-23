var fs = require('fs'),
    _ = require("slicks-utils"),
    path = require('path');
module.exports = {
    walk:function (dir_path, cb) {
        var ext = null,
            parts = null,
            recursive = false,
            re = {
                Rec: /(.*)(\*\*)\/(\*\.\w+)$/g,
                Flat: /(.*)(\*\.\w+)$/g,
                File: /(.*)\/(\w+\.\w+)$/g
            },
            listDir = function (dir, done) {
                var results = [],
                    filter = function (i, v) {
                        return (path.extname(v) === ext) ? v : null;
                    },
                    addResult = function (itemOrList) {
                        if (_.isArray(itemOrList)) {
                            var c = _.map(itemOrList, filter);

                            results = results.concat(c);
                        } else {
                            if(filter(1,itemOrList)){
                                results.push(itemOrList);
                            }
                        }

                    };

                fs.readdir(dir, function (err, list) {
                    if (err)  return done(err);
                    var pending = list.length;
                    if (!pending)  return done(null, results);

                    _.each(list,function (i,file) {
                        file = path.resolve(dir, file);

                        fs.stat(file, function (err, stat) {
                            if (stat && stat.isDirectory()) {
                                if (recursive) {
                                    listDir(file, function (err, res) {
                                        addResult(res);
                                        --pending;
                                        if (!pending) done(null, results);
                                    });
                                } else {
                                    --pending;
                                    if (!pending) done(null, results);
                                }

                            } else {
                                addResult(file);
                                --pending;
                                if (!pending) done(null, results);
                            }
                        });
                    });
                });
            };


        for (var i in re) {
            parts = re[i].exec(dir_path);
            if (parts) {
                parts.Ex = i;
                break;
            }
        }

        if (!parts) parts = {};
        switch (parts.Ex) {
            case 'Rec':
                //console.log(parts.Ex);
                dir_path = parts[1].trim();
                ext = parts[3].trim().replace(/\*/, "");
                recursive = true;
                //console.log("dir_path:%s, recursive:%s", dir_path, recursive);
                listDir(dir_path, cb);

                break;
            case 'Flat':
                console.log(parts.Ex);
                dir_path = parts[1].trim();
                ext = parts[2].trim().replace(/\*/, "");
                recursive = false;
                //console.log("dir_path:%s, recursive:%s", dir_path, recursive);
                listDir(dir_path, cb);
                break;
            case 'File':
                cb(false, [path.resolve(process.cwd(), dir_path)]);
                break;
            default:
                //console.log(parts.Ex);
                listDir(dir_path, cb);
                break;
        }


    }
};