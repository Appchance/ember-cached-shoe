export function encodeData(data) {
  if (typeof btoa === "function") {
    return btoa(data);
  } else if (typeof FastBoot === "object") {
    try {
      const buffer = FastBoot.require("buffer");
      return buffer.Buffer.from(data).toString("base64");
    } catch (err) {
      throw new Error(
        "buffer must be available for encoding base64 strings in FastBoot. Make sure to add buffer to your fastbootDependencies."
      );
    }
  } else {
    throw new Error(
      "Neither btoa nor the FastBoot global are avaialble. Unable to encode base64 strings."
    );
  }
}
