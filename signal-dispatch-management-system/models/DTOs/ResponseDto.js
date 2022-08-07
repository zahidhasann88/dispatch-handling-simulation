class ResponseDto {
    message = 'Operation failed. Something went wrong. Please try again later';
    isSuccess = false;
    statusCode = 500;
    payload = null;
}

module.exports = ResponseDto;