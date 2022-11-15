const express =require('express');
const router=express.Router();
const eventController=require('../controllers/eventController')


//create,find,update,delete
router.get('/',eventController.view)
router.get('/addevent',eventController.form)
router.post('/addevent',eventController.create)
router.get('/editevent/:id',eventController.edit)
router.post('/editevent/:id',eventController.update)
router.get('/:id',eventController.delete)
// router.get('/share/:id',eventController.share)





module.exports=router