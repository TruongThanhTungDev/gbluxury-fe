
export const convertToSlug = (str) => {
  str = str.toLowerCase();
  str = str.replace(/á|à|ả|ã|ạ/g, 'a')
    .replace(/ă|ắ|ằ|ẳ|ẵ|ặ/g, 'a')
    .replace(/â|ầ|ấ|ẩ|ẫ|ậ/g, 'a')
    .replace(/é|è|ẻ|ẽ|ẹ/g, 'e')
    .replace(/ê|ế|ề|ể|ễ|ệ/g, 'e')
    .replace(/í|ì|ỉ|ĩ|ị/g, 'i')
    .replace(/ó|ò|ỏ|õ|ọ/g, 'o')
    .replace(/ô|ố|ồ|ổ|ỗ|ộ/g, 'o')
    .replace(/ơ|ớ|ờ|ở|ỡ|ợ/g, 'o')
    .replace(/ú|ù|ủ|ũ|ụ/g, 'u')
    .replace(/ư|ừ|ử|ữ|ự/g, 'u')
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y')
    .replace(/đ/g, 'd');
  str = str.replace(/\s+/g, '-');
  str = str.replace(/[^a-z0-9-]/g, '');
  return str
}