CREATE DATABASE `bangchubao` /*!40100 DEFAULT CHARACTER SET utf8 */;


DROP TABLE IF EXISTS `bangchubao`.`caixi`;
CREATE TABLE  `bangchubao`.`caixi` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜系分类';


DROP TABLE IF EXISTS `bangchubao`.`jiachang`;
CREATE TABLE  `bangchubao`.`jiachang` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='家常菜谱分类';
