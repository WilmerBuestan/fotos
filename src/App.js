// src/App.js
import React, { useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import FaceCompare from './components/FaceCompare';

const App = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL + '/ssd_mobilenetv1');
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL + '/face_landmark_68');
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL + '/face_recognition');
      console.log('Modelos cargados correctamente ✅');
      setModelsLoaded(true);
    };

    loadModels();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎯 Buscador de Fotos - Trail 2025</h1>
      {modelsLoaded ? <FaceCompare /> : <p>🌀 Cargando modelos de reconocimiento facial...</p>}
    </div>
  );
};

export default App;
