const fs = require('fs')
const STLFileOutput = fs.readFileSync('../STLFiles/Moon.stl')
const { calculateAreaOfTriangle, calculateBoundingBox, groupArrayBy } = require('./utils')

let numOfTriangles = 0
let vertices = []
let totalAreaOfMesh = 0
let minX;
let maxX;
let minY;
let maxX;
let minZ;
let maxZ;

function returnNormalizedVertices (inputVertices) {
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

function calculateBoundingBox (vertexCollection) {
    const { v1X, v1Y, v1Z, v2X, v2Y, v2Z, v3X, v3Y, v3Z } = vertexCollection
    let tempMinX = Math.min(v1X, v2X, v3X)
    let tempMaxX = Math.max(v1X, v2X, v3X)

    let tempMinY = Math.min(v1Y, v2Y, v3Y)
    let tempMaxY = Math.max(v1Y, v2Y, v3Y)

    let tempMinZ = Math.min(v1Z, v2Z, v3Z)
    let tempMaxZ = Math.max(v1Z, v2Z, v3Z)

    return {
        x: maxX - minX,
        y: maxY - minY,
        z: maxZ - minZ,
    }
}

function convertSTLFileToStringAndParse (STLFile) {
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

console.log(convertSTLFileToStringAndParse(STLFileOutput))