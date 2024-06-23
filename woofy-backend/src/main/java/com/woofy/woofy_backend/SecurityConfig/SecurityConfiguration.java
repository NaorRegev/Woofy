package com.woofy.woofy_backend.SecurityConfig;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;


import static com.woofy.woofy_backend.Models.Enums.PermissionEnum.*;
import static com.woofy.woofy_backend.Models.Enums.RoleEnum.*;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

    private static final String[] WHITE_LIST_URL = {"/api/v1/auth/**","/api/v1/business/**","/api/v1/user/**","/api/v1/image/**", "/api/v1/dogs/**", "/api/v1/appointment/**","/api/v1/auth/business-type/**, "
            ,"/api/v1/map/**", "/api/v1/reviews/**", "/api/v1/notifications/**"};
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req.requestMatchers(WHITE_LIST_URL)
                                .permitAll()
                                .requestMatchers("/api/v1/**").hasAnyRole(ADMIN.name())
                                .requestMatchers("/api/v1/business/**").hasAnyRole(BUSINESS.name())
                                .requestMatchers(GET, "/api/v1/business/**").hasAnyAuthority(BUSINESS_READ.name())
                                .requestMatchers(GET, "/api/v1/appointment/**").hasAnyAuthority(BUSINESS_READ.name())
                                .requestMatchers(POST, "/api/v1/business/**").hasAnyAuthority(BUSINESS_CREATE.name())
                                .requestMatchers(PUT, "/api/v1/business/**").hasAnyAuthority(BUSINESS_UPDATE.name())
                                .requestMatchers(DELETE, "/api/v1/business/**").hasAnyAuthority(BUSINESS_DELETE.name())
                                .requestMatchers("/api/v1/customer/**").hasAnyRole(CUSTOMER.name())
                                .requestMatchers("/api/v1/user/**").hasAnyRole(CUSTOMER.name(), BUSINESS.name())
                                .anyRequest()
                                .authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(logout ->
                        logout.logoutUrl("/api/v1/auth/logout")
                                .addLogoutHandler(logoutHandler)
                                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
                )
        ;

        return http.build();
    }
}