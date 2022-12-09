-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 09 déc. 2022 à 23:56
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bde_bd`
--

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

CREATE TABLE `article` (
  `idA` int(255) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `texte` varchar(2047) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `article`
--

INSERT INTO `article` (`idA`, `titre`, `texte`) VALUES
(1, 'Rendu TP WEB', 'Le rendu du TP de web de Kristen est le 9 décembre. Il sera évluer en cours la semaine du 12.'),
(8, 'Une élection du Président du BDE s’impose !', 'Cela fait 5 mois que ce cher Antonin BELOU est notre président BDE alors qu’il n’est plus étudiant dans notre formation. Cette situation ne peut être tolérée d’autant plus qu’un président du BDE ce doit être présent pour les étudiants il est un symbole ! Comment cela peut-il être le cas avec une personne extérieure à la formation ? \nPour remettre de l’ordre dans cette situation, il faut une nouvelle élection toutes les années peuvent se présentées seuls les personnes partant au Canada en Janvier 2023 ne seront pas autorisés. Nous comptons sur votre investissement lors du vote qui aura bientôt lieu !\n'),
(9, 'Une salle de création pour nous !', 'Vous avez des idées de modélisation, de jeux, d’expérience en VR mais aucun matériel pour les réalisés ? Pas de panique ! La chef du département Informatique Mme Adélaïde ALBOUY-KISSI a mis en place une salle (356-357) de création. Vous aurez à votre disposition 25 casques de réalité virtuelle avec 2 pc fixes sur place pour travailler in situ, une imprimante 3D, des tablettes graphiques…\nAussi le BDE a choisi d’y installé un piano pour vous laisser vous exprimer de façon musicale. Le BDE et la cheffe de département sont à votre disposition pour quelconque aide. N’hésitez pas ! L’imagination est notre route vers l’avenir !\n'),
(10, 'La Réalité Virtuelle un futur avec autant de possibilité que l’imagination le permet', 'Comme vous le savez tous la Réalité Virtuelle s’installe dans beaucoup de domaines : l’architecture, l’immobilier, les jeux vidéo, la recherche … Mais saviez-vous qu’elle s’installe aussi dans le domaine de l’enseignement ? En effet, plusieurs formations sont développées en réalité virtuelle pour donner une expérience manuelle et sans danger. Vous trouverez aussi les visites virtuelles qui commencent à prendre place dans notre société permettant ainsi de visiter sans déplacements réels.'),
(11, 'Le Métavers arrive dans notre formation', 'Le métavers, ce monde virtuel dont on entend parler de partout. Pour information, c’est un terme est régulièrement utilisé pour décrire une version future d\'Internet où des espaces virtuels, persistants et partagés sont accessibles via interaction 3D ou 2D en visioconférence. Il existe une autre définition conçoit le métavers comme l\'ensemble des mondes virtuels connectés à Internet, lesquels sont perçus en Réalité Augmentée. \nCette notion est considérée comme le futur de notre milieu, c’est pourquoi il est important d’expérimenter la VR et de comprendre la 3D qui sera bientôt dans nos sites web.\n'),
(12, 'Surprise pour le gala de Noël des MMI', 'Vous savez tous l’arrivée du gala de Noël organisée par les MMI. Mais saviez-vous que votre BDE organise un petit concours pour vous ? Pour la première fois votre BDE vous propose une petite mise en bouche du concours MisterInfo avec SantaInfo ! Ce concours suit le principe de mettre en avant votre virilité, vos muscles et votre testostérone par le biais de tenue sexy féminine et sur l’esprit de Noël !\nLe concours ayant lieu durant le gala de Noël des MMI, c’est à la fin du gala que le jury composé notamment des 3 filles du département délibérera pour décerner le prix SantaInfo et son trophée spécial !\n');

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `idC` int(11) NOT NULL,
  `nomC` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`idC`, `nomC`) VALUES
(1, 'BDE'),
(2, 'VR'),
(3, 'Web'),
(4, '3D'),
(5, 'Soirée'),
(6, 'Exposition');

-- --------------------------------------------------------

--
-- Structure de la table `favoris`
--

CREATE TABLE `favoris` (
  `idU` int(11) DEFAULT NULL,
  `idA` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `tager`
--

CREATE TABLE `tager` (
  `idA` int(11) NOT NULL,
  `idC` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `idU` int(255) NOT NULL,
  `mail` varchar(30) NOT NULL,
  `mdp` varchar(30) NOT NULL,
  `role` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`idU`, `mail`, `mdp`, `role`) VALUES
(1, 'milo@hotmail.fr', 'coucou43', 1),
(2, 'lena@live.sh', 'coucou30', 0),
(3, 'baptiste@bdeascii.fr', 'Bonsoir63', 0),
(4, 'remi@bde.fr', 'reumix63', 0),
(17, 'bde.ascii43@gmail.com', 'admin', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`idA`);

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`idC`);

--
-- Index pour la table `favoris`
--
ALTER TABLE `favoris`
  ADD KEY `favoris_ibfk_1` (`idU`),
  ADD KEY `favoris_ibfk_2` (`idA`);

--
-- Index pour la table `tager`
--
ALTER TABLE `tager`
  ADD KEY `tager_ibfk_1` (`idA`),
  ADD KEY `tager_ibfk_2` (`idC`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`idU`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `article`
--
ALTER TABLE `article`
  MODIFY `idA` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `idU` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `favoris`
--
ALTER TABLE `favoris`
  ADD CONSTRAINT `favoris_ibfk_1` FOREIGN KEY (`idU`) REFERENCES `utilisateur` (`idU`),
  ADD CONSTRAINT `favoris_ibfk_2` FOREIGN KEY (`idA`) REFERENCES `article` (`idA`);

--
-- Contraintes pour la table `tager`
--
ALTER TABLE `tager`
  ADD CONSTRAINT `tager_ibfk_1` FOREIGN KEY (`idA`) REFERENCES `article` (`idA`),
  ADD CONSTRAINT `tager_ibfk_2` FOREIGN KEY (`idC`) REFERENCES `categorie` (`idC`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
