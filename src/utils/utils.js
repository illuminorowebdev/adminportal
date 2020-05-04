export const getFileNameFromKey = (key) => {
  const strs = String(key).split('/');
  const length = strs.length;
  if (strs[length - 1] === '') {
    return strs[length - 2];
  }
  return strs[length - 1];
};

export const getFileExtensionFromKey = (key) => {
  const strs = String(key).split('.');
  return String(strs[strs.length - 1]).toLowerCase();
};

export const getFileTypeFromKey = (key) => {
  const extension = getFileExtensionFromKey(key);
  const sources = ['zip', 'rar'];
  const videos = ['mp4'];
  if (videos.indexOf(extension) >= 0) {
    return 'video';
  }
  if (sources.indexOf(extension) >= 0) {
    return 'source';
  }
  return 'image';
};
