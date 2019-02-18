
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