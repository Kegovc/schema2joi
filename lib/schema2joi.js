const joi = require("joi");

const make = (schema) => {
    for(let key in schema){
        if(Array.isArray(schema[key])){
            schema[key] = schema[key].map(m=>keyMake(m))
        } else {
            schema[key] = keyMake(schema[key])
        }
    }
    return schema
}

const keyMake = (atribute) => {
    let joi_ = joi
    for(let key in atribute){
        joi_ = joiMake(joi_,key,atribute[key])
    }
    return joi_
}

const joiMake = (el,type,val) =>{
    switch(type){
        case 'type': {
            return el[val]()
        }
        case 'format': {
            if(typeof val === 'object'){
                return el[val.fun](val.param)
            }
            if(typeof val === 'string'){
                return el[val]()
            }
            return el
        }
        case 'min':
        case 'max':
        case 'ref':{
            return el[type](val)
        }
        case 'pattern':{
            return el.pattern(val)
        }
        case 'required': {
            return el.required()
        }
        case 'properties':{
            return el.keys(make(val))
        }
        default:{
            return el
        }
    }
}

module.exports = (schema)=>{
    return joi.object(make(schema))
}