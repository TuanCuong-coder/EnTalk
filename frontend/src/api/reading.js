//frontend/src/api/reading.js;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_READING, API_TOPIC } from './apiConfig';
import RNFetchBlob from 'react-native-blob-util';
// ✅ GET tất cả bài đọc mẫu
export const fetchAllReadings = () => API_READING.get('/all');

// 📤 POST file ghi âm + ID bài đọc
export const submitRecording = async (
  filePath,
  readingId,
  customText = null,
) => {
  const token = await AsyncStorage.getItem('token');

  const body = [
    {
      name: 'audio',
      filename: 'record.wav',
      type: 'audio/wav',
      data: RNFetchBlob.wrap(filePath),
    },
  ];

  if (readingId) {
    body.push({ name: 'readingId', data: String(readingId) });
  }
  if (customText) {
    body.push({ name: 'customText', data: customText });
  }

  const res = await RNFetchBlob.fetch(
    'POST',
    'http://192.168.100.39:3000/api/reading/record',
    {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
    body,
  );

  const json = res.json();
  return { data: json };
};
export const fetchReadingsByTopic = topicId =>
  API_READING.get(`/topic/${topicId}`);
export const fetchAllTopics = () => API_TOPIC.get('/');
