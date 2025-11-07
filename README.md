# Front-end Application - Spring Boot Connection

This is a React front-end application configured to connect with a Spring Boot backend API.

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A running Spring Boot backend (default: http://localhost:8080)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Eduprg123/front-end.git
cd front-end
```

2. Install dependencies:
```bash
npm install
```

3. Configure the backend URL (optional):
```bash
cp .env.example .env.local
# Edit .env.local to set your Spring Boot backend URL
```

4. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## 🔌 Spring Boot Connection

### Backend Configuration

This front-end application is configured to connect to a Spring Boot backend API running on:
- **Default URL**: `http://localhost:8080/api`
- **Health Check**: `http://localhost:8080/actuator/health`

### Configuring the Backend URL

You can configure the backend URL using environment variables:

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and set your backend URL:
```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_API_TIMEOUT=10000
```

### CORS Configuration

Your Spring Boot backend must have CORS enabled to accept requests from the React front-end. Add this configuration to your Spring Boot application:

```java
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### API Service Layer

The application includes a service layer for communicating with the Spring Boot backend:

- **`src/config/api.config.js`**: API configuration (URL, timeout, endpoints)
- **`src/services/api.service.js`**: Generic HTTP service for API calls
- **`src/services/user.service.js`**: Example service for user management

### Example Usage

```javascript
import userService from './services/user.service';

// Get all users
const users = await userService.getAllUsers();

// Create a new user
const newUser = await userService.createUser({
  name: 'John Doe',
  email: 'john@example.com'
});
```

## 📁 Project Structure

```
front-end/
├── public/              # Static files
├── src/
│   ├── components/      # React components
│   │   └── SpringBootDemo.js  # Demo component for backend connection
│   ├── config/          # Configuration files
│   │   └── api.config.js      # API configuration
│   ├── services/        # API service layer
│   │   ├── api.service.js     # Generic HTTP service
│   │   └── user.service.js    # User service example
│   ├── App.js          # Main application component
│   └── index.js        # Application entry point
├── .env.example        # Environment variables template
└── package.json        # Project dependencies
```

## 🛠️ Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## 🔧 Troubleshooting

### Connection Issues

If you see "Not connected to Spring Boot Backend":

1. Verify your Spring Boot backend is running on port 8080
2. Check that CORS is properly configured in your backend
3. Ensure the backend URL in `.env.local` is correct
4. Check browser console for detailed error messages

### CORS Errors

If you see CORS errors in the browser console:

1. Ensure your Spring Boot application has CORS configuration (see above)
2. Verify the allowed origins include `http://localhost:3000`
3. Check that all required HTTP methods are allowed

## 📚 Additional Resources

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [Spring Boot CORS Configuration](https://spring.io/guides/gs/rest-service-cors/)

## 📝 License

This project is open source and available under the MIT License.

