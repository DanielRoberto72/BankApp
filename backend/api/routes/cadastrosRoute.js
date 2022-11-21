const {Router} = require('express')
const { JsonWebTokenError } = require('jsonwebtoken')
const CadastrosController = require ('../controllers/CadastrosController')
const jwt = require('jsonwebtoken')

const secretJWT = 'AWJ@3vG02nQW2^4AV6Lfbo6g@4AvAq14z2PUuR5^xm51XnctK7$v6a2Sj1@U'


function auth(req, res,next){
    const authToken = req.headers['authorization']
    if(!authToken){
        return res.status(401).json({ error: 'Token inválido'})
    }else{
        const Bearer = authToken.split(" ")
        var token = Bearer[1]
        jwt.verify(token,secretJWT,(err, data)=>{
            if(err){
                return res.status(401).json({status:"erro",erro:99,mensagem: 'Token inválido'})
            }else{
                req.token = token
                req.loggedUser = {id: data.id, msisdn: data.msisdn, nome:data.nome}
                next();
            }
        })
        
    }
    
}

const router = Router()


router.post('/api/surf/v1/auth',CadastrosController.findOneUser)
router.post('/api/surf/v1/cadastrar',auth,CadastrosController.createOneUser)
router.put('/api/surf/v1/atualizar/:id',auth,CadastrosController.updateOneUser)

module.exports = router