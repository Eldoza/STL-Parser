
function calculateAreaOfTriangle () {

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
}