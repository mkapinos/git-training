-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.7.3-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for bankomat
DROP DATABASE IF EXISTS `bankomat`;
CREATE DATABASE IF NOT EXISTS `bankomat` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;
USE `bankomat`;

-- Dumping structure for table bankomat.accounts
DROP TABLE IF EXISTS `accounts`;
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(32) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `gender` enum('male','female','non-binary') NOT NULL DEFAULT 'non-binary',
  `year_of_born` smallint(5) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table bankomat.accounts: ~4 rows (approximately)
DELETE FROM `accounts`;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` (`id`, `first_name`, `last_name`, `mail`, `gender`, `year_of_born`) VALUES
	(1, 'Jan', 'Niezbedny', 'a@gmailcon', 'male', 1999),
	(2, 'Jan', 'Kowalski', 'b@gmail.com', 'male', 2000),
	(3, 'Jan', 'Nowak', 'c@gmail.com', 'male', 2001),
	(4, 'Jan', 'Mickiewicz', 'd@gmail.com', 'male', 2002);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;

-- Dumping structure for table bankomat.cards
DROP TABLE IF EXISTS `cards`;
CREATE TABLE IF NOT EXISTS `cards` (
  `number` bigint(16) unsigned NOT NULL DEFAULT 0,
  `pin` smallint(4) unsigned NOT NULL DEFAULT 0,
  `accuount_id` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`number`),
  KEY `AccountRef` (`accuount_id`),
  CONSTRAINT `AccountRef` FOREIGN KEY (`accuount_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Dumping data for table bankomat.cards: ~1 rows (approximately)
DELETE FROM `cards`;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
INSERT INTO `cards` (`number`, `pin`, `accuount_id`) VALUES
	(12345, 1234, 1);
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;

-- Dumping structure for table bankomat.operations
DROP TABLE IF EXISTS `operations`;
CREATE TABLE IF NOT EXISTS `operations` (
  `number` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `account_id` int(10) unsigned NOT NULL,
  `date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`number`),
  KEY `operation_accounts_id` (`account_id`),
  CONSTRAINT `operation_accounts_id` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- Dumping data for table bankomat.operations: ~1 rows (approximately)
DELETE FROM `operations`;
/*!40000 ALTER TABLE `operations` DISABLE KEYS */;
INSERT INTO `operations` (`number`, `amount`, `account_id`, `date`) VALUES
	(2, 20, 1, '2022-04-07 19:50:10');
/*!40000 ALTER TABLE `operations` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
