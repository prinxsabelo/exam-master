-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 26, 2021 at 04:08 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thumbprint`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_super` tinyint(1) NOT NULL DEFAULT 0,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `lastname`, `firstname`, `email`, `password`, `is_super`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'Enulebu', 'Favor', 'bello@gmail.com', '$2y$10$Ty8fAyHbDPvKSyZY3djfF.28W4xlGIxAHc8j03giOgHYPF0bKgyNm', 1, NULL, '2020-04-27 12:44:14', '2020-04-27 12:47:35');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `code`, `level_id`, `admin_id`, `created_at`, `updated_at`) VALUES
(3, 'PASCAL PROGRAMMING', 'CSE201', 4, 2, '2021-03-26 12:28:19', '2021-03-26 13:13:59'),
(4, 'ELEMENTARY MATHEMATICS', 'MTH101', 3, 2, '2021-03-26 12:28:50', '2021-03-26 12:28:50');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `matric_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level_id` int(11) NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `exam_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `instruction` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `begin_time` double(8,2) NOT NULL,
  `end_time` double(8,2) NOT NULL,
  `count_down` double(8,2) NOT NULL,
  `questions_display` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`id`, `exam_title`, `instruction`, `course_id`, `admin_id`, `begin_time`, `end_time`, `count_down`, `questions_display`, `created_at`, `updated_at`) VALUES
(5, 'EXAM FOR JAVASCRIPT', 'dede', 1, 2, 44.00, 55.00, 33.00, 0, '2021-03-25 20:18:27', '2021-03-26 12:25:25'),
(6, 'EXAM FOR JAVASCRIPTXX', 'dede', 1, 2, 44.00, 55.00, 33.00, 9, '2021-03-25 20:18:41', '2021-03-26 11:02:06'),
(7, 'EXAM FOR JAVASCRIPT', 'dede', 1, 2, 44.00, 55.00, 3333.00, 6, '2021-03-25 20:19:01', '2021-03-26 11:35:07'),
(8, 'DEDEDEDEDEDE', 'frfrfr', 1, 2, 22.00, 33.00, 33.00, 2, '2021-03-26 11:13:53', '2021-03-26 11:14:25'),
(10, 'MIDLEVELCODE EXAM FOR MINGLE', 'Tell me ur thoughts', 2, 2, 33.00, 44.00, 330.00, 0, '2021-03-26 11:21:24', '2021-03-26 11:27:44'),
(12, 'PASCAL', 'simple and way', 3, 2, 22.00, 44.00, 600.00, 10, '2021-03-26 13:02:18', '2021-03-26 13:44:55');

-- --------------------------------------------------------

--
-- Table structure for table `exam_time_trackers`
--

CREATE TABLE `exam_time_trackers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `submitted` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timer` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exam_time_trackers`
--

INSERT INTO `exam_time_trackers` (`id`, `student_id`, `exam_id`, `submitted`, `timer`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Y', 0, '2020-06-15 14:30:40', '2020-06-15 14:31:00');

-- --------------------------------------------------------

--
-- Table structure for table `exam_trackers`
--

CREATE TABLE `exam_trackers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `picked_answer` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exam_trackers`
--

INSERT INTO `exam_trackers` (`id`, `student_id`, `exam_id`, `question_id`, `picked_answer`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 'Yes, perfectly', '2020-06-15 14:30:40', '2020-06-15 14:30:51'),
(2, 1, 1, 2, 'No, it will not', '2020-06-15 14:30:40', '2020-06-15 14:30:53');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `levels`
--

CREATE TABLE `levels` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `level` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `levels`
--

INSERT INTO `levels` (`id`, `level`, `created_at`, `updated_at`) VALUES
(3, '100 LEVEL', '2021-03-26 12:27:53', '2021-03-26 12:27:53'),
(4, '200 LEVEL', '2021-03-26 12:28:02', '2021-03-26 12:28:02');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2019_08_19_000000_create_failed_jobs_table', 1),
(3, '2020_04_15_194757_create_admins_table', 1),
(4, '2020_04_15_194807_create_students_table', 1),
(5, '2020_04_16_114955_create_levels_table', 1),
(6, '2020_04_16_123309_create_courses_table', 1),
(7, '2020_04_17_203817_create_exams_table', 2),
(8, '2020_04_17_205001_create_exams_table', 3),
(9, '2020_04_17_212818_create_exams_table', 4),
(10, '2020_04_21_111900_create_questions_table', 5),
(11, '2020_04_26_112907_create_results_table', 6),
(12, '2020_06_10_114529_create_exam_checker', 7),
(13, '2020_06_10_114924_create_exam_time_checker', 7),
(14, '2020_06_10_134823_create_exam_checkers_table', 8),
(15, '2020_06_10_204234_create_exam_checkers_table', 9),
(16, '2020_06_12_212658_create_exam_time_checkers_table', 10),
(17, '2020_06_12_213707_create_exam_time_checkers_table', 11),
(18, '2020_06_12_214014_create_exam_time_checkers_table', 12);

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `exam_id` int(11) NOT NULL,
  `question` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_a` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_b` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_c` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_d` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correct_option` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `exam_id`, `question`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_option`, `created_at`, `updated_at`) VALUES
