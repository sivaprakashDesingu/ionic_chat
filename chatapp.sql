-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 30, 2019 at 12:13 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chatapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat_frnds`
--

CREATE TABLE `chat_frnds` (
  `chatid` int(11) NOT NULL,
  `user_one` varchar(500) DEFAULT NULL,
  `user_two` varchar(500) DEFAULT NULL,
  `Request_Sent_On` varchar(20) NOT NULL,
  `reaccpon` varchar(20) NOT NULL,
  `isconfirmed` varchar(10) NOT NULL,
  `createdon` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat_frnds`
--

INSERT INTO `chat_frnds` (`chatid`, `user_one`, `user_two`, `Request_Sent_On`, `reaccpon`, `isconfirmed`, `createdon`) VALUES
(1, 'siva1', 'manoj1', '21/01/2018', '22/01/2018', 'Yes', '21/01/2018'),
(2, 'siva1', 'bub1', '21/01/2018', '21/01/2018', 'Yes', '21/01/2018'),
(3, 'manoj1', 'bub1', '21/01/2018', '21/01/2018', 'Yes	', '07/04/2018 07:11:00'),
(4, 'sk', 'bub1', '21/01/2018', '21/01/2018', 'Yes', '21/01/2018');

-- --------------------------------------------------------

--
-- Table structure for table `chat_user`
--

