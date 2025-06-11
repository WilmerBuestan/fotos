// api/get-images.js

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dltilyfqh',
  api_key: '918311935327946',
  api_secret: 'vtHCYaBb3NOy892sI-tsZTkxRn4',
});

module.exports = async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression('folder:evento2025') // nombre exacto de tu carpeta
      .sort_by('public_id','desc')
      .max_results(100)
      .execute();

    const urls = result.resources.map(img => img.secure_url);
    res.status(200).json(urls);
  } catch (error) {
    console.error('❌ Error al obtener imágenes:', error);
    res.status(500).json({ error: 'Error al obtener imágenes' });
  }
};
