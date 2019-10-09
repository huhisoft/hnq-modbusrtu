//CRC-16 functions

exports.add16 = function(buff) {
	var len = buff.length - 2;
	buff.writeUInt16LE(crc16(buff, len), len);
};

exports.check16 = function(buff) {
	var len = buff.length - 2;
    try {
        return (crc16(buff, len) === buff.readUInt16LE(len));
    } catch (err) {
        //console.log(err);
    }
};

function crc16(buff, len) {
	var crc = 0xffff;
	for (var i = 0; i < len; ++i) {
    crc ^= buff[i];
    for (var j = 0; j < 8; ++j)
      if(crc & 0x0001)
        crc = (crc >> 1) ^ 0xa001;
      else
        crc >>= 1;
	}
	return crc;
}
