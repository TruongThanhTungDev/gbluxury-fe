import CryptoJs from "crypto-js";

const scretKey = "KyungMinUniversity-ACS";

export function encodeValue(value) {
  const encryptedValue = CryptoJs.AES.encrypt(value, scretKey).toString();
  return encryptedValue;
}

export function decodeValue(value) {
  const decryptedBytes = CryptoJs.AES.decrypt(value, scretKey);
  const decryptedValue = decryptedBytes.toString(CryptoJs.enc.Utf8);
  return decryptedValue;
}
