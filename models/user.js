var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var emailLengthChecker = (email) => {
	if (!email) {
		return false;
	} else {
		if (email.length <5 || email.length > 50) {
			return false;
		} else {
			return true;
		}
	}
}

var emailValidators = [
  {
  	validator: emailLengthChecker,
  	message: 'Your email must be more than 5 characters and not more than 50 characters'
  }
]

var usernameLenghtChecker = (username) => {
	if (!username) {
		return false;
	} else {
		if (username.length < 5 || username.length > 30) {
			return false;
		} else {
			return true
		}
	}
} 

var usernameValidators = [
 {
 	validator: usernameLenghtChecker,
 	message: 'Your username must be more than 5 characters and not more than 30 characters'
 }
]


var passwordLengthChecker = (password) => {
	if (!password) {
		return false;
	} else {
		if (password.length < 3 || password.length > 30) {
			return false;
		} else {
			return true;
		}
	}
}

var passwordValidators = [
 {
 	validator: passwordLengthChecker,
 	message: 'Your username must be more than 3 characters and not more than 30 characters'
 }
]

var firstNameLengthChecker = (firstName) => {
	if (!firstName) {
		return false;
	} else {
		if (firstName.length < 2 || firstName.length > 30)  {
			return false;
		} else {
			return true;
		}
	}
}

var firstNameValidators = [
 {
 	validator: firstNameLengthChecker,
 	message: 'Your username must be more than 2 characters and not more than 30 characters'
 }
]


var lastNameLengthChecker = (lastName) => {
	if (!lastName){
		return false;
	} else {
		if (lastName.length  < 2 || lastName.length > 30) {
			return false;
		} else {
			return true;
		}
	}
}

var lastNameValidators = [
  {
  	validator: lastNameLengthChecker,
  	message: 'Your username must be more than 2 characters and not more than 30 characters'
  }
]

var UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		validate: emailValidators
	},
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		validate: usernameValidators
	},
	password: {
		type: String,
		required: true,
		trim: true,
		validate: passwordValidators
	},
	firstName: {
		type: String,
		required: true,
		trim: true,
		validate: firstNameValidators
	},
	lastName: {
		type: String,
		required:true,
		trim: true,
		validate: lastNameValidators
	}
}, {
	toObject: {
		virtuals: true
	},
	toJSON: {
		virtuals: true
	}
})


UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password)
}

UserSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);
			user.password = hash;
			return next();
		})
	})
})

UserSchema.virtual('fullName')
.get(function () {
	return this.firstName + ' ' + this.lastName;
})


module.exports = mongoose.model('User', UserSchema);