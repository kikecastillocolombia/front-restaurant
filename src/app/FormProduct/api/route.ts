import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dmnjxgc8s",
  api_key: "922727786575569",
  api_secret: "twmbR_BAZjJva0rU84etVYy7d18",
});

export async function POST(request) {
  try {
    const data = await request.formData();
    const image = data.get("file");

    if (!image) {
      return NextResponse.json(
        { message: "No se ha subido la imagen" },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, (err, uploadResult) => {
        if (err) reject(err); // Si ocurre un error, lo rechazamos
        resolve(uploadResult); // Si no, resolvemos con el resultado de la subida
      }).end(buffer); // Terminamos el stream enviando el buffer de la imagen
    });

    console.log("Respuesta completa de Cloudinary:", result); // Cambié 'response' a 'result' porque es el objeto que devuelve la promesa

    // Verifica si secure_url existe en el resultado de Cloudinary
    if (result.secure_url) {
      return NextResponse.json({
        message: "Imagen subida con éxito",
        url: result.secure_url, // Devuelve la URL segura de la imagen subida
      });
    } else {
      return NextResponse.json(
        { message: "No se pudo obtener la URL segura", result },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error en el backend:", error);
    return NextResponse.json(
      { message: "Error interno en el servidor", error: error.message },
      { status: 500 }
    );
  }
}
