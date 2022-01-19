export function getFormData(data) {
  const formData = new FormData();

  if (data) {
    for (const key in data) {
      formData.append(key, data[key]);
    }
  }

  return formData;
}
