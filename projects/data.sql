DROP TABLE IF EXISTS `bangchubao`.`zhms_category`;
CREATE TABLE  `bangchubao`.`zhms_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `ename` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `bangchubao`.`zhms_caixi`;
CREATE TABLE  `bangchubao`.`zhms_caixi` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `oldcontent` text,
  `url` varchar(200) DEFAULT NULL,
  `catestr` varchar(20) DEFAULT NULL,
  `cateid` int(10) unsigned DEFAULT NULL,
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2911 DEFAULT CHARSET=utf8;
