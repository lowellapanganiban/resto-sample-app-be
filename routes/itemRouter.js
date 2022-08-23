const express = require('express');
const router  = express.Router();

const Item = require('../models/item');

// CRUD Functionalities
router.get('/', ( request, response ) => {
  Item.find().then( data => {
      response.send( data );
  });
});

router.get('/:id', ( request, response ) => {
  Item.findOne({ _id: request.params.id }).then( data => {
      response.send( data );
  });
});


router.delete('/:id', ( request, response ) => {

  Item.deleteOne({ _id: request.params.id }).then( data => {
      if( data.deletedCount === 1 ){
          response.send({message: `Task deleted!` });
      }else{
          response.send({error: `Task with id ${request.params.id} does not exist!` });
      }
  });
});


router.post('/', ( request, response ) => {

  const newItem = new Item( request.body );

  newItem.save().then( data => {
      if( data._id ){
          response.send( data );
      }else{
          response.send({ error: `Resource was not created!` });
      }
  });
});

router.put('/:id', ( request, response ) => {
  Item.updateOne({ _id: request.params.id }, [{ $set: request.body }] ).then( data => {
      // console.log( data );
      if( data.modifiedCount === 1 ){
          response.send({ message: `Resource has been updated!` });
      }else{
          response.send({ error: `Error in update!` });
      }
  });
});


module.exports = router;