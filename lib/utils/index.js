
function calculateAreaOfTriangle (vertexCollection) {
    const { v1X, v1Y, v1Z, v2X, v2Y, v2Z, v3X, v3Y, v3Z } = vertexCollection
    let ax = v2X - v1X
    let ay = v2Y - v1Y
    let az = v2Z - v1Z
    let bx = v3X - v1X
    let by = v3Y - v1Y
    let bz = v3Z - v1Z
    let cx = (ay * bz) - (az * by)
    let cy = (az * bx) - (ax * bz)
    let cz = (ax * by) - (ay * bx)
    return 0.5 * Math.sqrt(cx * cx + cy * cy + cz * cz)
}

function calculateBoundingBox (vertexCollection) {
    const { v1X, v1Y, v1Z, v2X, v2Y, v2Z, v3X, v3Y, v3Z } = vertexCollection
    let minX = Math.min(v1X, v2X, v3X)
    let maxX = Math.max(v1X, v2X, v3X)

    let minY = Math.min(v1Y, v2Y, v3Y)
    let maxY = Math.max(v1Y, v2Y, v3Y)

    let minZ = Math.min(v1Z, v2Z, v3Z)
    let maxZ = Math.max(v1Z, v2Z, v3Z)

    return {
        x: maxX - minX,
        y: maxY - minY,
        z: maxZ - minZ,
    }
}

function groupArrayBy (data, numberToGroup) {
    const group = []
    for (let i = 0, j = 0; i < data.length; i++) {
        if ( i >= numberToGroup && i % numberToGroup === 0) j++;
        group[j] = group[j] || [] 
        group[j].push(data[i])
    }
    return group
}

module.exports = {
    groupArrayBy,
    calculateAreaOfTriangle,
}