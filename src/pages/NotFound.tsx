import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | LanceWithUs</title>
        <meta name="description" content="Sorry, the page you're looking for doesn't exist. Contact LanceWithUs for professional web development services." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-6xl font-bold mb-4 text-blue-400">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-gray-300 mb-8">
            The page you're looking for doesn't exist. But don't worry, our team at LanceWithUs can help you build amazing web solutions!
          </p>
          
          <div className="space-y-4">
            <a 
              href="/" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Return to Home
            </a>
            
            <div className="text-sm text-gray-400">
              <p>Need help? <a href="mailto:lancewithus@gmail.com" className="text-blue-400 hover:text-blue-300">Contact us</a></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
