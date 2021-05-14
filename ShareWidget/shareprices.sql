-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Apr 01, 2020 at 10:38 PM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `COMP333`
--

-- --------------------------------------------------------

--
-- Table structure for table `shareprices`
--

CREATE TABLE `shareprices` (
  `name` varchar(30) NOT NULL,
  `id` int(11) NOT NULL,
  `price` double NOT NULL,
  `movement` double NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shareprices`
--

INSERT INTO `shareprices` (`name`, `id`, `price`, `movement`) VALUES
('NZ Wind Farms', 1, 12.5, 0.5),
('Foley Wine Inc', 2, 8.66, -0.03),
('Geneva Finance', 3, 8.4, 0.9),
('Xero Accounts', 4, 11, -0.5),
('Moa Group Ltd', 5, 8.66, 0.1),
('Solid Dynamics', 6, 3.53, 0.1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `shareprices`
--
ALTER TABLE `shareprices`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `shareprices`
--
ALTER TABLE `shareprices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;