CREATE TABLE `chat_user` (
  `uid` varchar(500) NOT NULL,
  `uname` varchar(500) NOT NULL,
  `pswd` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `pro_path` varchar(500) DEFAULT NULL,
  `cover_path` varchar(500) DEFAULT NULL,
  `recent_otp` varchar(100) DEFAULT NULL,
  `isActiveted` varchar(100) DEFAULT NULL,
  `createddate` varchar(200) DEFAULT NULL,
  `status` varchar(300) DEFAULT NULL,
  `location` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat_user`
--

INSERT INTO `chat_user` (`uid`, `uname`, `pswd`, `email`, `phone`, `pro_path`, `cover_path`, `recent_otp`, `isActiveted`, `createddate`, `status`, `location`) VALUES
('bub1', 'Bubesh', 'bubesh', 'bubeesh@cht.com', '8903886002', 'chat_app/uploads/user-profile/default.png', 'chat_app/uploads/user-profile/background_cover.png', '430563', 'True', '6-June-2018', 'Infinity War', 'Chennai, Tamilnadu'),
('manoj1', 'Manoj', 'manoj', 'manoj@chat.com', '8903886004', 'chat_app/uploads/user-profile/default.png', 'chat_app/uploads/user-profile/manoj1_cover.jpeg', '430564', 'True', '6-June-2018', 'Nothing is Impossible', 'Chennai, Tamilnadu'),
('siva1', 'Shiva', 'shiva', 'siva.sing.sivan@gmail.com', '7708868770', 'chat_app/uploads/user-profile/siva1_profile.jpeg', 'chat_app/uploads/user-profile/siva1_cover.jpeg', '3237B2', 'True', '6-June-2018', 'Learning by Doing...', 'Chennai, Tamilnadu.'),
('siva2', 'sp', '123456', 'sp@yopmail.com', NULL, 'chat_app/uploads/user-profile/default.png', 'chat_app/uploads/user-profile/background_cover.png', '38wan7', 'False', NULL, NULL, NULL),
('test3', 'Bubesh', '123456', 'bubesh@yopmail.com', NULL, 'chat_app/uploads/user-profile/default.png', 'chat_app/uploads/user-profile/background_cover.png', '2ndgn4', 'False', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `uchats`
--

CREATE TABLE `uchats` (
  `sno` int(11) NOT NULL,
  `chatid` varchar(500) DEFAULT NULL,
  `sender` varchar(500) NOT NULL,
  `receiver` varchar(500) NOT NULL,
  `message` varchar(3000) NOT NULL,
  `s_sent_on` varchar(20) NOT NULL,
  `croom` varchar(10) NOT NULL,
  `timestamp` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `uchats`
--

INSERT INTO `uchats` (`sno`, `chatid`, `sender`, `receiver`, `message`, `s_sent_on`, `croom`, `timestamp`) VALUES
(7, '2', 'siva1', 'bub1', 'i need your help,let me know once your free plz.', 'Jul 8 2018 20:28:38', '', 'Jul 8 2018 20:28:38'),
(9, '1', 'siva1', 'manoj1', 'deiiii', 'Jul 8 2018 20:33:06', '', 'Jul 8 2018 20:33:06'),
(10, '1', 'siva1', 'manoj1', 'deiiii', 'Jul 8 2018 20:33:20', '', 'Jul 8 2018 20:33:20'),
(11, '1', 'manoj1', 'siva1', 'sollu da', 'Jul 8 2018 20:33:49', '', 'Jul 8 2018 20:33:49'),
(12, '1', 'manoj1', 'siva1', 'sollu da', '', '', 'Jul 8 2018 20:33:55'),
(13, '2', 'siva1', 'bub1', 'hi ji', '', '', 'Jul 9 2018 12:16:24'),
(14, '2', 'bub1', 'siva1', 'sollu da venna', '', '', 'Jul 9 2018 12:16:50'),
(15, '2', 'siva1', 'bub1', 'enna', '', '', 'Jul 9 2018 20:42:11'),
(16, '2', 'siva1', 'bub1', 'enna da', '', '', 'Jul 9 2018 20:42:47'),
(17, '1', 'siva1', 'manoj1', 'fsfds', '', '', 'Jul 9 2018 20:43:46'),
(18, '2', 'siva1', 'bub1', 'deiiii', 'Jan 30 2019 15:36:02', '2', 'Jan 30 2019 15:36:02'),
(19, '2', 'siva1', 'bub1', 'adeeeeee', 'Jan 30 2019 15:50:51', '2', 'Jan 30 2019 15:50:51'),
(20, '2', 'siva1', 'bub1', 'paviiii', 'Jan 30 2019 15:51:28', '2', 'Jan 30 2019 15:51:28'),
(21, '2', 'bub1', 'siva1', 'fsfsdfsff', 'Jan 30 2019 15:52:51', '2', 'Jan 30 2019 15:52:51'),
(22, '2', 'siva1', 'bub1', 'fsdfsfsf', 'Jan 30 2019 15:52:59', '2', 'Jan 30 2019 15:52:59'),
(23, '2', 'bub1', 'siva1', 'fsdfsfs', 'Jan 30 2019 15:53:03', '2', 'Jan 30 2019 15:53:03'),
(24, '2', 'bub1', 'siva1', 'sd', 'Jan 30 2019 15:57:17', '2', 'Jan 30 2019 15:57:17'),
(25, '2', 'bub1', 'siva1', 'fdfs', 'Jan 30 2019 15:58:32', '2', 'Jan 30 2019 15:58:32'),
(26, '2', 'bub1', 'siva1', 'fsdfs', 'Jan 30 2019 15:59:32', '2', 'Jan 30 2019 15:59:32'),
(27, '2', 'siva1', 'bub1', 'narayana', 'Jan 30 2019 15:59:45', '2', 'Jan 30 2019 15:59:45'),
(28, '2', 'siva1', 'bub1', 'macha', 'Jan 30 2019 16:03:40', '2', 'Jan 30 2019 16:03:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_frnds`
--
ALTER TABLE `chat_frnds`
  ADD PRIMARY KEY (`chatid`);

--
-- Indexes for table `chat_user`
--
ALTER TABLE `chat_user`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `recent_otp` (`recent_otp`);

--
-- Indexes for table `uchats`
--
ALTER TABLE `uchats`
  ADD PRIMARY KEY (`sno`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_frnds`
--
ALTER TABLE `chat_frnds`
  MODIFY `chatid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `uchats`
--
ALTER TABLE `uchats`
  MODIFY `sno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
