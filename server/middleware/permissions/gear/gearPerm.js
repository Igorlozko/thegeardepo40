import checkOwner from "./checkOwner.js";


const gearPerm = {
    update:{
        roles:['admin'],
        owner: checkOwner,
    },
    delete:{
        roles:['admin'],
        owner: checkOwner,
    },
    create:{
        roles:['admin', 'editor'],
        owner: checkOwner,
    },
}

export default gearPerm;