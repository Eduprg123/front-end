# Spring Boot CORS Configuration Guide

This document explains how to configure CORS (Cross-Origin Resource Sharing) in your Spring Boot backend to allow the React front-end to communicate with it.

## Why is CORS needed?

By default, web browsers implement a security feature called the Same-Origin Policy, which prevents JavaScript from making requests to a different domain than the one that served the web page. Since your React app runs on `http://localhost:3000` and your Spring Boot API runs on `http://localhost:8080`, they are considered different origins.

CORS allows you to configure your backend to accept requests from specific origins.

## Spring Boot CORS Configuration

### Option 1: Global CORS Configuration (Recommended)

Create a configuration class in your Spring Boot application:

```java
package com.example.demo.config;

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
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

### Option 2: Controller-Level CORS

You can also add CORS annotations to specific controllers:

```java
package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    @GetMapping
    public List<User> getAllUsers() {
        // Your implementation
    }
    
    @PostMapping
    public User createUser(@RequestBody User user) {
        // Your implementation
    }
}
```

### Option 3: Spring Security CORS Configuration

If you're using Spring Security, add CORS configuration to your security config:

```java
package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
            );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
```

## Production Configuration

For production environments, replace `http://localhost:3000` with your actual front-end domain:

```java
.allowedOrigins("https://yourdomain.com", "https://www.yourdomain.com")
```

Or use environment variables:

```java
@Value("${app.cors.allowed-origins}")
private String allowedOrigins;

@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
            .allowedOrigins(allowedOrigins.split(","))
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
}
```

Then in `application.properties`:
```properties
app.cors.allowed-origins=http://localhost:3000,https://yourdomain.com
```

## Testing CORS Configuration

1. Start your Spring Boot application
2. Start your React front-end application
3. Open the browser console (F12)
4. Check for any CORS-related errors
5. If configured correctly, you should see successful API requests

## Common Issues

### Issue 1: "Access-Control-Allow-Origin" error
**Solution**: Ensure the origin in your CORS config matches exactly with your front-end URL (including protocol and port).

### Issue 2: Preflight requests failing
**Solution**: Make sure "OPTIONS" is included in the allowed methods.

### Issue 3: Credentials not being sent
**Solution**: Set `allowCredentials(true)` and ensure your front-end is sending credentials with the request.

## References

- [Spring Boot CORS Documentation](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-cors)
- [MDN CORS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
