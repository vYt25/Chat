-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 10, 2021 at 06:56 AM
-- Server version: 8.0.17
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat`
--

-- --------------------------------------------------------

--
-- Table structure for table `genders`
--

CREATE TABLE `genders` (
  `GenderID` int(11) NOT NULL,
  `GenderName` varchar(10) NOT NULL,
  `CreatedDate` timestamp NULL DEFAULT NULL,
  `UpdatedDate` timestamp NULL DEFAULT NULL,
  `DeletedDate` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ucs2;

--
-- Dumping data for table `genders`
--

INSERT INTO `genders` (`GenderID`, `GenderName`, `CreatedDate`, `UpdatedDate`, `DeletedDate`) VALUES
(1, 'Male', '2021-08-06 16:00:00', '2021-08-06 16:00:00', NULL),
(2, 'Female', '2021-08-06 16:00:00', '2021-08-06 16:00:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `Sender` tinyint(4) NOT NULL,
  `Reciever` tinyint(4) NOT NULL,
  `Message` longtext NOT NULL,
  `SeenFlg` tinyint(4) DEFAULT NULL,
  `CreatedDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `DeletedDate` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ucs2;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `Sender`, `Reciever`, `Message`, `SeenFlg`, `DeletedDate`) VALUES
(1, 1, 2, 'test', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `IsAdmin` tinyint(4) DEFAULT NULL,
  `Username` varchar(150) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `MiddleName` varchar(50) CHARACTER SET ucs2 COLLATE ucs2_general_ci DEFAULT NULL,
  `LastName` varchar(50) NOT NULL,
  `Gender` tinyint(4) NOT NULL,
  `CreatedDate` timestamp NULL DEFAULT NULL,
  `UpdatedDate` timestamp NULL DEFAULT NULL,
  `DeletedDate` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ucs2;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `IsAdmin`, `Username`, `Password`, `FirstName`, `MiddleName`, `LastName`, `Gender`, `CreatedDate`, `UpdatedDate`, `DeletedDate`) VALUES
(1, 1, 'test', '098f6bcd4621d373cade4e832627b4f6', 'Darwin John', 'Garcia', 'Suck', 1, '2021-08-06 16:00:00', '2021-08-09 22:17:37', NULL),
(2, NULL, 'test1', '098f6bcd4621d373cade4e832627b4f6', 'Pedro', 'Pusod', 'Penduko', 2, '2021-08-06 16:00:00', '2021-08-09 22:17:37', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`GenderID`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `genders`
--
ALTER TABLE `genders`
  MODIFY `GenderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