(1, 1, 'Is it working', 'Yes, perfectly', 'Yes, somehow', 'No, not at all', 'I don\'t know', 'Yes, somehow', '2020-06-15 14:29:08', '2021-03-25 18:57:11'),
(2, 1, 'Will it work?', 'Yes, it will', 'No, it will not', 'Maybe', 'Not at all', 'Yes, it will', '2020-06-15 14:29:42', '2021-03-25 18:57:01'),
(3, 1, 'dede', 'simple', 'greet', 'mim', 'setter', 'greet', '2021-03-25 19:09:27', '2021-03-25 19:12:02'),
(4, 1, 'Want me', 'right', 'bas', 'mint', 'sing', 'sing', '2021-03-25 19:12:30', '2021-03-25 19:12:30'),
(5, 2, 'dede', 'frfr', 'gtg', 'gtgt', 'hyhy', 'gtg', '2021-03-25 19:20:01', '2021-03-25 19:20:01'),
(6, 3, 'dede', 'frfr', 'gtgt', 'hyhyhy', 'hyhy', 'gtgt', '2021-03-25 19:50:19', '2021-03-25 19:50:19'),
(7, 3, 'frfr', 'tgt', 'frfr', 'hyhy', 'frfrfr', 'frfr', '2021-03-25 19:50:36', '2021-03-25 19:50:36'),
(8, 4, 'dede', 'frf', 'gtgt', 'cdcdcd', 'hyhy', 'frf', '2021-03-25 19:53:28', '2021-03-25 19:53:28'),
(9, 4, 'ftgtgt', 'hyhy', 'jujuu', 'vfvfvf', 'ytgtg', 'jujuu', '2021-03-25 19:53:45', '2021-03-25 19:53:45'),
(10, 7, 'deefrfr', 'gtgt', 'hyh', 'r4r4r4', 'ygtgt', 'ygtgt', '2021-03-25 20:19:25', '2021-03-25 20:19:25'),
(11, 7, 'rrgtgt', 'hyhyj', 'uju', 'frfrfrr', 'gtgt', 'hyhyj', '2021-03-25 20:19:35', '2021-03-25 20:19:35'),
(12, 7, 'frfrf', 'rgtgt', 'hyhy', 'ujujuju', 'ujujuj', 'hyhy', '2021-03-25 20:21:02', '2021-03-25 20:21:02'),
(13, 6, 'mmmmmmmmmmmmmmmmmmmmmm', 'aaa', 'xxx', 'vv', 'cc', 'xxx', '2021-03-25 20:25:16', '2021-03-25 20:25:16'),
(14, 6, 'popp', 'qwe', 'rtr', 'tfrr', 'tyu', 'rtr', '2021-03-25 20:28:46', '2021-03-25 20:28:46'),
(15, 6, 'tgtgtgt', 'frgrg', 'hyhy', 'cdcdcdd', 'gtgtgt', 'gtgtgt', '2021-03-25 20:32:25', '2021-03-25 20:32:25'),
(16, 6, 'rfrfr', 'gtgt', 'hyjujuju', 'gtgtgtgtgtgt', 'kigrfrfr', 'hyjujuju', '2021-03-25 20:33:03', '2021-03-25 20:33:03'),
(17, 5, 'frfrfr', 'gtgt', 'frfrfr', 'hyhyhyhyhy', 'tgtgtg', 'frfrfr', '2021-03-25 20:35:57', '2021-03-25 20:35:57'),
(18, 5, 'rr4r4r4', 't5t5t5', 'y6y6y', '6y6y6y6y6', '6y6y', 'y6y6y', '2021-03-25 20:36:36', '2021-03-25 20:36:36'),
(19, 5, 'frfr', 'gtgt', 'frfr', 'ededede', 'dede', 'frfr', '2021-03-25 20:40:04', '2021-03-25 20:40:04'),
(20, 6, 'dedede', 'frfr', 'gtgt', 'fvvffvf', 'hyhy', 'gtgt', '2021-03-26 10:30:40', '2021-03-26 10:30:40'),
(21, 6, 'dede', 'frfr', 'gtgt', 'gtgtgt', 'frfrfr', 'gtgt', '2021-03-26 10:32:06', '2021-03-26 10:32:06'),
(22, 7, 'frfr', 'gtgt', 'hyhy', 'kikiki', 'juju', 'gtgt', '2021-03-26 10:45:07', '2021-03-26 10:45:07'),
(23, 6, 'frfr', 'tgtgt', 'frfr', 'yhyhyhyy', 'frgtgth', 'frfr', '2021-03-26 10:59:04', '2021-03-26 10:59:04'),
(24, 6, 'vgvg', 'cffcf', 'vgvg', 'bhbhbh', 'bhbbhbh', 'cffcf', '2021-03-26 10:59:51', '2021-03-26 10:59:51'),
(25, 6, 'dede', 'frfr', 'gtgt', 'yhyhyhy', 'hyhyh', 'gtgt', '2021-03-26 11:01:50', '2021-03-26 11:01:50'),
(26, 6, 'dedede', 'frfr', 'gtgt', 'gtgttgt', 'frfr', 'frfr', '2021-03-26 11:04:07', '2021-03-26 11:04:07'),
(27, 7, 'dededede', 'frfrfr', 'gtgt', 'dededeed', 'edede', 'frfrfr', '2021-03-26 11:04:45', '2021-03-26 11:04:45'),
(28, 7, 'frfr', 'fgtgt', 'hyhy', 'ujujujiu', 'jujuj', 'hyhy', '2021-03-26 11:05:38', '2021-03-26 11:05:38'),
(29, 6, 'frfr', 'frfrfrfrfr', 'gtgtgt', 'jujujujujuju', 'hyhyhy', 'gtgtgt', '2021-03-26 11:06:49', '2021-03-26 11:06:49'),
(30, 6, 'dede', 'frfrf', 'gtgtgt', 'hyhyhyhy', 'hyhyhy', 'frfrf', '2021-03-26 11:07:29', '2021-03-26 11:07:29'),
(31, 8, 'deded', 'frfr', 'gtgt', 'hyhyhyhy', 'hyyhy', 'gtgt', '2021-03-26 11:14:10', '2021-03-26 11:14:10'),
(32, 8, 'hyhyhyh', 'gtgt', 'yjuju', 'rfrfrfrfr', 'frfrf', 'yjuju', '2021-03-26 11:14:17', '2021-03-26 11:14:17'),
(33, 10, 'frfrf', 'gtgt', 'yhy', 'tgtgtgt', 'hyhy', 'gtgt', '2021-03-26 11:33:32', '2021-03-26 11:33:32'),
(34, 11, 'deded', 'efrfr', 'gtgt', 'frfrfrfr', 'frfrfrfr', 'gtgt', '2021-03-26 12:34:41', '2021-03-26 12:34:41'),
(35, 11, 'dede', 'rfrf', 'gtgt', 'frfrfr', 'hyhy', 'gtgt', '2021-03-26 12:40:40', '2021-03-26 12:40:40'),
(36, 11, 'frfrfrfr', 'gtgt', 'cddvv', 'nhnhnhnh', 'gbbgbg', 'cddvv', '2021-03-26 12:40:47', '2021-03-26 12:40:47'),
(37, 11, 'ffdccddc', 'dsdcdsgtegt', 'gttrgrthy', 'grrtghyhygtgt', 'dvdfdfv', 'gttrgrthy', '2021-03-26 12:41:00', '2021-03-26 12:41:00'),
(38, 12, 'Who invented Pascal', 'Blaise', 'Raw', 'Dev', 'Seed', 'Raw', '2021-03-26 13:05:28', '2021-03-26 13:31:44'),
(39, 13, 'deded', 'efrfr', 'gtgt', 'hyhyhyhhy', 'hyhy', 'efrfr', '2021-03-26 13:06:16', '2021-03-26 13:06:16'),
(40, 12, '2+2', '3', '1', '5', '4', '4', '2021-03-26 13:32:16', '2021-03-26 13:32:16'),
(41, 12, 'which one is not a pointer types used in Pascal', 'Blake Pointer', 'Record Pointer', 'Seed Pointer', 'Zanku Pointer', 'Record Pointer', '2021-03-26 13:34:09', '2021-03-26 13:34:09'),
(42, 12, 'Why Pascal?', 'For Fun', 'Easy', 'Simple', 'Crazy', 'Easy', '2021-03-26 13:35:39', '2021-03-26 13:35:39'),
(43, 12, 'A pascal program consists of the modules which are called as?', 'respect', 'procedure', 'units', 'fun', 'units', '2021-03-26 13:36:31', '2021-03-26 13:36:31'),
(44, 12, 'You can declare a string in pascal without one.', 'As a Character Array', 'As a Character Array', 'As a null terminated string', 'As dev code', 'As dev code', '2021-03-26 13:37:50', '2021-03-26 13:37:50'),
(45, 12, 'Which one is not a loop  in pascal?', 'While-do loop', 'For-do loop', 'Repeat-until loop', 'Straw loop', 'Straw loop', '2021-03-26 13:39:06', '2021-03-26 13:39:06'),
(46, 12, 'Which of the following Language that Computer can Understand & Execute?', 'Machine Language', 'C Programming Language', 'Java Programming Language', 'None of the Above', 'Machine Language', '2021-03-26 13:41:40', '2021-03-26 13:41:40'),
(47, 12, 'the ______ statement causes the loop to skip the remainder of its body and immediately retest its condition prior to reiterating', 'continue', 'Break', 'exit', 'none of the above', 'continue', '2021-03-26 13:44:00', '2021-03-26 13:44:00'),
(48, 12, 'the ______ statement causes the loop to skip the remainder of its body and immediately retest its condition prior to reiterating', 'continue', 'Break', 'exit', 'none of the above', 'continue', '2021-03-26 13:44:01', '2021-03-26 13:44:01'),
(49, 12, 'What command is used to stop your program from running ?', 'halt', 'please Stop()', 'stop', 'cease', 'stop', '2021-03-26 13:44:48', '2021-03-26 13:44:48');

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` int(11) NOT NULL,
  `score` double(8,2) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `finish` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `student_id`, `score`, `exam_id`, `finish`, `created_at`, `updated_at`) VALUES
(1, 1, 3.33, 1, 1, '2020-06-15 14:30:11', '2020-06-15 14:31:01'),
(2, 1, 0.00, 2, 0, '2021-03-25 19:19:06', '2021-03-25 19:19:06'),
(3, 1, 0.00, 3, 0, '2021-03-25 19:50:05', '2021-03-25 19:50:05'),
(4, 1, 0.00, 4, 0, '2021-03-25 19:52:28', '2021-03-25 19:52:28'),
(5, 1, 0.00, 5, 0, '2021-03-25 20:18:27', '2021-03-25 20:18:27'),
(6, 1, 0.00, 6, 0, '2021-03-25 20:18:41', '2021-03-25 20:18:41'),
(7, 1, 0.00, 7, 0, '2021-03-25 20:19:01', '2021-03-25 20:19:01'),
(8, 1, 0.00, 8, 0, '2021-03-26 11:13:53', '2021-03-26 11:13:53'),
(9, 2, 0.00, 5, 0, '2021-03-26 11:14:52', '2021-03-26 11:14:52'),
(10, 2, 0.00, 6, 0, '2021-03-26 11:14:52', '2021-03-26 11:14:52'),
(11, 2, 0.00, 7, 0, '2021-03-26 11:14:52', '2021-03-26 11:14:52'),
(12, 2, 0.00, 8, 0, '2021-03-26 11:14:52', '2021-03-26 11:14:52'),
(13, 3, 0.00, 10, 0, '2021-03-26 11:21:49', '2021-03-26 11:21:49'),
(14, 4, 0.00, 10, 0, '2021-03-26 11:24:23', '2021-03-26 11:24:23'),
(15, 5, 0.00, 12, 0, '2021-03-26 13:12:54', '2021-03-26 13:12:54'),
(16, 5, 0.00, 13, 0, '2021-03-26 13:12:54', '2021-03-26 13:12:54');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_unique` (`email`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `courses_code_unique` (`code`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `students_email_unique` (`email`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exam_time_trackers`
--
ALTER TABLE `exam_time_trackers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exam_trackers`
--
ALTER TABLE `exam_trackers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `levels`
--
ALTER TABLE `levels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `levels_level_unique` (`level`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `exam_time_trackers`
--
ALTER TABLE `exam_time_trackers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `exam_trackers`
--
ALTER TABLE `exam_trackers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `levels`
--
ALTER TABLE `levels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
