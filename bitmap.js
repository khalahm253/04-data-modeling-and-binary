'use strict';

const fs = require('fs');
const buffer = fs.readFileSync(`${__dirname}/bitmap.bmp`);
const transformedFilePath = process.argv[3];
const filePath = process.argv[2];
const transformMethod = process.argv[4];

const writeFile = (data, callback) => {
  fs.writeFile(`${__dirname}/bitmap2.bmp`, data, (error) => {
    if (error) {
      throw error;
    } 
    return callback;
  });
};



const parsedBitmap = {};
const FILE_SIZE_OFFSET = 2;
const WIDTH_OFFSET = 18;
const HEIGHT_OFFSET = 22;
const NUM_COLORS_OFFSET = 46;
const COLOR_TABLE_OFFSET = 54;
const BYTES_PER_PIXE_OFFSET = 28;

//------------------------------------------------------
// READING INFORMATION FROM THE BITMAP FILE
//------------------------------------------------------
parsedBitmap.type = buffer.toString('utf-8', 0, 2);
parsedBitmap.fileSize = buffer.readInt32LE(FILE_SIZE_OFFSET);
parsedBitmap.bytesPerPixel = buffer.readInt16LE(BYTES_PER_PIXE_OFFSET);
parsedBitmap.height = buffer.readInt32LE(HEIGHT_OFFSET);
parsedBitmap.width = buffer.readInt32LE(WIDTH_OFFSET);
parsedBitmap.numColors = buffer.readInt32LE(NUM_COLORS_OFFSET);
let COLOR_TABLE_SIZE = parsedBitmap.numColors * 4;
parsedBitmap.colorTable = buffer.slice(COLOR_TABLE_OFFSET,COLOR_TABLE_SIZE);

parsedBitmap;