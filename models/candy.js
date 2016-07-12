const mongoose = require('mongoose')

const candySchema = new mongoose.Schema({
  id: Number,
  name: String,
  color: String,
  created_at: Date,
  updated_at: Date
})

candySchema.pre('save', function (next) {
    let now = new Date()
    this.update_at = now
    if(!this.creaed_at) {
        this.created_at = now
    }
    next();
})

const Candy = mongoose.model('Candy', candySchema)

module.exports = Candy