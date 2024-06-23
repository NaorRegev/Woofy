package com.woofy.woofy_backend.Models.Enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum PermissionEnum {

    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    BUSINESS_READ("business:read"),
    BUSINESS_UPDATE("business:update"),
    BUSINESS_CREATE("business:create"),
    BUSINESS_DELETE("business:delete"),
    CUSTOMER_READ("customer:read"),
    CUSTOMER_UPDATE("customer:update"),
    CUSTOMER_CREATE("customer:create"),
    CUSTOMER_DELETE("customer:delete")

    ;

    @Getter
    private final String permission;
}