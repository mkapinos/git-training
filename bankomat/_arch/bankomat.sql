-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.5.10-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for bankomat
DROP DATABASE IF EXISTS `bankomat`;
CREATE DATABASE IF NOT EXISTS `bankomat` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bankomat`;

-- Dumping structure for table bankomat.accounts
DROP TABLE IF EXISTS `accounts`;
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(32) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `gender` enum('Male','Female','Non-binary') NOT NULL DEFAULT 'Non-binary',
  `year_of_born` smallint(5) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1004 DEFAULT CHARSET=utf8;

-- Dumping data for table bankomat.accounts: ~4 rows (approximately)
DELETE FROM `accounts`;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` (`id`, `first_name`, `last_name`, `email`, `gender`, `year_of_born`) VALUES
	(1, 'Mirek', 'Kapinos', 'mk@agileo.pl', 'Male', 1977),
	(3, 'Zośka', 'Nowak', 'zoska@nowak.pl', 'Female', 2000),
	(1000, 'Jan', 'Kowalski', 'jan@kowalski.com', 'Male', 1965),
	(1001, 'Ala', 'Kot', 'ala@kot.pl', 'Female', NULL);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;

-- Dumping structure for table bankomat.cards
DROP TABLE IF EXISTS `cards`;
CREATE TABLE IF NOT EXISTS `cards` (
  `number` bigint(20) unsigned NOT NULL DEFAULT 0,
  `account_id` int(10) unsigned DEFAULT 0,
  `pin` smallint(5) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`number`),
  KEY `AccountsRef` (`account_id`),
  CONSTRAINT `AccountsRef` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table bankomat.cards: ~0 rows (approximately)
DELETE FROM `cards`;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
INSERT INTO `cards` (`number`, `account_id`, `pin`) VALUES
	(123123123, 1001, 234),
	(23423423423, 3, 432),
	(123123123123, 1000, 122);
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;

-- Dumping structure for table bankomat.operations
DROP TABLE IF EXISTS `operations`;
CREATE TABLE IF NOT EXISTS `operations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `amount` double NOT NULL DEFAULT 0,
  `account_id` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `accountRef` (`account_id`),
  CONSTRAINT `accountRef` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table bankomat.operations: ~0 rows (approximately)
DELETE FROM `operations`;
/*!40000 ALTER TABLE `operations` DISABLE KEYS */;
INSERT INTO `operations` (`id`, `date`, `amount`, `account_id`) VALUES
	(1, '2022-04-07 18:47:58', 1000, 1),
	(2, '2022-04-07 18:48:56', -1000, 1000);
/*!40000 ALTER TABLE `operations` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
