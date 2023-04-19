// require node modules
const calculateSizeF = (stats) => {
  // size in bytes
  const filsizeBytes = stats.size; // bytes

  // size in human readable format
  const units = "BKMGT";

  // ......1000......1000000.........1000000000...
  // log10
  // 0.......3..........6................9.....
  // log10(filesize)/3;

  const index = Math.floor(Math.log10(filsizeBytes) / 3);

  // 700 -> 700/1000^0
  // 10000 -> 10000/1000^1
  // 10000000 -> 10000/1000^2
  const filesizeHuman = (filsizeBytes / Math.pow(1000, index)).toFixed(1);

  const unit = units[index];

  filesize = `${filesizeHuman} ${unit}`;

  return [filesize, filsizeBytes];
};

module.exports = calculateSizeF;
