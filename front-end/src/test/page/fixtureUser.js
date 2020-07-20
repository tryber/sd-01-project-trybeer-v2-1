exports.validSeller = {
  name:'HenriqueSeller',
  password:'123456',
  email:'henriqueseller@test.com',
  seller:true,
  mockMessageResponse:'Registered successfully.'
}

exports.invalidClient = {
  name:'Henrient',
  password:'123456',
  email:'henriqueclient@test.com',
  seller:false,
  mockMessageResponse:'Invalid Fields.'
}

exports.validClient = {
  name:'HenriqueClient',
  password:'123456',
  email:'henriqueclient@test.com',
  seller:false,
  mockMessageResponse:'Registered successfully.'
}
