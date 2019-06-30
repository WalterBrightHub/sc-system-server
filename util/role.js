module.exports.isLimited=(roles,limitedRoles)=>{
  for(let role of roles){
    for(let limitedRole of limitedRoles){
      if(role===limitedRole){
        return true
      }
    }
  }
  return false
}

//this.isLimited(['a','b','c'],['d','e','f'])