'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('_module', [
      { modTitle: "Mettre en œuvre des solutions ICT avec la technologie blockchain", modNumber: 107, id_module: 107 },
      { modTitle: "Implémenter les interfaces graphiques d’applications", modNumber: 120, id_module: 120 },
      { modTitle: "Organiser la mise en exploitation d’applications", modNumber: 154, id_module: 154 },
      { modTitle: "Implémenter la sécurité d'une application", modNumber: 183, id_module: 183 },
      { modTitle: "Elaborer une architecture logicielle", modNumber: 202, id_module: 202 },
      { modTitle: "Utiliser un cloud public pour des applications", modNumber: 210, id_module: 210 },
      { modTitle: "Réaliser des applications multi-utilisateurs orientées objets", modNumber: 223, id_module: 223 },
      { modTitle: "Implémenter sur la base des objects (sans hérédité)", modNumber: 226, id_module: 226 },
      { modTitle: "Implémenter orienté objets (avec hérédité)", modNumber: 226, id_module: 1226 },
      { modTitle: "Analyser et programmer orienté objet avec des composants", modNumber: 318, id_module: 318 },
      { modTitle: "Concevoir et implémenter des applications", modNumber: 319, id_module: 319 },
      { modTitle: "Programmer orienté objet", modNumber: 320, id_module: 320 },
      { modTitle: "Programmer des systèmes distribués", modNumber: 321, id_module: 321 },
      { modTitle: "Concevoir et implémenter des interfaces utilisateur", modNumber: 322, id_module: 322 },
      { modTitle: "Programmer de manière fonctionnelle", modNumber: 323, id_module: 323 },
      { modTitle: "Prendre en charge des processus DevOps avec des outils logiciels", modNumber: 324, id_module: 324 },
      { modTitle: "Développer et implémenter orienté objets", modNumber: 326, id_module: 326 },
      { modTitle: "Développer et implémenter orienté objets", modNumber: 326, id_module: 1326 },
      { modTitle: "Réaliser une application pour mobile", modNumber: 335, id_module: 335 },
      { modTitle: "Utiliser un service avec des conteneurs", modNumber: 347, id_module: 347 },
      { modTitle: "Implémenter de manière procédurale des déroulements de programme", modNumber: 403, id_module: 403 },
      { modTitle: "Programmer orienté objets selon directives", modNumber: 404, id_module: 404 },
      { modTitle: "Développer et appliquer des structures de données et algorithmes", modNumber: 411, id_module: 411 },
      { modTitle: "Développer un logiciel avec des méthodes agiles", modNumber: 426, id_module: 426 },
      { modTitle: "Développer une analyse pour une application", modNumber: 475, id_module: 475 },
      { modTitle: "Développer le design logique d’une application", modNumber: 476, id_module: 476 },
      { modTitle: "Implémenter le design physique d’une application", modNumber: 477, id_module: 477 },
      { modTitle: "Mettre à disposition un environnement de développement", modNumber: 478, id_module: 478 },
      { modTitle: "Concevoir une architecture logicielle", modNumber: 500, id_module: 500 },
      { modTitle: "Initialiser le développement logiciel", modNumber: 501, id_module: 501 },
      { modTitle: "Spécifier et concevoir le frontend pour une application complexe", modNumber: 503, id_module: 503 },
      { modTitle: "Concevoir et réaliser le frontend pour une application complexe", modNumber: 504, id_module: 504 },
      { modTitle: "Concevoir et réaliser la persistance dans des applications complexes", modNumber: 505, id_module: 505 },
      { modTitle: "Concevoir et réaliser une business logic dans des applications complexes", modNumber: 506, id_module: 506 },
      { modTitle: "Concevoir et réaliser des interfaces de programmation", modNumber: 507, id_module: 507 },
      { modTitle: "Spécifier et concevoir le développement d’une application mobile", modNumber: 508, id_module: 508 },
      { modTitle: "Concevoir et réaliser une application mobile", modNumber: 509, id_module: 509 },
      { modTitle: "Concevoir une interface utilisateur pour une application complexe", modNumber: 510, id_module: 510 },
      { modTitle: "Surveiller la carte des applications ICT", modNumber: 640, id_module: 640 },
      { modTitle: "Développer l'architecture TIC d'entreprise", modNumber: 641, id_module: 641 },
      { modTitle: "Administrer le portfolio des applications TIC", modNumber: 642, id_module: 1642 },
      { modTitle: "Gérer l'architecture ICT-Enterprise", modNumber: 642, id_module: 642 },
      { modTitle: "Définir un processus de développement TIC", modNumber: 643, id_module: 643 },
      { modTitle: "Analyser et raccorder les composants ADB", modNumber: 350, id_module: 350 },
      { modTitle: "Interpréter la documentation technique dans le cadre de l’automatisation du bâtiment", modNumber: 351, id_module: 351 },
      { modTitle: "Configurer les fonctions intégrales", modNumber: 352, id_module: 352 },
      { modTitle: "Relier le système ADB au système de gestion et aux systèmes tiers", modNumber: 353, id_module: 353 },
      { modTitle: "Mettre en oeuvre les fonctions de régulation et de commande dans les systèmes de ventilation", modNumber: 354, id_module: 354 },
      { modTitle: "Mettre en oeuvre les fonctions de régulation et de commande dans les systèmes de chauffage", modNumber: 355, id_module: 355 },
      { modTitle: "Mettre en oeuvre les fonctions d’éclairage et d‘ombrage", modNumber: 356, id_module: 356 },
      { modTitle: "Mettre en oeuvre les fonctions de conditions ambiantes", modNumber: 357, id_module: 357 },
      { modTitle: "Visualiser les flux énergétiques au niveau du bâtiment", modNumber: 358, id_module: 358 },
      { modTitle: "Mettre en oeuvre les fonctions de sécurité de la technique du bâtiment", modNumber: 359, id_module: 359 },
      { modTitle: "Mettre en service le système ADB puis l‘optimiser", modNumber: 360, id_module: 360 },
      { modTitle: "Mettre en service les systèmes vocaux et vidéo complexes", modNumber: 362, id_module: 362 },
      { modTitle: "Mettre en service les composants multimédias simples", modNumber: 363, id_module: 363 },
      { modTitle: "Mettre en service les composants multimédias complexes", modNumber: 364, id_module: 364 },
      { modTitle: "Mettre à disposition les services avancés", modNumber: 365, id_module: 365 },
      { modTitle: "Mettre en oeuvre et mettre à disposition les services système avancés", modNumber: 366, id_module: 366 },
      { modTitle: "Installer et raccorder les composants ACM", modNumber: 380, id_module: 380 },
      { modTitle: "Mettre en service les systèmes ADB", modNumber: 381, id_module: 381 },
      { modTitle: "Mettre en service les systèmes CM", modNumber: 382, id_module: 382 },
      { modTitle: "Planifier et installer les interfaces des systèmes ACM", modNumber: 383, id_module: 383 },
      { modTitle: "Raccorder les composants ADB", modNumber: 384, id_module: 384 },
      { modTitle: "Transposer une gestion du bâtiment simple", modNumber: 385, id_module: 385 },
      { modTitle: "Procéder à des extensions des composants ADB jusqu’à 230 volt et les vérifier", modNumber: 386, id_module: 386 },
      { modTitle: "Transposer le projet avec le standard Bus KNX", modNumber: 387, id_module: 387 },
      { modTitle: "Transposer le projet avec API", modNumber: 388, id_module: 388 },
      { modTitle: "Confectionner le câblage de communication et le câblage multimédia, procéder aux mesures et élaborer un rapport", modNumber: 389, id_module: 389 },
      { modTitle: "Mettre en service les systèmes multimédia", modNumber: 390, id_module: 390 },
      { modTitle: "Mettre en service le système de téléphonie IP virtualisé", modNumber: 391, id_module: 391 },
      { modTitle: "Evaluer des outils informatiques", modNumber: 167, id_module: 167 },
      { modTitle: "Assister des processus métier au moyen d’outils TIC", modNumber: 168, id_module: 168 },
      { modTitle: "Délimiter des systèmes et spécifier des exigences", modNumber: 192, id_module: 192 },
      { modTitle: "Modéliser des processus métier selon les principes de gestion de processus", modNumber: 230, id_module: 230 },
      { modTitle: "Etablir un appel d’offres et procéder à l’évaluation des systèmes ACM", modNumber: 237, id_module: 237 },
      { modTitle: "Evaluer des systèmes ACM", modNumber: 238, id_module: 238 },
      { modTitle: "Elaborer le concept pour les systèmes ADB", modNumber: 240, id_module: 240 },
      { modTitle: "Initialiser des solutions ICT innovantes", modNumber: 241, id_module: 241 },
      { modTitle: "Mettre en œuvre des solutions ICT innovantes", modNumber: 245, id_module: 245 },
      { modTitle: "Réaliser des solutions ICT avec des technologies actuelles", modNumber: 248, id_module: 248 },
      { modTitle: "Décrire des processus métier dans son propre environnement professionnel", modNumber: 254, id_module: 254 },
      { modTitle: "Développer des solutions ICT avec le machine learning", modNumber: 259, id_module: 259 },
      { modTitle: "Mettre en pratique des outils d’Office", modNumber: 260, id_module: 260 },
      { modTitle: "Appliquer les outils bureautiques", modNumber: 301, id_module: 301 },
      { modTitle: "Utiliser les fonctions avancées d’Office", modNumber: 302, id_module: 302 },
      { modTitle: "Automatiser les processus avec un langage de programmation", modNumber: 325, id_module: 325 },
      { modTitle: "Concevoir et réaliser des solutions cloud", modNumber: 346, id_module: 346 },
      { modTitle: "Saisir et modéliser les processus métier et en déterminer les points critiques", modNumber: 348, id_module: 348 },
      { modTitle: "Optimiser des processus métier", modNumber: 349, id_module: 349 },
      { modTitle: "Définir et vérifier des exigences en lien avec l’automatisation de processus métier", modNumber: 367, id_module: 367 },
      { modTitle: "Développer des solutions possibles pour des expériences clien", modNumber: 368, id_module: 368 },
      { modTitle: "Analyser la transformation numérique", modNumber: 394, id_module: 394 },
      { modTitle: "Concevoir des modèles d’affaires", modNumber: 396, id_module: 396 },
      { modTitle: "Concevoir des processus TIC", modNumber: 621, id_module: 621 },
      { modTitle: "Déterminer l'organisation de la construction et du processus TIC", modNumber: 622, id_module: 622 },
      { modTitle: "Déterminer la structure et l'organisation des ICT", modNumber: 622, id_module: 1622 },
      { modTitle: "Conseiller l'engagement TIC", modNumber: 623, id_module: 1623 },
      { modTitle: "Conseiller la direction de l'entreprise en matière d'ICT", modNumber: 623, id_module: 623 },
      { modTitle: "Vérifier et évaluer les outils de collaboration numérique", modNumber: 625, id_module: 625 },
      { modTitle: "Choisir les canaux et les outils numériques selon la situation", modNumber: 626, id_module: 626 },
      { modTitle: "Concevoir des interactions centrées sur l’utilisateur", modNumber: 631, id_module: 631 },
      { modTitle: "Modéliser les processus métiers", modNumber: 644, id_module: 644 },
      { modTitle: "Analyser et optimiser les processus métiers", modNumber: 645, id_module: 645 },
      { modTitle: "Délimiter les systèmes et spécifier les exigences", modNumber: 687, id_module: 687 },
      { modTitle: "Évaluer des solutions informatiques", modNumber: 689, id_module: 689 },
      { modTitle: "Analyser et budgétiser des prestations TIC", modNumber: 207, id_module: 207 },
      { modTitle: "Réaliser des événements sous supervision", modNumber: 220, id_module: 220 },
      { modTitle: "Pratiquer une communication et une animation efficaces", modNumber: 229, id_module: 229 },
      { modTitle: "Etablir et vérifier des offres conformément au droit", modNumber: 283, id_module: 283 },
      { modTitle: "Calculer l'apport de prestations et dérouler le processus de payement", modNumber: 284, id_module: 284 },
      { modTitle: "Analyser la clôture annuelle et exécuter les calculs de rentabilité", modNumber: 285, id_module: 285 },
      { modTitle: "Etablir le budget pour la mise en réseau des systèmes ACM", modNumber: 297, id_module: 297 },
      { modTitle: "Préparer et réaliser un workshop de manière auto-nome et méthodique", modNumber: 310, id_module: 310 },
      { modTitle: "Calculer la rentabilité d’investissements TIC", modNumber: 314, id_module: 314 },
      { modTitle: "Évaluer des idées et des scénarios pour des modèles d’affaires numériques", modNumber: 395, id_module: 395 },
      { modTitle: "Identifier les potentiels d’optimisation et réaliser les solutions", modNumber: 422, id_module: 422 },
      { modTitle: "Promouvoir l’acceptation du changement", modNumber: 492, id_module: 492 },
      { modTitle: "Analyser l’environnement d’un projet TIC", modNumber: 496, id_module: 496 },
      { modTitle: "Développer une stratégie TIC", modNumber: 601, id_module: 601 },
      { modTitle: "Développer et mettre en œuvre une stratégie ICT", modNumber: 602, id_module: 602 },
      { modTitle: "Fixer la stratégie des ressources", modNumber: 603, id_module: 603 },
      { modTitle: "Définir le sourcing ICT", modNumber: 603, id_module: 1603 },
      { modTitle: "Mettre en œuvre des modifications", modNumber: 624, id_module: 624 },
      { modTitle: "Gérer et optimiser les canaux numériques", modNumber: 628, id_module: 628 },
      { modTitle: "Planifier et conduire des réunions interactives", modNumber: 630, id_module: 630 },
      { modTitle: "Initier et accompagner les processus de modification", modNumber: 633, id_module: 633 },
      { modTitle: "Suivre et évaluer les innovations pour en dégager les tendances", modNumber: 646, id_module: 646 },
      { modTitle: "Calculer et évaluer la rentabilité de projets ICT", modNumber: 647, id_module: 647 },
      { modTitle: "Réaliser des Analyses Business", modNumber: 648, id_module: 648 },
      { modTitle: "Etablir et surveiller la planification financière", modNumber: 651, id_module: 1651 },
      { modTitle: "Etablir et suivre la planification financière des ICT", modNumber: 651, id_module: 651 },
      { modTitle: "Planifier les ressources en personnel", modNumber: 652, id_module: 652 },
      { modTitle: "Planification et suivi des ressources humaines", modNumber: 652, id_module: 1652 },
      { modTitle: "Appliquer les aspects du droit dans les projets TIC", modNumber: 654, id_module: 654 },
      { modTitle: "Garantir la conformité de la sécurité de l'information", modNumber: 671, id_module: 671 },
      { modTitle: "Déterminer les ressources à allouer à des projets ICT et les budgéter", modNumber: 688, id_module: 688 },
      { modTitle: "Diriger et encourager les collaborateurs", modNumber: 698, id_module: 1698 },
      { modTitle: "Distinguer, préparer et évaluer des données", modNumber: 100, id_module: 100 },
      { modTitle: "Implémenter un modèle de données", modNumber: 104, id_module: 104 },
      { modTitle: "Traiter une base de données avec SQL", modNumber: 105, id_module: 105 },
      { modTitle: "Interroger, traiter et assurer la maintenance des bases de données", modNumber: 106, id_module: 106 },
      { modTitle: "Analyser et représenter des données avec des outils", modNumber: 110, id_module: 110 },
      { modTitle: "Développer les modèles de données", modNumber: 153, id_module: 153 },
      { modTitle: "Concevoir et mettre en service les solutions cloud", modNumber: 160, id_module: 160 },
      { modTitle: "Analyser et modéliser des données", modNumber: 162, id_module: 162 },
      { modTitle: "Créer des bases de données et y insérer des données", modNumber: 164, id_module: 164 },
      { modTitle: "Utiliser des bases de données NoSQL", modNumber: 165, id_module: 165 },
      { modTitle: "Visualiser des données conformément au groupe cible", modNumber: 235, id_module: 235 },
      { modTitle: "Interroger et modifier des bases de données", modNumber: 290, id_module: 290 },
      { modTitle: "Collecter des données avec diverses méthodes", modNumber: 374, id_module: 374 },
      { modTitle: "Procéder à l’analyse statistique des données", modNumber: 375, id_module: 375 },
      { modTitle: "Collecter et analyser des données", modNumber: 376, id_module: 376 },
      { modTitle: "Réaliser un modèle de données", modNumber: 479, id_module: 479 },
      { modTitle: "Développer et mettre en œuvre un modèle de données pour des cas d’applications complexes", modNumber: 511, id_module: 511 },
      { modTitle: "Concevoir et réaliser un pipeline de données", modNumber: 512, id_module: 512 },
      { modTitle: "Analyser et évaluer les données", modNumber: 632, id_module: 632 },
      { modTitle: "Concevoir et assurer la gestion de la qualité des données", modNumber: 655, id_module: 655 },
      { modTitle: "Déterminer et appliquer les couleurs et typographies", modNumber: 270, id_module: 270 },
      { modTitle: "Elaborer des données vectorielles et traiter des images", modNumber: 271, id_module: 271 },
      { modTitle: "Développer et mettre en œuvre des produits d'impression", modNumber: 272, id_module: 272 },
      { modTitle: "Appliquer des maquettes", modNumber: 273, id_module: 273 },
      { modTitle: "Préparer et distribuer des données d'impression", modNumber: 274, id_module: 274 },
      { modTitle: "Elaborer et présenter des projets de maquettes", modNumber: 275, id_module: 275 },
      { modTitle: "Adapter le design des CI/CD au média utilisé", modNumber: 417, id_module: 417 },
      { modTitle: "Adapter des messages au média et au public cible", modNumber: 418, id_module: 418 },
      { modTitle: "Evaluer des concepts de solutions et des technologies nouvelles", modNumber: 419, id_module: 419 },
      { modTitle: "Evaluer l’utilité et l’intégrabilité de technologies TIC", modNumber: 495, id_module: 495 },
      { modTitle: "Mettre en oeuvre des équipements multimédias", modNumber: 115, id_module: 115 },
      { modTitle: "Etendre ou modifier une place de travail avec ordinateur", modNumber: 124, id_module: 124 },
      { modTitle: "Installer des périphériques en réseau", modNumber: 126, id_module: 126 },
      { modTitle: "Planifier et exécuter l’introduction d’un système informatique", modNumber: 157, id_module: 157 },
      { modTitle: "Installer et utiliser ses propres instruments de travail ICT", modNumber: 286, id_module: 286 },
      { modTitle: "Analyser et raccorder les composants ACM", modNumber: 299, id_module: 299 },
      { modTitle: "Installer et configurer un ordinateur mono-poste", modNumber: 304, id_module: 304 },
      { modTitle: "Etablir des médias pour une action de marketing", modNumber: 276, id_module: 276 },
      { modTitle: "Analyser le marché et en déduire les objectifs", modNumber: 278, id_module: 278 },
      { modTitle: "Développer et présenter un concept de marketing", modNumber: 279, id_module: 279 },
      { modTitle: "Développer et présenter un concept de marketing", modNumber: 279, id_module: 1279 },
      { modTitle: "Concevoir des produits analogiques et numériques de marketing", modNumber: 280, id_module: 280 },
      { modTitle: "Constituer et administrer des canaux de médias sociaux", modNumber: 281, id_module: 281 },
      { modTitle: "Évaluer les chiffres clés du marketing et préparer les contenus pour la communication opérationnelle", modNumber: 282, id_module: 282 },
      { modTitle: "Appliquer les CI/CD aux domaines d’applications élargis", modNumber: 423, id_module: 423 },
      { modTitle: "Elaborer et déployer des activités marketing en fonction du média utilisé", modNumber: 424, id_module: 424 },
      { modTitle: "Définir des activités de marketing", modNumber: 653, id_module: 653 },
      { modTitle: "Préparer des productions de médias numériques", modNumber: 264, id_module: 264 },
      { modTitle: "Produire des photographies numériques", modNumber: 265, id_module: 265 },
      { modTitle: "Produire des animations numériques", modNumber: 266, id_module: 266 },
      { modTitle: "Produire des enregistrements audio numériques", modNumber: 267, id_module: 267 },
      { modTitle: "Produire des films numériques", modNumber: 268, id_module: 268 },
      { modTitle: "Réaliser un projet de photographies", modNumber: 269, id_module: 269 },
      { modTitle: "Organiser et gérer des contenus multimédia indépendamment du support", modNumber: 414, id_module: 414 },
      { modTitle: "Adapter les contenus multimédia aux canaux de communication", modNumber: 415, id_module: 415 },
      { modTitle: "Appliquer le droit des biens immatériels dans le cadre de la production et de la publication", modNumber: 416, id_module: 416 },
      { modTitle: "Produire du contenu pour les médias numériques", modNumber: 627, id_module: 627 },
      { modTitle: "Mettre en place l'infrastructure informatique d'une petite entreprise", modNumber: 117, id_module: 117 },
      { modTitle: "Mettre en place l’infrastructure informatique et réseau d’une petite entreprise", modNumber: 117, id_module: 1117 },
      { modTitle: "Mettre en service des composants réseaux", modNumber: 129, id_module: 129 },
      { modTitle: "Contrôler un réseau et mesurer ses flux", modNumber: 130, id_module: 130 },
      { modTitle: "Planifier le réseau de données dans un projet ACM simple", modNumber: 142, id_module: 142 },
      { modTitle: "Réaliser un réseau sans fil et mettre en service", modNumber: 144, id_module: 144 },
      { modTitle: "Exploiter et étendre un réseau", modNumber: 145, id_module: 145 },
      { modTitle: "Relier une entreprise à Internet", modNumber: 146, id_module: 146 },
      { modTitle: "Mesurer, analyser les réseaux et éliminer les dérangements", modNumber: 147, id_module: 147 },
      { modTitle: "Mettre en service les services l‘IoT", modNumber: 148, id_module: 148 },
      { modTitle: "Exploiter des services de communication fixe", modNumber: 161, id_module: 161 },
      { modTitle: "Implémenter la sécurité réseau", modNumber: 184, id_module: 184 },
      { modTitle: "Implémenter la sécurité réseau", modNumber: 184, id_module: 1184 },
      { modTitle: "Intégrer les terminaux IoE dans une plateforme existante", modNumber: 216, id_module: 216 },
      { modTitle: "Concevoir, planifier et mettre en place un service pour l’IoE", modNumber: 217, id_module: 217 },
      { modTitle: "Mettre en service les systèmes vocaux et vidéo simples", modNumber: 361, id_module: 361 },
      { modTitle: "Intégrer des services de communication mobile", modNumber: 461, id_module: 461 },
      { modTitle: "Optimiser des réseaux", modNumber: 471, id_module: 471 },
      { modTitle: "Examiner et évaluer la sécurité des réseaux", modNumber: 675, id_module: 675 },
      { modTitle: "Concevoir et réaliser des réseaux complexes", modNumber: 691, id_module: 691 },
      { modTitle: "Exploiter des réseaux complexes", modNumber: 692, id_module: 692 },
      { modTitle: "Favoriser le développement de projets à l’aide de méthodes agiles", modNumber: 134, id_module: 134 },
      { modTitle: "Développer l’esprit d’équipe", modNumber: 213, id_module: 213 },
      { modTitle: "Coordonner et accompagner techniquement l’introduction de systèmes logiciels et de services IT", modNumber: 218, id_module: 218 },
      { modTitle: "Planifier et superviser des projets", modNumber: 249, id_module: 249 },
      { modTitle: "Exécuter l'évaluation de moyens ICT", modNumber: 262, id_module: 262 },
      { modTitle: "Réaliser de petits projets dans son propre environnement professionnel", modNumber: 306, id_module: 306 },
      { modTitle: "Exécuter des mandats en appliquant des méthodes", modNumber: 331, id_module: 331 },
      { modTitle: "Soutenir la mise en œuvre du projet avec des méthodes", modNumber: 333, id_module: 333 },
      { modTitle: "Mettre en œuvre des projets avec une gestion de projet classique", modNumber: 336, id_module: 336 },
      { modTitle: "Permettre une approche agile dans un environnement de projet classique", modNumber: 337, id_module: 337 },
      { modTitle: "Développer des solutions de manière créative et innovante", modNumber: 338, id_module: 338 },
      { modTitle: "Permettre une gestion de projet innovante", modNumber: 339, id_module: 339 },
      { modTitle: "Etablir le planning des tâches et l’échéancier pour un projet ACM simple", modNumber: 430, id_module: 430 },
      { modTitle: "Exécuter des mandats de manière autonome dans son propre environnement professionnel", modNumber: 431, id_module: 431 },
      { modTitle: "Réaliser des projets ACM", modNumber: 432, id_module: 432 },
      { modTitle: "Préparer et planifier les projets ACM", modNumber: 433, id_module: 433 },
      { modTitle: "Diriger une équipe de projet", modNumber: 494, id_module: 494 },
      { modTitle: "Dérouler des projets TIC en conformité avec le droit", modNumber: 497, id_module: 497 },
      { modTitle: "Développer un processus de portfolio TIC", modNumber: 611, id_module: 611 },
      { modTitle: "Evaluer un portfolio TIC", modNumber: 612, id_module: 612 },
      { modTitle: "Définir et développer un contrôle de portfolio TIC", modNumber: 613, id_module: 613 },
      { modTitle: "Définir et gérer un portefeuille de projets TIC", modNumber: 614, id_module: 614 },
      { modTitle: "Diriger la gestion du changement", modNumber: 615, id_module: 615 },
      { modTitle: "Diriger et soutenir une équipe", modNumber: 674, id_module: 674 },
      { modTitle: "Planifier, conduire et superviser des projets", modNumber: 690, id_module: 690 },
      { modTitle: "Promouvoir activement le développement de l'esprit d'équipe et clarifier les rôles au sein de l'équipe", modNumber: 698, id_module: 698 },
      { modTitle: "Tester des applications", modNumber: 450, id_module: 450 },
      { modTitle: "Tester une application", modNumber: 451, id_module: 451 },
      { modTitle: "Implémenter la gestion des versions et des mises à jour", modNumber: 452, id_module: 452 },
      { modTitle: "Procéder à une revue du code", modNumber: 459, id_module: 459 },
      { modTitle: "Tester et superviser le fonctionnement de composants d’infrastructure TIC", modNumber: 482, id_module: 482 },
      { modTitle: "Surveiller la qualité des processus ICT", modNumber: 607, id_module: 607 },
      { modTitle: "Mettre en œuvre des systèmes de codification, de compression et d'encryptage", modNumber: 114, id_module: 114 },
      { modTitle: "Mettre en œuvre des systèmes de codification, de compression et d’encryptage", modNumber: 114, id_module: 1114 },
      { modTitle: "Assurer la sécurité de base des TIC", modNumber: 166, id_module: 166 },
      { modTitle: "Assurer la sécurité de l’information", modNumber: 176, id_module: 176 },
      { modTitle: "Analyser et implémenter des mesures visant à assurer la sécurité informatique des PME", modNumber: 185, id_module: 185 },
      { modTitle: "Appliquer la protection et la sécurité des données", modNumber: 231, id_module: 231 },
      { modTitle: "Garantir la sécurité informatique et la protection des données de projets ACM", modNumber: 232, id_module: 232 },
      { modTitle: "Protéger et assurer la maintenance des réseaux", modNumber: 233, id_module: 233 },
      { modTitle: "Garantir la sécurité des terminaux ICT utilisateurs", modNumber: 263, id_module: 263 },
      { modTitle: "Implémenter des mesures de sécurité de réseau et de système", modNumber: 486, id_module: 486 },
      { modTitle: "Assurer la sécurité de fonctionnement d’applications", modNumber: 502, id_module: 502 },
      { modTitle: "Garantir la sécurité et la compliance", modNumber: 656, id_module: 656 },
      { modTitle: "Effectuer une analyse des risques ICT", modNumber: 660, id_module: 660 },
      { modTitle: "Exécuter des analyses de sécurité TIC", modNumber: 661, id_module: 661 },
      { modTitle: "Assurer la sécurité TIC", modNumber: 662, id_module: 662 },
      { modTitle: "Surveiller la sécurité des ICT", modNumber: 662, id_module: 1662 },
      { modTitle: "Développer une stratégie de sécurité de l'information", modNumber: 665, id_module: 665 },
      { modTitle: "Définir et ancrer une gouvernance relative à la stratégie de sécurité de l'information", modNumber: 666, id_module: 666 },
      { modTitle: "Mettre en place un système de gestion de la sécurité de l'information", modNumber: 667, id_module: 667 },
      { modTitle: "Exploiter et améliorer un système de gestion de la sécurité de l'information", modNumber: 668, id_module: 668 },
      { modTitle: "Garantir la sécurité de l'information dans le Business Continuity Management", modNumber: 670, id_module: 670 },
      { modTitle: "Collecter des informations sur les menaces et les traiter", modNumber: 679, id_module: 679 },
      { modTitle: "Contrôler la sécurité de l'infrastructure informatique", modNumber: 680, id_module: 680 },
      { modTitle: "Analyser et interpréter des ensembles de données", modNumber: 683, id_module: 683 },
      { modTitle: "Procéder à une investigation numérique des systèmes", modNumber: 684, id_module: 684 },
      { modTitle: "Concevoir et garantir la sécurité de l'information", modNumber: 696, id_module: 696 },
      { modTitle: "Mettre en œuvre des mesures de protection pour une infrastructure ICT", modNumber: 697, id_module: 697 },
      { modTitle: "Réussir une présentation dans un environnement de business numérique", modNumber: 119, id_module: 119 },
      { modTitle: "Automatiser des procédures à l’aide de scripts", modNumber: 122, id_module: 122 },
      { modTitle: "Planifier et installer des places de travail informatique", modNumber: 138, id_module: 138 },
      { modTitle: "Développer de nouveaux services, planifier leur introduction", modNumber: 156, id_module: 156 },
      { modTitle: "Planifier et exécuter la migration de logiciels", modNumber: 158, id_module: 158 },
      { modTitle: "Gérer les incidents dans un service d’assistance informatique", modNumber: 177, id_module: 177 },
      { modTitle: "Instruire les utilisateurs sur le comportement avec des moyens informatiques", modNumber: 214, id_module: 214 },
      { modTitle: "Établir la documentation utilisateur et les supports de formation", modNumber: 219, id_module: 219 },
      { modTitle: "Travailler avec des outils de collaboration numérique", modNumber: 224, id_module: 224 },
      { modTitle: "Communiquer avec diverses parties prenantes dans une langue étrangère (enseignement bilingue)", modNumber: 370, id_module: 370 },
      { modTitle: "Faire une présentation dans une langue étrangère (enseignement bilingue)", modNumber: 371, id_module: 371 },
      { modTitle: "Réaliser une séquence de formation dans une langue étrangère (ensei-gnement bilingue)", modNumber: 372, id_module: 372 },
      { modTitle: "Communiquer avec les parties prenantes dans une langue étrangère (enseignement bilingue)", modNumber: 373, id_module: 373 },
      { modTitle: "Sauvegarder les données et assurer la fonctionnalité des services", modNumber: 435, id_module: 435 },
      { modTitle: "Elaborer la documentation et former le client à l’utilisation des systèmes ACM", modNumber: 436, id_module: 436 },
      { modTitle: "Travailler dans le support", modNumber: 437, id_module: 437 },
      { modTitle: "Organiser un centre de services", modNumber: 454, id_module: 454 },
      { modTitle: "Convenir de services TIC et les superviser", modNumber: 498, id_module: 498 },
      { modTitle: "Concevoir et mettre à disposition des infrastructures de données", modNumber: 513, id_module: 513 },
      { modTitle: "Développer des séquences d’apprentissage", modNumber: 629, id_module: 629 },
      { modTitle: "Maintenir le paysage des services pour la collaboration numérique", modNumber: 634, id_module: 634 },
      { modTitle: "Développer et convenir des prestations de service IT", modNumber: 649, id_module: 649 },
      { modTitle: "Superviser et améliorer les prestations de service IT", modNumber: 650, id_module: 650 },
      { modTitle: "Assurer des processus systèmes TIC", modNumber: 663, id_module: 663 },
      { modTitle: "Surveiller les processus ICT", modNumber: 663, id_module: 1663 },
      { modTitle: "Acquérir et surveiller des prestations de service TIC", modNumber: 664, id_module: 664 },
      { modTitle: "Acquérir et surveiller des services ICT", modNumber: 664, id_module: 1664 },
      { modTitle: "Assurer le traitement des incidents de sécurité de l'information", modNumber: 669, id_module: 669 },
      { modTitle: "Evaluer et introduire des solutions de sécurité de l'information", modNumber: 672, id_module: 672 },
      { modTitle: "Créer et favoriser une prise de conscience quant à la sécurité de l'information", modNumber: 673, id_module: 673 },
      { modTitle: "Gérer les incidents de sécurité", modNumber: 682, id_module: 682 },
      { modTitle: "Assurer la gestion des vulnérabilités et des correctifs", modNumber: 685, id_module: 685 },
      { modTitle: "Fournir des conseils techniques aux clients et les former", modNumber: 686, id_module: 686 },
      { modTitle: "Définir et mettre en œuvre des processus de distribution", modNumber: 695, id_module: 695 },
      { modTitle: "Exploiter et surveiller des services dans le cloud public", modNumber: 109, id_module: 109 },
      { modTitle: "Activer les services d´un serveur", modNumber: 123, id_module: 123 },
      { modTitle: "Assurer l’exploitation de serveurs", modNumber: 127, id_module: 127 },
      { modTitle: "Administrer et exploiter des bases de données", modNumber: 140, id_module: 140 },
      { modTitle: "Installer des systèmes de bases de données", modNumber: 141, id_module: 141 },
      { modTitle: "Installer des systèmes de bases de données", modNumber: 141, id_module: 1141 },
      { modTitle: "Implanter un système de sauvegarde et de restauration", modNumber: 143, id_module: 143 },
      { modTitle: "Configurer et synchroniser le service d’annuaire", modNumber: 159, id_module: 159 },
      { modTitle: "Mettre à disposition des services avec des conteneurs", modNumber: 169, id_module: 169 },
      { modTitle: "Installer, configurer et administrer les systèmes d’exploitation des plateformes", modNumber: 179, id_module: 179 },
      { modTitle: "Elaborer des stratégies d’archivage, de sauvegarde et de restauration", modNumber: 181, id_module: 181 },
      { modTitle: "Implémenter la sécurité système", modNumber: 182, id_module: 182 },
      { modTitle: "Mettre en service un poste de travail ICT avec le système d’exploitation", modNumber: 187, id_module: 187 },
      { modTitle: "Exploiter, surveiller et assurer la maintenance des services", modNumber: 188, id_module: 188 },
      { modTitle: "Mettre en place et exploiter une plateforme de virtualisation", modNumber: 190, id_module: 190 },
      { modTitle: "Mettre en service un serveur Web", modNumber: 239, id_module: 239 },
      { modTitle: "Garantir la fonction des terminaux utilisateurs dans la structure réseau", modNumber: 261, id_module: 261 },
      { modTitle: "Intégrer des services réseau mutli-plates-forme", modNumber: 300, id_module: 300 },
      { modTitle: "Intégrer des services réseau multi-plateformes", modNumber: 300, id_module: 1300 },
      { modTitle: "Installer, configurer et administrer un système d’exploitation", modNumber: 305, id_module: 305 },
      { modTitle: "Mettre en service un système de téléphonie IP", modNumber: 330, id_module: 330 },
      { modTitle: "Virtualiser une infrastructure informatique", modNumber: 340, id_module: 340 },
      { modTitle: "Elaborer le descriptif de fonctionnement des interfaces systèmes ACM", modNumber: 341, id_module: 341 },
      { modTitle: "Visualiser les réseaux de données et les interfaces des systèmes ACM", modNumber: 342, id_module: 342 },
      { modTitle: "Présenter et justifier les résultats de la planification des systèmes ACM", modNumber: 343, id_module: 343 },
      { modTitle: "Coordonner sur le plan technique les travaux effectués sur les systèmes ADB", modNumber: 344, id_module: 344 },
      { modTitle: "Coordonner sur le plan technique les travaux effectués sur les systèmes CM", modNumber: 345, id_module: 345 },
      { modTitle: "Concevoir et réaliser des solutions de virtualisation", modNumber: 441, id_module: 441 },
      { modTitle: "Examiner et évaluer la sécurité des applications et des services de serveurs", modNumber: 676, id_module: 676 },
      { modTitle: "Examiner et évaluer la sécurité des solutions de stockage", modNumber: 677, id_module: 677 },
      { modTitle: "Examiner et évaluer la sécurité des terminaux et périphériques", modNumber: 678, id_module: 678 },
      { modTitle: "Détecter et contrer les attaques ciblant l'infrastructure informatique", modNumber: 681, id_module: 681 },
      { modTitle: "Concevoir et réaliser des plates-formes ICT complexes", modNumber: 693, id_module: 693 },
      { modTitle: "Exploiter des plates-formes ICT complexes", modNumber: 694, id_module: 694 },
      { modTitle: "Elaborer des tâches de pilotage", modNumber: 121, id_module: 121 },
      { modTitle: "Développer des procédures en temps réel", modNumber: 155, id_module: 155 },
      { modTitle: "Réaliser des applications pour microprocesseurs", modNumber: 242, id_module: 242 },
      { modTitle: "Visualiser les signaux de capteurs", modNumber: 253, id_module: 253 },
      { modTitle: "Réaliser et publier un site Web", modNumber: 101, id_module: 101 },
      { modTitle: "Réaliser des applications Web en Session-Handling", modNumber: 133, id_module: 133 },
      { modTitle: "Adapter une application de commerce électronique", modNumber: 150, id_module: 150 },
      { modTitle: "Intégrer des bases de données dans des applications Web", modNumber: 151, id_module: 151 },
      { modTitle: "Intégrer des contenus multimédias dans des applications Web", modNumber: 152, id_module: 152 },
      { modTitle: "Réaliser la partie cliente des applications Web", modNumber: 256, id_module: 256 },
      { modTitle: "Créer des sites web avec le CSS", modNumber: 287, id_module: 287 },
      { modTitle: "Utilisation des techniques de programmation dans le Frontend Web", modNumber: 288, id_module: 288 },
      { modTitle: "Mettre en œuvre et exploiter un CMS", modNumber: 289, id_module: 289 },
      { modTitle: "Développer des interfaces utilisateurs (UI) avec des technologies Web", modNumber: 291, id_module: 291 },
      { modTitle: "Implémenter côté client une application avec des technologies Web", modNumber: 292, id_module: 292 },
      { modTitle: "Créer et publier un site Web", modNumber: 293, id_module: 293 },
      { modTitle: "Réaliser le front-end d’une application Web interactive", modNumber: 294, id_module: 294 },
      { modTitle: "Réaliser le back-end pour des applications", modNumber: 295, id_module: 295 },
      { modTitle: "Réaliser des pages Web interactives", modNumber: 307, id_module: 307 },
      { modTitle: "Implémenter des logiciels standards en fonction des spécificités de l’entreprise", modNumber: 493, id_module: 493 },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('_module', null, {});
  }
};
