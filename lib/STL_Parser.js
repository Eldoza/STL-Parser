const fs = require('fs')
const STLFileOutput = fs.readFileSync('../STLFiles/Moon.stl')
const { calculateAreaOfTriangle, groupArrayBy } = require('./utils')

let numOfTriangles = 0
let vertices = []
let totalAreaOfMesh = 0

const returnNormalizedVertices = (inputVertices) => {
    return groupArrayBy(inputVertices, 3).map(vert => (
        Object.assign({
            v1X: vert[0][0],
            v1Y: vert[0][1],
            v1Z: vert[0][2],
            v2X: vert[1][0],
            v2Y: vert[1][1],
            v2Z: vert[1][2],
            v3X: vert[2][0],
            v3Y: vert[2][1],
            v3Z: vert[2][2],
        })
    ))
}

const convertSTLFileToString = (STLFile) => {
    const STLStrings = STLFile.toString().split('\n')
    const normalizedStrings = STLStrings.map(str => str)

    for (let i = 0; i < normalizedStrings.length; i++) {
       let currentCleanedLine = normalizedStrings[i].trim().split(' ').filter(str => str !== '')
       switch (currentCleanedLine[0]) {
           case 'facet' : 
                numOfTriangles ++
            break
            case 'vertex' :
                vertices.push(currentCleanedLine.slice(1).map(Number));
            break
        
            default: 
       }
    }

    returnNormalizedVertices(vertices).forEach(vert => totalAreaOfMesh += calculateAreaOfTriangle(vert))

    return {
        numberOfTriangles: numOfTriangles,
        surfaceArea: totalAreaOfMesh,
    }
}

console.log(convertSTLFileToString(STLFileOutput))