-- ============================================================
-- B2B 企业官网建表脚本 v3.0
-- MySQL 8.0+ / InnoDB / utf8mb4
-- 42 张表（含语言表、多语言翻译表、渠道链接表、询价/定制表）
-- ============================================================

CREATE DATABASE IF NOT EXISTS `b2b_website`
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `b2b_website`;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- 一、系统管理（7 表）
-- ============================================================

-- 1. 语言表
DROP TABLE IF EXISTS `language`;
CREATE TABLE `language` (
  `id`          BIGINT      NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `code`        VARCHAR(10) NOT NULL                COMMENT '语言代码:zh-CN,zh-TW,en,ja,ko,es,ar',
  `name`        VARCHAR(50) NOT NULL                COMMENT '语言英文名,如Chinese/English',
  `native_name` VARCHAR(50) NOT NULL                COMMENT '语言本地名称,如简体中文/English',
  `flag_icon`   VARCHAR(10) DEFAULT NULL            COMMENT '国旗emoji图标',
  `is_rtl`      TINYINT(1)  NOT NULL DEFAULT 0      COMMENT '是否RTL从右到左布局:0-否,1-是(阿拉伯语)',
  `sort`        INT         NOT NULL DEFAULT 0      COMMENT '排序序号,数值越小越靠前',
  `status`      TINYINT     NOT NULL DEFAULT 1      COMMENT '状态:0-禁用,1-启用',
  `created_at`  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='语言表';

-- 2. 管理员表
DROP TABLE IF EXISTS `sys_admin`;
CREATE TABLE `sys_admin` (
  `id`            BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `username`      VARCHAR(50)  NOT NULL                COMMENT '登录用户名',
  `password`      VARCHAR(100) NOT NULL                COMMENT '密码bcrypt哈希值',
  `real_name`     VARCHAR(50)  NOT NULL                COMMENT '真实姓名',
  `email`         VARCHAR(100) DEFAULT NULL            COMMENT '邮箱地址',
  `phone`         VARCHAR(20)  DEFAULT NULL            COMMENT '手机号码',
  `avatar`        VARCHAR(500) DEFAULT NULL            COMMENT '头像图片URL',
  `status`        TINYINT      NOT NULL DEFAULT 1      COMMENT '状态:0-禁用,1-启用',
  `last_login_at` DATETIME     DEFAULT NULL            COMMENT '最后登录时间',
  `last_login_ip` VARCHAR(50)  DEFAULT NULL            COMMENT '最后登录IP地址',
  `created_at`    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted`       TINYINT(1)   NOT NULL DEFAULT 0      COMMENT '逻辑删除标记:0-未删除,1-已删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员表';

-- 3. 角色表
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id`          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `role_name`   VARCHAR(50)  NOT NULL                COMMENT '角色名称,如超级管理员/运营人员',
  `role_code`   VARCHAR(50)  NOT NULL                COMMENT '角色编码,如super_admin/operator',
  `description` VARCHAR(200) DEFAULT NULL            COMMENT '角色描述说明',
  `sort`        INT          NOT NULL DEFAULT 0      COMMENT '排序序号,数值越小越靠前',
  `status`      TINYINT      NOT NULL DEFAULT 1      COMMENT '状态:0-禁用,1-启用',
  `created_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted`     TINYINT(1)   NOT NULL DEFAULT 0      COMMENT '逻辑删除标记:0-未删除,1-已删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_role_code` (`role_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色表';

-- 4. 权限表
DROP TABLE IF EXISTS `sys_permission`;
CREATE TABLE `sys_permission` (
  `id`              BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `parent_id`       BIGINT       NOT NULL DEFAULT 0      COMMENT '父级权限ID,0表示顶级',
  `permission_name` VARCHAR(50)  NOT NULL                COMMENT '权限名称,如产品管理/用户列表',
  `permission_code` VARCHAR(100) NOT NULL                COMMENT '权限标识编码,如product:list',
  `type`            TINYINT      NOT NULL DEFAULT 1      COMMENT '权限类型:1-菜单,2-按钮,3-接口',
  `path`            VARCHAR(200) DEFAULT NULL            COMMENT '前端路由路径',
  `component`       VARCHAR(200) DEFAULT NULL            COMMENT '前端组件路径',
  `icon`            VARCHAR(50)  DEFAULT NULL            COMMENT '菜单图标名称',
  `sort`            INT          NOT NULL DEFAULT 0      COMMENT '排序序号,数值越小越靠前',
  `status`          TINYINT      NOT NULL DEFAULT 1      COMMENT '状态:0-禁用,1-启用',
  `created_at`      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_permission_code` (`permission_code`),
  KEY `idx_parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='权限表';

-- 5. 管理员-角色关联表
DROP TABLE IF EXISTS `sys_admin_role`;
CREATE TABLE `sys_admin_role` (
  `id`         BIGINT   NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `admin_id`   BIGINT   NOT NULL                COMMENT '管理员ID,关联sys_admin表',
  `role_id`    BIGINT   NOT NULL                COMMENT '角色ID,关联sys_role表',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_admin_role` (`admin_id`, `role_id`),
  KEY `idx_role_id` (`role_id`),
  CONSTRAINT `fk_ar_admin` FOREIGN KEY (`admin_id`) REFERENCES `sys_admin` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ar_role`  FOREIGN KEY (`role_id`)  REFERENCES `sys_role`  (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员-角色关联表';

-- 6. 角色-权限关联表
DROP TABLE IF EXISTS `sys_role_permission`;
CREATE TABLE `sys_role_permission` (
  `id`            BIGINT   NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `role_id`       BIGINT   NOT NULL                COMMENT '角色ID,关联sys_role表',
  `permission_id` BIGINT   NOT NULL                COMMENT '权限ID,关联sys_permission表',
  `created_at`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_role_perm` (`role_id`, `permission_id`),
  KEY `idx_permission_id` (`permission_id`),
  CONSTRAINT `fk_rp_role` FOREIGN KEY (`role_id`)       REFERENCES `sys_role`       (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_rp_perm` FOREIGN KEY (`permission_id`) REFERENCES `sys_permission` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色-权限关联表';

-- 7. 操作日志表
DROP TABLE IF EXISTS `sys_operation_log`;
CREATE TABLE `sys_operation_log` (
  `id`              BIGINT        NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `admin_id`        BIGINT        DEFAULT NULL            COMMENT '操作管理员ID,关联sys_admin表',
  `admin_name`      VARCHAR(50)   DEFAULT NULL            COMMENT '操作管理员用户名快照',
  `module`          VARCHAR(50)   NOT NULL                COMMENT '操作模块,如product/inquiry/customer',
  `operation`       VARCHAR(100)  NOT NULL                COMMENT '操作描述,如新增产品/删除分类',
  `method`          VARCHAR(10)   DEFAULT NULL            COMMENT 'HTTP请求方法:GET/POST/PUT/DELETE',
  `request_url`     VARCHAR(500)  DEFAULT NULL            COMMENT '请求URL路径',
  `request_params`  TEXT          DEFAULT NULL            COMMENT '请求参数JSON字符串',
  `response_result` TEXT          DEFAULT NULL            COMMENT '响应结果JSON字符串',
  `ip`              VARCHAR(50)   DEFAULT NULL            COMMENT '操作人IP地址',
  `status`          TINYINT       NOT NULL DEFAULT 1      COMMENT '操作状态:0-失败,1-成功',
  `error_msg`       VARCHAR(1000) DEFAULT NULL            COMMENT '失败时的错误信息',
  `cost_time`       BIGINT        DEFAULT NULL            COMMENT '请求耗时,单位毫秒',
  `created_at`      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_admin_id`   (`admin_id`),
  KEY `idx_module`     (`module`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='操作日志表';

-- ============================================================
-- 二、客户（1 表）
-- ============================================================

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id`               BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `username`         VARCHAR(50)  NOT NULL                COMMENT '登录账号(邮箱或手机号)',
  `password`         VARCHAR(100) NOT NULL                COMMENT '密码bcrypt哈希值',
  `company_name`     VARCHAR(200) NOT NULL                COMMENT '企业/公司名称',
  `credit_code`      VARCHAR(30)  DEFAULT NULL            COMMENT '统一社会信用代码',
  `contact_person`   VARCHAR(50)  NOT NULL                COMMENT '联系人姓名',
  `contact_phone`    VARCHAR(20)  NOT NULL                COMMENT '联系电话',
  `contact_email`    VARCHAR(100) DEFAULT NULL            COMMENT '联系邮箱',
  `province`         VARCHAR(50)  DEFAULT NULL            COMMENT '省份',
  `city`             VARCHAR(50)  DEFAULT NULL            COMMENT '城市',
  `address`          VARCHAR(300) DEFAULT NULL            COMMENT '详细地址',
  `industry`         VARCHAR(100) DEFAULT NULL            COMMENT '所属行业',
  `business_license` VARCHAR(500) DEFAULT NULL            COMMENT '营业执照图片URL',
  `audit_status`     TINYINT      NOT NULL DEFAULT 0      COMMENT '审核状态:0-待审核,1-审核通过,2-审核驳回',
  `audit_remark`     VARCHAR(500) DEFAULT NULL            COMMENT '审核备注/驳回原因',
  `audited_at`       DATETIME     DEFAULT NULL            COMMENT '审核时间',
  `audited_by`       BIGINT       DEFAULT NULL            COMMENT '审核人管理员ID,关联sys_admin表',
  `status`           TINYINT      NOT NULL DEFAULT 1      COMMENT '账号状态:0-禁用,1-启用',
  `last_login_at`    DATETIME     DEFAULT NULL            COMMENT '最后登录时间',
  `last_login_ip`    VARCHAR(50)  DEFAULT NULL            COMMENT '最后登录IP地址',
  `remark`           VARCHAR(500) DEFAULT NULL            COMMENT '客户备注',
  `created_at`       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted`          TINYINT(1)   NOT NULL DEFAULT 0      COMMENT '逻辑删除标记:0-未删除,1-已删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username`   (`username`),
  KEY `idx_company_name`     (`company_name`),
  KEY `idx_credit_code`      (`credit_code`),
  KEY `idx_audit_status`     (`audit_status`),
  KEY `idx_contact_phone`    (`contact_phone`),
  KEY `idx_created_at`       (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='企业客户表';

-- ============================================================
-- 三、产品（12 表）
-- ============================================================

-- 9. 产品分类主表
DROP TABLE IF EXISTS `product_category`;
CREATE TABLE `product_category` (
  `id`             BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `parent_id`      BIGINT       NOT NULL DEFAULT 0      COMMENT '父分类ID,0表示顶级分类',
  `category_image` VARCHAR(500) DEFAULT NULL            COMMENT '分类封面图片URL',
  `level`          TINYINT      NOT NULL DEFAULT 1      COMMENT '分类层级:1-一级,2-二级,3-三级',
  `sort`           INT          NOT NULL DEFAULT 0      COMMENT '排序序号,数值越小越靠前',
  `status`         TINYINT      NOT NULL DEFAULT 1      COMMENT '状态:0-禁用,1-启用',
  `created_at`     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted`        TINYINT(1)   NOT NULL DEFAULT 0      COMMENT '逻辑删除标记:0-未删除,1-已删除',
  PRIMARY KEY (`id`),
  KEY `idx_parent_id`   (`parent_id`),
  KEY `idx_status_sort` (`status`, `sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='产品分类主表';

-- 10. 产品分类翻译表
DROP TABLE IF EXISTS `product_category_i18n`;
CREATE TABLE `product_category_i18n` (
  `id`              BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `category_id`     BIGINT       NOT NULL                COMMENT '产品分类ID,关联product_category表',
  `lang_code`       VARCHAR(10)  NOT NULL                COMMENT '语言代码,关联language表,如zh-CN/en/ja',
  `category_name`   VARCHAR(100) NOT NULL                COMMENT '分类名称(该语言)',
  `description`     VARCHAR(500) DEFAULT NULL            COMMENT '分类描述(该语言)',
  `seo_title`       VARCHAR(200) DEFAULT NULL            COMMENT 'SEO标题(该语言)',
  `seo_keywords`    VARCHAR(500) DEFAULT NULL            COMMENT 'SEO关键词,逗号分隔(该语言)',
  `seo_description` VARCHAR(500) DEFAULT NULL            COMMENT 'SEO描述(该语言)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_cat_lang` (`category_id`, `lang_code`),
  KEY `idx_lang_code` (`lang_code`),
  CONSTRAINT `fk_pci18n_cat`  FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_pci18n_lang` FOREIGN KEY (`lang_code`)  REFERENCES `language`         (`code`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='产品分类翻译表';

-- 11. 产品主表
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id`                 BIGINT        NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `category_id`        BIGINT        NOT NULL                COMMENT '产品分类ID,关联product_category表',
  `product_code`       VARCHAR(100)  DEFAULT NULL            COMMENT '产品编号/货号',
  `slug`               VARCHAR(200)  DEFAULT NULL            COMMENT '默认语言URL slug,SEO友好路径',
  `main_image`         VARCHAR(500)  DEFAULT NULL            COMMENT '产品主图URL',
  `price_min`          DECIMAL(12,2) DEFAULT NULL            COMMENT '价格区间下限,单位元',
  `price_max`          DECIMAL(12,2) DEFAULT NULL            COMMENT '价格区间上限,单位元',
  `unit`               VARCHAR(20)   NOT NULL DEFAULT '件'   COMMENT '计量单位,如件/套/个/米',
  `min_order_quantity` INT           NOT NULL DEFAULT 1      COMMENT '最小起订量',
  `total_stock`        INT           NOT NULL DEFAULT 0      COMMENT '总库存数量(所有SKU合计)',
  `sales_count`        INT           NOT NULL DEFAULT 0      COMMENT '销量累计',
  `is_hot`             TINYINT(1)    NOT NULL DEFAULT 0      COMMENT '是否热销:0-否,1-是',
  `is_recommended`     TINYINT(1)    NOT NULL DEFAULT 0      COMMENT '是否推荐:0-否,1-是',
  `is_new`             TINYINT(1)    NOT NULL DEFAULT 0      COMMENT '是否新品:0-否,1-是',
  `status`             TINYINT       NOT NULL DEFAULT 1      COMMENT '状态:0-下架,1-上架',
  `sort`               INT           NOT NULL DEFAULT 0      COMMENT '排序序号,数值越小越靠前',
  `created_at`         DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`         DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted`            TINYINT(1)    NOT NULL DEFAULT 0      COMMENT '逻辑删除标记:0-未删除,1-已删除',
  PRIMARY KEY (`id`),
  KEY `idx_category_id`    (`category_id`),
  KEY `idx_status_sort`    (`status`, `sort`),
  KEY `idx_product_code`   (`product_code`),
  KEY `idx_slug`           (`slug`),
  KEY `idx_is_hot`         (`is_hot`),
  KEY `idx_is_recommended` (`is_recommended`),
  KEY `idx_created_at`     (`created_at`),
  CONSTRAINT `fk_prod_category` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='产品主表';

-- 12. 产品翻译表
DROP TABLE IF EXISTS `product_i18n`;
CREATE TABLE `product_i18n` (
  `id`              BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `product_id`      BIGINT       NOT NULL                COMMENT '产品ID,关联product表',
  `lang_code`       VARCHAR(10)  NOT NULL                COMMENT '语言代码,关联language表,如zh-CN/en/ja',
  `name`            VARCHAR(200) NOT NULL                COMMENT '产品名称(该语言)',
  `subtitle`        VARCHAR(300) DEFAULT NULL            COMMENT '副标题/卖点文案(该语言)',
  `description`     LONGTEXT     DEFAULT NULL            COMMENT '产品详情富文本HTML(该语言)',
  `specs_data`      TEXT         DEFAULT NULL            COMMENT '规格参数表JSON,格式:[{"label":"材质","value":"不锈钢"}](该语言)',
  `slug`            VARCHAR(200) DEFAULT NULL            COMMENT '该语言独立URL slug,SEO友好路径',
  `seo_title`       VARCHAR(200) DEFAULT NULL            COMMENT 'SEO标题(该语言)',
  `seo_keywords`    VARCHAR(500) DEFAULT NULL            COMMENT 'SEO关键词,逗号分隔(该语言)',
  `seo_description` VARCHAR(500) DEFAULT NULL            COMMENT 'SEO描述(该语言)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_prod_lang` (`product_id`, `lang_code`),
  UNIQUE KEY `uk_lang_slug` (`lang_code`, `slug`),
  KEY `idx_lang_code` (`lang_code`),
  FULLTEXT KEY `ft_product` (`name`, `subtitle`, `description`) WITH PARSER ngram,
  CONSTRAINT `fk_pi18n_prod` FOREIGN KEY (`product_id`) REFERENCES `product`  (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_pi18n_lang` FOREIGN KEY (`lang_code`) REFERENCES `language` (`code`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='产品翻译表';

-- 13. 产品SKU表
DROP TABLE IF EXISTS `product_sku`;
CREATE TABLE `product_sku` (
  `id`            BIGINT        NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `product_id`    BIGINT        NOT NULL                COMMENT '产品ID,关联product表',
  `sku_code`      VARCHAR(100)  DEFAULT NULL            COMMENT 'SKU编码/规格编码',
  `price`         DECIMAL(12,2) NOT NULL                COMMENT 'SKU单价,单位元',
  `stock`         INT           NOT NULL DEFAULT 0      COMMENT '库存数量',
  `stock_warning` INT           NOT NULL DEFAULT 0      COMMENT '库存预警阈值,低于此值提醒',
  `weight`        DECIMAL(10,3) DEFAULT NULL            COMMENT '重量,单位kg',
  `volume`        VARCHAR(50)   DEFAULT NULL            COMMENT '体积,如30x20x10cm',
  `status`        TINYINT       NOT NULL DEFAULT 1      COMMENT '状态:0-禁用,1-启用',
  `created_at`    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted`       TINYINT(1)    NOT NULL DEFAULT 0      COMMENT '逻辑删除标记:0-未删除,1-已删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_sku_code` (`sku_code`),
  KEY `idx_product_id` (`product_id`),
  KEY `idx_status`     (`status`),
  CONSTRAINT `fk_sku_prod` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='产品SKU表';

-- 14. 产品图片表
DROP TABLE IF EXISTS `product_image`;
CREATE TABLE `product_image` (
  `id`         BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `product_id` BIGINT       NOT NULL                COMMENT '产品ID,关联product表',
  `image_url`  VARCHAR(500) NOT NULL                COMMENT '图片访问URL',
  `alt_text`   VARCHAR(200) DEFAULT NULL            COMMENT '图片alt文本(SEO用)',
  `sort`       INT          NOT NULL DEFAULT 0      COMMENT '排序序号,数值越小越靠前',
  `is_main`    TINYINT(1)   NOT NULL DEFAULT 0      COMMENT '是否主图:0-否,1-是',
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_prod_sort` (`product_id`, `sort`),
  CONSTRAINT `fk_img_prod` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='产品图片表';

-- 15. 产品属性名主表
DROP TABLE IF EXISTS `product_attribute`;
CREATE TABLE `product_attribute` (
  `id`          BIGINT     NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `category_id` BIGINT     NOT NULL                COMMENT '所属产品分类ID,关联product_category表',
  `input_type`  TINYINT    NOT NULL DEFAULT 1      COMMENT '录入方式:1-单选,2-多选,3-手动输入',
  `sort`        INT        NOT NULL DEFAULT 0      COMMENT '排序序号,数值越小越靠前',
  `status`      TINYINT    NOT NULL DEFAULT 1      COMMENT '状态:0-禁用,1-启用',
  `created_at`  DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`  DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_category_id` (`category_id`),
  CONSTRAINT `fk_attr_cat` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='产品属性名主表';

-- 16. 产品属性名翻译表
DROP TABLE IF EXISTS `product_attribute_i18n`;
CREATE TABLE `product_attribute_i18n` (
  `id`             BIGINT      NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `attribute_id`   BIGINT      NOT NULL                COMMENT '产品属性ID,关联product_attribute表',
  `lang_code`      VARCHAR(10) NOT NULL                COMMENT '语言代码,关联language表,如zh-CN/en/ja',
  `attribute_name` VARCHAR(50) NOT NULL                COMMENT '属性名称(该语言),如颜色/尺寸/材质',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_attr_lang` (`attribute_id`, `lang_code`),
  KEY `idx_lang_code` (`lang_code`),
  CONSTRAINT `fk_pai18n_attr` FOREIGN KEY (`attribute_id`) REFERENCES `product_attribute` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_pai18n_lang` FOREIGN KEY (`lang_code`)  REFERENCES `language`          (`code`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='产品属性名翻译表';

-- 17. 产品属性值主表
DROP TABLE IF EXISTS `product_attribute_value`;
CREATE TABLE `product_attribute_value` (
  `id`           BIGINT   NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `attribute_id` BIGINT   NOT NULL                COMMENT '所属属性ID,关联product_attribute表',
  `sort`         INT      NOT NULL DEFAULT 0      COMMENT '排序序号,数值越小越靠前',
  `created_at`   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_attribute_id` (`attribute_id`),
  CONSTRAINT `fk_pav_attr` FOREIGN KEY (`attribute_id`) REFERENCES `product_attribute` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='产品属性值主表';

-- 18. 产品属性值翻译表
DROP TABLE IF EXISTS `product_attribute_value_i18n`;
CREATE TABLE `product_attribute_value_i18n` (
  `id`               BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `value_id`         BIGINT       NOT NULL                COMMENT '属性值ID,关联product_attribute_value表',
  `lang_code`        VARCHAR(10)  NOT NULL                COMMENT '语言代码,关联language表,如zh-CN/en/ja',
  `value_name`       VARCHAR(100) NOT NULL                COMMENT '属性值名称(该语言),如红色/L/不锈钢',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_val_lang` (`value_id`, `lang_code`),
  KEY `idx_lang_code` (`lang_code`),
  CONSTRAINT `fk_pavi18n_val`  FOREIGN KEY (`value_id`)  REFERENCES `product_attribute_value` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_pavi18n_lang` FOREIGN KEY (`lang_code`) REFERENCES `language`              (`code`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='产品属性值翻译表';

-- 19. SKU-属性值关联表
DROP TABLE IF EXISTS `product_sku_attribute`;
CREATE TABLE `product_sku_attribute` (
  `id`                 BIGINT   NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `sku_id`             BIGINT   NOT NULL                COMMENT 'SKU ID,关联product_sku表',
  `attribute_id`       BIGINT   NOT NULL                COMMENT '属性ID,关联product_attribute表',
  `attribute_value_id` BIGINT   NOT NULL                COMMENT '属性值ID,关联product_attribute_value表',
  `created_at`         DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_sku_attr_val` (`sku_id`, `attribute_id`, `attribute_value_id`),
  KEY `idx_attr_value_id` (`attribute_value_id`),
  KEY `idx_sku_id`        (`sku_id`),
  CONSTRAINT `fk_psa_sku`  FOREIGN KEY (`sku_id`)             REFERENCES `product_sku`             (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_psa_attr` FOREIGN KEY (`attribute_id`)       REFERENCES `product_attribute`       (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_psa_val`  FOREIGN KEY (`attribute_value_id`) REFERENCES `product_attribute_value` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='SKU-属性值关联表';

-- 20. 产品渠道链接表
DROP TABLE IF EXISTS `product_channel`;
CREATE TABLE `product_channel` (
  `id`           BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `product_id`   BIGINT       NOT NULL                COMMENT '产品ID,关联product表',
  `sku_id`       BIGINT       DEFAULT NULL            COMMENT '绑定具体SKU的ID,关联product_sku表;为空则适用于整个产品',
  `channel_type` TINYINT      NOT NULL                COMMENT '渠道类型:1-线上电商,2-WhatsApp',
  `shop_name`    VARCHAR(100) DEFAULT NULL            COMMENT '店铺名称(线上渠道用于按钮展示,如XX淘宝旗舰店;WhatsApp渠道可空)',
  `url`          VARCHAR(500) NOT NULL                COMMENT '跳转链接(线上渠道为店铺商品URL;WhatsApp为wa.me链接,支持预填消息)',
  `qr_code`      VARCHAR(500) DEFAULT NULL            COMMENT '渠道二维码图片URL(可选)',
  `sort`         INT          NOT NULL DEFAULT 0      COMMENT '排序序号,数值越小越靠前',
  `status`       TINYINT      NOT NULL DEFAULT 1      COMMENT '状态:0-禁用,1-启用',
  `created_at`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_product_id`   (`product_id`),
  KEY `idx_sku_id`       (`sku_id`),
  KEY `idx_channel_type` (`channel_type`),
  KEY `idx_status`       (`status`),
  CONSTRAINT `fk_pc_prod` FOREIGN KEY (`product_id`) REFERENCES `product`     (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_pc_sku`  FOREIGN KEY (`sku_id`)     REFERENCES `product_sku` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='产品渠道链接表';

-- ============================================================
-- 四、询价（2 表）
-- ============================================================

-- 21. 询价单表
DROP TABLE IF EXISTS `inquiry`;
CREATE TABLE `inquiry` (
  `id`             BIGINT        NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `inquiry_no`     VARCHAR(30)   NOT NULL                COMMENT '询价单号,系统自动生成,如INQ202501010001',
  `source`         TINYINT       NOT NULL DEFAULT 1      COMMENT '询价来源:1-产品页直接询价,2-定制需求转询价',
  `customer_id`    BIGINT        DEFAULT NULL            COMMENT '注册客户ID,关联customer表;游客询价为空',
  `company_name`   VARCHAR(200)  NOT NULL                COMMENT '客户公司名称',
  `contact_person` VARCHAR(50)   NOT NULL                COMMENT '联系人姓名',
  `contact_phone`  VARCHAR(20)   NOT NULL                COMMENT '联系电话',
  `contact_email`  VARCHAR(100)  DEFAULT NULL            COMMENT '联系邮箱',
  `item_count`     INT           NOT NULL DEFAULT 0      COMMENT '询价产品明细数量',
  `total_amount`   DECIMAL(14,2) DEFAULT NULL            COMMENT '报价总金额,单位元',
  `status`         TINYINT       NOT NULL DEFAULT 0      COMMENT '状态:0-待跟进,1-已报价,2-已成交,3-已关闭',
  `remark`         VARCHAR(1000) DEFAULT NULL            COMMENT '客户留言/备注',
  `quote_remark`   TEXT          DEFAULT NULL            COMMENT '报价说明(销售人员填写)',
  `quote_file`     VARCHAR(500)  DEFAULT NULL            COMMENT '报价单附件文件URL',
  `quoted_by`      BIGINT        DEFAULT NULL            COMMENT '报价人管理员ID,关联sys_admin表',
  `quoted_at`      DATETIME      DEFAULT NULL            COMMENT '报价时间',
  `deal_at`        DATETIME      DEFAULT NULL            COMMENT '成交时间',
  `closed_at`      DATETIME      DEFAULT NULL            COMMENT '关闭时间',
  `close_reason`   VARCHAR(500)  DEFAULT NULL            COMMENT '关闭原因',
  `ip`             VARCHAR(50)   DEFAULT NULL            COMMENT '提交时客户端IP地址',
  `lang_code`      VARCHAR(10)   NOT NULL DEFAULT 'zh-CN' COMMENT '提交时语言代码,关联language表',
  `created_at`     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted`        TINYINT(1)    NOT NULL DEFAULT 0      COMMENT '逻辑删除标记:0-未删除,1-已删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_inquiry_no` (`inquiry_no`),
  KEY `idx_customer_id`    (`customer_id`),
  KEY `idx_source_status`  (`source`, `status`),
  KEY `idx_status_created` (`status`, `created_at`),
  KEY `idx_quoted_by`      (`quoted_by`),
  KEY `idx_lang_code`      (`lang_code`),
  CONSTRAINT `fk_inq_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='询价单表';

-- 22. 询价单明细表
DROP TABLE IF EXISTS `inquiry_item`;
CREATE TABLE `inquiry_item` (
  `id`            BIGINT        NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `inquiry_id`    BIGINT        NOT NULL                COMMENT '询价单ID,关联inquiry表',
  `product_id`    BIGINT        DEFAULT NULL            COMMENT '产品ID,关联product表;定制产品可为空',
  `sku_id`        BIGINT        DEFAULT NULL            COMMENT 'SKU ID,关联product_sku表;无SKU可为空',
  `product_name`  VARCHAR(200)  DEFAULT NULL            COMMENT '产品名称快照(提交时名称)',
  `sku_name`      VARCHAR(200)  DEFAULT NULL            COMMENT 'SKU规格名称快照',
  `product_image` VARCHAR(500)  DEFAULT NULL            COMMENT '产品主图URL快照',
  `quantity`      INT           NOT NULL DEFAULT 1      COMMENT '询价数量',
  `spec_info`     VARCHAR(500)  DEFAULT NULL            COMMENT '规格信息文本快照,如颜色:红色;尺寸:L',
  `unit_price`    DECIMAL(12,2) DEFAULT NULL            COMMENT '报价单价,单位元',
  `subtotal`      DECIMAL(14,2) DEFAULT NULL            COMMENT '报价小计金额,单位元(单价x数量)',
  `created_at`    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_inquiry_id` (`inquiry_id`),
  KEY `idx_product_id` (`product_id`),
  KEY `idx_sku_id`     (`sku_id`),
  CONSTRAINT `fk_ii_inquiry` FOREIGN KEY (`inquiry_id`) REFERENCES `inquiry`     (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ii_prod`    FOREIGN KEY (`product_id`) REFERENCES `product`     (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_ii_sku`     FOREIGN KEY (`sku_id`)     REFERENCES `product_sku` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='询价单明细表';

-- ============================================================
-- 五、定制（5 表）
-- ============================================================

-- 23. 定制选项主表
DROP TABLE IF EXISTS `custom_option`;
CREATE TABLE `custom_option` (
  `id`          BIGINT     NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `option_code` VARCHAR(50) NOT NULL               COMMENT '选项编码,如material/craft/surface_treatment',
  `input_type`  TINYINT    NOT NULL DEFAULT 1      COMMENT '录入方式:1-单选,2-多选,3-手动输入',
  `is_required` TINYINT(1) NOT NULL DEFAULT 0      COMMENT '是否必填:0-否,1-是',
  `sort`        INT        NOT NULL DEFAULT 0      COMMENT '排序序号,数值越小越靠前',
  `status`      TINYINT    NOT NULL DEFAULT 1      COMMENT '状态:0-禁用,1-启用',
  `created_at`  DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`  DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_option_code` (`option_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='定制选项主表';

-- 24. 定制选项翻译表
DROP TABLE IF EXISTS `custom_option_i18n`;
CREATE TABLE `custom_option_i18n` (
  `id`          BIGINT      NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `option_id`   BIGINT      NOT NULL                COMMENT '定制选项ID,关联custom_option表',
  `lang_code`   VARCHAR(10) NOT NULL                COMMENT '语言代码,关联language表,如zh-CN/en/ja',
  `option_name` VARCHAR(50) NOT NULL                COMMENT '选项名称(该语言),如材质/工艺',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_co_lang` (`option_id`, `lang_code`),
  KEY `idx_lang_code` (`lang_code`),
  CONSTRAINT `fk_coi18n_opt`  FOREIGN KEY (`option_id`) REFERENCES `custom_option` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_coi18n_lang` FOREIGN KEY (`lang_code`) REFERENCES `language`      (`code`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='定制选项翻译表';

-- 25. 定制选项值主表
DROP TABLE IF EXISTS `custom_option_value`;
CREATE TABLE `custom_option_value` (
  `id`         BIGINT   NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `option_id`  BIGINT   NOT NULL                COMMENT '所属定制选项ID,关联custom_option表',
  `sort`       INT      NOT NULL DEFAULT 0      COMMENT '排序序号,数值越小越靠前',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_option_id` (`option_id`),
  CONSTRAINT `fk_cov_opt` FOREIGN KEY (`option_id`) REFERENCES `custom_option` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='定制选项值主表';

-- 26. 定制选项值翻译表
DROP TABLE IF EXISTS `custom_option_value_i18n`;
CREATE TABLE `custom_option_value_i18n` (
  `id`         BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `value_id`   BIGINT       NOT NULL                COMMENT '选项值ID,关联custom_option_value表',
  `lang_code`  VARCHAR(10)  NOT NULL                COMMENT '语言代码,关联language表,如zh-CN/en/ja',
  `value_name` VARCHAR(100) NOT NULL                COMMENT '选项值名称(该语言),如不锈钢/铝合金',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_cov_lang` (`value_id`, `lang_code`),
  KEY `idx_lang_code` (`lang_code`),
  CONSTRAINT `fk_covi18n_val`  FOREIGN KEY (`value_id`)  REFERENCES `custom_option_value` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_covi18n_lang` FOREIGN KEY (`lang_code`) REFERENCES `language`           (`code`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='定制选项值翻译表';

-- 27. 定制需求工单表
DROP TABLE IF EXISTS `custom_demand`;
CREATE TABLE `custom_demand` (
  `id`               BIGINT        NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `demand_no`        VARCHAR(30)   NOT NULL                COMMENT '需求工单号,系统自动生成,如DEM202501010001',
  `customer_id`      BIGINT        DEFAULT NULL            COMMENT '注册客户ID,关联customer表;游客提交为空',
  `company_name`     VARCHAR(200)  NOT NULL                COMMENT '客户公司名称',
  `contact_person`   VARCHAR(50)   NOT NULL                COMMENT '联系人姓名',
  `contact_phone`    VARCHAR(20)   NOT NULL                COMMENT '联系电话',
  `contact_email`    VARCHAR(100)  DEFAULT NULL            COMMENT '联系邮箱',
  `product_type`     VARCHAR(200)  DEFAULT NULL            COMMENT '定制产品类型描述',
  `material`         VARCHAR(200)  DEFAULT NULL            COMMENT '材质要求',
  `craft`            VARCHAR(200)  DEFAULT NULL            COMMENT '工艺要求',
  `size_spec`        VARCHAR(300)  DEFAULT NULL            COMMENT '尺寸规格要求',
  `quantity`         INT           DEFAULT NULL            COMMENT '定制数量',
  `budget`           DECIMAL(14,2) DEFAULT NULL            COMMENT '预算金额,单位元',
  `expected_date`    DATE          DEFAULT NULL            COMMENT '期望交货日期',
  `attachment_urls`  TEXT          DEFAULT NULL            COMMENT '附件URL列表JSON数组,如["url1","url2"]',
  `description`      TEXT          DEFAULT NULL            COMMENT '详细需求描述',
  `status`           TINYINT       NOT NULL DEFAULT 0      COMMENT '状态:0-待处理,1-已查看,2-已报价,3-已成交,4-已关闭',
  `quote_amount`     DECIMAL(14,2) DEFAULT NULL            COMMENT '报价金额,单位元',
  `quote_remark`     TEXT          DEFAULT NULL            COMMENT '报价说明',
  `quote_file`       VARCHAR(500)  DEFAULT NULL            COMMENT '报价单附件文件URL',
  `handler_id`       BIGINT        DEFAULT NULL            COMMENT '处理人管理员ID,关联sys_admin表',
  `handled_at`       DATETIME      DEFAULT NULL            COMMENT '领取/查看处理时间',
  `quoted_at`        DATETIME      DEFAULT NULL            COMMENT '报价时间',
  `follow_up_remark` TEXT          DEFAULT NULL            COMMENT '跟进记录备注',
  `ip`               VARCHAR(50)   DEFAULT NULL            COMMENT '提交时客户端IP地址',
  `lang_code`        VARCHAR(10)   NOT NULL DEFAULT 'zh-CN' COMMENT '提交时语言代码,关联language表',
  `created_at`       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted`          TINYINT(1)    NOT NULL DEFAULT 0      COMMENT '逻辑删除标记:0-未删除,1-已删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_demand_no` (`demand_no`),
  KEY `idx_customer_id` (`customer_id`),
  KEY `idx_status`      (`status`),
  KEY `idx_handler_id`  (`handler_id`),
  KEY `idx_created_at`  (`created_at`),
  KEY `idx_lang_code`   (`lang_code`),
  CONSTRAINT `fk_cd_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='定制需求工单表';

-- ============================================================
-- 六、内容管理（10 表）
-- ============================================================

-- 28. 新闻分类主表
DROP TABLE IF EXISTS `news_category`;
CREATE TABLE `news_category` (
  `id`         BIGINT   NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `sort`       INT      NOT NULL DEFAULT 0      COMMENT '排序序号,数值越小越靠前',
  `status`     TINYINT  NOT NULL DEFAULT 1      COMMENT '状态:0-禁用,1-启用',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='新闻分类主表';

-- 29. 新闻分类翻译表
DROP TABLE IF EXISTS `news_category_i18n`;
CREATE TABLE `news_category_i18n` (
  `id`            BIGINT      NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `category_id`   BIGINT      NOT NULL                COMMENT '新闻分类ID,关联news_category表',
  `lang_code`     VARCHAR(10) NOT NULL                COMMENT '语言代码,关联language表,如zh-CN/en/ja',
  `category_name` VARCHAR(50) NOT NULL                COMMENT '分类名称(该语言)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_nc_lang` (`category_id`, `lang_code`),
  KEY `idx_lang_code` (`lang_code`),
  CONSTRAINT `fk_nci18n_cat`  FOREIGN KEY (`category_id`) REFERENCES `news_category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_nci18n_lang` FOREIGN KEY (`lang_code`)  REFERENCES `language`      (`code`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='新闻分类翻译表';

-- 30. 新闻主表
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id`           BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `category_id`  BIGINT       NOT NULL                COMMENT '新闻分类ID,关联news_category表',
  `slug`         VARCHAR(200) DEFAULT NULL            COMMENT 'URL slug,SEO友好路径',
  `cover_image`  VARCHAR(500) DEFAULT NULL            COMMENT '封面图片URL',
  `author`       VARCHAR(50)  DEFAULT NULL            COMMENT '作者',
  `source`       VARCHAR(100) DEFAULT NULL            COMMENT '文章来源',
  `view_count`   INT          NOT NULL DEFAULT 0      COMMENT '浏览量累计',
  `is_top`       TINYINT(1)   NOT NULL DEFAULT 0      COMMENT '是否置顶:0-否,1-是',
  `is_published` TINYINT(1)   NOT NULL DEFAULT 1      COMMENT '是否发布:0-草稿,1-已发布',
  `published_at` DATETIME     DEFAULT NULL            COMMENT '发布时间',
  `created_at`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted`      TINYINT(1)   NOT NULL DEFAULT 0      COMMENT '逻辑删除标记:0-未删除,1-已删除',
  PRIMARY KEY (`id`),
  KEY `idx_cat_pub` (`category_id`, `is_published`, `published_at`),
  KEY `idx_is_top`   (`is_top`),
  KEY `idx_slug`     (`slug`),
  CONSTRAINT `fk_news_cat` FOREIGN KEY (`category_id`) REFERENCES `news_category` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='新闻主表';

-- 31. 新闻翻译表
DROP TABLE IF EXISTS `news_i18n`;
CREATE TABLE `news_i18n` (
  `id`              BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `news_id`         BIGINT       NOT NULL                COMMENT '新闻ID,关联news表',
  `lang_code`       VARCHAR(10)  NOT NULL                COMMENT '语言代码,关联language表,如zh-CN/en/ja',
  `title`           VARCHAR(300) NOT NULL                COMMENT '新闻标题(该语言)',
  `summary`         VARCHAR(500) DEFAULT NULL            COMMENT '摘要(该语言)',
  `content`         LONGTEXT     NOT NULL                COMMENT '新闻正文富文本HTML(该语言)',
  `slug`            VARCHAR(200) DEFAULT NULL            COMMENT '该语言独立URL slug',
  `seo_title`       VARCHAR(200) DEFAULT NULL            COMMENT 'SEO标题(该语言)',
  `seo_keywords`    VARCHAR(500) DEFAULT NULL            COMMENT 'SEO关键词,逗号分隔(该语言)',
  `seo_description` VARCHAR(500) DEFAULT NULL            COMMENT 'SEO描述(该语言)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_news_lang` (`news_id`, `lang_code`),
  UNIQUE KEY `uk_news_lang_slug` (`lang_code`, `slug`),
  KEY `idx_lang_code` (`lang_code`),
  FULLTEXT KEY `ft_news` (`title`, `summary`, `content`) WITH PARSER ngram,
  CONSTRAINT `fk_ni18n_news` FOREIGN KEY (`news_id`)   REFERENCES `news`         (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ni18n_lang` FOREIGN KEY (`lang_code`) REFERENCES `language` (`code`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='新闻翻译表';

-- 32. Banner主表
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id`               BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `image_url`        VARCHAR(500) NOT NULL                COMMENT 'PC端Banner图片URL',
  `mobile_image_url` VARCHAR(500) DEFAULT NULL            COMMENT '移动端Banner图片URL',
  `link_type`        TINYINT      NOT NULL DEFAULT 1      COMMENT '跳转类型:1-无链接,2-产品详情,3-分类页,4-外部链接,5-定制页',
  `link_url`         VARCHAR(500) DEFAULT NULL            COMMENT '跳转目标URL(外链为完整URL,内链为路径)',
  `sort`             INT          NOT NULL DEFAULT 0      COMMENT '排序序号,数值越小越靠前',
  `start_time`       DATETIME     DEFAULT NULL            COMMENT '展示开始时间',
  `end_time`         DATETIME     DEFAULT NULL            COMMENT '展示结束时间',
  `status`           TINYINT      NOT NULL DEFAULT 1      COMMENT '状态:0-禁用,1-启用',
  `created_at`       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted`          TINYINT(1)   NOT NULL DEFAULT 0      COMMENT '逻辑删除标记:0-未删除,1-已删除',
  PRIMARY KEY (`id`),
  KEY `idx_status_sort` (`status`, `sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Banner主表';

-- 33. Banner翻译表
DROP TABLE IF EXISTS `banner_i18n`;
CREATE TABLE `banner_i18n` (
  `id`        BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `banner_id` BIGINT       NOT NULL                COMMENT 'Banner ID,关联banner表',
  `lang_code` VARCHAR(10)  NOT NULL                COMMENT '语言代码,关联language表,如zh-CN/en/ja',
  `title`     VARCHAR(100) DEFAULT NULL            COMMENT 'Banner标题文字(该语言)',
  `alt_text`  VARCHAR(200) DEFAULT NULL            COMMENT '图片alt文本(该语言,SEO用)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_banner_lang` (`banner_id`, `lang_code`),
  KEY `idx_lang_code` (`lang_code`),
  CONSTRAINT `fk_bi18n_banner` FOREIGN KEY (`banner_id`) REFERENCES `banner`       (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_bi18n_lang`   FOREIGN KEY (`lang_code`) REFERENCES `language` (`code`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Banner翻译表';

-- 34. 案例主表
DROP TABLE IF EXISTS `case_show`;
CREATE TABLE `case_show` (
  `id`           BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `cover_image`  VARCHAR(500) DEFAULT NULL            COMMENT '案例封面图片URL',
  `images`       TEXT         DEFAULT NULL            COMMENT '案例详情图片URL列表JSON数组,如["url1","url2"]',
  `sort`         INT          NOT NULL DEFAULT 0      COMMENT '排序序号,数值越小越靠前',
  `is_published` TINYINT(1)   NOT NULL DEFAULT 1      COMMENT '是否发布:0-草稿,1-已发布',
  `view_count`   INT          NOT NULL DEFAULT 0      COMMENT '浏览量累计',
  `created_at`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted`      TINYINT(1)   NOT NULL DEFAULT 0      COMMENT '逻辑删除标记:0-未删除,1-已删除',
  PRIMARY KEY (`id`),
  KEY `idx_pub_sort` (`is_published`, `sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='案例主表';

-- 35. 案例翻译表
DROP TABLE IF EXISTS `case_show_i18n`;
CREATE TABLE `case_show_i18n` (
  `id`              BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `case_id`         BIGINT       NOT NULL                COMMENT '案例ID,关联case_show表',
  `lang_code`       VARCHAR(10)  NOT NULL                COMMENT '语言代码,关联language表,如zh-CN/en/ja',
  `title`           VARCHAR(200) NOT NULL                COMMENT '案例标题(该语言)',
  `customer_name`   VARCHAR(200) DEFAULT NULL            COMMENT '客户名称(该语言)',
  `industry`        VARCHAR(100) DEFAULT NULL            COMMENT '客户所属行业(该语言)',
  `material`        VARCHAR(200) DEFAULT NULL            COMMENT '使用材质(该语言)',
  `craft`           VARCHAR(200) DEFAULT NULL            COMMENT '使用工艺(该语言)',
  `summary`         VARCHAR(500) DEFAULT NULL            COMMENT '案例摘要(该语言)',
  `content`         LONGTEXT     DEFAULT NULL            COMMENT '案例详情富文本HTML(该语言)',
  `slug`            VARCHAR(200) DEFAULT NULL            COMMENT '该语言独立URL slug',
  `seo_title`       VARCHAR(200) DEFAULT NULL            COMMENT 'SEO标题(该语言)',
  `seo_keywords`    VARCHAR(500) DEFAULT NULL            COMMENT 'SEO关键词,逗号分隔(该语言)',
  `seo_description` VARCHAR(500) DEFAULT NULL            COMMENT 'SEO描述(该语言)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_case_lang` (`case_id`, `lang_code`),
  KEY `idx_lang_code` (`lang_code`),
  CONSTRAINT `fk_csi18n_case` FOREIGN KEY (`case_id`)   REFERENCES `case_show`    (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_csi18n_lang` FOREIGN KEY (`lang_code`) REFERENCES `language` (`code`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='案例翻译表';

-- 36. 页面内容主表
DROP TABLE IF EXISTS `page_content`;
CREATE TABLE `page_content` (
  `id`         BIGINT      NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `page_key`   VARCHAR(50) NOT NULL                COMMENT '页面标识,如about/contact/faq/terms',
  `status`     TINYINT     NOT NULL DEFAULT 1      COMMENT '状态:0-禁用,1-启用',
  `sort`       INT         NOT NULL DEFAULT 0      COMMENT '排序序号,数值越小越靠前',
  `created_at` DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_page_key` (`page_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='页面内容主表';

-- 37. 页面内容翻译表
DROP TABLE IF EXISTS `page_content_i18n`;
CREATE TABLE `page_content_i18n` (
  `id`              BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `page_id`         BIGINT       NOT NULL                COMMENT '页面ID,关联page_content表',
  `lang_code`       VARCHAR(10)  NOT NULL                COMMENT '语言代码,关联language表,如zh-CN/en/ja',
  `title`           VARCHAR(200) NOT NULL                COMMENT '页面标题(该语言)',
  `content`         LONGTEXT     NOT NULL                COMMENT '页面内容富文本HTML(该语言)',
  `seo_title`       VARCHAR(200) DEFAULT NULL            COMMENT 'SEO标题(该语言)',
  `seo_keywords`    VARCHAR(500) DEFAULT NULL            COMMENT 'SEO关键词,逗号分隔(该语言)',
  `seo_description` VARCHAR(500) DEFAULT NULL            COMMENT 'SEO描述(该语言)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_page_lang` (`page_id`, `lang_code`),
  KEY `idx_lang_code` (`lang_code`),
  CONSTRAINT `fk_pi18n_page` FOREIGN KEY (`page_id`)   REFERENCES `page_content` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_pi18n_lang` FOREIGN KEY (`lang_code`) REFERENCES `language`    (`code`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='页面内容翻译表';

-- ============================================================
-- 七、站点配置（5 表）
-- ============================================================

-- 38. 留言表
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id`          BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `customer_id` BIGINT       DEFAULT NULL            COMMENT '注册客户ID,关联customer表;游客留言为空',
  `name`        VARCHAR(50)  NOT NULL                COMMENT '留言人姓名',
  `phone`       VARCHAR(20)  NOT NULL                COMMENT '联系电话',
  `email`       VARCHAR(100) DEFAULT NULL            COMMENT '邮箱地址',
  `company`     VARCHAR(200) DEFAULT NULL            COMMENT '公司名称',
  `subject`     VARCHAR(200) DEFAULT NULL            COMMENT '留言主题',
  `content`     TEXT         NOT NULL                COMMENT '留言内容',
  `type`        TINYINT      NOT NULL DEFAULT 1      COMMENT '留言类型:1-通用咨询,2-产品询价,3-商务合作',
  `status`      TINYINT      NOT NULL DEFAULT 0      COMMENT '处理状态:0-未处理,1-已处理',
  `reply`       TEXT         DEFAULT NULL            COMMENT '回复内容',
  `replied_by`  BIGINT       DEFAULT NULL            COMMENT '回复人管理员ID,关联sys_admin表',
  `replied_at`  DATETIME     DEFAULT NULL            COMMENT '回复时间',
  `ip`          VARCHAR(50)  DEFAULT NULL            COMMENT '提交时客户端IP地址',
  `lang_code`   VARCHAR(10)  NOT NULL DEFAULT 'zh-CN' COMMENT '提交时语言代码,关联language表',
  `created_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted`     TINYINT(1)   NOT NULL DEFAULT 0      COMMENT '逻辑删除标记:0-未删除,1-已删除',
  PRIMARY KEY (`id`),
  KEY `idx_customer_id` (`customer_id`),
  KEY `idx_status`      (`status`),
  KEY `idx_type`        (`type`),
  KEY `idx_created_at`  (`created_at`),
  CONSTRAINT `fk_msg_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='留言表';

-- 39. 合作伙伴表
DROP TABLE IF EXISTS `partner`;
CREATE TABLE `partner` (
  `id`         BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name`       VARCHAR(200) NOT NULL                COMMENT '合作伙伴/客户名称',
  `logo`       VARCHAR(500) NOT NULL                COMMENT '合作伙伴Logo图片URL',
  `website`    VARCHAR(300) DEFAULT NULL            COMMENT '合作伙伴官网URL',
  `sort`       INT          NOT NULL DEFAULT 0      COMMENT '排序序号,数值越小越靠前',
  `status`     TINYINT      NOT NULL DEFAULT 1      COMMENT '状态:0-禁用,1-启用',
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_status_sort` (`status`, `sort`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='合作伙伴表';

-- 40. 公司信息主表(单行)
DROP TABLE IF EXISTS `company_info`;
CREATE TABLE `company_info` (
  `id`               BIGINT        NOT NULL AUTO_INCREMENT COMMENT '主键ID(固定为1)',
  `logo`             VARCHAR(500)  DEFAULT NULL            COMMENT '公司Logo图片URL',
  `phone`            VARCHAR(50)   DEFAULT NULL            COMMENT '公司联系电话',
  `whatsapp`         VARCHAR(50)   DEFAULT NULL            COMMENT 'WhatsApp号码(含国家代码,如8613800138000)',
  `email`            VARCHAR(100)  DEFAULT NULL            COMMENT '公司邮箱地址',
  `province`         VARCHAR(50)   DEFAULT NULL            COMMENT '省份',
  `city`             VARCHAR(50)   DEFAULT NULL            COMMENT '城市',
  `longitude`        DECIMAL(10,6) DEFAULT NULL            COMMENT '经度(地图定位用)',
  `latitude`         DECIMAL(10,6) DEFAULT NULL            COMMENT '纬度(地图定位用)',
  `website`          VARCHAR(200)  DEFAULT NULL            COMMENT '公司官网URL',
  `qr_code`          VARCHAR(500)  DEFAULT NULL            COMMENT '微信/公众号二维码图片URL',
  `business_hours`   VARCHAR(100)  DEFAULT NULL            COMMENT '营业时间描述,如Mon-Fri 9:00-18:00',
  `factory_images`   TEXT          DEFAULT NULL            COMMENT '工厂/车间图片URL列表JSON数组',
  `team_images`      TEXT          DEFAULT NULL            COMMENT '团队照片URL列表JSON数组',
  `history`          TEXT          DEFAULT NULL            COMMENT '发展历程JSON数组,格式:[{"year":"2020","event":"..."}]',
  `honors`           TEXT          DEFAULT NULL            COMMENT '资质荣誉JSON数组,格式:[{"title":"...","image":"..."}]',
  `certifications`   TEXT          DEFAULT NULL            COMMENT '证书信息JSON数组,格式:[{"name":"ISO9001","image":"..."}]',
  `seo_title`        VARCHAR(200)  DEFAULT NULL            COMMENT '默认SEO标题',
  `seo_keywords`     VARCHAR(500)  DEFAULT NULL            COMMENT '默认SEO关键词,逗号分隔',
  `seo_description`  VARCHAR(500)  DEFAULT NULL            COMMENT '默认SEO描述',
  `icp`              VARCHAR(50)   DEFAULT NULL            COMMENT 'ICP备案号',
  `police_record`    VARCHAR(50)   DEFAULT NULL            COMMENT '公安备案号',
  `created_at`       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='公司信息主表';

-- 41. 公司信息翻译表
DROP TABLE IF EXISTS `company_info_i18n`;
CREATE TABLE `company_info_i18n` (
  `id`              BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `company_info_id` BIGINT       NOT NULL DEFAULT 1      COMMENT '公司信息ID,关联company_info表',
  `lang_code`       VARCHAR(10)  NOT NULL                COMMENT '语言代码,关联language表,如zh-CN/en/ja',
  `company_name`    VARCHAR(200) NOT NULL                COMMENT '公司名称(该语言)',
  `slogan`          VARCHAR(300) DEFAULT NULL            COMMENT '企业标语/Slogan(该语言)',
  `introduction`    LONGTEXT     DEFAULT NULL            COMMENT '公司简介富文本HTML(该语言)',
  `address`         VARCHAR(300) DEFAULT NULL            COMMENT '公司详细地址(该语言)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_ci_lang` (`company_info_id`, `lang_code`),
  KEY `idx_lang_code` (`lang_code`),
  CONSTRAINT `fk_cii18n_ci`   FOREIGN KEY (`company_info_id`) REFERENCES `company_info` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_cii18n_lang` FOREIGN KEY (`lang_code`)      REFERENCES `language`     (`code`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='公司信息翻译表';

-- 42. 站点设置表
DROP TABLE IF EXISTS `site_setting`;
CREATE TABLE `site_setting` (
  `id`            BIGINT       NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `setting_key`   VARCHAR(100) NOT NULL                COMMENT '设置键名,如site_name/footer_text/statistics_code',
  `setting_value` LONGTEXT     DEFAULT NULL            COMMENT '设置值(支持长文本/JSON)',
  `description`   VARCHAR(200) DEFAULT NULL            COMMENT '设置项说明',
  `created_at`    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at`    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_setting_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='站点设置表';

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- 初始化数据
-- ============================================================

-- 7 种语言
INSERT INTO `language` (`code`, `name`, `native_name`, `is_rtl`, `flag_icon`, `sort`) VALUES
('zh-CN', 'Chinese Simplified',  '简体中文',    0, '🇨🇳', 1),
('zh-TW', 'Chinese Traditional', '繁體中文',    0, '🇹🇼', 2),
('en',    'English',             'English',     0, '🇺🇸', 3),
('ja',    'Japanese',            '日本語',       0, '🇯🇵', 4),
('ko',    'Korean',              '한국어',       0, '🇰🇷', 5),
('es',    'Spanish',             'Español',     0, '🇪🇸', 6),
('ar',    'Arabic',              'العربية',     1, '🇸🇦', 7);

-- 超级管理员 (密码: admin123, bcrypt)
INSERT INTO `sys_admin` (`username`, `password`, `real_name`)
VALUES ('admin', '$2a$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '超级管理员');

-- 角色
INSERT INTO `sys_role` (`role_name`, `role_code`, `description`, `sort`) VALUES
('超级管理员', 'super_admin', '全部权限', 1),
('运营人员',   'operator',    '产品与内容管理', 2),
('销售人员',   'sales',       '询价与定制跟进', 3),
('客服人员',   'service',     '留言与客户服务', 4);

INSERT INTO `sys_admin_role` (`admin_id`, `role_id`) VALUES (1, 1);

-- 默认定制选项
INSERT INTO `custom_option` (`id`, `option_code`, `input_type`, `is_required`, `sort`) VALUES
(1, 'material',          1, 1, 1),
(2, 'craft',             2, 0, 2),
(3, 'surface_treatment', 1, 0, 3);

INSERT INTO `custom_option_i18n` (`option_id`, `lang_code`, `option_name`) VALUES
(1,'zh-CN','材质'),(1,'zh-TW','材質'),(1,'en','Material'),(1,'ja','素材'),(1,'ko','재질'),(1,'es','Material'),(1,'ar','مادة'),
(2,'zh-CN','工艺'),(2,'zh-TW','工藝'),(2,'en','Craft'),(2,'ja','工芸'),(2,'ko','공예'),(2,'es','Artesanía'),(2,'ar','حرفة'),
(3,'zh-CN','表面处理'),(3,'zh-TW','表面處理'),(3,'en','Surface Treatment'),(3,'ja','表面処理'),(3,'ko','표면 처리'),(3,'es','Tratamiento Superficial'),(3,'ar','المعالجة السطحية');

-- 新闻分类
INSERT INTO `news_category` (`id`, `sort`) VALUES (1, 1), (2, 2);
INSERT INTO `news_category_i18n` (`category_id`, `lang_code`, `category_name`) VALUES
(1,'zh-CN','公司动态'),(1,'zh-TW','公司動態'),(1,'en','Company News'),(1,'ja','会社ニュース'),(1,'ko','회사 소식'),(1,'es','Noticias'),(1,'ar','أخبار الشركة'),
(2,'zh-CN','行业知识'),(2,'zh-TW','行業知識'),(2,'en','Industry Knowledge'),(2,'ja','業界知識'),(2,'ko','업계 지식'),(2,'es','Conocimiento'),(2,'ar','معرفة الصناعة');

-- 默认页面
INSERT INTO `page_content` (`id`, `page_key`) VALUES (1, 'about'), (2, 'contact');
INSERT INTO `page_content_i18n` (`page_id`, `lang_code`, `title`, `content`) VALUES
(1,'zh-CN','关于我们','<p>请在此编辑公司介绍。</p>'),
(1,'en','About Us','<p>Please edit company introduction here.</p>'),
(2,'zh-CN','联系我们','<p>请在此编辑联系方式。</p>'),
(2,'en','Contact Us','<p>Please edit contact information here.</p>');

-- 公司信息
INSERT INTO `company_info` (`id`, `phone`, `whatsapp`, `email`)
VALUES (1, '400-000-0000', '8613800138000', 'contact@example.com');

INSERT INTO `company_info_i18n` (`company_info_id`, `lang_code`, `company_name`, `slogan`, `address`) VALUES
(1,'zh-CN','您的企业名称有限公司','专业制造，品质保障','请填写公司地址'),
(1,'zh-TW','您的企業名稱有限公司','專業製造，品質保障','請填寫公司地址'),
(1,'en','Your Company Name Ltd.','Professional Manufacturing, Quality Guaranteed','Please enter address'),
(1,'ja','御社名株式会社','専門製造、品質保証','住所を入力してください'),
(1,'ko','귀사 이름 주식회사','전문 제조, 품질 보장','주소를 입력하세요'),
(1,'es','Su Empresa S.L.','Fabricación Profesional, Calidad Garantizada','Ingrese la dirección'),
(1,'ar','اسم شركتك المحدودة','تصنيع احترافي، جودة مضمونة','يرجى إدخال العنوان');

-- ============================================================
-- 建表完成：共 42 张表
-- ============================================================
