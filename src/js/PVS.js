Quake2.PVS = {};

Quake2.PVS.parse = function (data) {
  const pvs = data.visibility.map(function (string) {
    const binary = window.atob(string);
    const array = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    return array;
  });
  const matrix = Object.create(null);
  for (var i = 0; i < pvs.length; i++) {
    matrix[i] = [];
    for (var j = 0, c = 0; j < pvs[i].length; j++) {
      if (pvs[i][j]) {
        for (var k = 1; k < 256; k *= 2, c++) {
          if (pvs[i][j] & k) {
            matrix[i].push(c);
          }
        }
      } else {
        c += 8 * pvs[i][++j];
      }
    }
  }
  return matrix;
};
