const fs = require('fs')
const { calculateAreaOfTriangle, groupArrayBy } = require('../lib/utils')
const stlParser = require('../lib/STL_Parser.js')
const STLExampleFileOutput = fs.readFileSync('./STLFiles/Example.stl')
const STLCubeFileOutput = fs.readFileSync('./STLFiles/Cube.stl')

describe('Parsing STL file', () => {
  test('it outputs the correct response when given an example STL file', () => {
    let exampleStlParserOutput = stlParser(STLExampleFileOutput)

    expect(exampleStlParserOutput).toHaveProperty('numberOfTriangles', 2)
    expect(exampleStlParserOutput).toHaveProperty('surfaceArea', 1.4142135623730951)
    expect(exampleStlParserOutput).toHaveProperty('boundingBox')
  })

  test('it outputs the correct response when give a Cube STL file' , () => {
    let exampleStlParserOutput = stlParser(STLCubeFileOutput)
  
    expect(exampleStlParserOutput).toHaveProperty('numberOfTriangles', 12)
    expect(exampleStlParserOutput).toHaveProperty('surfaceArea', 6)
    expect(exampleStlParserOutput).toHaveProperty('boundingBox')
  })
})

describe('Util fuctions output as expected', () => {
  test('it calculates the area of a given triangle', () => {
    let testVertex = {
      v1X: 0,
      v1Y: 0,
      v1Z: 0,
      v2X: 1,
      v2Y: 0,
      v2Z: 0,
      v3X: 1,
      v3Y: 1,
      v3Z: 1,
    }
    let exampleTriangleArea = calculateAreaOfTriangle(testVertex)
    expect(exampleTriangleArea).toBe(0.7071067811865476)
  })

})
