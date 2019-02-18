const fs = require('fs')
const STLFileOutput = fs.readFileSync('../STLFiles/Moon.stl')
const { groupArrayBy } = require('./utils')

const convertSTLFileToString = (STLFile) => {
    let numOfTriangles = 0
    let vertices = []
    let triangleVerticies = []
    const STLStrings = STLFile.toString().split('\n')
    const normalizedStrings = STLStrings.map(str => str)

    for (let i = 0; i < normalizedStrings.length; i++) {
       let currentCleanedLine = normalizedStrings[i].trim().split(' ').filter(str => str !== '')
       switch (currentCleanedLine[0]) {
           case 'facet' : 
                numOfTriangles ++
            break
            case 'vertex' :
                var vertexXYZ = currentCleanedLine.slice(1).map(Number);
                vertices.push(vertexXYZ);
            break
        
            default: 
       }
    }

    const groupedVerts = groupArrayBy(vertices, 3)
    const normalizedVerts = groupedVerts.map(vert => (
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

    console.log('verttts=======>', normalizedVerts)
}

convertSTLFileToString(STLFileOutput)   