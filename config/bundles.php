<?php

return [
    Symfony\Bundle\FrameworkBundle\FrameworkBundle::class                => [ 'all' => TRUE ],
    Symfony\Bundle\MakerBundle\MakerBundle::class                        => [ 'dev' => TRUE ],
    Symfony\Bundle\TwigBundle\TwigBundle::class                          => [ 'all' => TRUE ],
    Symfony\Bundle\WebProfilerBundle\WebProfilerBundle::class            => [ 'dev' => TRUE, 'test' => TRUE ],
    Doctrine\Bundle\DoctrineBundle\DoctrineBundle::class                 => [ 'all' => TRUE ],
    Doctrine\Bundle\MigrationsBundle\DoctrineMigrationsBundle::class     => [ 'all' => TRUE ],
    Symfony\WebpackEncoreBundle\WebpackEncoreBundle::class               => [ 'all' => TRUE ],
    Bazinga\Bundle\JsTranslationBundle\BazingaJsTranslationBundle::class => [ 'all' => TRUE ],
    Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle::class => [ 'all' => TRUE ],
    FOS\JsRoutingBundle\FOSJsRoutingBundle::class                        => [ 'all' => TRUE ],
    JMS\SerializerBundle\JMSSerializerBundle::class                      => [ 'all' => TRUE ],
    Twig\Extra\TwigExtraBundle\TwigExtraBundle::class                    => [ 'all' => TRUE ],
];
