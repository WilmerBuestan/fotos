// api/get-images.js

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  try {
    const result = await cloudinary.search
      .expression('folder:evento2025') // Asegúrate de que exista esta carpeta
      .sort_by('public_id', 'desc')
      .max_results(100)
      .execute();

    const urls = result.resources.map(img => img.secure_url);
    res.status(200).json(urls);
  } catch (error) {
    console.error('❌ Error al obtener imágenes:', error);
    res.status(500).json({ error: 'Error al obtener imágenes' });
  }
}
