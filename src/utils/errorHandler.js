export const handleApiError = (error) => {
  // Server responded with error
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        return data.message || 'Invalid request';
      case 401:
        return 'Session expired. Please login again.';
      case 403:
        return 'You are not allowed to perform this action.';
      case 404:
        return 'Resource not found.';
      case 409:
        return data.message || 'Conflict error';
      case 422:
        return data.message || 'Validation failed';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return 'Something went wrong';
    }
  }

  // Request sent but no response
  if (error.request) {
    return 'Network error. Please check your internet connection.';
  }

  // Something else happened
  return error.message || 'Unexpected error';
};
