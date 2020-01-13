-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2020 at 05:11 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `klassymall_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `km_autocomplete`
--

CREATE TABLE `km_autocomplete` (
  `AUTOCOMPLETE_CODE` varchar(40) DEFAULT NULL,
  `AUTOCOMPLETE_TEXT` longtext DEFAULT NULL,
  `DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `km_autocomplete`
--

INSERT INTO `km_autocomplete` (`AUTOCOMPLETE_CODE`, `AUTOCOMPLETE_TEXT`, `DATE`) VALUES
('001', 'Nigeria,Abuja,Adamawa ,Bauchi,Borno,Gombe,Jigawa,Kaduna,Kano,Katsina,Kebbi,Kogi,Kwara,Nasarawa,Niger,Plateau,Sokoto,Taraba,Yobe,Zamfara,', '2019-02-10 06:18:30'),
('003', 'Shopping Mall, Barbing Saloon', '2019-02-10 06:18:30'),
('002', 'Vehicles,Home,Furniture,Fashion,Garden,Estate,Electronics,Hobbies,Art,Households,Interiors,Clothing,Sport,Shoes,Bags,Mobile Phones,kids,Tablets,Meat,Chicken,Accessories,Ladies Wears,Men Wears,Wears,Cars,Car,Motorcycles,Trucks,Commercial,Agricultural,Phones,Android,Apple,Nokia,Phone Accessories,Computer  Accessories,Samsong,Tecno,HP,Tablets,Furniture,Home Appliances,Decor,Garden,Furniture,Land,Houses,Apartments For Rent,Apartments For Sale,Office,Shops,Commercial,Cameras,Computers,Laptops,TV,Video Games,Books,CD,DVD,Musical Instruments,Art - Collectibles,Crafts,Dogs,Cats,Other Animals,Bags,Shoes,Shirts,T-Shirts,Vehicles,Home,Furniture,Fashion,Garden,Estate,Electronics,Hobbies,Art,Sport,Mobile Phones,Tablets,Meat,Chicken,Accessories,Ladies Wears,Men Wears,Wears,Cars,Car,Motorcycles,Trucks,Commercial,Agricultural,Phones,Android,Apple,Nokia,Phone Accessories,Computer  Accessories,Samsong,Tecno,HP,Tablets,Furniture,Home Appliances,Decor,Garden,Furniture,Land,Houses,Apartments For Rent,Apartments For Sale,Office,Shops,Commercial,Cameras,Computers,Laptops,TV,Video Games,Books,CD,DVD,Musical Instruments,Art - Collectibles,Crafts,Dogs,Cats,Other Animals,Bags,Shoes,Shirts,T-Shirts,Jeans,Food,sub_category,Hand Bags,Dresses,', '2019-06-07 05:23:44');

-- --------------------------------------------------------

--
-- Table structure for table `km_default`
--

