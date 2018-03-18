var ObjectID = require('mongodb').ObjectId
module.exports = function (app, db) {
    app.get('/notes', (req, res) => {        
        // const note = { title: req.body.title, content: req.body.content };
       
        db.collection('notes').find().toArray(function(err, results) {
            if (err){
                res.send({'err': err})
            }
            else{
                res.send(results)
            }
        });
    });
    ////

    app.post('/notes', (req, res) => {        
        const note = { title: req.body.title, content: req.body.content };
        console.log(note);
        db.collection('notes').insert(note, (err, result) => {
            if (err){
                res.send({'err': err})
            }
            else{
                res.send(result.ops[0])
            }
        });  
    });

    ////////////////////////////////////////////////////////////
    
    app.get('/notes/:id', (req, res) => {    
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };    
        db.collection('notes').findOne(details,(err, item) => {
            if (err){
                res.send({'err': err})
            }
            else{
                res.send(item)
            }
        });
        
    });

    ////////////////////////////////////////////////////////////
    
    app.delete('/notes/:id', (req, res) => {    
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };    
        db.collection('notes').remove(details,(err, item) => {
            if (err){
                res.send({'err': err})
            }
            else{
                res.send('Note '+ id + ' deleted')
            }
        });
        
    });

    ///////////////////////////////////////////////////////////////
    app.put('/notes/:id', (req, res) => {    
        const id = req.params.id;
        const details = {'_id': new ObjectID(id) };    
        const note = { title: req.body.title, content: req.body.content };
        db.collection('notes').update(details, note ,(err, note) => {
            if (err){
                res.send({'err': err})
            }
            else{
                res.send(note)
            }
        });
        
    });
}