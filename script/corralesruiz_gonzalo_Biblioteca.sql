-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema rest-api
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema rest-api
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `rest-api` DEFAULT CHARACTER SET utf8mb4 ;
USE `rest-api` ;

-- -----------------------------------------------------
-- Table `rest-api`.`libros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rest-api`.`libros` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(30) NOT NULL,
  `autor` VARCHAR(30) NOT NULL,
  `categoria` VARCHAR(30) NOT NULL,
  `año-publicacion` DATE NOT NULL,
  `ISBN` VARCHAR(13) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 10	
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO `rest-api`.`libros` (`nombre`, `autor`, `categoria`, `año-publicacion`, `ISBN`) VALUES
('Cien Años de Soledad', 'Gabriel Garcia Marquez', 'Ficción', '1967-05-30', '9780060883287'),
('Don Quijote de la Mancha', 'Miguel de Cervantes', 'Clásicos', '1605-01-16', '9780142437230'),
('El amor en los tiempos del cólera', 'Gabriel Garcia Marquez', 'Romance', '1985-03-06', '9780307389732'),
('La sombra del viento', 'Carlos Ruiz Zafón', 'Misterio', '2001-04-01', '9780143126392'),
('El principito', 'Antoine de Saint-Exupéry', 'Fábula', '1943-04-06', '9780156012195'),
('1984', 'George Orwell', 'Distopía', '1949-06-08', '9780451524935'),
('Fahrenheit 451', 'Ray Bradbury', 'Ciencia Ficción', '1953-10-19', '9781451673319'),
('El nombre del viento', 'Patrick Rothfuss', 'Fantasía', '2007-03-27', '9780756404741'),
('El código Da Vinci', 'Dan Brown', 'Thriller', '2003-04-03', '9780307474278'),
('Los juegos del hambre', 'Suzanne Collins', 'Distopía', '2008-09-14', '9780439023481');