CREATE TABLE `km_default` (
  `Content` longblob NOT NULL,
  `Type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `km_default`
--

INSERT INTO `km_default` (`Content`, `Type`) VALUES
(0xffd8ffe000104a46494600010100000100010000fffe0020436f6d70726573736564206279206a7065672d7265636f6d707265737300ffdb008400121212121312141616141c1e1b1e1c2926222226293e2c302c302c3e5e3b453b3b453b5e5365524d526553967668687696ad918a91add2bcbcd2fffbffffffff01121212121312141616141c1e1b1e1c2926222226293e2c302c302c3e5e3b453b3b453b5e5365524d526553967668687696ad918a91add2bcbcd2fffbffffffffffc2001108010d010b03012200021101031101ffc4001a000100030101010000000000000000000000020304050106ffda0008010100000000fa200000000000000000000000000001ecbd8c4000000f7468b4429cb0000002ddd301e65c8000017eef41190cd880000b3a3e8c9559574431e50000746d0c32aadb6f0e6400005dd00cad3e470f4833620001bb4060d9339fba41caf0000ea480003050000975000019718002ce9000033e10004ba80000cf84000e95800018b30002edd20000cf8bc000e85c000073aa000e958000060a0003a368c1aec0798f45a39f48006ad879ca6ad82ae7f9af59e72fc0006ad3363cb2e8ccc145bba6cf96b00017ef3251e6895109ed9abe680003de94c42138da1873800012dd7003cc59c00005976bf4028a28f00001af58002bc100001b3500008f3a0000d1b800010e6f8002ce8fa000067c2007bd1b00000305000d5b0000011e678025d2900000197180d9a80000039711ffc40017010101010100000000000000000000000000020103ffda0008010210000000ea0000000004c0ba004c358ab019ccac63a681301b8ab022406f4022406f4039e007503901b8e9a089aae6bc9de80227466f400c8c0e9a033980ba039003a68448037a1990002f5fffc400160101010100000000000000000000000000000102ffda0008010310000000c8000000000b49000d22a400d10ac80b404805a01902d01201680640d003205b2699b64016c164006819006806405a01905a00643400247fffc4002e1000020102040405040203000000000000010203001104123140202130511041426181132233715291326062ffda0008010100013f00ff0074009d284721f41feabe94bfc0d1471aa91bc009d05e930cc79b1b52c31afa7fbab70322b6aa29b0cbe9e54f1ba7f90dc471193d85246a9a0e89171cc54b87206641f1b68a22e6e74a02dc8703100733408f057562403a70cd0dfee5d7691a176b500140038710d7b20a8e5286c74a967b8b29f9a89fe9b83c5888adf781cbcf670a645f73af0b100126a3bc935cfeeb1115bef1f351479dbd856216d948fd540f996c751c2c010453a646236302667f61cf8b12f6017bd6196ca5bbd11716a550a2c054a85e36a89f2383f06870e212eb9bb6c70cb64bf7e135323e72c472348b95147b701858c8ca34a55caa070b004114c3292360832851d86cb10b692fdc75d05dd47becf143929ebc5f913f7436589fc63f7d7436753ef4365893f601ff005b089b3229d9621aec17b75e18b3f33a52a85d05b6269e05372391a208241eb402d12ed261695fad17e35fd6d311f90f5a0378d787eb112161a52488fa1e32caa39902a59f30caba540f9d0771cb8673790f5b0ce01ca781c7d8fdf29f1c331cf627cb8666b466b99f0c2fafe381d822926892493d74c45b93d47223e87c0d4987372534ec7c158ab06148c1c023c4d4f266394683c23899f98d2a3408001e2d8841a5cd3c8ce79e9db63876cb25bb8e0930ec496415f4a4fe068178dbb1a5c48f52d1c4a79034f3b372d057d373e934b0487516a4408a00f195b2c6c7e06cc1b546e1c020f0b22bea284118f4d3451b6ab4b0c6be9e1353c818d868368ac54dc1a8a50fec7a64802e6a59cb725d36a91bbe82861981be6a17e57e7d2962693d561da9b0f20d39d116363b38a0f37fea8759e3571ce9d190d8ec6086d6661fa1b1740e2c453a146b1ebc1166fb8e9e543652461d6882a483d58e33235bcbce82db96d278f30cc351d4d6a24c8b6f3f3db4f1e46b8d0f4f0f1dce73f1b7750ea41a2a54907cba28a5d828a501400371884f58f9e8e194733e7b96175e74c2cc47bf0fffc4001f1101000203000300030000000000000000011130000210202131124050ffda0008010201013f00fe3bb462bd9c36ad7b191d1a5e9edc9f793ef123a3251b74f5d5eeb46d49f68da93ed0bfa613e31d3cd39ab1892775336780d3b1c36724724cfc9e04b538c79114ac62d0342cb50cf96cd631e1262dbab9273fffc4001b11000202030100000000000000000000000111103000205040ffda0008010301013f00e3ad55625e3f0ac158a4d029340e9b83a88748852bba3da67fffd9, 'DP');

-- --------------------------------------------------------

--
-- Table structure for table `km_fees`
--

CREATE TABLE `km_fees` (
  `COUNT` int(11) NOT NULL,
  `LOCATION_ID` text DEFAULT NULL,
  `LOCATION_CODE` varchar(50) DEFAULT NULL,
  `LOCATION_DESC` text DEFAULT NULL,
  `DELIVERY_FEE` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `km_fees`
--

INSERT INTO `km_fees` (`COUNT`, `LOCATION_ID`, `LOCATION_CODE`, `LOCATION_DESC`, `DELIVERY_FEE`) VALUES
(1, '6vce567mhg', '0110', 'Kano', '800'),
(2, '687yghb6nm', '3020', 'Abuja', '1000'),
(3, 'vbjhgybgun', '9553', 'Rivers', '1500'),
(4, 'j6gahs8gdu', '3743', 'Adamawa', '1500'),
(5, 'asgtygdhjc', '4544', 'Bauchi', '1500'),
(6, 't45yuerijm', '2344', 'Borno', '1500'),
(7, 'fbh89j304w', '4543', 'Kaduna', '1500'),
(8, '456wolekj9', '8764', 'Katsina', '1500'),
(9, '9iujhgdfgy', '9987', 'Niger', '1500'),
(10, 'nbtyr5e4ui', '0884', 'Plateau', '1500'),
(11, 'jnjhudefro', '3422', 'Sokoto', '1500'),
(12, '576hiobjhg', '9083', 'Jigawa', '1500'),
(13, '9uihgfyuim', '3992', 'Taraba', '1500'),
(14, 'ghf576t8y9', '1213', 'Kebbi', '1500'),
(15, 'y78yugfdtr', '9898', 'Gombe', '1500'),
(16, 'edrtfghjkh', '8644', 'Kebbi', '1500'),
(17, 'e45678u9iu', '3967', 'Yobe', '1500'),
(18, 'ughui9uihh', '8742', 'Zamfara', '1500'),
(19, 'hjgfrt8ny7', '7786', 'Benue', '2000'),
(20, 'nbgw4e567y', '9087', 'Nasarawa', '2000'),
(21, '9u8yhgfrtf', '0990', 'Kogi', '2000'),
(22, 'vbnmkjhgfj', '4546', 'Umuahia', '3500'),
(23, '09iuygfdfg', '5536', 'Nnewe', '3500'),
(24, 'tyfgdwertf', '7336', 'Ebonyi', '3500'),
(25, '9iujhgfgkj', '6676', 'Enugu', '3500'),
(26, 'kljhgf5ftg', '2444', 'Ogun', '3500'),
(27, '34wsertbgy', '7665', 'Osun', '3500'),
(28, 'tyrff4f5r7', '2456', 'Oyo', '3500'),
(29, '9usdis5b76', '5433', 'Akwa Ibom', '5000'),
(30, '7wedbgyusi', '0554', 'Anambra', '5000'),
(31, '6789emdjkk', '9747', 'Bayelsa', '5000'),
(32, '2376e5dbyu', '0374', 'Cross Rivers', '5000'),
(33, '345678y9m0', '0876', 'Delta', '5000'),
(34, '6798nuybtf', '7766', 'Edo', '5000'),
(35, '2a34sed5rt', '0896', 'Ekiti', '5000'),
(36, '345bg76n8h', '7574', 'Imo', '5000'),
(37, '88765bgyuj', '2443', 'Kwara', '5000'),
(38, '325edwb7n8', '6544', 'Ondo', '5000'),
(39, 'sdvfgh87yt', '6556', 'Rivers', '5000'),
(40, 'tyresdftgy', '5678', 'Abia', '5000'),
(41, 'jhsv546g7h', '5637', 'Lagos', '3500');

-- --------------------------------------------------------

--
-- Table structure for table `km_items`
--

CREATE TABLE `km_items` (
  `COUNT` bigint(20) NOT NULL,
  `PATH` text DEFAULT NULL,
  `ID` text DEFAULT NULL,
  `UPLOAD_ID` text DEFAULT NULL,
  `ITEM_NAME` varchar(200) DEFAULT NULL,
  `CATEGORY` varchar(200) DEFAULT NULL,
  `SUB_CATEGORY` varchar(200) DEFAULT NULL,
  `PRICE` varchar(200) DEFAULT '0',
  `DESCRIPTION` text DEFAULT NULL,
  `LOCATION` text DEFAULT NULL,
  `AREA` varchar(100) DEFAULT NULL,
  `COUNTRY` varchar(100) NOT NULL DEFAULT 'Nigeria',
  `STATUS` varchar(2) DEFAULT NULL,
  `STATUS_REASON` text DEFAULT NULL,
  `MARKET_OPTION` varchar(50) DEFAULT NULL,
  `ITEM_CONDITION` varchar(50) DEFAULT NULL,
  `COLORS` text DEFAULT NULL,
  `SIZES` text DEFAULT NULL,
  `DISCOUNT` varchar(100) DEFAULT NULL,
  `GENDER` varchar(100) DEFAULT NULL,
  `TARGET` varchar(100) DEFAULT NULL,
  `DURATION` varchar(100) DEFAULT NULL,
  `VENDOR` text DEFAULT NULL,
  `WARRANTY` varchar(100) DEFAULT NULL,
  `QUANTITY` varchar(50) DEFAULT NULL,
  `SAMPLE_1` text DEFAULT NULL,
  `SAMPLE_2` text DEFAULT NULL,
  `SAMPLE_3` text DEFAULT NULL,
  `SAMPLE_4` text DEFAULT NULL,
  `SAMPLE_5` text DEFAULT NULL,
  `SAMPLE_6` text DEFAULT NULL,
  `SAMPLE_7` text DEFAULT NULL,
  `SAMPLE_8` text DEFAULT NULL,
  `DATE` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `km_items`
--

INSERT INTO `km_items` (`COUNT`, `PATH`, `ID`, `UPLOAD_ID`, `ITEM_NAME`, `CATEGORY`, `SUB_CATEGORY`, `PRICE`, `DESCRIPTION`, `LOCATION`, `AREA`, `COUNTRY`, `STATUS`, `STATUS_REASON`, `MARKET_OPTION`, `ITEM_CONDITION`, `COLORS`, `SIZES`, `DISCOUNT`, `GENDER`, `TARGET`, `DURATION`, `VENDOR`, `WARRANTY`, `QUANTITY`, `SAMPLE_1`, `SAMPLE_2`, `SAMPLE_3`, `SAMPLE_4`, `SAMPLE_5`, `SAMPLE_6`, `SAMPLE_7`, `SAMPLE_8`, `DATE`) VALUES
(1, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cf9f35e64b83', 'Egyptian Gown', 'Fashion', 'Fashion', '13000', 'Set Top And Inner\r\nno Veil (head Tie)', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'BLACK', 'L', '30', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cf9f35e64b88.jpg', '', '', '', '', '', '', '', '2019-06-07 05:20:24'),
(2, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cf9f484c7653', 'Abaya', 'Dresses', 'Dresses', '15000', 'No Description', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'PURPLE', 'XXL', '20', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cf9f484c7659.jpg', '', '', '', '', '', '', '', '2019-06-07 05:23:44'),
(3, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfa7ab57a1dc', 'Handbag', 'Bags', 'Bags', '12000', 'No Description', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'RED<!>BLUE<!>BLACK<!>WHITE', 'Null', '35', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfa7ab57a1e1.jpg', 'KM-5cfa7ac81cc16.jpg', '', '', '', '', '', '', '2019-06-07 14:56:47'),
(4, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfa7b992210b', 'Handbag', 'Bags', 'Bags', '13000', 'Set 3 In 1', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'BLACK<!>PINK', 'Null', '20', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfa7c1b0a185.jpg', 'KM-5cfa7bae13a47.jpg', 'KM-5cfa7c06625af.jpg', '', '', '', '', '', '2019-06-07 15:02:37'),
(5, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfa7e9d7a534', 'Handbag', 'Bags', 'Bags', '13000', 'Set 3 In 1', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'RED<!>BLUE<!>PINK<!>BROWN<!>BLACK', 'Null', '30', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfa7e9d7a539.jpg', 'KM-5cfa7eaa487c2.jpg', 'KM-5cfa7eb612440.jpg', 'KM-5cfa7ec3e3e0b.jpg', 'KM-5cfa7ee212da9.jpg', '', '', '', '2019-06-07 15:13:33'),
(6, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfa7f71b9861', 'Bonia Handbag', 'Bags', 'Bags', '14000', 'Set 3 In 1', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'BLACK', 'Null', '12', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfa7f71b9866.jpg', '', '', '', '', '', '', '', '2019-06-07 15:16:21'),
(7, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfa815c04956', 'Bonia Bag', 'Bags', 'Bags', '13000', 'Set 2 In 1', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'BROWN<!>GRAY', 'Null', '25', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfa815c0495e.jpg', 'KM-5cfa816b7ae67.jpg', '', '', '', '', '', '', '2019-06-07 15:24:33'),
(8, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfa81ec694f4', 'Dkny Handbag', 'Bags', 'Bags', '15000', 'Set 3 In 1', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'BLACK', 'Null', '10', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfa81ec694fa.jpg', '', '', '', '', '', '', '', '2019-06-07 15:26:37'),
(9, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfa826b89757', 'Bonia', 'Bags', 'Bags', '13000', 'Set 3 In 1', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'CREAM', 'Null', '20', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfa826b8975d.jpg', '', '', '', '', '', '', '', '2019-06-07 15:28:57'),
(10, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfa82f374a8f', 'Bonia Handbag', 'Bags', 'Bags', '14000', 'Set 3 In 1', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'GREEN', 'Null', '10', 'MALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfa82f374a96.jpg', '', '', '', '', '', '', '', '2019-06-07 15:30:48'),
(11, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfa8360b9024', 'Bonia', 'Bags', 'Bags', '13000', 'Set 3 In 1', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'BLACK<!>BLUE', 'Null', '10', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfa8360b9029.jpg', '', '', '', '', '', '', '', '2019-06-07 15:33:02'),
(12, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfa83d30a788', 'Handbag', 'Bags', 'Bags', '15000', 'Set 3 In 1', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'BLUE<!>PINK<!>BROWN', 'Null', '20', 'NULL', 'NULL', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfa83d30a78d.jpg', 'KM-5cfa83e84a104.jpg', 'KM-5cfa83fd415f5.jpg', '', '', '', '', '', '2019-06-07 15:35:36'),
(13, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfa8487595e5', 'Handbag', 'Bags', 'Bags', '13000', 'Set 3 In 1', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'GRAY<!>BROWN<!>BLUE<!> DARK GRAY', 'Null', '15', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfa8487595ea.jpg', 'KM-5cfa849a556c2.jpg', '', '', '', '', '', '', '2019-06-07 15:39:08'),
(14, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfa8567ba304', 'Handbag', 'Bags', 'Bags', '14000', 'Set 4 In 1', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'BLACK<!>GRAY', 'Null', '20', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfa8567ba309.jpg', 'KM-5cfa857c71349.jpg', '', '', '', '', '', '', '2019-06-07 15:41:54'),
(15, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfa875135c74', 'Handbag', 'Bags', 'Bags', '13000', 'Set 2 In 1', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'MAROON', 'Null', '20', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfa875135c7e.jpg', '', '', '', '', '', '', '', '2019-06-07 15:49:33'),
(16, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfb4dc7eb19f', 'Dubai Abaya', 'Dresses', 'Dresses', '15000', 'No Description', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'BLUE<!>BLACK<!>PINK<!>RED<!>GRAY', '52<!>54<!>56<!>58<!>60<!>62', '15', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfb4dc7eb1a4.jpg', '', '', '', '', '', '', '', '2019-06-08 05:56:37'),
(17, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfb5010c45e8', 'Indonesian Jubah', 'Dresses', 'Dresses', '12000', 'No Headscarf', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'BLACK', 'L<!>XL', '37', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfb5010c45ee.jpg', '', '', '', '', '', '', '', '2019-06-08 06:06:44'),
(18, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfb50d96a6c2', 'Handbag', 'Bags', 'Bags', '13500', 'Set 4 In 1', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'BLACK<!>GRAY', 'Null', '10', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfb50d96a6c9.jpg', '', '', '', '', '', '', '', '2019-06-08 06:10:37'),
(19, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfb51ad48a28', 'Bonia Handbag', 'Bags', 'Bags', '13500', 'Set 4 In 1', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'BLACK<!>BLUE', 'Null', '12', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfb51ad48a2f.jpg', '', '', '', '', '', '', '', '2019-06-08 06:13:05'),
(20, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfb5237828a5', 'Dubai Abaya', 'Dresses', 'Dresses', '15000', 'No Description', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'PINK', '52<!>54<!>56<!>58<!>60<!>62', '15', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfb5237828aa.jpg', '', '', '', '', '', '', '', '2019-06-08 06:15:07'),
(21, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfb52b366734', 'Bonia Handbag', 'Bags', 'Bags', '15000', 'Set 3 In 1', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'BLUE<!>BLACK', 'Null', '15', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfb52b36673c.jpg', '', '', '', '', '', '', '', '2019-06-08 06:17:16'),
(22, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfb532f6199d', 'Egyptian Abaya', 'Dresses', 'Dresses', '14000', 'Have Cap', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'BLUE<!>BLACK<!>RED<!>GREEN', 'L<!>XL<!>XXL<!>XXXL', '10', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfb532f619a2.jpg', '', '', '', '', '', '', '', '2019-06-08 06:19:50'),
(23, 'localhost/zulaital_v1/app/samples/5ccd948b14b7e/', '5ccd948b14b7e', '5cfb53e2456f8', 'Dubai Abaya', 'Dresses', 'Dresses', '15000', 'No Description', NULL, NULL, 'Nigeria', 'AC', NULL, 'SALE', 'NEW', 'BLUE<!>BLACK<!>GREEN<!>PINK<!>RED', '52<!>54<!>56<!>58<!>60<!>62', '20', 'FEMALE', 'LADIES', NULL, NULL, 'NO WARRANTY', '10', 'KM-5cfb53e2456fd.jpg', '', '', '', '', '', '', '', '2019-06-08 06:22:11');

-- --------------------------------------------------------

--
-- Table structure for table `km_temp`
--

CREATE TABLE `km_temp` (
  `data` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `km_temp`
--

INSERT INTO `km_temp` (`data`) VALUES
('Vehicles,Home,Furniture,Fashion,Garden,Estate,Electronics,Hobbies,Art,Sport,Mobile Phones,Tablets,Meat,Chicken,Accessories,Ladies Wears,Men Wears,Wears,Cars,Car,Motorcycles,Trucks,Commercial,Agricultural,Phones,Android,Apple,Nokia,Phone Accessories,Computer  Accessories,Samsong,Tecno,HP,Tablets,Furniture,Home Appliances,Decor,Garden,Furniture,Land,Houses,Apartments For Rent,Apartments For Sale,Office,Shops,Commercial,Cameras,Computers,Laptops,TV,Video Games,Books,CD,DVD,Musical Instruments,Art - Collectibles,Crafts,Dogs,Cats,Other Animals,Bags,Shoes,Shirts,T-Shirts,Vehicles,Home,Furniture,Fashion,Garden,Estate,Electronics,Hobbies,Art,Sport,Mobile Phones,Tablets,Meat,Chicken,Accessories,Ladies Wears,Men Wears,Wears,Cars,Car,Motorcycles,Trucks,Commercial,Agricultural,Phones,Android,Apple,Nokia,Phone Accessories,Computer  Accessories,Samsong,Tecno,HP,Tablets,Furniture,Home Appliances,Decor,Garden,Furniture,Land,Houses,Apartments For Rent,Apartments For Sale,Office,Shops,Commercial,Cameras,Computers,Laptops,TV,Video Games,Books,CD,DVD,Musical Instruments,Art - Collectibles,Crafts,Dogs,Cats,Other Animals,Bags,Shoes,Shirts,T-Shirts,Jeans,Foodxxx,'),
('Kano,Abuja,Rivers,Adamawa,Bauchi,Borno,Kaduna,Katsina,Niger,Plateau,Sokoto,Jigawa,Taraba,Kebbi,Gombe,Kebbi,Yobe,Zamfara,Benue,Nasarawa,Kogi,Umuahia,Nnewe,Ebonyi,Enugu,Lagosxxx,');

-- --------------------------------------------------------

--
-- Table structure for table `km_upload_master`
--

CREATE TABLE `km_upload_master` (
  `PATH` text DEFAULT NULL,
  `STATUS` varchar(2) DEFAULT NULL,
  `FILE_1` text DEFAULT NULL,
  `FILE_2` text DEFAULT NULL,
  `FILE_3` text DEFAULT NULL,
  `FILE_4` text DEFAULT NULL,
  `FILE_5` text DEFAULT NULL,
  `FILE_6` text DEFAULT NULL,
  `FILE_7` text DEFAULT NULL,
  `FILE_8` text DEFAULT NULL,
  `ID` text DEFAULT NULL,
  `UPLOAD_ID` text DEFAULT NULL,
  `DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `km_users`
--

CREATE TABLE `km_users` (
  `COUNT` bigint(20) NOT NULL,
  `ID` text DEFAULT NULL,
  `PID` text DEFAULT NULL,
  `PIN` varchar(50) DEFAULT NULL,
  `DP` text DEFAULT NULL,
  `NAME` text DEFAULT NULL,
  `EMAIL_ADDRESS` text DEFAULT NULL,
  `MOBILE_NUMBER` varchar(100) DEFAULT NULL,
  `LOCATION` varchar(100) DEFAULT NULL,
  `CITY` varchar(250) DEFAULT NULL,
  `COUNTRY` varchar(100) NOT NULL DEFAULT 'Nigeria',
  `ADDRESS` text DEFAULT NULL,
  `DESCRIPTION` text DEFAULT NULL,
  `USERNAME` varchar(100) DEFAULT NULL,
  `PASSWORD` varchar(100) DEFAULT NULL,
  `DOB` varchar(50) DEFAULT NULL,
  `CATEGORY` varchar(100) DEFAULT NULL,
  `PROFILE_TYPE` varchar(50) DEFAULT NULL,
  `OFFER_CODE` varchar(100) DEFAULT NULL,
  `MAX_SALES` varchar(100) NOT NULL DEFAULT '10',
  `OC_FLAG` varchar(100) DEFAULT NULL,
  `STATUS` varchar(2) DEFAULT NULL,
  `LAST_MODIFIED_DATE` timestamp NOT NULL DEFAULT current_timestamp(),
  `CREATED_DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `km_users`
--

INSERT INTO `km_users` (`COUNT`, `ID`, `PID`, `PIN`, `DP`, `NAME`, `EMAIL_ADDRESS`, `MOBILE_NUMBER`, `LOCATION`, `CITY`, `COUNTRY`, `ADDRESS`, `DESCRIPTION`, `USERNAME`, `PASSWORD`, `DOB`, `CATEGORY`, `PROFILE_TYPE`, `OFFER_CODE`, `MAX_SALES`, `OC_FLAG`, `STATUS`, `LAST_MODIFIED_DATE`, `CREATED_DATE`) VALUES
(2, '5ccd948b14b7e', 'S-156207', '5ccd9da2cb438', '/dps/default/dp.jpg', 'Klassy Mall Online Shopping', 'admin@klassymall.com', '09000000000', 'Kano', 'Kano Municipal', 'Nigeria', 'No.26 Royal Plaza Suite<!> Zoo Road Kano State<!> Nigeria', NULL, 'klassy_mall01', '9fb7e356c12c50717916514e8b37d495', '1994-04-02', 'Male', '2', 'STD0010', '10', NULL, 'AC', '2019-05-04 13:32:59', '2019-05-25 14:16:00'),
(3, '5cf65a2369273', 'S-508504', '5cf65a483ca9c', '/dps/default/dp.jpg', 'Rabiu Abdul Aliyu', 'net.rabiu@gmail.com', '08064160204', 'Kaduna', 'Kaduna South', 'Nigeria', 'As2 Gamagira U/Sanusi Kaduna<!> Nigeria', NULL, 'rabs_developer01', 'd7b57f97403e946c346308b91a7ac626', '1992-04-02', 'Male', '', 'STD0010', '10', NULL, 'AC', '2019-06-04 11:46:43', '2019-06-04 11:47:20'),
(4, '5cfddab2c32ac', 'S-444303', '5cfddb06297af', '/dps/default/dp.jpg', 'Abdul Azeez', 'garoabdul@gmail.com', '08067135745', 'Kano', 'Kabo', 'Nigeria', 'No 1 Sabuwar Kasuwa<!> Garo Kano state', NULL, 'garoabdul@gmail.com', '8a3efac6a2eed379777801d248c54ccd', '1980-03-05', 'Male', '', 'STD0010', '10', NULL, 'AC', '2019-06-10 04:21:06', '2019-06-10 04:22:30'),
(5, '5cfecb25789c5', 'S-972774', '5cfecb45ddfc7', '/dps/default/dp.jpg', 'Zahraddeen Saleh', 'Zahraddeensaleh@gmail.com', '08101227065', 'bauchi', '', 'Nigeria', 'Nassarawa StreetÂ ', NULL, 'Deeni2saleh', '0d7959373161aec43804e13d0b98f405', '1991-08-03', 'Male', '', 'STD0010', '10', NULL, 'AC', '2019-06-10 21:27:01', '2019-06-10 21:27:33'),
(6, '5d01473987408', 'S-250299', '5d01475b9a499', '/dps/default/dp.jpg', 'Gyosmen', 'gyosmenjockkotty@outlook.com', '08060772124', 'Kaduna', '', 'Nigeria', '15 Afaka Close Angwan Gimbiya Sabon Tasha<!> Kaduna. ', NULL, 'Lady_Red', '970c9b69618debc1672de6347dc316c6', '1987-08-27', 'Female', '', 'STD0010', '10', NULL, 'AC', '2019-06-12 18:40:57', '2019-06-12 18:41:31');

-- --------------------------------------------------------

--
-- Table structure for table `km_user_carts`
--

CREATE TABLE `km_user_carts` (
  `COUNT` bigint(20) NOT NULL,
  `ID` text DEFAULT NULL,
  `ITEM_ID` text DEFAULT NULL,
  `OWNER_ID` text DEFAULT NULL,
  `ITEM_NAME` varchar(200) DEFAULT NULL,
  `ITEM_PRICE` varchar(100) DEFAULT NULL,
  `CONTITY` varchar(100) DEFAULT NULL,
  `COLOR` varchar(100) DEFAULT NULL,
  `SIZE` varchar(100) DEFAULT NULL,
  `SHIPPING_AREA` varchar(100) DEFAULT NULL,
  `SHIPPING_FEE` varchar(100) DEFAULT NULL,
  `DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `km_user_carts`
--

INSERT INTO `km_user_carts` (`COUNT`, `ID`, `ITEM_ID`, `OWNER_ID`, `ITEM_NAME`, `ITEM_PRICE`, `CONTITY`, `COLOR`, `SIZE`, `SHIPPING_AREA`, `SHIPPING_FEE`, `DATE`) VALUES
(1, '5cfcad148f0a2', '5cfb5010c45e8', '5cf65a2369273', 'Indonesian Jubah', NULL, '1', 'Any', 'Any', NULL, NULL, '2019-06-09 06:54:12'),
(3, '5d014f498b8f3', '5cfa81ec694f4', '5d01473987408', 'Dkny Handbag', NULL, '1', 'BLACK', 'Any', NULL, NULL, '2019-06-12 19:15:21'),
(4, '5d014f806634c', '5cfa8567ba304', '5d01473987408', 'Handbag', NULL, '1', 'Any', 'Any', NULL, NULL, '2019-06-12 19:16:16');

-- --------------------------------------------------------

--
-- Table structure for table `km_user_complains`
--

CREATE TABLE `km_user_complains` (
  `COUNT` bigint(20) NOT NULL,
  `ID` text NOT NULL,
  `SUBJECT` text NOT NULL,
  `COMPLAIN` text NOT NULL,
  `DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `km_user_messages`
--

CREATE TABLE `km_user_messages` (
  `COUNT` bigint(20) NOT NULL,
  `SENDER_ID` text DEFAULT NULL,
  `SENDER_NAME` varchar(500) DEFAULT NULL,
  `SENDER_EMAIL` varchar(500) DEFAULT NULL,
  `SENDER_MOBILE` varchar(100) DEFAULT NULL,
  `MESSAGE` text DEFAULT NULL,
  `DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `km_user_orders`
--

CREATE TABLE `km_user_orders` (
  `COUNT` bigint(20) NOT NULL,
  `SENDER_ID` text DEFAULT NULL,
  `ORDER_ID` text DEFAULT NULL,
  `ITEMS_ID` text DEFAULT NULL,
  `REFRENCE_NUMBER` text DEFAULT NULL,
  `TRANSECTION_ID` text DEFAULT NULL,
  `NAME` text DEFAULT NULL,
  `LOCATION` varchar(200) NOT NULL,
  `ADDRESS_1` text DEFAULT NULL,
  `ADDRESS_2` text DEFAULT NULL,
  `WHENTR` text DEFAULT NULL,
  `WHOTR` text DEFAULT NULL,
  `MOBILE_NUMBER` text DEFAULT NULL,
  `EMAIL_ADDRESS` text DEFAULT NULL,
  `ORDER_TYPE` text DEFAULT NULL,
  `CONTITY` varchar(100) DEFAULT NULL,
  `DELIVERY_AREA` varchar(100) DEFAULT NULL,
  `ZIP_CODE` varchar(50) DEFAULT NULL,
  `DESCRIPTION` text DEFAULT NULL,
  `ALTERNATIVE_NUMBER` varchar(100) DEFAULT NULL,
  `SHIPPING_FEE` varchar(100) DEFAULT '0',
  `STATUS` varchar(2) DEFAULT NULL,
  `ACCOUNT_NAME` text DEFAULT NULL,
  `ACCOUNT_NUMBER` text DEFAULT NULL,
  `TOTAL_AMOUNT` text DEFAULT NULL,
  `BANK_TYPE` text DEFAULT NULL,
  `PAYMENT_DATE` text DEFAULT NULL,
  `PAYMENT_STATUS` varchar(50) DEFAULT NULL,
  `PAYMENT_REMARKS` text DEFAULT NULL,
  `TOT_NUMBER` text DEFAULT NULL,
  `DATE` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `km_user_orders`
--

INSERT INTO `km_user_orders` (`COUNT`, `SENDER_ID`, `ORDER_ID`, `ITEMS_ID`, `REFRENCE_NUMBER`, `TRANSECTION_ID`, `NAME`, `LOCATION`, `ADDRESS_1`, `ADDRESS_2`, `WHENTR`, `WHOTR`, `MOBILE_NUMBER`, `EMAIL_ADDRESS`, `ORDER_TYPE`, `CONTITY`, `DELIVERY_AREA`, `ZIP_CODE`, `DESCRIPTION`, `ALTERNATIVE_NUMBER`, `SHIPPING_FEE`, `STATUS`, `ACCOUNT_NAME`, `ACCOUNT_NUMBER`, `TOTAL_AMOUNT`, `BANK_TYPE`, `PAYMENT_DATE`, `PAYMENT_STATUS`, `PAYMENT_REMARKS`, `TOT_NUMBER`, `DATE`) VALUES
(1, '5cfddab2c32ac', '5cfddbb9e6931', NULL, '275996', NULL, 'Abdul Azeez', 'Kano', 'No 1 Sabuwar Kasuwa<!> Garo Kano State', '', 'null', 'null', '08067135745', 'Garoabdul@gmail.com', 'CASH', NULL, 'Kano', '', '', '', '800', 'PP', NULL, NULL, NULL, NULL, NULL, 'P', NULL, NULL, '2019-06-10 04:25:29');

-- --------------------------------------------------------

--
-- Table structure for table `km_user_orders_dtl`
--

CREATE TABLE `km_user_orders_dtl` (
  `COUNT` bigint(20) NOT NULL,
  `ID` text DEFAULT NULL,
  `ITEM_ID` text DEFAULT NULL,
  `OWNER_ID` text DEFAULT NULL,
  `ORDER_ID` text DEFAULT NULL,
  `ITEM_NAME` varchar(200) DEFAULT NULL,
  `ITEM_PRICE` varchar(100) DEFAULT NULL,
  `CONTITY` varchar(100) DEFAULT NULL,
  `COLOR` varchar(100) DEFAULT NULL,
  `SIZE` varchar(100) DEFAULT NULL,
  `SHIPPING_AREA` varchar(100) DEFAULT NULL,
  `SHIPPING_FEE` varchar(100) DEFAULT NULL,
  `DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `km_user_orders_dtl`
--

INSERT INTO `km_user_orders_dtl` (`COUNT`, `ID`, `ITEM_ID`, `OWNER_ID`, `ORDER_ID`, `ITEM_NAME`, `ITEM_PRICE`, `CONTITY`, `COLOR`, `SIZE`, `SHIPPING_AREA`, `SHIPPING_FEE`, `DATE`) VALUES
(1, '5cfddb7da4248', '5cfa7ab57a1dc', '5cfddab2c32ac', '5cfddbb9e6931', 'Handbag', NULL, '1', 'BLUE', 'Any', NULL, NULL, '2019-06-10 04:25:30');

-- --------------------------------------------------------

--
-- Table structure for table `km_user_reports`
--

CREATE TABLE `km_user_reports` (
  `COUNT` bigint(20) NOT NULL,
  `ID` text DEFAULT NULL,
  `REPORTED_USERNAME` text DEFAULT NULL,
  `REPORTED_PID` text DEFAULT NULL,
  `SUBJECT` text DEFAULT NULL,
  `DESCRIPTION` text DEFAULT NULL,
  `DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `km_fees`
--
ALTER TABLE `km_fees`
  ADD PRIMARY KEY (`COUNT`);

--
-- Indexes for table `km_items`
--
ALTER TABLE `km_items`
  ADD PRIMARY KEY (`COUNT`);
ALTER TABLE `km_items` ADD FULLTEXT KEY `KM_ItemsIndex` (`UPLOAD_ID`,`ITEM_NAME`,`CATEGORY`,`STATUS`,`ID`,`SUB_CATEGORY`);

--
-- Indexes for table `km_users`
--
ALTER TABLE `km_users`
  ADD PRIMARY KEY (`COUNT`);
ALTER TABLE `km_users` ADD FULLTEXT KEY `CATEGORY_index` (`CATEGORY`);
ALTER TABLE `km_users` ADD FULLTEXT KEY `KM_UsersIndex` (`ID`,`EMAIL_ADDRESS`,`MOBILE_NUMBER`,`USERNAME`);

--
-- Indexes for table `km_user_carts`
--
ALTER TABLE `km_user_carts`
  ADD PRIMARY KEY (`COUNT`);
ALTER TABLE `km_user_carts` ADD FULLTEXT KEY `KM_UsersIndex` (`ID`,`ITEM_ID`,`OWNER_ID`,`ITEM_NAME`);

--
-- Indexes for table `km_user_complains`
--
ALTER TABLE `km_user_complains`
  ADD PRIMARY KEY (`COUNT`);

--
-- Indexes for table `km_user_messages`
--
ALTER TABLE `km_user_messages`
  ADD PRIMARY KEY (`COUNT`);

--
-- Indexes for table `km_user_orders`
--
ALTER TABLE `km_user_orders`
  ADD PRIMARY KEY (`COUNT`);

--
-- Indexes for table `km_user_orders_dtl`
--
ALTER TABLE `km_user_orders_dtl`
  ADD PRIMARY KEY (`COUNT`);

--
-- Indexes for table `km_user_reports`
--
ALTER TABLE `km_user_reports`
  ADD PRIMARY KEY (`COUNT`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `km_fees`
--
ALTER TABLE `km_fees`
  MODIFY `COUNT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `km_items`
--
ALTER TABLE `km_items`
  MODIFY `COUNT` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `km_users`
--
ALTER TABLE `km_users`
  MODIFY `COUNT` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `km_user_carts`
--
ALTER TABLE `km_user_carts`
  MODIFY `COUNT` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `km_user_complains`
--
ALTER TABLE `km_user_complains`
  MODIFY `COUNT` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `km_user_messages`
--
ALTER TABLE `km_user_messages`
  MODIFY `COUNT` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `km_user_orders`
--
ALTER TABLE `km_user_orders`
  MODIFY `COUNT` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `km_user_orders_dtl`
--
ALTER TABLE `km_user_orders_dtl`
  MODIFY `COUNT` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `km_user_reports`
--
ALTER TABLE `km_user_reports`
  MODIFY `COUNT` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
