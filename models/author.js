var moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  },
   { versionKey: false }
);

// Виртуальное свойство для полного имени автора
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Виртуальное свойство - URL автора
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('lifespan')
.get(function () {
  return moment(this.date_of_birth).format('MMMM Do, YYYY')+' - '+ moment(this.date_of_death).format('MMMM Do, YYYY');
});


AuthorSchema
.virtual('dob')
.get(function () {
  return moment(this.date_of_birth).format('MMMM Do, YYYY');
});

AuthorSchema
.virtual('dod')
.get(function () {
  return moment(this.date_of_death).format('MMMM Do, YYYY');
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);