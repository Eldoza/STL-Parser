const fs = require('fs')

const STLFileOutput = fs.readFileSync('./STLFiles/Moon.stl')
const stlParser = require('../lib/STL_Parser.js')

console.log(stlParser(STLFileOutput))