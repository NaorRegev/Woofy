package com.woofy.woofy_backend.Services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class LoggingService {
    public Logger logger = LoggerFactory.getLogger(getClass());
}
