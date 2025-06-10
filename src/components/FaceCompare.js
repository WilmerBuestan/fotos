// src/components/FaceCompare.js
import React, { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const FaceCompare = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const [selfieUrl, setSelfieUrl] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      console.log('✅ Modelos cargados correctamente');
    };
    loadModels();
  }, []);

  const loadImageSafely = async (url) => {
    try {
      const image = await faceapi.fetchImage(url);
      return image;
    } catch (error) {
      console.error(`❌ Error procesando imagen: ${url}`, error.message);
      return null;
    }
  };

  const handleSelfieUpload = async (e) => {
    setLoading(true);
    setMatches([]);
    setResult('');
    const file = e.target.files[0];
    const img = await faceapi.bufferToImage(file);
    setSelfieUrl(URL.createObjectURL(file));

    const selfieDetection = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!selfieDetection) {
      setResult('❌ No se detectó rostro en la selfie.');
      setLoading(false);
      return;
    }

    const selfieDescriptor = selfieDetection.descriptor;
    const faceMatcher = new faceapi.FaceMatcher(selfieDescriptor);

    // 👉 Obtener las imágenes desde la API de Cloudinary
    console.log("📥 Obteniendo imágenes desde Cloudinary...");
    const response = await fetch('/api/get-images');
    const urls = await response.json();

    const matchingPhotos = [];

    for (const url of urls) {
      console.log('🔍 Probando imagen:', url);
      const image = await loadImageSafely(url);
      if (!image) continue;

      const detections = await faceapi
        .detectAllFaces(image)
        .withFaceLandmarks()
        .withFaceDescriptors();

      for (const d of detections) {
        const bestMatch = faceMatcher.findBestMatch(d.descriptor);
        if (bestMatch.label !== 'unknown') {
          matchingPhotos.push(url);
          break;
        }
      }
    }

    if (matchingPhotos.length > 0) {
      setResult(`✅ Se encontraron ${matchingPhotos.length} coincidencias.`);
      setMatches(matchingPhotos);
    } else {
      setResult('❌ No se encontraron coincidencias.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>📷 Sube tu selfie para buscar coincidencias</h2>
      <input type="file" accept="image/*" onChange={handleSelfieUpload} />
      {selfieUrl && (
        <div style={{ marginTop: '1rem' }}>
          <p>📸 Selfie cargada:</p>
          <img src={selfieUrl} alt="Selfie" width="200" />
        </div>
      )}
      {loading && <p>🌀 Analizando fotos del evento...</p>}
      {result && <h3>{result}</h3>}
      {matches.length > 0 && (
        <div>
          <h4>📸 Coincidencias encontradas:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {matches.map((url, index) => (
              <img key={index} src={url} alt={`Match ${index}`} width="200" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FaceCompare;
