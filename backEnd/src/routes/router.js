const adminDelete = require('../controllers/admin/delete');
const adminEdit = require('../controllers/admin/eidt');
const showusers = require('../controllers/admin/showusers');
const userpost = require('../controllers/admin/userpost');
const login = require('../controllers/auth/login');
const Register = require('../controllers/auth/register');
const Add = require('../controllers/curd/add');
const Delete = require('../controllers/curd/delete');
const Edit = require('../controllers/curd/edit');
const Show = require('../controllers/curd/show');
const authorize = require('../middleware/rbc');
const auth = require('../middleware/verify');

const router = require('express').Router();

// Auth
router.post('/login' , login)
router.post('/register' , Register)


// Curd Operation
router.post('/users' , auth, authorize([ "admin","user"]) , Show)
router.post('/delete' , auth , authorize([ "admin","user"]) , Delete)
router.post('/add' , auth ,  authorize([ "admin","user"]) , Add)
router.post('/edit'  , auth ,  authorize([ "admin","user"]) , Edit)


//Curd operation for admin
router.post('/admin/user' , auth , authorize(["admin"]) , showusers)
router.post('/admin/edit/:id' , auth , authorize(["admin"]) , adminEdit)
router.post('/admin/delete' , auth , authorize(["admin"]) , adminDelete)
router.post('/admin/userpost' , auth , authorize(["admin"]) , userpost)

module.exports = router;