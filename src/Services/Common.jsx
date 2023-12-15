// Used to restrict API calls to just our app.
// All HTTP endpoints need to include this.
export const headers = {
  "x-api-key": "$$L8diSiS@hBY!49",
};

export const handleResponse = (response) => {
  if (!response.data) {
    throw new Error("Response data not available");
  }

  if (response.data.error) {
    throw new Error(response.data.error);
  }

  return response.data;
};
