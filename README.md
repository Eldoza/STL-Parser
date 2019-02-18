# STL Parser

### What is STL?

- STL (an abbreviation of "sterolithograpy") is a file format native to the sterolithograpy CAD software created by 3D Systems. 

- An STL file describes a raw, unstructured triangulated surface by the unit normal and vertices (ordered by the right-hand rule) of the triangles using a three-dimensional Cartesian coordinate system. In the original specification, all STL coordinates were required to be positive numbers, but this restriction is no longer enforced and negative coordinates are commonly encountered in STL files today. STL files contain no scale information, and the units are arbitrary. [Wikipedia - STL](https://en.wikipedia.org/wiki/STL_(file_format))

- The following is an STL parser that is able to parse an ASCII STL file. It is written in Javascript and run in a Node environment. The parser will output the number of triangles in the model, the total surface area, and the bounding box.

### To install
---
Clone from the repo and install npm will install require dependecies.
```npm install```

### To run
---
* Note Node.js must be installed for application to run [Node JS](https://nodejs.org/en/download/)

From within the lib folder run the following terminal command:
``` node STL_Parser.js ```

This will execute the sript and output the following: 
```{ numberOfTriangles: 2,
    surfaceArea: 1.4142135623730951,
    boundingBox: { x: 1, y: 1, z: 1 } }
  ```

The default STL file that is parsed when the script is executed is the ```Moon.stl```

To parse other STL files, from within the ```STL_Parser.js``` file change to following line to the correct file path that you wish to parse: ```const STLFileOutput = fs.readFileSync('../STLFiles/Moon.stl')````



