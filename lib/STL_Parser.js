const fs = require('fs')
const STLFileOutput = fs.readFileSync('../STLFiles/Moon.stl')
const { calculateAreaOfTriangle, groupArrayBy } = require('./utils')

let boundingBox;
let numOfTriangles = 0
let vertices = []
let totalAreaOfMesh = 0
let minX = Infinity
let maxX = -Infinity
let minY = Infinity
let maxY = -Infinity
let minZ = Infinity
let maxZ = -Infinity

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
    minX = tempMinX < minX ? tempMinX : minX
    let tempMaxX = Math.max(v1X, v2X, v3X)
    maxX = tempMaxX > maxX ? tempMaxX : maxX
    let tempMinY = Math.min(v1Y, v2Y, v3Y)
    minY = tempMinY < minY ? tempMinY : minY
    let tempMaxY = Math.max(v1Y, v2Y, v3Y)
    maxY = tempMaxY > maxY ? tempMaxY : maxY
    let tempMinZ = Math.min(v1Z, v2Z, v3Z)
    minZ = tempMinZ < minZ ? tempMinZ : minZ
    let tempMaxZ = Math.max(v1Z, v2Z, v3Z)
    maxZ = tempMaxZ > maxZ ? tempMaxZ : maxZ

   boundingBox = {
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

    returnNormalizedVertices(vertices).forEach(vert => { 
        calculateBoundingBox(vert)
        totalAreaOfMesh += calculateAreaOfTriangle(vert)
    })
    
    return {
        numberOfTriangles: numOfTriangles,
        surfaceArea: totalAreaOfMesh,
        boundingBox: boundingBox,
    }
}

console.log(convertSTLFileToStringAndParse(STLFileOutput))