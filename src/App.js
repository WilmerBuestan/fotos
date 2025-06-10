// src/App.js
import React, { useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import FaceCompare from './components/FaceCompare';

const App = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'; // ❗ Importante: ruta relativa simple para Vercel/GH Pages
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      console.log('✅ Modelos cargados correctamente');
      setModelsLoaded(true);
    };

    loadModels();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎯 Buscador de Fotos - Trail 2025</h1>
      {modelsLoaded ? (
        <FaceCompare />
      ) : (
        <p>🌀 Cargando modelos de reconocimiento facial...</p>
      )}
    </div>
  );
};

export default App;
