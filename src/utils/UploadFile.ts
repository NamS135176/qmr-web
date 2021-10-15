import Resizer from "react-image-file-resizer";
export const resizeFile = (file: any) =>
  new Promise((resolve) => {
    const fileType = file.type.split("/")[1];
    console.log(fileType);
    Resizer.imageFileResizer(
      file,
      1920,
      1080,
      fileType,
      75,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
export const checkSize = (file: any) => {
  const mb = file.size / 1024 / 1024;
  if (mb <= 2) {
    return true;
  } else {
    return false;
  }
};
