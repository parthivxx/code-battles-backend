const errorHandler = (err, req, res, next) => {
    const statusCode = res?.status === 200 ? 500 : res?.status;
    
    res.status(statusCode).json({
      message: "Something went wrong",
    });
  };
  
  module.exports = errorHandler;
  