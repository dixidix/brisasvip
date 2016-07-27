-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-07-2016 a las 23:21:02
-- Versión del servidor: 10.1.8-MariaDB
-- Versión de PHP: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `brisasvip`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fares`
--

CREATE TABLE `fares` (
  `id` int(1) NOT NULL,
  `bajada_bandera` float NOT NULL,
  `km` float NOT NULL,
  `daytime` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `fares`
--

INSERT INTO `fares` (`id`, `bajada_bandera`, `km`, `daytime`) VALUES
(1, 14.56, 9.56, 1),
(2, 17.45, 11.4, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `id` int(20) NOT NULL,
  `packageId` int(20) DEFAULT NULL,
  `url` longtext,
  `deleted` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `images`
--

INSERT INTO `images` (`id`, `packageId`, `url`, `deleted`) VALUES
(138, 39, '/brisas_vip/dist/files/1469120253656/4705bf82233342a608ac093a4f0a521b9c88ad94e83efa6231f53b66d0d05e37.jpg', 0),
(139, 39, '/brisas_vip/dist/files/1469120253656/0f790eb9f90f1168a7d6cb4697ae5b5f3dabbf1a2af2dcd7d124211e644ecdc8.jpg', 0),
(140, 39, '/brisas_vip/dist/files/1469120253656/028305bc5bdaa0d3e16e5dc7c759ff6857625e8336ca196c4550c8728c0cb5bc.jpg', 0),
(141, 39, '/brisas_vip/dist/files/1469120253656/25fda226075a0b0b84310a3e135572b7a8fbd2f6b2e7ed0a0cae976b356b11bb.jpg', 0),
(142, 40, '/brisas_vip/dist/files/1469125501233/c747e6426d46d2f03fa2645d862d8976d504cbbd49d6b9f284927650f5dd0efd.jpg', 0),
(143, 40, '/brisas_vip/dist/files/1469125501233/e9787e18eb6cea9d241c518f451a865971fc1f44e67a7df807b45d87e28c6172.jpg', 0),
(144, 40, '/brisas_vip/dist/files/1469125501233/0e6cb7c62b8e601380f47c8d429674bdf939b54195245d1ab1dc0447ffe21395.jpg', 0),
(145, 40, '/brisas_vip/dist/files/1469125501233/27d0afa96d9a8de57a56d70e030307359ab0206fb81d4a1da2fb1a43bcf37e51.jpg', 0),
(146, 41, '/brisas_vip/dist/files/1469197021229/56899fa95d2ffb8aa1a5a405b8a189ebdb8d297022156e6b65b96018d4a4ee8b.jpg', 0),
(147, 41, '/brisas_vip/dist/files/1469197021229/56899fa95d2ffb8aa1a5a405b8a189ebdb8d297022156e6b65b96018d4a4ee8b.jpg', 0),
(148, 41, '/brisas_vip/dist/files/1469197021229/56899fa95d2ffb8aa1a5a405b8a189ebdb8d297022156e6b65b96018d4a4ee8b.jpg', 0),
(149, 41, '/brisas_vip/dist/files/1469197021229/56899fa95d2ffb8aa1a5a405b8a189ebdb8d297022156e6b65b96018d4a4ee8b.jpg', 0),
(150, 42, '/brisas_vip/dist/files/1469197559535/ec44f7f589ce85abc6f8a53fd966bc27991218a61c217053fdf3339c18114612.jpg', 0),
(151, 42, '/brisas_vip/dist/files/1469197559535/17dce235542af9ddf5fbb0769c2457d19ebc8d271fae6e4b69b39c9c158d8024.jpg', 0),
(152, 42, '/brisas_vip/dist/files/1469197559535/ec44f7f589ce85abc6f8a53fd966bc27991218a61c217053fdf3339c18114612.jpg', 0),
(153, 42, '/brisas_vip/dist/files/1469197559535/17dce235542af9ddf5fbb0769c2457d19ebc8d271fae6e4b69b39c9c158d8024.jpg', 0),
(154, 43, '/brisas_vip/dist/files/1469209429201/5130bacfdbce0c194768fd361033d80039ba74a14cba003642bf3b9035888635.jpg', 0),
(155, 43, '/brisas_vip/dist/files/1469209429201/66bf802e3b73cafd90b5b72639ec6c58b6660ddebbce0152d40cda4bd4d1c515.jpg', 0),
(156, 43, '/brisas_vip/dist/files/1469209429201/21a40dd1b36e70802edbfddefc0c8a257d0c747de7b3bd601e3aacba47686315.jpg', 0),
(157, 43, '/brisas_vip/dist/files/1469209429201/42f0a1dc71aabeba80ad7aa7df7cd427eb1162de9910e57021ed377c0c643666.jpg', 0),
(158, 44, '/brisas_vip/dist/files/1469305210886/6bd7830bdaf0db976845a2f9125074569a369ba82890acc42acc30f0b10de9a0.jpg', 0),
(159, 44, '/brisas_vip/dist/files/1469305210886/acb3342a158d21016d0237705bb0ccfe738df2122d59d44db637c95372f3c07e.jpg', 0),
(160, 44, '/brisas_vip/dist/files/1469305210886/8fa9c80e6c621549c894a391334f456fa727d76a6b51ad6fd1cfbd2f38c5a536.jpg', 0),
(161, 44, '/brisas_vip/dist/files/1469305210886/6bd7830bdaf0db976845a2f9125074569a369ba82890acc42acc30f0b10de9a0.jpg', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `packages`
--

CREATE TABLE `packages` (
  `id` int(20) NOT NULL,
  `short_title` varchar(45) DEFAULT NULL,
  `title` varchar(65) DEFAULT NULL,
  `desc` longtext,
  `sub_title` varchar(65) DEFAULT NULL,
  `sub_desc` longtext,
  `price` mediumint(20) NOT NULL,
  `timestamp` varchar(255) DEFAULT NULL,
  `deleted` int(1) NOT NULL DEFAULT '0',
  `hasPromo` int(1) NOT NULL DEFAULT '0',
  `porcentaje` int(3) DEFAULT NULL,
  `bonificado` longtext,
  `paymentGatewayUrl` varchar(100) DEFAULT NULL,
  `zone` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `packages`
--

INSERT INTO `packages` (`id`, `short_title`, `title`, `desc`, `sub_title`, `sub_desc`, `price`, `timestamp`, `deleted`, `hasPromo`, `porcentaje`, `bonificado`, `paymentGatewayUrl`, `zone`) VALUES
(39, 'El Salto - Las Carditas', 'vivi toda la experiencia de El Salto y Las Carditas', 'Se encuentra a mayor altura que Potrerillos y surge como consecuencia de un loteo diseñado con fines netamente turísticos, obteniéndose vistas muy bellas principalmente desde el Cristo del Cerro, que domina la serranía y el valle de Potrerillos. Cuenta más de un centenar de chalets particulares, algunos de ellos se alquilan durante la temporada y sus condiciones naturales de arroyos y forestación permiten encontrar panorámicos lugares donde acampar (solo hay un camping organizado con servicios) tiene destacamento policial, primeros auxilios, energía eléctrica y agua potable.', 'Un lugar unico en la montaña', 'La modalidad de alojamiento tipo cabañas, es la que se ha impuesto, existiendo gran variedad de este tipo de emprendimientos, cercanas al arroyo El Salto como asimismo un minicomplejo turístico con hostería y cabañas dedicado al turismo rural, mini - spa, con actividades diversas para sus pasajeros, vivero y especialmente un restaurant con comidas muy artesanales y delicatessen, entre una vegetación muy atractiva. El arroyo El salto y la cercanía del Río Blanco, permiten un especial disfrute de estos parajes como asimismo , la posibilidad de hacer escalada en roca, en los morros y cerros que rodean al antiguo camping el salto.', 5400, '1469120253656', 0, 0, NULL, NULL, 'http://mpago.la/NDfg', 2),
(40, 'Aventurate en Los Reyunos', 'Visita Los Reyunos - San Rafael', 'Pasando por el distrito de La Villa 25 de Mayo y luego por una ruta de acceso de pequeñas curvas y contra curvas que nos van dando paisajes diferentes, y distintos miradores como los el mirador de “presa El Tigre” llegamos a Los Reyunos. Allí se pueden realizar distintas actividades, como tiro bungee (atracción principal), paseos en catamaran, en canoa, en cuatriciclos.. en el lugar se puede apreciar un inmenso e impactante paisaje con el lago y su cordón montañoso.', 'Ubicación:', 'a 35 km de ciudad de San Rafael, saliendo por una de las arterias principales de la ciudad de San Rafael, av Hipolito Yrigoyen  luego ruta nac 143 hasta empalmar la ruta provincial 150, pasando por el distrito de La Villa 25 de Mayo - See more at: http://www.sanrafael.com.ar/atractivos/los-reyunos.html#sthash.coW7lXcf.dpuf', 8000, '1469125501233', 0, 0, 20, NULL, 'http://mpago.la/ssXp', 2),
(41, 'asdasdasdasd', 'asdasdasdasd', 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasasdasdasdasdasd', 'asdasdasdasd', 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasasdasdasdasdasd', 6700, '1469197021229', 1, 2, NULL, 'Traslado Hotel,All Inclusive, agua,Traslado al aeropuerto', 'http://www.google.com', 2),
(42, '(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)', '(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*', '(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*', '(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*', '(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*', 6500, '1469197559535', 1, 2, NULL, 'Traslado Hotel, agua, All Inclusive', 'http://www.mdzol.com', 4),
(43, 'Visita San Martín', 'INFORMACIÓN GENERAL – SAN MARTIN', 'El Departamento de San Martín se encuentra en el sector noreste de la Provincia de Mendoza a 43 kilómetros de la Ciudad Capital.\\r\\nLimita al norte con el departamento de Lavalle, al sur con el de Junín y Rivadavia, al este con Santa Rosa y al oeste con Maipú.\\r\\nSe encuentra en una llanura con suave pendiente hacia el este, dentro de lo que se conoce como Llanura de la Travesía.', 'un poco mas', 'El ambiente es árido y semiárido. La llanura está conformada por una cuenca sedimentaria rellenada con mantos acarreados por el viento y el agua durante el Terciario y el Cuaternario.\\r\\nLos dos ríos que surcan la zona, Mendoza y Tunuyán, transportan agua solamente en crecidas excepcionales, ya que sus torrentes son retenidos para el aprovechamiento en la parte superior. \\r\\nLa temperatura va desde los 41 ºC en verano hasta los -7 ºC en invierno, y las precipitaciones no alcanzan los 200 mm.\\r\\n\\r\\nSu economía se basa en el cultivo e industrialización de la vid y en la agroindustria con el cultivo e industrialización de frutas y hortalizas.', 9000, '1469209429201', 0, 2, 15, 'Traslado al aeropuerto,Traslado Hotel,Diario del día,Almuerzo en bodega', 'http://www.mdzol.com', 5),
(44, 'Cacheuta, Mendoza', 'Termas y Spa de Cacheuta, Mendoza', 'Enclavado en la Cordillera de Los Andes , \\"inundando de belleza\\" y sensaciones el entorno, el Parque de Agua Termal y Aventura Termas Cacheuta cautiva desde la primera impresión y, entonces, ya no hay retorno. Placer supremo, relax y distensión parecieran ser sus palabras mágicas, no obstante también la diversión y la adrenalina encuentran su espacio en este oasis situado en la provincia de Mendoza.', 'Un lugar disfrutable a lo largo de todo el año', 'Una cómoda piscina semicubierta; una piscina acondicionada con agradables burbujas; una piscina para el disfrute seguro de los más chicos, todas a una temperatura promedio de 30º; además de las duchas masajeadoras, que actúan sobre el cuerpo como masajes, produciendo un efecto relajante, y la característica serenidad del ambiente, logran un efecto que vence categóricamente al estrés.', 15000, '1469305210886', 0, 1, 25, NULL, 'http://www.argentinaturismo.com.ar/termascacheuta/', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `requested_trips`
--

CREATE TABLE `requested_trips` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `request_date` varchar(100) NOT NULL,
  `date` varchar(15) NOT NULL,
  `time` varchar(15) NOT NULL,
  `req_from` varchar(255) NOT NULL,
  `req_to` varchar(255) NOT NULL,
  `distance` varchar(100) NOT NULL,
  `price` varchar(100) NOT NULL,
  `state` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `requested_trips`
--

INSERT INTO `requested_trips` (`id`, `userId`, `request_date`, `date`, `time`, `req_from`, `req_to`, `distance`, `price`, `state`) VALUES
(4, 1, '25-07-16 16:54', '27-07-2016', '21:53', 'Tabanera 3385, Mendoza, Argentina', 'Mendoza Plaza Shopping - Acceso Este Lateral Sue, Mendoza, Argentina', '10.8', '117.80', 1),
(5, 1, '25-07-16 17:44', '25-07-2016', '17:44', 'Tabanera 3385, Mendoza, Argentina', 'Cadetes Chilenos 173, Mendoza, Argentina', '2.8', '49.37', 2),
(6, 9, '27-07-16 00:03', '28-07-2016', '02:02', 'Cadetes Chilenos 173, Mendoza, Argentina', 'Tabanera 3385, Mendoza, Argentina', '2.2', '42.53', 0),
(7, 11, '27-07-16 09:26', '28-07-2016', '10:25', 'Mitre 179, MaipÃº, Mendoza, Argentina', 'Mendoza Plaza Shopping - Acceso Este Lateral Sue, Mendoza, Argentina', '170', '1955.45', 2),
(8, 12, '27-07-16 10:47', '31-07-2016', '14:46', 'Mitre 173, LujÃ¡n de Cuyo, Mendoza, Argentina', 'Mitre 870, Mendoza, Argentina', '169', '167.52', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `soldpackages`
--

CREATE TABLE `soldpackages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `tel` varchar(100) NOT NULL,
  `date` varchar(100) NOT NULL,
  `time` varchar(100) NOT NULL,
  `packageId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `soldpackages`
--

INSERT INTO `soldpackages` (`id`, `name`, `lastname`, `email`, `tel`, `date`, `time`, `packageId`) VALUES
(1, 'nicolas', 'sigal', 'nicolas.sigal@gmail.com', '12345123', '26-07-2016', '18:17', 39),
(2, 'juan', 'perez', 'juanperez@gmail.com', '123456', '27-07-2016', '18:26', 39),
(3, 'asdasdasd', 'asdasd', 'asdaasd@asdasd.com', '23423423', '27-07-2016', '18:28', 39),
(4, 'nicolas', 'sigal', 'nicolas.sigal@gmail.com', '123123123123', '28-07-2016', '20:40', 39);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `name` varchar(65) DEFAULT NULL,
  `lastname` varchar(65) DEFAULT NULL,
  `email` varchar(65) DEFAULT NULL,
  `tel` varchar(65) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `password` varchar(120) DEFAULT NULL,
  `deleted` int(1) NOT NULL DEFAULT '0',
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `sskey` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `email`, `tel`, `city`, `password`, `deleted`, `isAdmin`, `sskey`) VALUES
(1, 'nicolas', 'sigal', 'nicolas.sigal@gmail.com', '153013907', 'Mendoza, Argentina', 'admin', 0, 1, 'c01001e9dd0e9faf0f9978f27a0f2a75'),
(2, 'carlos', 'pascolo', 'carlos.pascolo@gmail.com', '123456789', 'Mendoza, Argentina', 'carlosp', 1, 0, NULL),
(9, 'Johanna', 'Belmonte', 'johannabelmonte@gmail.com', '12345', 'Mendoza, Argentina', '1234', 0, 1, '2eee09d6cf101bcc49adc6e4ba3d8ff5'),
(10, 'Carlos', 'Funes', 'carlos.funes@gmail.com', '1234', 'Cordoba, Argentina', '12345', 0, 1, NULL),
(11, 'Juan', 'Berdugo', 'eljuancho@gmail.com', '153050505', 'Mendoza, Argentina', '1234', 0, 0, NULL),
(12, 'Federico', 'Zanatta', 'fedemza6@gmail.com', '123456', 'Mendoza, Argentina', '1234', 0, 0, NULL),
(13, 'Marta', 'Amadei', 'mawwadei@gmail.com', '123456', 'Mendoza, Argentina', '1234', 0, 0, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `fares`
--
ALTER TABLE `fares`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`,`price`);

--
-- Indices de la tabla `requested_trips`
--
ALTER TABLE `requested_trips`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `soldpackages`
--
ALTER TABLE `soldpackages`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `fares`
--
ALTER TABLE `fares`
  MODIFY `id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=162;
--
-- AUTO_INCREMENT de la tabla `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
--
-- AUTO_INCREMENT de la tabla `requested_trips`
--
ALTER TABLE `requested_trips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `soldpackages`
--
ALTER TABLE `soldpackages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
