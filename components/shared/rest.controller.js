function RestController (model, updateableFields, populateAll, populateOne) {
    var xhr = require('../shared/xhr');
    var un = require('underscore/underscore-min');
    var chalk = require('chalk');
    var fs = require('fs');
    
    var Model = model;
    var updateableFields = updateableFields;
    var populateAll = populateAll;
    var populateOne = populateOne;
    
    this.create = function(req, res) {
        var instance = new Model();
        
        Model.schema.eachPath(function(path) {
            try {
                var param = byString(req.body, path);
            } catch(err) {
            }
            if(param !== undefined){
                if(param.hasOwnProperty('filename')){
                    fs.writeFile(__dirname + '/../../public/uploads/'+param.filename, param.raw.split(',')[1], 'base64', function(err) {
                        console.log(err);
                    });
                    param = '/uploads/'+param.filename;
                }
                instance = setByString(param, instance, path);
            }
        }); 
      
        if(isAuth('create')){
         instance.owner = req.user._id;    
        }
        instance.save(function(err) {
            if (err) {
                if(err.name == 'ValidationError'){
                    return xhr.validationError(res, err.message, err.errors);
                }
                res.send(err);
            }
            return xhr.returnEntity(res, { message: instance.name + " is alive!", data: instance });
        });
    };

    this.update = function (req, res) {
        
        Model.findOne( idFilter(req.params.id, req, 'update'), function(err, instance) {
            if(err) { return res.send(err); }
            
            un.each(updateableFields, function(field){
                console.log(chalk.red(field));
                var val = byString(req.body, field);
                if(val.hasOwnProperty('filename')){
                    fs.writeFile(__dirname + '/../../public/uploads/'+val.filename, val.raw.split(',')[1], 'base64', function(err) {
                        console.log(err);
                    });
                    val = '/uploads/'+val.filename;
                }
               if(val !== undefined) {
                   console.log(chalk.bold('checking ') + chalk.bold.blue(field) + chalk.bold(' = ' + val));
                   setByString(val, instance, field);
               } 
            });
        
            instance.save(function(err) {
                if(err) { res.send(err); }
                xhr.returnEntity(res, instance);
            })
        });
    };

    this.all = function(req, res){
      var find = Model.find( idFilter(null, req, 'all') );
      find = queryFilter(find, req.query);
      find.populate(populateAll).exec(function(err, instances) {
          if (err) {
              return res.send(err);
          }
          
          console.log(chalk.bold('returning ') + chalk.bold.blue(instances.length) + chalk.bold(' results'));
          return xhr.returnCollection(res, instances);
      })  
    };
    
    this.one = function(req, res){
      Model.findOne( idFilter(req.params.id, req, 'one') ).populate(populateOne).exec(function(err, instance) {
          if (err) {
              return res.send(err);
          }
          
          return xhr.returnEntity(res, instance);
      })  
    };
    
    this.remove = function(req, res) {
        Model.findOne( idFilter(req.params.id, req, 'remove'), function(err, instance) {
            if(err) { return res.send(err); }
            if(!instance) { return xhr.notFound(res, 'Model not found', { id: req.params.id }) }
            instance.remove( function(err, story) {
                if(err) { res.send(err); } 
                xhr.returnJson(res,{
                    deleted: true, 
                    _id: instance._id, 
                    message: instance.name + ' is dead!'
                });   
            });
        });
    };
    
    var isAuth = function(method){
        return un.indexOf(isAuthOn, method) >= 0;
    };
    
    var isAuthOn =[];
    this.isAuthOn = function(arr){
        isAuthOn = arr;
    };
    
    var idFilter = function(id, req, method){
        var filter = {};
        if(id !== null){
            filter._id =  id;
        }
        if(isAuth(method)){
            filter.owner = req.user._id;
        }
        return filter;
    };
    
    var queryFilter = function(find, params) {
        un.each(params, function(param, key) {
            find = find.where(key).equals(param);
        });
        return find;
    }
    
    var byString = function(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    }
    
    var setByString = function(value, object, path){
        var path = path.split('.');
        for (var i = 0, tmp = object; i < path.length - 1; i++) {
            if(!(path[i] in tmp)){
                tmp[path[i]] = {};
            }
            tmp = tmp[path[i]];
        }
        tmp[path[i]] = value;
        return object;
    }
    
}

function create(model, updateableFields, populateAll, populateOne) {  
  // modify the options here if you want
  return new RestController(model, updateableFields, populateAll, populateOne);
}

module.exports.create = create;  