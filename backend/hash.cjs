const bcrypt = require('bcrypt');

const password = "Firepower#132#kl";

bcrypt.hash(password, 10).then(hash => {
  console.log("Hash:", hash);
});