package com.bill.webconfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MyWebMvcConfigurer implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
        registry.addResourceHandler("/img/**").addResourceLocations("file:///C:/img/");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        InterceptorRegistration is=registry.addInterceptor(new LoginInterceptor());
        is.addPathPatterns("/**");
        is.excludePathPatterns("/login");
        is.excludePathPatterns("/userLogin");
        is.excludePathPatterns("/myimg/**");
        is.excludePathPatterns("/images/**");
        is.excludePathPatterns("/layui/**");
        is.excludePathPatterns("/css/**");
        is.excludePathPatterns("/myjs/**");
        is.excludePathPatterns("/register");
        is.excludePathPatterns("/checkUserInfoIsNull");
        is.excludePathPatterns("/registerUser");
    }
}
