const database = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretJWT = process.env.SECRETJWT


class CadastrosController {

    //AUTENTICAÇÃO
    static async findOneUser(req, res){
        const {email,senha} = req.body

        try{

            if(!email){
            return res.status(400).json({mensagem: 'email obrigatório' })
            }

            if(!senha){
            return res.status(400).json({mensagem: 'Senha obrigatória' })
            }
            
            const findCadastro = await database.tb_cadastros.findOne({where:{email:email}})

            if(!findCadastro){
                return res.status(404).json({status:"erro",erro:1, mensagem: "Usuário não existe, tente realizar um cadastro"})
              }else{

                    const checkPassword = await bcrypt.compare(senha, findCadastro.senha)
                
                    if (!checkPassword) {

                        return res.status(401).json({status:"erro",erro:2, mensagem: 'Senha inválida' })
                        
                    }
                    if(checkPassword){
                        jwt.sign({id:findCadastro.id,msisdn:findCadastro.msisdn,nome:findCadastro.nome},secretJWT,{expiresIn:'3h'},(err, token)=>{

                            if(err){
                                return res.status(400).json({status:"erro", erro: 3,err})
                            }else{
                                return res.status(200).json({status:"sucesso",sucesso: 0,mensagem: "usuário autenticado com sucesso",id:findCadastro.id,msisdn:findCadastro.msisdn,nome:findCadastro.nome,token:token})
                            }
                            
                        })
                        
                    }

                }
          
              
            
        }catch(erro){
            return res.status(500).json(erro.mensagem)
        }
        
    }
    // CADASTRO DE NOVOS USUÁRIOS
    static async createOneUser(req, res){
        const {nome, senha, email, endereço, cpf} = req.body
        try{

            if(!nome){
                return res.status(422).json({mensagem: 'Nome obrigatório' })
                }
    
            if(!senha){
            return res.status(422).json({mensagem: 'Senha obrigatória' })
            }

            if(!email){
                return res.status(422).json({mensagem: 'Por favor, informe um email' })
            }
            const findUser = await database.tb_cadastros.findOne({where:{email:email}})

            if(findUser){
                return res.status(403).json({erro:1, mensagem:"Usuário já existe, favor realizar o login"})
            }
            if(!findUser){
                const salt = await bcrypt.genSalt(12)
                const passwordHash = await bcrypt.hash(senha, salt)
                const user = {
                    
                    senha: passwordHash,
                    nome,
                    email,
                    endereço,
                    cpf
                }
                const createCadastro = await database.tb_cadastros.create(user)
                return res.status(200).json({success: 0,createCadastro})
            }

            
        }catch(erro){
            return res.status(500).json(erro.message)
        }
        
    }

    static async updateOneUser(req, res){
        const newInfo = req.body
        console.log(newInfo)
        const {id} = req.params

        try{
            await database.tb_cadastros.update(newInfo,{where:{id: Number(id)}})
            const infos = await database.tb_cadastros.findOne({where:{id: Number(id)}})
            return res.status(200).json({status:"sucesso",sucesso: 0,infos})
        }catch(erro){
            return res.status(500).json(erro.message)
        }
    }
}

module.exports = CadastrosController